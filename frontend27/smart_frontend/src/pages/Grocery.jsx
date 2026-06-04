import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../utils/cartUtils";

export default function Grocery() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  

  useEffect(() => {

    fetch("http://127.0.0.1:8000/grocery/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });

  }, []);

  return (
    <>

    <div className="bg-[#f7f7f7] min-h-screen px-4 md:px-14 py-3">

      {/* HEADER */}
  <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
>
 <SwiperSlide>
  <div className="bg-gradient-to-r from-green-700 to-green-500 h-[280px] rounded-3xl flex items-center justify-between px-4 overflow-hidden">

    <div className="text-white max-w-md">
      <h1 className="text-4xl font-bold">
        SMARTCART
          </h1>
          <h3 className="text-2xl "> 
        Grocery Festival
       </h3>

      <p className="text-2xl mt-4">
        Up To 50% OFF on Fresh Products
      </p>

      <button className="mt-5 bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold">
        Shop Now
      </button>
    </div>

    <img
      src="/grocery.png"
      alt="Grocery"
      className="h-full w-[80%] object-cover"
    />

  </div>
</SwiperSlide>

  <SwiperSlide>
    <div className="bg-gradient-to-r from-orange-600 to-yellow-500 h-[280px] rounded-3xl flex items-center justify-between px-10">

      <div className="text-white">
        <h1 className="text-5xl font-bold">
          Fresh Fruits
        </h1>

        <p className="text-2xl mt-4">
          Everyday Low Prices
        </p>

        <button className="mt-6 bg-white text-orange-600 px-8 py-3 rounded-xl font-bold">
          Order Now
        </button>
      </div>

      <img
        src="/fruit.jpg"
        alt="Fruits"
        className="h-[280px] w-[70%] object-cover"
      />

    </div>
  </SwiperSlide>
  <SwiperSlide>
  <img
    src="/surf.jpg"
    alt="SmartMart Grocery Festival"
    className="w-full h-[320px] object-cover  rounded-4xl"
  />
</SwiperSlide>
</Swiper>
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

             <button
 onClick={() =>
  handleAddToCart(
    item,
    navigate
  )
}
  className="absolute top-32 right-3 bg-white border-2 border-pink-500 text-pink-500 font-bold px-5 py-1 rounded-xl shadow hover:bg-pink-500 hover:text-white transition"
>
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
    
     <Footer />
    
</>
  );

}