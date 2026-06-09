
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const cartKey = userEmail ? `cart_${userEmail}` : "cart";
  const handleCheckout = () => {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    localStorage.setItem("redirectAfterLogin", "/payment");
    navigate("/login");
    return;
  }

  navigate("/payment");
};

  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    setCartItems(storedCart);
  }, [cartKey]);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    
   
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (
    id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const deleteItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    saveCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = totalPrice > 499 ? 0 : 25;

const gst = Math.round(totalPrice * 0.05);

const finalTotal =
  totalPrice +
  deliveryFee +
  gst;

  return (
 <div className="space-y-5 pb-28 min-h-screen bg-gradient-to-br from-sky-200  to-purple-100 p-4">

 <div className="  p-8 text-center text-black">

  <h1 className="text-4xl font-extrabold">
    🛒 My Cart
  </h1>

  <p className="mt-3 text-green-600 text-lg">
    🚚 Delivery in 10 Minutes
  </p>
   <p className="text-sm mt-2 opacity-90">
    Fast • Fresh • Smart Shopping
  </p>

</div>
      {cartItems.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
         className="bg-white p-5 rounded-3xl shadow-md border border-gray-100 flex items-center gap-5 mb-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-contain"
          />

          <div className="flex-1">
            <h2 className="font-bold text-lg">{item.name}</h2>

            <p className="text-pink-600 font-bold">
              ₹{item.price}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-pink-100 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-bold">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item.id)}
                className="bg-pink-500 text-white px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

   {cartItems.length > 0 ? (
  <>
    <div className="bg-white p-6 rounded-3xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        Bill Details
      </h2>

      <div className="flex justify-between mb-3">
        <span>Subtotal</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="flex justify-between mb-3">
        <span>Delivery</span>
        <span>
          {deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`}
        </span>
      </div>

      <div className="flex justify-between mb-3">
        <span>GST (5%)</span>
        <span>₹{gst}</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-bold text-xl">
        <span>Total Amount</span>
        <span>₹{finalTotal}</span>
      </div>

    </div>

    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 z-50">

      <div className="flex justify-between items-center max-w-5xl mx-auto">

        <div>
          <p className="text-gray-500 text-sm">
            To Pay
          </p>

          <h2 className="font-bold text-2xl">
            ₹{finalTotal}
          </h2>
        </div>

        <button
  onClick={handleCheckout}
  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-bold"
>
  Proceed To Pay →
</button>
      </div>

    </div>
  </>
) : (
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-2xl font-bold text-gray-600">
            Your Cart is Empty 🛒
          </h2>
        </div>
      )}
    </div>
  );
}