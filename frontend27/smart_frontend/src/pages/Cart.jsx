
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);

  }, []);

  const increaseQty = (id) => {

    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);

  };

  const decreaseQty = (id) => {

    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);
  };
  const deleteItem = (id) => {

  const updatedCart = cartItems.filter(
    (item) => item.id !== id
  );

  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );

};

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (

    <div className="space-y-5">
  {cartItems.map((item, index) => (
    <div
      key={`${item.id}-${index}`}
      className="bg-white p-4 rounded-2xl shadow flex items-center gap-5"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">
        <h2 className="font-bold text-lg">{item.name}</h2>

        <p className="text-pink-600 font-bold">₹{item.price}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => decreaseQty(item.id)}
            className="bg-pink-100 px-3 py-1 rounded"
          >
            -
          </button>

          <span className="font-bold">{item.quantity}</span>

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
  <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
    <h2 className="text-2xl font-bold">Total: ₹{totalPrice}</h2>

    <button
      onClick={() => navigate("/payment")}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
    >
      Order Now
    </button>
  </div>
) : (
  <div className="bg-white p-8 rounded-2xl shadow text-center">
    <h2 className="text-2xl font-bold text-gray-600">
      Your Cart is Empty 🛒
    </h2>
  </div>
)}
  </div>

  );}