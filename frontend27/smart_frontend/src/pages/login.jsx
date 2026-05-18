import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [existingUser, setExistingUser] = useState(null);

  const [timer, setTimer] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // clear timer on unmount
  useEffect(() => {
    return () => intervalId && clearInterval(intervalId);
  }, [intervalId]);

  // SEND OTP
  const sendOtp = async () => {
    if (!email) {
      setError("Enter email");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/send-otp/", {
        email,
      });

      setError("");
      setOtpSent(true);
      setExistingUser(res.data.existing_user);

      setOtpExpired(false);
      setTimer(30);

      if (intervalId) clearInterval(intervalId);

      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setOtpExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setIntervalId(id);
    } catch (err) {
      setError("Failed to send OTP");
    }
  };

  // LOGIN
  const loginUser = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/verify-login-otp/", {
        email,
        otp,
      });

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);

      navigate(-1);
    } catch {
      setError("Invalid OTP");
    }
  };

  // REGISTER
  const registerUser = async () => {
    if (!name) return setError("Enter name");

    try {
      await axios.post("http://127.0.0.1:8000/register/", {
        name,
        email,
        otp,
      });

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);

      navigate(-1);
    } catch {
      setError("Registration Failed");
    }
  };

 
    return (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">

    <div className="relative w-full max-w-5xl h-[620px] bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-6 text-4xl font-bold z-10"
      >
        ×
      </button>

      {/* LEFT PURPLE SIDE */}
      <div className="bg-purple-800 text-white p-10 flex flex-col justify-center">

        <h1 className="text-6xl font-extrabold mb-14">
          SmartMart
        </h1>

        <h2 className="text-4xl font-bold leading-tight">
          Lowest Prices Everyday
          <br />
          in minutes
        </h2>

        <p className="mt-6 text-white/80">
          Groceries, fashion, furniture and more at your doorstep.
        </p>

      </div>

      {/* RIGHT LOGIN SIDE */}
      <div className="bg-white p-10 flex flex-col justify-center">

        <h2 className="text-3xl font-bold text-center text-purple-800">
          Login / Register
        </h2>

        <input
          className="w-full mt-8 px-5 py-4 border rounded-full outline-none"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}

        {!otpSent && (
          <button
            onClick={sendOtp}
            className="w-full mt-6 bg-pink-600 text-white py-4 rounded-full font-bold"
          >
            Continue
          </button>
        )}

        {otpSent && (
          <>
            {!existingUser && (
              <input
                className="w-full mt-5 px-5 py-4 border rounded-full outline-none"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              className="w-full mt-5 px-5 py-4 border rounded-full outline-none"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="flex justify-between mt-2 text-sm">
              <span className={otpExpired ? "text-red-500" : "text-gray-500"}>
                {otpExpired ? "OTP expired" : `Valid for ${timer}s`}
              </span>

              <button
                onClick={sendOtp}
                disabled={timer > 0}
                className="text-pink-600 font-semibold disabled:text-gray-400"
              >
                Resend
              </button>
            </div>

            <button
              onClick={existingUser ? loginUser : registerUser}
              className="w-full mt-6 bg-pink-600 text-white py-4 rounded-full font-bold"
            >
              {existingUser ? "Login" : "Register"}
            </button>
          </>
        )}

        <p className="text-xs text-gray-400 mt-6 text-center">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>

      </div>
    </div>
  </div>
);}