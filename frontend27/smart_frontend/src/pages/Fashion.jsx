import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";

function Fashion() {

  const [products, setProducts] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const webcamRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);

  const [showResult, setShowResult] = useState(false);

  const [selectedDress, setSelectedDress] = useState("");

  const [selectedGender, setSelectedGender] = useState("");

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const [skinTone, setSkinTone] = useState("");

 

  useEffect(() => {

    fetch("http://127.0.0.1:8000/fashion/")

      .then((response) => response.json())

      .then((data) => {

        setProducts(data);

      });
      

  }, []);

  // CAPTURE PHOTO

  const capturePhoto = () => {

    const imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage(imageSrc);

    setOpenCamera(false);

  };
  const uploadImage = (e) => {

  const file = e.target.files[0];

  if (file) {

    const reader = new FileReader();

    reader.onloadend = () => {

      setCapturedImage(reader.result);

    };

    reader.readAsDataURL(file);

  }

};

  // DETECT FASHION

  const detectFashion = async () => {

    if (!capturedImage || !selectedDress) {

      alert("Capture photo and select dress type");

      return;

    }

    const response = await fetch(
      "http://127.0.0.1:8000/detect-fashion/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

         body: JSON.stringify({

            image: capturedImage,

            gender: selectedGender,

            category: selectedDress,

          }),
      }
    );

    const data = await response.json();

    console.log(data);

    setSkinTone(data.skin_tone);

    setRecommendedProducts(data.products);

    setShowResult(true);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOP HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">

            AI Fashion Recommendation

          </h1>

          <p className="text-gray-500 mt-2">

            Get AI powered fashion suggestions based on your selfie.

          </p>

        </div>

        <button
          onClick={() => {

              setShowAI(!showAI);

              setShowResult(false);

              setCapturedImage(null);

              setSelectedDress("");

              setRecommendedProducts([]);

              setSkinTone("");

            }}
          className="bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-purple-700"
        >

          Fashion AI

        </button>

      </div>

      {/* AI SECTION */}

      {showAI && !showResult && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* LEFT CARD */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-purple-600 mb-6">

              1. Upload Your Selfie

            </h2>

            {!capturedImage && (

              <button
                onClick={() => setOpenCamera(!openCamera)}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl mb-5 hover:bg-blue-700"
              >

                Open Camera

              </button>

            )}

            {/* CAMERA */}
     <label className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition border-2 border-dashed border-purple-400 rounded-2xl p-6 cursor-pointer mb-5">

  <div className="text-center">

    <p className="text-xl font-semibold text-purple-600">

      📁 Upload From Gallery

    </p>

    <p className="text-gray-500 mt-2">

      Click here to choose image

    </p>

  </div>

  <input
    type="file"
    accept="image/*"
    onChange={uploadImage}
    className="hidden"
  />

</label>

            {openCamera && (

              <div>

                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="rounded-2xl w-full h-80 object-contain bg-gray-100"
                />

                <button
                  onClick={capturePhoto}
                  className="w-full bg-black text-white py-4 rounded-2xl mt-4"
                >

                  📸 Capture Photo

                </button>

              </div>

            )}

            {/* CAPTURED IMAGE */}

            {capturedImage && (

              <div>

                <img
                  src={capturedImage}
                   className="rounded-2xl w-full h-80 object-contain bg-gray-100"
                />

                <p className="text-green-600 font-semibold mt-4">

                  Photo captured successfully ✅

                </p>

              </div>

            )}

          </div>

          {/* RIGHT CARD */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            

            {/* GENDER BUTTONS */}

<h2 className="text-3xl font-bold text-purple-600 mb-6">

  2. Select Gender

</h2>

<div className="flex gap-4 mb-8">

  <button
    onClick={() => {

      setSelectedGender("men");

      setSelectedDress("");

    }}
    className={`flex-1 py-4 rounded-2xl text-lg font-semibold transition ${
      selectedGender === "men"
        ? "bg-blue-600 text-white"
        : "bg-gray-100"
    }`}
  >

    👨 Men

  </button>

  <button
    onClick={() => {

      setSelectedGender("women");

      setSelectedDress("");

    }}
    className={`flex-1 py-4 rounded-2xl text-lg font-semibold transition ${
      selectedGender === "women"
        ? "bg-pink-600 text-white"
        : "bg-gray-100"
    }`}
  >

    👩 Women

  </button>

</div>

{/* DRESS BUTTONS */}

<div className="flex flex-col gap-4 mb-8">

  {selectedGender === "men" && (

    <>

      <button
        onClick={() => setSelectedDress("shirt")}
        className={`py-4 rounded-2xl text-lg font-semibold ${
          selectedDress === "shirt"
            ? "bg-purple-600 text-white"
            : "bg-gray-100"
        }`}
      >

        👕 Shirt

      </button>

      <button
        onClick={() => setSelectedDress("pant")}
        className={`py-4 rounded-2xl text-lg font-semibold ${
          selectedDress === "pant"
            ? "bg-purple-600 text-white"
            : "bg-gray-100"
        }`}
      >

        👖 Pant

      </button>

    </>

  )}

  {selectedGender === "women" && (

    <>

      <button
        onClick={() => setSelectedDress("saree")}
        className={`py-4 rounded-2xl text-lg font-semibold ${
          selectedDress === "saree"
            ? "bg-pink-600 text-white"
            : "bg-gray-100"
        }`}
      >

        🥻 Saree

      </button>

      <button
        onClick={() => setSelectedDress("tops")}
        className={`py-4 rounded-2xl text-lg font-semibold ${
          selectedDress === "tops"
            ? "bg-pink-600 text-white"
            : "bg-gray-100"
        }`}
      >

        👚 Tops

      </button>

      <button
        onClick={() => setSelectedDress("dress")}
        className={`py-4 rounded-2xl text-lg font-semibold ${
          selectedDress === "dress"
            ? "bg-pink-600 text-white"
            : "bg-gray-100"
        }`}
      >

        👗 Dress

      </button>

    </>

  )}

</div>

          

            {/* DETECT BUTTON */}

            <button
              onClick={detectFashion}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition duration-300"
            >

              Detect & Recommend ✨

            </button>

          </div>

        </div>

      )}

      {/* RESULT SECTION */}

      {showResult && (

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* IMAGE */}

            <div>

              <img
                src={capturedImage}
                className="rounded-3xl w-full h-96 object-cover"
              />

            </div>

            {/* AI RESULT */}

            <div>

              <h1 className="text-4xl font-bold text-purple-600 mb-6">

                AI Analysis Result

              </h1>

              <div className="space-y-5">

                <div>

                  <p className="text-gray-500 text-lg">

                    Match Score

                  </p>

                  <h2 className="text-3xl font-bold text-green-600">

                    92% Excellent Match

                  </h2>

                </div>

                <div>

                  <p className="text-gray-500 text-lg">

                    Skin Tone

                  </p>

                  <h2 className="text-2xl font-semibold">

                    {skinTone}

                  </h2>

                </div>

                <div className="bg-gray-100 rounded-2xl p-5 mt-5">

                  <h2 className="text-2xl font-bold text-purple-600 mb-3">

                    AI Suggestion

                  </h2>

                  <p className="text-gray-700 text-lg leading-8">

                    Matching fashion products are recommended
                    based on your detected skin tone.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* PRODUCT TITLE */}

      <h1 className="text-3xl font-bold text-purple-600 mb-6">

        Recommended Products

      </h1>

      {/* PRODUCTS */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

        {(showResult ? recommendedProducts : products).map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
          >

            {/* IMAGE */}

            <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden p-3">

              <img
                src={item.image}
                alt={item.name}
                className="max-w-full max-h-full object-contain hover:scale-105 transition duration-300"
              />

            </div>

            {/* CONTENT */}

            <div className="p-4">

              <h2 className="text-yellow-700 font-bold text-sm uppercase">

                {item.brand}

              </h2>

              <h1 className="text-lg font-semibold mt-1 line-clamp-1">

                {item.name}

              </h1>

              <p className="text-gray-500 text-sm mt-1 line-clamp-2">

                {item.description}

              </p>

              <div className="flex items-center gap-2 mt-3">

                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">

                  ⭐ {item.rating}

                </span>

                <span className="text-gray-500 text-xs">

                  Stock: {item.stock}

                </span>

              </div>

              <div className="mt-4 flex items-center gap-2">

                <span className="text-2xl font-bold">

                  ₹{item.price}

                </span>

                <span className="line-through text-gray-400 text-sm">

                  ₹{item.old_price}

                </span>

              </div>

              <button className="w-full bg-black hover:bg-purple-700 text-white py-3 rounded-xl mt-5">

                Add To Cart

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Fashion;