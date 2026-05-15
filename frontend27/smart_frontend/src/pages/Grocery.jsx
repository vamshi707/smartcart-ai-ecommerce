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

    <div className="bg-[#f7f7f7] min-h-screen px-4 md:px-16 py-6">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-[#1d1d1d]">
          Grocery Products
        </h1>

        <button className="text-pink-500 font-semibold text-lg hover:underline">
          See All →
        </button>

      </div>

      {/* PRODUCTS */}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">

        {products.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-300 hover:shadow-lg transition duration-300 overflow-hidden relative group"
          >

            {/* IMAGE */}

            <div className="w-full h-38 bg-white flex items-center justify-center ">

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
              />

            </div>

            {/* ADD BUTTON */}

            <button className="absolute top-32 right-3 bg-white border-2 border-pink-500 text-pink-500 font-bold px-5 py-1 rounded-xl shadow hover:bg-pink-500 hover:text-white transition">

              ADD

            </button>

            {/* CONTENT */}

            <div className="p-3">

              {/* PRICE */}

              <div className="flex items-center gap-2">

                <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold">

                  ₹{item.price}

                </span>

                <span className="line-through text-gray-400 text-sm">

                  ₹{item.old_price}

                </span>

              </div>

              {/* DISCOUNT */}

              <p className="text-green-600 text-xs font-semibold mt-1">

                ₹{item.discount} OFF

              </p>

              {/* PRODUCT NAME */}

              <h2 className="text-[15px] font-semibold text-gray-1000 mt-2 leading-5 line-clamp-2 min-h-[42px]">

                {item.name}

              </h2>

              {/* WEIGHT */}

              <p className="text-gray-600 text-sm">

                1 pack ({item.weight})

              </p>

              {/* TAG */}

              <div className="mt-2">

                <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-md">

                  Fresh Product

                </span>

              </div>

              {/* RATING */}

              <div className="flex items-center gap-1 mt-3 text-sm">

                <span className="text-green-600 font-bold">

                  ★ {item.rating}

                </span>

                <span className="text-gray-500">

  ({item.rating_count >= 1000
    ? (item.rating_count / 1000).toFixed(1) + "k"
    : item.rating_count})

</span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}