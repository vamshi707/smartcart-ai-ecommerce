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

    <div className="bg-white p-5 min-h-screen">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-6">

        Groceries products

      </h1>

      {/* PRODUCTS */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">

        {products.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-lg border-2 border-gray-300 p-1 hover:shadow-md transition duration-300 relative"
          >

            {/* IMAGE */}

             <div className="w-full h-30 flex items-center justify-center overflow-hidden ">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-300 hover:scale-110"
                  />

                </div>

            {/* ADD BUTTON */}

            <button className="absolute top-28 right-3 bg-white border border-pink-500 text-pink-500 font-bold px-4 py-1 rounded-lg shadow hover:bg-pink-500 hover:text-white transition">

              ADD

            </button>

            {/* PRICE */}

            <div className="mt-3">

              <div className="flex items-center gap-2">

                <span className="bg-green-700 text-white px-2 py-1 rounded text-lg font-bold">

                  ₹{item.price}

                </span>

                <span className="line-through text-gray-400 text-sm">

                  ₹{item.old_price}

                </span>

              </div>

              <p className="text-green-700 text-sm font-semibold mt-1">

                ₹{item.discount} OFF

              </p>

            </div>

            {/* NAME */}

            <h2 className="text-sm mt-2 font-medium line-clamp-3 leading-5">

              {item.name}

            </h2>

            {/* WEIGHT */}

            <p className="text-gray-500 text-sm mt-2">

              {item.weight}

            </p>

            {/* TAG */}

            <div className="mt-2">

              <span className="bg-cyan-50 text-cyan-700 text-xs px-2 py-1 rounded">

                Fresh Product

              </span>

            </div>

            {/* RATING */}

            <div className="mt-2 flex items-center gap-1 text-sm">

              <span className="text-green-600 font-semibold">

                ★ {item.rating}

              </span>

              <span className="text-gray-500">

                ({item.rating_count})

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}