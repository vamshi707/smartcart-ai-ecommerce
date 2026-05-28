import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
);

  const getPrice = (price) => {
    return Number(String(price).replace(/[₹,]/g, ""));
  };

  const itemTotal = cartItems.reduce((total, item) => {
    return total + getPrice(item.price) * item.quantity;
  }, 0);

  const oldTotal = cartItems.reduce((total, item) => {
    const oldPrice = item.old_price
      ? getPrice(item.old_price)
      : getPrice(item.price);

    return total + oldPrice * item.quantity;
  }, 0);

  const discount = oldTotal - itemTotal;
  const deliveryFee = itemTotal > 499 ? 0 : 25;
  const toPay = itemTotal + deliveryFee;

const handlePlaceOrder = () => {
  if (
  !fullName.trim() ||
  !phone.trim() ||
  !address.trim()
) {
    setFormError("Please fill all address details");
    return;
  }

  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  fetch("http://127.0.0.1:8000/api/place-order/", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: userEmail,
      fullName,
      phone,
      address,
      paymentMethod,
      totalAmount: toPay,
      items: cartItems,
    }),
  })
    .then((res) => res.json())

.then((data) => {
  console.log(data);

  localStorage.removeItem("cart");

  setCartItems([]);

  window.dispatchEvent(
    new Event("cartUpdated")
  );

  alert("Order placed successfully");

  window.location.href = "/my-orders";
})

    .catch((err) => console.log(err));
};

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="lg:col-span-2 space-y-4">

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Delivery in 10 minutes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">
              Your Items
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size || "no-size"}-${index}`}
                    className="flex items-center gap-4 border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-xl bg-gray-100"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-xs">
                        Qty: {item.quantity}
                      </p>

                      {item.size && (
                        <p className="text-gray-500 text-xs">
                          Size: {item.size}
                        </p>
                      )}
                    </div>

                    <p className="font-bold">
                      ₹{getPrice(item.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">
              Delivery Address
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-400"
            />

            <textarea
              placeholder="House no, street, area"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400"
            />

            {formError && (
              <p className="text-red-500 text-sm mt-3">
                {formError}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">
              Payment Options
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: "upi",
                  title: "UPI",
                  desc: "Pay using PhonePe, GPay, Paytm",
                },
                {
                  id: "card",
                  title: "Cards",
                  desc: "Credit & Debit cards",
                },
                {
                  id: "cod",
                  title: "Cash on Delivery",
                  desc: "Pay when order arrives",
                },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition ${
                    paymentMethod === method.id
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200"
                  }`}
                >
                  <div>
                    <h3 className="font-bold">
                      {method.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {method.desc}
                    </p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentMethod === method.id
                        ? "border-purple-600"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === method.id && (
                      <div className="w-3 h-3 bg-purple-600 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-4">
            Bill Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{oldTotal}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>To Pay</span>
              <span>₹{toPay}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className={`w-full mt-6 py-4 rounded-2xl font-bold transition ${
              cartItems.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
          >
            Place Order
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Safe and secure payments
          </p>
        </div>

      </div>
    </div>
  );
}

export default Payment;