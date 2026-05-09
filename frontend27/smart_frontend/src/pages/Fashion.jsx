import { useEffect, useState } from "react";

export default function Fashion() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/fashion/")

      .then((response) => response.json())

      .then((data) => {

        setProducts(data);

      });

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-12 text-center">
        Fashion Products
      </h1>

      {/* PRODUCT GRID */}

      <div className=" grid grid-cols-2 md:grid-cols-6 gap-9">

        {products.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden hover:shadow-3xl transition duration-300"
          >

            {/* IMAGE SECTION */}

            <div className="w-full  bg-white flex items-center justify-center ">

              <img
                src={item.image}
                className="h-full object-contain"
              />

            </div>

            {/* CONTENT SECTION */}

            <div className="p-4">

              {/* BRAND */}

              <h2 className="text-yellow-700 font-bold text-sm uppercase">
                {item.brand}
              </h2>

              {/* PRODUCT NAME */}

              <h1 className="text-lg font-semibold mt-1 line-clamp-1">
                {item.name}
              </h1>

              {/* DESCRIPTION */}

              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {item.description}
              </p>

              {/* RATING + STOCK */}

              <div className="flex items-center gap-3 mt-3">

                <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-md">
                  ⭐ {item.rating}
                </span>

                <span className="text-gray-500 text-sm">
                  Stock: {item.stock}
                </span>

              </div>

              {/* PRICE */}

              <div className="mt-4 flex items-center gap-3">

                <span className="text-2xl font-bold">
                  ₹{item.price}
                </span>

                <span className="line-through text-gray-400">
                  ₹{item.old_price}
                </span>

              </div>

              {/* BUTTON */}

              <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl mt-5 transition duration-300">

                Add To Cart

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}