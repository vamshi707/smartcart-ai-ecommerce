import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[70vh] bg-sky-500 flex items-center justify-center relative overflow-hidden">

  <button
    onClick={() => navigate("/ ")}
    className="absolute top-6 left-6 text-white"
  >
    <ArrowLeft size={35} />
  </button>

  <div className="w-[95%] h-full flex flex-col items-center justify-center text-white text-center">

    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
      <span className="text-sky-500 text-7xl font-bold">
        ✓
      </span>
    </div>

    <h1 className="text-4xl font-bold mb-4">
      Order Confirmed
    </h1>

    <p className="text-lg mb-10">
      Your order has been placed successfully.
      Thank you for shopping with SmartMart.
    </p>

    <div className="w-full max-w-sm">
      <button
        onClick={() => navigate("/my-orders")}
        className="w-full bg-white text-sky-600 py-3 rounded-full font-bold mb-4"
      >
        View My Orders
      </button>

      <button
        onClick={() => navigate("/All")}
        className="w-full border-2 border-white py-3 rounded-full font-bold"
      >
        Continue Shopping
      </button>
    </div>

  </div>
</div>
  )}