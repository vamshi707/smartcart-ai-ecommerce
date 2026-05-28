import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/my-orders/?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
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
            <h2 className="font-bold mb-4">
              Order ID: {order.id}
            </h2>

            {order.items.map((item, index) => (
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

                  <p>Qty: {item.quantity}</p>

                  <p className="font-bold">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;