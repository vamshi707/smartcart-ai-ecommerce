import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PackageCheck } from "lucide-react";

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
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-white p-3 rounded-full shadow"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <PackageCheck
            size={70}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No orders found
          </h2>

          <p className="text-gray-500 mt-2">
            Your placed orders will appear here.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderTotal = order.items.reduce(
              (total, item) =>
                total + Number(item.price) * Number(item.quantity),
              0
            );

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow p-5"
              >
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <div>
                    <h2 className="font-bold text-lg">
                      Order ID: #{order.id}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span className="text-green-600 font-semibold">
                        Order Confirmed
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-xl font-bold text-purple-700">
                      ₹{order.total_amount || orderTotal}
                    </p>
                  </div>
                </div>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 py-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.product_image || item.image}
                      alt={item.product_name || item.name}
                      className="w-24 h-24 object-contain rounded-xl bg-gray-100"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {item.product_name || item.name}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="font-bold text-pink-600 mt-1">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-4">
                  <p className="text-green-600 font-semibold">
                    ✅ Delivered Soon
                  </p>

                  <button
                    onClick={() => navigate("/")}
                    className="bg-purple-600 text-white px-5 py-2 rounded-xl"
                  >
                    Shop Again
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;