import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {

const [orders, setOrders] = useState([]);
const navigate = useNavigate();

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

return (


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

          <div className="flex gap-3">


            <button
  onClick={() => cancelOrder(order.id)}
  className="flex-1 bg-red-600 text-white py-3 rounded-xl"
>
  ❌ Cancel Order
</button>

          </div>

        </div>

      </div>

    ))

  )}

</div>


);
}

export default MyOrders;
