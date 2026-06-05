import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../utils/cartUtils";



function Beauty() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const webcamRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [skinType, setSkinType] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/beauty/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setOpenCamera(false);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCapturedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const detectBeauty = () => {
    if (!capturedImage || !selectedCategory || !selectedGender) {
      alert("Upload photo, select gender and beauty product");
      return;
    }

    const matchedProducts = products.filter(
      (item) =>
        item.category?.toLowerCase() === selectedCategory.toLowerCase() &&
        item.gender?.toLowerCase() === selectedGender.toLowerCase()
    );

    setSkinType("Normal Skin");

    setRecommendedProducts(
      matchedProducts.length > 0 ? matchedProducts : products
    );

    setShowResult(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        {!showAI && (
  <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300 rounded-3xl p-2 mb-4 flex justify-between items-center overflow-hidden shadow-xl">

    <div className="text-white">
      <h2 className="text-5xl font-bold">
        Beauty AI Assistant ✨
      </h2>

      <p className="mt-4 text-xl max-w-xl">
        Upload your selfie and get personalized
        beauty product recommendations powered by AI.
      </p>

      <button
        onClick={() => setShowAI(true)}
        className="mt-6 bg-white text-pink-600 px-6 py-2 rounded-2xl text-xl font-bold hover:scale-105 transition"
      >
        ✨ Try Beauty AI →
      </button>
    </div>

    <div className="relative block">
      <img
        src="/beauty.png"
        alt="Beauty AI"
        className="w-80 object-contain"
      />

      <div className="absolute top-5 left-0 text-4xl">
        ✨
      </div>

      <div className="absolute top-20 right-5 text-3xl">
        💄
      </div>

      <div className="absolute bottom-10 left-10 text-3xl">
        🌸
      </div>
    </div>

  </div>
)}
        <div className="flex justify-between items-center mb-8">
          
          <div>
            <h1 className="text-4xl font-bold">
              AI Beauty Recommendation
            </h1>

            <p className="text-gray-500 mt-2">
              Get beauty product suggestions based on your selfie.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAI(!showAI);
              setShowResult(false);
              setCapturedImage(null);
              setSelectedCategory("");
              setSelectedGender("");
              setRecommendedProducts([]);
              setSkinType("");
            }}
            className="bg-pink-600 text-white px-6 py-3 rounded-2xl hover:bg-pink-700"
          >
            Beauty AI
          </button>
        </div>

        {showAI && !showResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">
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

              <label className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition border-2 border-dashed border-pink-400 rounded-2xl p-6 cursor-pointer mb-5">
                <div className="text-center">
                  <p className="text-xl font-semibold text-pink-600">
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

              {capturedImage && (
                <div>
                  <img
                    src={capturedImage}
                    alt=""
                    className="rounded-2xl w-full h-80 object-contain bg-gray-100"
                  />

                  <p className="text-green-600 font-semibold mt-4">
                    Photo captured successfully ✅
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">
                2. Select Gender
              </h2>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setSelectedGender("Men");
                    setSelectedCategory("");
                  }}
                  className={`flex-1 py-4 rounded-2xl text-lg font-semibold transition ${
                    selectedGender === "Men"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  👨 Men
                </button>

                <button
                  onClick={() => {
                    setSelectedGender("Women");
                    setSelectedCategory("");
                  }}
                  className={`flex-1 py-4 rounded-2xl text-lg font-semibold transition ${
                    selectedGender === "Women"
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  👩 Women
                </button>

                <button
                  onClick={() => {
                    setSelectedGender("Unisex");
                    setSelectedCategory("");
                  }}
                  className={`flex-1 py-4 rounded-2xl text-lg font-semibold transition ${
                    selectedGender === "Unisex"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  ✨ Unisex
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {["Sunscreen", "Lipstick", "Face Wash", "Moisturizer", "Serum"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`py-4 rounded-2xl text-lg font-semibold ${
                        selectedCategory === category
                          ? "bg-pink-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={detectBeauty}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-500 text-white py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition duration-300"
              >
                Detect & Recommend ✨
              </button>
            </div>
          </div>
        )}

        {showResult && (
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={capturedImage}
                  alt=""
                  className="rounded-3xl w-full h-96 object-cover"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-pink-600 mb-6">
                  AI Beauty Result
                </h1>

                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500 text-lg">
                      Match Score
                    </p>

                    <h2 className="text-3xl font-bold text-green-600">
                      90% Excellent Match
                    </h2>
                  </div>

                  <div>
                    <p className="text-gray-500 text-lg">
                      Skin Type
                    </p>

                    <h2 className="text-2xl font-semibold">
                      {skinType}
                    </h2>
                  </div>

                  <div>
                    <p className="text-gray-500 text-lg">
                      Selected Product
                    </p>

                    <h2 className="text-2xl font-semibold">
                      {selectedCategory}
                    </h2>
                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 mt-5">
                    <h2 className="text-2xl font-bold text-pink-600 mb-3">
                      AI Suggestion
                    </h2>

                    <p className="text-gray-700 text-lg leading-8">
                      Matching beauty products are recommended based on selected
                      gender, category and skin care preference.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          {showResult ? "Recommended Products" : "Beauty Products"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {(showResult ? recommendedProducts : products).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
            >
              <div className="w-full h-64 bg-pink-50 flex items-center justify-center overflow-hidden p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain hover:scale-105 transition duration-300 cursor-pointer"
                />
              </div>

              <div className="p-4">
                <h2 className="text-pink-700 font-bold text-sm uppercase">
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

                <p className="text-gray-500 text-sm mt-2">
                  Skin Type: {item.skin_type}
                </p>

                <p className="text-pink-600 text-sm font-semibold">
                  Gender: {item.gender}
                </p>

                <p className="text-gray-500 text-sm">
                  Shade: {item.shade || "No Shade"}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ₹{item.price}
                  </span>

                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.old_price}
                  </span>
                </div>

                <button
                    onClick={() => {
    handleAddToCart(item, navigate);

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }}
                  className="w-full mt-4 bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {showMessage && (
  <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-[9999]">
    ✅ Added To Cart
  </div>
)}

        <Footer />
      </div>
    </>
  );
}

export default Beauty;