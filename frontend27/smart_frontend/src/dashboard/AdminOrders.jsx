import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
 

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [selectedOrderId, setSelectedOrderId] =
  useState(null);

  const [activeTab, setActiveTab] =
  useState("orders");

  const totalRevenue = orders.reduce(
  (sum, order) =>
    sum + Number(order.total_amount || 0),
  0
);

  useEffect(() => {

    fetch(
      "http://127.0.0.1:8000/api/admin-orders/"
    )
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        setOrders(data);

      });

  }, []);

  const deleteOrder = async (id) => {

  await fetch(
    `http://127.0.0.1:8000/api/delete-order/${id}/`,
    {
      method: "POST",
    }
  );

  setOrders(
    orders.filter(
      (order) => order.id !== id
    )
  );

  setShowDeleteModal(false);

};

 
const categoryRevenue = {};
const categoryOrders = [];
const cancelledProducts = [];
const categoryCancelled = {};

const graphRevenue = {
  Grocery: 0,
  Fashion: 0,
  Furniture: 0,
  Beauty: 0,
  Hardware: 0,
};

orders.forEach((order) => {

  order.items?.forEach((item) => {

   let category = "Other";

if (
  ["Bolt", "Pipe", "Screw"].includes(item.category)
) {
  category = "Hardware";
}
else if (
  ["Sunscreen", "Face Wash"].includes(item.category)
) {
  category = "Beauty";
}
else if (
  ["Kitchen", "Rice", "Oil"].includes(item.category)
) {
  category = "Grocery";
}
else if (
  item.category === "Fashion"
) {
  category = "Fashion";
}
else {
  category = "Furniture";
}

    const amount =
      Number(item.price) *
      Number(item.quantity);

    graphRevenue[category] =
  (graphRevenue[category] || 0) +
  amount;

    categoryRevenue[category] =
      (categoryRevenue[category] || 0)
      + amount;

    categoryOrders.push(category);

   if (item.cancelled) {

  cancelledProducts.push({
    name: item.product_name,
    reason: item.cancel_reason
  });

  categoryCancelled[category] =
    (categoryCancelled[category] || 0) + 1;

}

  });

});

const today = new Date();

let todayRevenue = 0;
let yesterdayRevenue = 0;
let weekRevenue = 0;
let monthRevenue = 0;

orders.forEach((order) => {

  const orderDate =
    new Date(order.created_at);

  const diffDays =
    Math.floor(
      (today - orderDate) /
      (1000 * 60 * 60 * 24)
    );

  const amount =
    Number(order.total_amount || 0);

  if (diffDays === 0) {
    todayRevenue += amount;
  }

  if (diffDays === 1) {
    yesterdayRevenue += amount;
  }

  if (diffDays <= 7) {
    weekRevenue += amount;
  }

  if (
    orderDate.getMonth() ===
      today.getMonth() &&
    orderDate.getFullYear() ===
      today.getFullYear()
  ) {
    monthRevenue += amount;
  }

});

const categoryTopProducts = {};

orders.forEach((order) => {

  const orderDate =
    new Date(order.created_at);

  const diffDays =
    Math.floor(
      (today - orderDate) /
      (1000 * 60 * 60 * 24)
    );

  if (diffDays <= 7) {

    order.items?.forEach((item) => {

      const category =
        item.category || "Other";

      if (!categoryTopProducts[category]) {
        categoryTopProducts[category] = {};
      }

      categoryTopProducts[category][item.product_name] =
        (categoryTopProducts[category][item.product_name] || 0)
        + Number(item.quantity);

    });

  }

});

const getMainCategory = (category) => {

  if (
    ["Bolt", "Pipe", "Screw"].includes(category)
  ) {
    return "Hardware";
  }

  if (
    ["Sunscreen", "Face Wash"].includes(category)
  ) {
    return "Beauty";
  }

  if (
    ["Kitchen", "Rice", "Oil"].includes(category)
  ) {
    return "Grocery";
  }

  if (category === "Fashion") {
    return "Fashion";
  }

  return "Furniture";

};

 

const categorySales = {};
const categoryRevenueMap = {};
const categoryCancelMap = {};
 

orders.forEach((order) => {

  order.items?.forEach((item) => {

    const category =
      getMainCategory(item.category);

    const amount =
      Number(item.price) *
      Number(item.quantity);

    categorySales[category] =
      (categorySales[category] || 0)
      + Number(item.quantity);

    categoryRevenueMap[category] =
      (categoryRevenueMap[category] || 0)
      + amount;

    if (item.cancelled) {

      categoryCancelMap[category] =
        (categoryCancelMap[category] || 0)
        + 1;

    }

  });

});
 

const revenueChart = {
  series: [
    {
      name: "Revenue",
      data: [
        graphRevenue.Grocery,
        graphRevenue.Fashion,
        graphRevenue.Furniture,
        graphRevenue.Beauty,
        graphRevenue.Hardware
      ]
    }
  ],

  options: {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: {
        show: false
      }
    },

    colors: [
      "#22C55E",
      "#3B82F6",
      "#A855F7",
      "#F43F5E",
      "#F59E0B"
    ],

    theme: {
      mode: "dark"
    },

    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 8
      }
    },

    xaxis: {
      categories: [
        "Grocery",
        "Fashion",
        "Furniture",
        "Beauty",
        "Hardware"
      ]
    }
  }
};
const pieChart = {
  series: [
    graphRevenue.Grocery,
    graphRevenue.Fashion,
    graphRevenue.Furniture,
    graphRevenue.Beauty,
    graphRevenue.Hardware,
  ],

  

  options: {
    labels: [
      "Grocery",
      "Fashion",
      "Furniture",
      "Beauty",
      "Hardware"
    ],

    chart: {
      background: "transparent"
    },

    legend: {
      position: "right"
    },

    plotOptions: {
      pie: {
        donut: {
          size: "60%"
        }
      }
    },

    dataLabels: {
      enabled: true
    },

    theme: {
      mode: "dark"
    }
  }
};

const weeklyRevenue = [0,0,0,0,0,0,0];

orders.forEach((order) => {

  const orderDate =
    new Date(order.created_at);

  const amount =
    Number(order.total_amount || 0);

  const day =
    orderDate.getDay();

  weeklyRevenue[day] += amount;

});

const weeklyChart = {

  series: [{
    name: "Revenue",
    data: weeklyRevenue
  }],

  options: {

    chart: {
      type: "area"
    },

    theme: {
      mode: "dark"
    },

    xaxis: {
      categories: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ]
    }

  }

};

const monthlyRevenue = [
  0,0,0,0,0,0,
  0,0,0,0,0,0
];

orders.forEach((order) => {

  const orderDate =
    new Date(order.created_at);

  const amount =
    Number(order.total_amount || 0);

  const month =
    orderDate.getMonth();

  monthlyRevenue[month] += amount;

});

console.log("Monthly Revenue =", monthlyRevenue);

const monthlyChart = {
  series: [{
    name: "Revenue",
    data: monthlyRevenue
  }],

  options: {
    chart: {
      type: "line",
      toolbar: {
        show: false
      }
    },

    stroke: {
      curve: "straight",
      width: 10
    },

    markers: {
      size: 6
    },

    dataLabels: {
      enabled: false
    },

    fill: {
      opacity: 0
    },
    grid: {
  borderColor: "#5f6d85"
},
  theme: {
      mode: "dark"
    },

    colors: ["#22C55E"],

    xaxis: {
      categories: [
        "Jan","Feb","Mar","Apr",
        "May","Jun","Jul","Aug",
        "Sep","Oct","Nov","Dec"
      ]
    }
  }
};


const [weekFilter, setWeekFilter] =
useState("thisWeek");

const [monthFilter, setMonthFilter] =
useState("thisMonth");

const [yearFilter, setYearFilter] =
useState("thisYear");

const topCategory =
  Object.entries(categoryRevenueMap)
    .sort((a,b)=>b[1]-a[1])[0]?.[0];

const productSales = {};

orders.forEach((order) => {

  order.items?.forEach((item) => {

    const category =
      getMainCategory(item.category);

    if(category === topCategory){

      productSales[item.product_name] = {

        qty:
          (productSales[item.product_name]?.qty || 0)
          + item.quantity,

        image:
          item.product_image

      };

    }

  });

});



const bestProduct =
  Object.entries(productSales)
    .sort((a,b)=>b[1].qty-a[1].qty)[0];



 
  return (
    <> 

   <div className="min-h-screen bg-gray-300  md:p-6">

      
<div className="fixed top-0 left-0 w-full z-50
 backdrop-blur-lg
border-b border-black
shadow-lg
flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6 text-center">
  📦 Orders Dashboard
</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">

  <button
    onClick={() => setActiveTab("orders")}
    className="w-ful md:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl"
  >
    📦 All Orders
  </button>

  <button
    onClick={() => setActiveTab("revenue")}
    className="bg-green-600 text-white px-6 py-3 rounded-2xl"
  >
    💰 Revenue
  </button>

  <button
    onClick={() => setActiveTab("analytics")}
    className="bg-purple-600 text-white px-6 py-3 rounded-2xl"
  >
    📊 Analytics
  </button>

  <button
    onClick={() => setActiveTab("cancel")}
    className="bg-red-600 text-white px-6 py-3 rounded-2xl"
  >
    ❌ Cancel Reasons
  </button>

</div>
</div>
<br /><br /><br /><br /><br /><br /><br /><br />

      {activeTab === "orders" &&

orders.map((order) => (

        <div
          key={order.id}
          className="bg-white rounded-2xl shadow p-5 mb-5"
        >

        <h2 className="text-2xl font-bold text-center">
  Order #{order.id}
</h2>

<div className="mt-4 space-y-2">

  <p>
    👤 <span className="font-bold">Name:</span>
    {" "}
    {order.full_name}
  </p>

  <p>
    📧 <span className="font-bold">Email:</span>
    {" "}
    {order.email}
  </p>

  <p>
    📱 <span className="font-bold">Phone:</span>
    {" "}
    {order.phone}
  </p>

  <p>
    🏠 <span className="font-bold">Address:</span>
    {" "}
    {order.address}
  </p>

  <p>
    💳 <span className="font-bold">Payment:</span>
    {" "}
    {order.payment_method}
  </p>

  <p>
    💰 <span className="font-bold">Total:</span>
    {" "}
    ₹{order.total_amount}
  </p>

</div>

          <p>
            Total:
            {" "}
            ₹{order.total_amount}
          </p>

          <p>
            Payment:
            {" "}
            {order.payment_method}
          </p>
 
{showDeleteModal && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-2xl">

      <h2 className="text-2xl font-bold text-center mb-4">
        Delete Order?
      </h2>

      <p className="text-center text-gray-600 mb-6">
        This order will be permanently removed.
      </p>

      <div className="flex gap-3">

        <button
          onClick={() =>
            setShowDeleteModal(false)
          }
          className="flex-1 bg-gray-300 py-3 rounded-xl cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={() =>
            deleteOrder(selectedOrderId)
          }
          className="flex-1 bg-red-600 text-white py-3 rounded-xl cursor-pointer"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}
          

          <div className="mt-4">

            {order.items?.map((item) => (

              <div
                key={item.id}
               className="flex flex-col md:flex-row gap-4 border-b py-3">
              

                <img
                  src={item.product_image}
                  alt=""
                 className="w-full md:w-20 h-40 md:h-20 object-contain"
                />

                <div>

                  <h3 className="font-bold">
                    {item.product_name}
                  </h3>

                  <p>
                    Qty:
                    {" "}
                    {item.quantity}
                  </p>

                  <p>
                    ₹{item.price}
                  </p>

                  {item.cancelled && (

                    <div className="text-red-600">

                      ❌ Cancelled

                      <br />

                      Reason:
                      {" "}
                      {item.cancel_reason}

                    </div>
                    

                  )}

                            <div className="flex gap-3 mt-4">

 <button
  onClick={() => {
    setSelectedOrderId(order.id);
    setShowDeleteModal(true);
  }}
  className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 cursor-pointer"
>
  🗑 Delete Order
</button>

</div>
                  
                  
                

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}
           

{activeTab === "revenue" && (

<div>

  {/* Top Cards */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

    <div className="bg-green-600 text-white p-6 rounded-3xl">

      <h3>Total Revenue</h3>

      <p className="text-4xl font-bold mt-2">
        ₹{totalRevenue}
      </p>

    </div>

    <div className="bg-blue-600 text-white p-6 rounded-3xl">

      <h3>Total Orders</h3>

      <p className="text-4xl font-bold mt-2">
        {orders.length}
      </p>

    </div>

    <div className="bg-purple-600 text-white p-6 rounded-3xl">

      <h3>Products Sold</h3>

      <p className="text-4xl font-bold mt-2">
        {
          orders.reduce(
            (sum, order) =>
              sum +
              (order.items?.reduce(
                (s, item) =>
                  s + item.quantity,
                0
              ) || 0),
            0
          )
        }
      </p>

    </div>

    <div className="bg-red-600 text-white p-6 rounded-3xl">

      <h3>Cancelled</h3>

      <p className="text-4xl font-bold mt-2">
        {
          orders.reduce(
            (sum, order) =>
              sum +
              (order.items?.filter(
                item => item.cancelled
              ).length || 0),
            0
          )
        }
      </p>

    </div>

  </div>

  {/* Category Revenue */}

  <div className="bg-white rounded-3xl shadow-xl p-8">

    

 <div className="bg-white rounded-3xl shadow-xl p-6 overflow-x-auto">

  <h2 className="text-3xl font-bold text-center mb-6">
    📊 Revenue Analytics
  </h2>

  <table className="w-full border-collapse">

    <thead>

      <tr className="bg-gray-100">

        <th className="border p-3">
          Category
        </th>

        <th className="border p-3">
          Revenue
        </th>

        <th className="border p-3">
          Orders
        </th>

        <th className="border p-3">
          Cancelled
        </th>

      </tr>

    </thead>

    <tbody>

      {[...new Set(categoryOrders)].map(
        (category) => (

          <tr
            key={category}
            className="text-center"
          >

            <td className="border p-3">
              {category}
            </td>

            <td className="border p-3 text-green-600 font-bold">
              ₹{categoryRevenue[category] || 0}
            </td>

            <td className="border p-3 text-blue-600 font-bold">
              {
                categoryOrders.filter(
                  c => c === category
                ).length
              }
            </td>

    <td className="border p-3 text-red-600 font-bold">
  {categoryCancelled[category] || 0}
</td>

          </tr>

        )
      )}

    </tbody>

  </table>

</div>
  

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

  <h2 className="text-3xl font-bold mb-6">
    📅 Revenue Timeline
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between border-b pb-3">
      <span>Today Revenue</span>
      <span className="font-bold text-green-600">
        ₹{todayRevenue}
      </span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span>Yesterday Revenue</span>
      <span className="font-bold text-blue-600">
        ₹{yesterdayRevenue}
      </span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span>This Week Revenue</span>
      <span className="font-bold text-purple-600">
        ₹{weekRevenue}
      </span>
    </div>

    <div className="flex justify-between">
      <span>This Month Revenue</span>
      <span className="font-bold text-orange-600">
        ₹{monthRevenue}
      </span>
    </div>

  </div>

  <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

  <h2 className="text-3xl font-bold mb-6">
    🏆 This Week Top Sellers
  </h2>

  {Object.entries(categoryTopProducts).map(
    ([category, products]) => {

      const topProduct =
        Object.entries(products)
          .sort((a, b) => b[1] - a[1])[0];

      return (

        <div
          key={category}
          className="border-b py-4"
        >

          <h3 className="text-xl font-bold">
            {category}
          </h3>

          <p>
            {topProduct?.[0]}
          </p>

          <p className="text-green-600 font-bold">
            Sold: {topProduct?.[1]}
          </p>

        </div>
        

      );

    }
  )}
  

</div>
<div className="bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold">
        📊 Revenue By Category
      </h2>

      <div className="mt-6 space-y-4">

        {Object.entries(categoryRevenueMap).map(
          ([category, revenue]) => (

          <div key={category}>

            <div className="flex justify-between">

              <span>{category}</span>

              <span>
                ₹{revenue}
              </span>

            </div>

            <div className="w-full bg-gray-200 h-4 rounded-full">

              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${Math.min(
                    (revenue / totalRevenue) * 100,
                    100
                  )}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

    

    </div>

</div>

  </div>

 
 
)}



{activeTab === "analytics" && (

<div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-100 p-2 rounded-3xl">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-3xl shadow-xl">
      <h3>Total Revenue</h3>
      <p className="text-4xl font-bold">
        ₹{totalRevenue}
      </p>
    </div>

    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-3xl shadow-xl">
      <h3>Total Orders</h3>
      <p className="text-4xl font-bold">
        {orders.length}
      </p>
    </div>

    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-3xl shadow-xl">
      <h3>Products Sold</h3>
      <p className="text-4xl font-bold">
        {Object.values(categorySales).reduce((a,b)=>a+b,0)}
      </p>
    </div>

    <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-3xl shadow-xl">
      <h3>Cancelled</h3>
      <p className="text-4xl font-bold">
        {Object.values(categoryCancelMap).reduce((a,b)=>a+b,0)}
      </p>
    </div>

  </div>
  <br /><br />

  {/* TOP CARDS */}
  

  {/* BAR + PIE */}
  <div className="grid lg:grid-cols-2 ">

   <div className="   p-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-white text-xl font-bold">
      Revenue By Category
    </h2>

    <select className="bg-[#111827] text-white px-3 py-2 rounded-lg">

      <option>This Week</option>

      <option>Last Week</option>

    </select>

  </div>

  <Chart
    options={revenueChart.options}
    series={revenueChart.series}
    type="bar"
    height={320}
  />

</div>

  <div className="  p-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-white text-xl font-bold">
      Revenue Distribution
    </h2>

    <select className="  text-white px-3 py-2 rounded-lg">

      <option>This Week</option>

       

    </select>

  </div>

  <Chart
    options={pieChart.options}
    series={pieChart.series}
    type="donut"
    height={320}
  />

</div>

  </div>

  {/* WEEKLY + MONTHLY */}
  <div className="grid lg:grid-cols-2 ">

   <div className="   p-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-white text-xl font-bold">
      Weekly Revenue Trend
    </h2>

    <select className="bg-[#111827] text-white px-3 py-2 rounded-lg">

      <option>last Week</option>

      

    </select>

  </div>

  <Chart
    options={weeklyChart.options}
    series={weeklyChart.series}
    type="area"
    height={320}
  />

</div>

   <div className="bg-[]   p-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-white text-xl font-bold">
      Monthly Revenue Trend
    </h2>

    <select className="bg-[#111827] text-white px-3 py-2 rounded-lg">

      <option>This year</option>

      

    </select>

  </div>

  <Chart
    options={monthlyChart.options}
    series={monthlyChart.series}
    type="line"
    height={320}
  />

</div>

  </div>
 
    <div className=" p-8 rounded-3xl shadow-x2">

      <h2 className="text-2xl text-center font-bold text-white">
        🏆 Top Category
      </h2>
      <br /><br />

    <div className="flex flex-col items-center">

  <img
    src={bestProduct?.[1]?.image}
    alt=""
    className="w-40 h-40 object-contain rounded-xl border shadow-md p-2 bg-white"
  />

  <h3 className="font-bold text-xl mt-4 text-white">
    {bestProduct?.[0]}
  </h3>

</div>

    </div>

  </div>

 

)}
 

 
{activeTab === "cancel" && (

<div className="bg-white p-10 rounded-3xl shadow-xl">

  <h2 className="text-3xl font-bold mb-6">
    ❌ Cancelled Products
  </h2>

  {orders.map(order =>
  order.items?.map(item =>
    item.cancelled && (

      <div
        key={item.id}
        className="bg-white rounded-2xl shadow-lg p-5 mb-4 border"
      >

       <div className="flex flex-col md:flex-row gap-4">

          <img
            src={item.product_image}
            alt=""
            className="w-24 h-24 object-contain"
          />

          <div>

            <h3 className="text-xl font-bold">
              {item.product_name}
            </h3>

            <p className="text-blue-600 font-semibold">
              Category: {item.category}
            </p>

            <p>
              Customer: {order.full_name}
            </p>

            <p>
              Email: {order.email}
            </p>

            <p>
              Address: {order.address}
            </p>

            <p className="text-red-600 font-bold mt-2">
              Reason: {item.cancel_reason}
            </p>

          </div>

        </div>

      </div>

    )
  )
)}

</div>

)}

   
  

    </div>
    </>
    

  );

}

export default AdminOrders;