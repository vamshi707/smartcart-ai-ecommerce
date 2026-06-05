import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {

const [orders, setOrders] = useState([]);
const navigate = useNavigate();
const [showCancelModal, setShowCancelModal] =
  useState(false);

const [selectedItemId, setSelectedItemId] =
  useState(null);

useEffect(() => {

  console.log("TEST");

  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    navigate("/login");
    return;
  }

  fetch(`http://127.0.0.1:8000/api/my-orders/?email=${userEmail}`)
    .then((res) => res.json())
    .then((data) => {

      // console.log("ORDERS DATA =", data);
      console.log(JSON.stringify(data, null, 2));

      setOrders(data);

    })
    .catch((err) => console.log(err));

}, [navigate]);

const cancelProduct = async (
  itemId,
  reason
) => {

  try {

    await fetch(
      `http://127.0.0.1:8000/api/cancel-product/${itemId}/`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          reason,
        }),
      }
    );

    window.location.reload();

  } catch (err) {
    console.log(err);
  }
};

return (
  <> 


<div className="min-h-screen bg-gray-100 p-5">

  <h1 className="text-3xl font-bold mb-6">
    My Orders
  </h1>

  {orders.length === 0 ? (

    <p>No orders found</p>

  ) : (

    orders.map((order) => (

      <div
        key={order.id}
        className="bg-white rounded-2xl shadow p-5 mb-5"
      >

        <h2 className="font-bold text-xl mb-4">
          Order ID: {order.id}
        </h2>

        {order.items?.map((item, index) => (

          

          <div
            key={index}
            className="flex gap-4 py-3 border-b"
          >

            <img
              src={item.product_image || item.image}
              alt={item.product_name || item.name}
              className="w-20 h-20 object-contain"
            />

            <div>

              <h3 className="font-semibold">
                {item.product_name || item.name}
              </h3>

              <p>
                Qty: {item.quantity}
              </p>

              <p className="font-bold">
                ₹{item.price}
              </p>

              {!item.cancelled ? (

<button
  onClick={() => {
    setSelectedItemId(item.id);
    setShowCancelModal(true);
  }}
  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
>
  ❌ Cancel Product
</button>

) : (

<div className="mt-2">
  <p className="text-red-600 font-bold">
    ❌ Cancelled
  </p>

  <p className="text-sm text-gray-500">
    Reason: {item.cancel_reason}
  </p>
</div>

)}

            </div>

          </div>

        ))}

        <div className="mt-4 border-t pt-4">

          <div className="flex justify-between items-center mb-3">

            <p className="font-bold text-xl">
              Total: ₹{order.total_amount || 0}
            </p>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {order.status || "Pending"}
            </span>

          </div>

        

        </div>

      </div>

    ))

  )}

</div>

{showCancelModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md">

      <h2 className="text-xl font-bold mb-4">
        Why are you cancelling?
      </h2>

      <button
        onClick={() => cancelProduct(selectedItemId, "Wrong Address")}
       className="w-full text-center border border-gray-200 p-4 rounded-2xl mb-3 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition duration-300 cursor-pointer font-medium"
      >
        Wrong Address
      </button>

      <button
        onClick={() => cancelProduct(selectedItemId, "Ordered By Mistake")}
         className="w-full text-center border border-gray-200 p-4 rounded-2xl mb-3 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition duration-300 cursor-pointer font-medium"
      >
        Ordered By Mistake
      </button>

      <button
        onClick={() => cancelProduct(selectedItemId, "Found Better Price")}
        className="w-full text-center border border-gray-200 p-4 rounded-2xl mb-3 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition duration-300 cursor-pointer font-medium"
      >
        Found Better Price
      </button>

      <button
        onClick={() => cancelProduct(selectedItemId, "Don't Need Product")}
         className="w-full text-center border border-gray-200 p-4 rounded-2xl mb-3 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition duration-300 cursor-pointer font-medium"
      >
        Don't Need Product
      </button>

      <button
        onClick={() => setShowCancelModal(false)}
        className="w-full bg-gray-800 text-white py-3 rounded-2xl mt-4 hover:bg-black transition duration-300 cursor-pointer"
      >
        close
      </button>

    </div>

  </div>
)}



</>
);
}

export default MyOrders;
