import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Footer from "../components/Footer";
 

import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../utils/cartUtils";
function Furniture() {

  const [products, setProducts] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [generatedRoom, setGeneratedRoom] = useState("");
  
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [capturedImage, setCapturedImage] = useState(null);

  const [showResult, setShowResult] = useState(false);

   const [selectedRoom, setSelectedRoom] = useState("");

  

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  



useEffect(() => {

   fetch("http://127.0.0.1:8000/furniture/")
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

  const detectFurniture = async () => {

              if (!capturedImage || !selectedRoom) {

            alert("Upload room image and select room");

            return;

          }

    const response = await fetch(
      "http://127.0.0.1:8000/detect-furniture/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

          body: JSON.stringify({

          image: capturedImage,

          room: selectedRoom,

}),
      }
    );
    if (!response.ok) {

  const text = await response.text();

  console.log(text);

  alert("Server Error");

  return;
}

    const data = await response.json();

    console.log(data);

     

     setRecommendedProducts(data.products);

      setGeneratedRoom(
        "http://127.0.0.1:8000/" +
        data.generated_image
      );

      setShowResult(true);

  };

  return (
     <>

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOP HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">

             AI Furniture Recommendation

          </h1>

          <p className="text-gray-500 mt-2">

            Get AI powered furniture suggestions based on your room.

          </p>

        </div>

        <button
          onClick={() => {

              setShowAI(!showAI);

              setShowResult(false);

              setCapturedImage(null);

               setSelectedRoom("");

              setRecommendedProducts([]);

              

            }}
          className="bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-yellow-700"
        >

          Furniture AI

        </button>

      </div>

      {/* AI SECTION */}

      {showAI && !showResult && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* LEFT CARD */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-purple-600 mb-6">

              1. Upload Room Image

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

   2. Select Room

</h2>

 

{/* DRESS BUTTONS */}
 <button
  onClick={() => setSelectedRoom("Bedroom")}
  className={`w-full py-4 rounded-2xl mb-3 ${
    selectedRoom === "Bedroom"
      ? "bg-purple-600 text-white"
      : "bg-gray-100"
  }`}
>
  🛏 Bedroom
</button>

 <button
  onClick={() => setSelectedRoom("Living Room")}
  className={`w-full py-4 rounded-2xl mb-3 ${
    selectedRoom === "Living Room"
      ? "bg-purple-600 text-white"
      : "bg-gray-100"
  }`}
>
  🛏 Living room
</button>

<button
onClick={() => setSelectedRoom("Office")}
  className={`w-full py-4 rounded-2xl mb-3 ${
    selectedRoom === "Office"
      ? "bg-purple-600 text-white"
      : "bg-gray-100"
  }`}
>
 
💻 Office
</button>

<button
onClick={() => setSelectedRoom("Kitchen")}

  className={`w-full py-4 rounded-2xl mb-3 ${
    selectedRoom === "Kitchen"
      ? "bg-purple-600 text-white"
      : "bg-gray-100"
  }`}
>
 
🍳 Kitchen
</button>

            {/* DETECT BUTTON */}

            <button
              onClick={detectFurniture}
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

    <div>

      <h2 className="text-2xl font-bold mb-3">
        Original Room
      </h2>

      <img
        src={capturedImage}
        className="rounded-3xl w-full h-96 object-cover"
      />

    </div>

    <div>

      <h2 className="text-2xl font-bold mb-3">
        AI Designed Room
      </h2>

      <img
        src={generatedRoom}
        className="rounded-3xl w-full h-96 object-cover"
      />

    </div>

  </div>

  <div className="mt-8">

    <h1 className="text-4xl font-bold text-purple-600 mb-4">

      AI Analysis Result

    </h1>

    <h2 className="text-2xl font-semibold mb-3">

      Room Type: {selectedRoom}

    </h2>

    <div className="bg-gray-100 rounded-2xl p-5">

      <p className="text-lg">

        Matching furniture products are recommended
        based on your selected room.

      </p>

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
           
          className="max-w-full max-h-full object-contain hover:scale-105 transition duration-300 cursor-pointer"
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

           

          <span className="text-gray-500 text-xs">
            Stock: {item.stock}
          </span>

        </div>

        <div className="mt-4 flex items-center gap-2">

          <span className="text-2xl font-bold">
            ₹{item.price}
          </span>

          
 

        </div>
  <button
  onClick={() =>
    handleAddToCart(
      item,
      navigate
    )
  }
  className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl"
>
  Add To Cart
</button>

      </div>

    </div>

  ))}

</div>

<Footer />

</div>

</>

  );
}

export default Furniture;