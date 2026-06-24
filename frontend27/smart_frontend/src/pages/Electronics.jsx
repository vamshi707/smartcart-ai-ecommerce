import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../utils/cartUtils";
function Electronics() {

  const [products, setProducts] = useState([]);

  const [showAI, setShowAI] = useState(false);

  const [openCamera, setOpenCamera] = useState(false);

  const [facingMode, setFacingMode] = useState("environment");

  const webcamRef = useRef(null);

  const [outputImage, setOutputImage] = useState("");

  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();

  const [showResult, setShowResult] = useState(false);

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // AI RESULT STATES

  const [detectedProduct, setDetectedProduct] = useState("");

  const [lengthMM, setLengthMM] = useState("");

  const [diameterMM, setDiameterMM] = useState("");

  const [confidence, setConfidence] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  // FETCH PRODUCTS

  useEffect(() => {

    fetch("http://127.0.0.1:8000/hardware/")

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

  // UPLOAD IMAGE

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

  // DETECT HARDWARE

 

const detectHardware = async () => {

  if (!capturedImage) {

    alert("Capture or upload hardware image");

    return;

  }

  try {

    const response = await fetch(

      "http://127.0.0.1:8000/detect-hardware/",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          image: capturedImage,
          category: selectedCategory,

        }),

      }

    );

    const data = await response.json();

    console.log(data);

    // DETECTED PRODUCT

    setDetectedProduct(

      data.category || "Unknown"

    );

    // CONFIDENCE

    setConfidence(

      data.confidence || 0

    );

    // MATCHED PRODUCTS

    setRecommendedProducts(

      data.products || []

    );

    // GET ORIGINAL DATABASE VALUES

 setLengthMM(
  data.length_mm || ""
);

setDiameterMM(
  data.diameter_mm || ""
);

setOutputImage(
  data.output_image || ""
);

    setShowResult(true);

  }

  catch (error) {

    console.log(error);

    alert("AI Detection Failed");

  }

};

  return (

    <>

      <div className="min-h-screen bg-gray-100 p-6">

        {/* TOP HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">

              AI Hardware Detection

            </h1>

            <p className="text-gray-500 mt-2">

              Detect screws, motors, pipes and hardware products using AI.

            </p>

          </div>

          <button
            onClick={() => {

              setShowAI(!showAI);

              setShowResult(false);

              setCapturedImage(null);

              setRecommendedProducts([]);

            }}
            className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800"
          >

            Hardware AI

          </button>

        </div>
        {!showAI && (
  <div className="bg-gradient-to-r from-black via-cyan-600 to-sky-900 rounded-3xl p-4  flex justify-between items-center overflow-hidden shadow-xl">

    <div className="text-white">
      <h2 className="text-4xl font-bold">
        Hardware AI Assistant
      </h2>

      <p className="mt-3 text-lg max-w-lg">
        Upload a hardware image and get AI-powered hardware product recommendations.
      </p>

      <button
        onClick={() => setShowAI(true)}
        className="mt-5 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold"
      >
        🔧 Detect Hardware AI →
      </button>
    </div>

    <img
  src="/reb.png"
  alt="AI Assistant"
  className="w-64"
/>

  </div>
)}

        {/* AI SECTION */}

        {showAI && !showResult && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            {/* LEFT CARD */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <h2 className="text-3xl font-bold text-black mb-6">

                1. Upload Hardware Image

              </h2>

              {!capturedImage && (

                <button
                  onClick={() => setOpenCamera(!openCamera)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl mb-5 hover:bg-blue-700"
                >

                  Open Camera

                </button>

              )}
              

               {/* CATEGORY SELECT */}

<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="w-full border-2 border-black rounded-2xl p-4 mb-5"
>

  <option value="">
    Select Hardware Type
  </option>

  <option value="Screw">
    Screw
  </option>

  <option value="Bolt">
    Bolt
  </option>

  <option value="Pipe">
    Pipe
  </option>


</select>


{/* UPLOAD */}

<label className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition border-2 border-dashed border-black rounded-2xl p-6 cursor-pointer mb-5">

  <div className="text-center">

    <p className="text-xl font-semibold text-black">

      Upload Hardware Image

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

              {/* CAMERA */}

              {openCamera && (

                <div>

                  <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        facingMode: facingMode,
                      }}
                      className="rounded-2xl w-full h-70 object-contain bg-gray-100"
                    />
                    <button
                          onClick={() =>
                            setFacingMode(
                              facingMode === "user"
                                ? "environment"
                                : "user"
                            )
                          }
                          className="w-full bg-green-900 text-white py-3 rounded-2xl mt-3"
                        >
                          🔄 Rotate Camera
                        </button>

                  <button
                    onClick={capturePhoto}
                    className="w-full bg-black text-white py-4 rounded-2xl mt-4"
                  >

                    Capture Photo

                  </button>

                </div>

              )}

              {/* CAPTURED IMAGE */}

              {capturedImage && (

                <div>

                  <img
                    src={capturedImage}
                    alt=""
                    className="rounded-3xl w-full h-[350px] object-contain bg-white p-4"
                  />

                  <p className="text-green-600 font-semibold mt-4">

                    Hardware image uploaded successfully ✅

                  </p>

                </div>

              )}

            </div>

            {/* RIGHT CARD */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

              <h2 className="text-3xl font-bold text-black mb-6">

                2. AI Hardware Detection

              </h2>

              <div className="bg-gray-100 rounded-2xl p-6 mb-8">

                <h3 className="text-2xl font-bold mb-3">

                  SmartCart AI Features

                </h3>

                <div className="space-y-3 text-gray-700">

                  <p>✅ Hardware Detection</p>

                  <p>✅ Screw Size Detection</p>

                  <p>✅ Diameter Measurement</p>

                  <p>✅ Product Matching</p>

                  <p>✅ Future AR Measuring</p>

                </div>

              </div>

              {/* DETECT BUTTON */}

              <button
              
                onClick={detectHardware}
                className="w-full bg-gradient-to-r from-black to-gray-700 text-white py-4 rounded-2xl text-xl font-semibold hover:scale-105 transition duration-300"
              >

                Detect Hardware AI

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
 {/* IMAGE */}

<div>

    <img
      src={capturedImage}
      alt=""
      className="rounded-3xl w-full h-[300px] object-contain bg-white p-4"
    />

        </div>
              </div>

              {/* AI RESULT */}

              <div>

                <h1 className="text-4xl font-bold text-black">

                  AI Detection Result

                </h1>

                <div className="space-y-5">

                  <div>

                    <p className="text-gray-500 text-lg">

                      Match Score

                    </p>

                    <h2 className="text-3xl font-bold text-green-600">

                      {confidence}% Excellent Match

                    </h2>

                  </div>

                  <div>

                    <p className="text-gray-500 text-lg">

                      Detected Product

                    </p>

                    <h2 className="text-2xl font-semibold">

                      {detectedProduct}

                    </h2>

                  </div>

                  <div>

                    <p className="text-gray-500 text-lg">

                      Length

                    </p>

                    <h2 className="text-2xl font-semibold">

                      {lengthMM} MM

                    </h2>
                    <div className="mt-5">

  <h2 className="text-xl font-bold mb-3">

    Similar Sizes

  </h2>

   <div className="flex gap-5 overflow-x-auto mt-5 pb-3">

  {recommendedProducts.map((item) => (

    <div
      key={item.id}
      className="min-w-[180px] bg-white rounded-2xl shadow-lg p-4 border"
    >

      {/* IMAGE */}

      <img
        src={item.image}
        alt=""
        className="w-full h-15 object-contain"
      />

      {/* SIZE */}

      {item.category === "Pipe" ? (

  <>
    <h2 className="text-xl font-bold text-center mt-3">
      {item.specifications?.diameter} MM
    </h2>

    <p className="text-gray-500 text-center mt-1">
      Length: {item.specifications?.length} MM
    </p>
  </>

) : (

  <>
    <h2 className="text-xl font-bold text-center mt-3">
      {item.specifications?.length_mm} MM
    </h2>

    <p className="text-gray-500 text-center mt-1">
      Diameter: {item.specifications?.diameter_mm} MM
    </p>
  </>

)}

      {/* PRICE */}

      <p className="text-2xl font-bold text-center mt-3">

        ₹{item.price}

      </p>

      {/* BUTTON */}
<button
  onClick={() => {
    handleAddToCart(item, navigate);

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }}
  className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl"
>
  Add To Cart
</button>
    </div>

  ))}

</div>

 

</div>

                  </div>

                  <div>

                    <p className="text-gray-500 text-lg">

                      Diameter

                    </p>

                    <h2 className="text-2xl font-semibold">

                      {diameterMM} MM

                    </h2>

                  </div>

                  <div className="bg-gray-100 rounded-2xl p-5 mt-5">

                    <h2 className="text-2xl font-bold text-black mb-3">

                      AI Suggestion

                    </h2>

                    <p className="text-gray-700 text-lg leading-8">

                      Matching hardware products are recommended
                      based on AI object detection and size analysis.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* PRODUCT TITLE */}

        <h1 className="text-3xl font-bold text-black mb-6">

          Recommended Hardware Products

        </h1>

        {/* PRODUCTS */}

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">

          {products.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
            >

              {/* IMAGE */}

              <div className="w-full h-30 bg-gray-100 flex items-center justify-center overflow-hidden ">

                <img
                  src={item.image}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain hover:scale-105 transition duration-300"
                />

              </div>

              {/* CONTENT */}

              <div className="p-2">

                <h2 className="text-yellow-700 font-bold text-sm uppercase">

                  {item.brand}

                </h2>

                <h1 className="text-lg font-semibold mt-1 line-clamp-1">

                  {item.name}

                </h1>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">

                  {item.description}

                </p>

                {/* SPECS */}

                {item.category === "Screw" && (

                  <div className="mt-3 text-sm text-gray-600 space-y-1">

                    <p>

                      Length:
                      {" "}
                      {item.specifications?.length_mm} MM

                    </p>

                    <p>

                      Diameter:
                      {" "}
                      {item.specifications?.diameter_mm} MM

                    </p>

                    <p>

                      Head:
                      {" "}
                      {item.specifications?.head_type}

                    </p>

                  </div>

                )}

                {/* PRICE */}

                <div className="mt-4 flex items-center gap-2">

                  <span className="text-2xl font-bold">

                    ₹{item.price}

                  </span>

                </div>

                {/* BUTTON */}

    <button
  onClick={() => {
    handleAddToCart(item, navigate);

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }}
  className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl"
>
  Add To Cart
</button>

              </div>

            </div>

          ))}

        </div>

      </div>
      {showMessage && (
  <div className="fixed top-20 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-[99999]">
    Added To Cart 🛒
  </div>
)}

      <Footer />

    </>

  )

}

export default Electronics;