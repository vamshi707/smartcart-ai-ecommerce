
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If you passed: navigate(..., { state: { product } })
  const product = state?.product;

  const [selectedSize, setSelectedSize] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  if (!product) {
    return <h1>No Product Found</h1>;
  }

  
  const addToCart = () => {
  console.log("Current Size:", selectedSize);

  if (!selectedSize) {
    alert("Please select size");
    return;
  }

 const isLoggedIn =
  localStorage.getItem("isLoggedIn");
  const cartItem = {
    ...product,
    size: selectedSize,
    quantity: 1,
  };

  if (!isLoggedIn) {
    localStorage.setItem(
      "pendingCartItem",
      JSON.stringify(cartItem)
    );

    navigate("/login");
    return;
  }

 const userEmail = localStorage.getItem("userEmail");

const cartKey = userEmail
  ? `cart_${userEmail}`
  : "cart";

let cart =
  JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize
  );

  if (existingItem) {
    cart = cart.map((item) =>
      item.id === product.id &&
      item.size === selectedSize
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  } else {
    cart.push(cartItem);
  }

console.log("Saving Cart:", cart);

localStorage.setItem(
  cartKey,
  JSON.stringify(cart)
);

setShowMessage(true);

setTimeout(() => {
  setShowMessage(false);
}, 2000);

  window.dispatchEvent(new Event("cartUpdated"));

  
};  
 return (
  <div className="w-full h-[70vh] overflow-hidden bg-gray-100 flex items-center justify-center">

    <div className="w-[95%] h-full">
      <div className="w-full bg-white rounded-3xl shadow-lg p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="flex items-center justify-center bg-gray-100 rounded-3xl p-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[55vh] object-contain"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="flex flex-col justify-center space-y-3 min-w-0">

          <h2 className="text-yellow-700 font-bold text-sm uppercase">
            {product.brand}
          </h2>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight break-words">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed break-words">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-3xl font-bold">
              ₹{product.price}
            </span>

            <span className="line-through text-gray-400 text-lg">
              ₹{product.old_price}
            </span>
          </div>

          {/* SIZE */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Select Size
            </h2>

            <div className="flex gap-4 flex-wrap">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => {
  console.log("Selected:", size);
  setSelectedSize(size);
}}
                  className={`px-5 py-3 rounded-xl border transition ${
                    selectedSize === size
                      ? "bg-purple-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
  onClick={addToCart}
  className="w-full mt-6 bg-black text-white py-4 rounded-2xl text-xl hover:bg-purple-700 transition"
>
  Add To Cart
</button>

        </div>
      </div>
    </div>

    {showMessage && (
      <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
        ✅ Added To Cart
      </div>
    )}
  </div>
);
}