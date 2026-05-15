import { useEffect, useState } from "react";

export default function Grocery() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/grocery/")
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      });

  }, []);

  return (

    <div className="bg-gray-100 p-6 min-h-screen">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-6">

        Groceries products

      </h1>

      {/* PRODUCTS */}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {products.map((item) => (

          <div
  key={item.id}
  className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border border-gray-100 hover:-translate-y-2"
>

  {/* DISCOUNT BADGE */}

  <div className="absolute top-3 left-3 z-10 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">

    {item.discount} OFF

  </div>

  {/* IMAGE */}

  <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">

    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-contain p-4 transition duration-300 group-hover:scale-110"
    />

  </div>

  {/* CONTENT */}

  <div className="p-4">

    {/* NAME */}

    <h2 className="text-sm font-semibold text-gray-800 leading-5 h-12 overflow-hidden">

      {item.name}

    </h2>

    {/* WEIGHT */}

    <p className="text-gray-400 text-sm mt-1">

      {item.weight}

    </p>

    {/* TAG */}

    <div className="mt-2">

      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">

        Fresh Product

      </span>

    </div>

    {/* RATING */}

    <div className="flex items-center gap-2 mt-3">

      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">

        ★ {item.rating}

      </span>

      <span className="text-gray-500 text-sm">

        ({item.rating_count})

      </span>

    </div>

    {/* PRICE */}

    <div className="flex items-center gap-2 mt-4">

      <span className="text-2xl font-bold text-gray-800">

        ₹{item.price}

      </span>

      <span className="line-through text-gray-400 text-sm">

        ₹{item.old_price}

      </span>

    </div>

    {/* BUTTON */}

    <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-md">

      ADD TO CART

    </button>

  </div>

</div>

        ))}

      </div>

    </div>

  );

}