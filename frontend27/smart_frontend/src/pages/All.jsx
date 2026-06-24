import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function All() {

   const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#f7f7f7] min-h-screen px-4 md:px-10 py-2">


        {/* HERO BANNER */}
<div className="bg-black p-2 rounded-[30px] mb-2"> 
         <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
> 
  <SwiperSlide>
  <img
    src="/WhatsApp Image 2026-06-03 at 11.28.13 PM (1).jpeg"
    alt="Fashion Banner"
    className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[420px] object-cover rounded-xl md:rounded-[40px]"
  />
</SwiperSlide>

<SwiperSlide>
  <img
    src="/bety.png"
    alt="Beauty Banner"
    className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[420px] object-cover rounded-xl md:rounded-[40px]"
  />
</SwiperSlide>

<SwiperSlide>
  <img
    src="/fashionsmall.png"
    alt="Fashion Banner"
    className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[420px] object-cover rounded-xl md:rounded-[40px]"
  />
</SwiperSlide>

<SwiperSlide>
  <img
    src="/grocerysmall.png"
    alt="Grocery Banner"
    className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[420px] object-cover rounded-x1 md:rounded-[40px]"
  />
</SwiperSlide>

</Swiper>
</div>
         

        {/* TODAY DEALS */}

        <h2 className="text-3xl font-bold mb-6">
          🔥 Today's Deals
        </h2>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

     
<div
  onClick={() => {
  console.log("Clicked");
  navigate("/grocery");
}}
  
 className="relative rounded-3xl overflow-hidden h-56 hover:scale-105 transition duration-300 shadow-xl"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute bottom-5 left-5 text-white">
    <h3 className="text-2xl font-bold">
      🥛 Fresh Milk
    </h3>

    <p className="text-lg">
      Farm Fresh Dairy
    </p>

    <span className="bg-white text-green-600 px-3 py-1 rounded-full font-bold inline-block mt-2">
      30% OFF
    </span>
  </div>
</div>



   <div
  className="relative rounded-3xl overflow-hidden h-56 hover:scale-105 transition duration-300 shadow-xl"

    onClick={() => {
  console.log("Clicked");
  navigate("/fashion");
}}
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=800')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute bottom-5 left-5 text-white">
    <h3 className="text-2xl font-bold">
      👕 Fashion Sale
    </h3>

    <p className="text-lg">
      Top Brands Collection
    </p>

    <span className="bg-white text-pink-600 px-3 py-1 rounded-full font-bold inline-block mt-2">
      50% OFF
    </span>
  </div>
</div>

 <div
  className="relative rounded-3xl overflow-hidden h-56 hover:scale-105 transition duration-300 shadow-xl"
   onClick={() => {
  console.log("Clicked");
  navigate("/beauty");
}}
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute bottom-5 left-5 text-white">
    <h3 className="text-2xl font-bold">
      💄 Beauty Deals
    </h3>

    <p className="text-lg">
      Premium Cosmetics
    </p>

    <span className="bg-white text-pink-600 px-3 py-1 rounded-full font-bold inline-block mt-2">
      40% OFF
    </span>
  </div>
</div>

   <div
  className="relative rounded-3xl overflow-hidden h-56 hover:scale-105 transition duration-300 shadow-xl"
      onClick={() => {
  console.log("Clicked");
  navigate("/furniture");
}}
style={{
  backgroundImage:
        "url('https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg')",

  backgroundSize: "cover",
  backgroundPosition: "center",
}}
>
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute bottom-5 left-5 text-white">
    <h3 className="text-2xl font-bold">
      🛋️ Furniture Collection
    </h3>

    <p className="text-lg">
      Modern Home Decor
    </p>

    <span className="bg-white text-orange-600 px-3 py-1 rounded-full font-bold inline-block mt-2">
      25% OFF
    </span>
  </div>
</div>

</div>

        {/* FASHION */}
        

       <div className="bg-black rounded-3xl p-2 shadow mb-8 ">
       <img
  src="/WhatsApp Image 2026-06-03 at 11.28.13 PM.jpeg"
  alt="SmartMart Grocery Festival"
  className="w-full h-[450px] sm:h-[440px] md:h-[460px] lg:h-[600px] object-cover rounded-2xl"
/>

  <div className="flex justify-between items-center mb-4 flex-col">
    <h2 className="text-3xl font-bold text-pink-600">
      Fashion Collection
    </h2>

    <Link
      to="/fashion"
      className="text-pink-600 font-semibold"
    >
      View All →
    </Link>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    

    {/* Product 1 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500"
        alt="Casual Shirt"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Casual Shirt</h3>
      <p className="text-pink-600 font-bold">₹899</p>
     
      <button
        onClick={() => navigate("/fashion")}
        className="mt-3 w-full bg-pink-600 text-white py-2 rounded-xl"
      >
        
        Shop Now
      </button>
      
    </div>

    {/* Product 2 */}
    <div className="bg-gray-50 rounded-2xl p-2 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"
        alt="Denim Jacket"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Denim Jacket</h3>
      <p className="text-pink-600 font-bold">₹1499</p>

      <button
        onClick={() => navigate("/fashion")}
        className="mt-3 w-full bg-pink-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 3 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
        alt="Sneakers"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Sneakers</h3>
      <p className="text-pink-600 font-bold">₹1999</p>

      <button
        onClick={() => navigate("/fashion")}
        className="mt-3 w-full bg-pink-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 4 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
        alt="Hoodie"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Hoodie</h3>
      <p className="text-pink-600 font-bold">₹1299</p>

      <button
        onClick={() => navigate("/fashion")}
        className="mt-3 w-full bg-pink-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 5 */}
   

  </div>

</div>

        {/* GROCERY */}

         <div className="bg-green-100 rounded-3xl p-6 shadow mb-8">

  <div className="flex justify-between items-center mb-5 flex-col">
    <h2 className="text-3xl font-bold text-green-600 ">
      Grocery Collection
    </h2>

    <Link
      to="/grocery"
      className="text-green-600 font-semibold"
    >
      View All →
    </Link>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

    {/* Product 1 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://healthimpactnews.com/wp-content/uploads/sites/2/2014/06/Pouring-fresh-raw-milk-in-glass.jpg"
        alt="Milk"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Fresh Milk</h3>
      <p className="text-green-600 font-bold">₹60</p>

      <button
        onClick={() => navigate("/grocery")}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 2 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500"
        alt="Rice"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Basmati Rice</h3>
      <p className="text-green-600 font-bold">₹799</p>

      <button
        onClick={() => navigate("/grocery")}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 3 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://cdn.pixabay.com/photo/2024/02/15/03/59/honey-8574616_1280.jpg"
        alt="Honey"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Pure Honey</h3>
      <p className="text-green-600 font-bold">₹299</p>

      <button
        onClick={() => navigate("/grocery")}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 4 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500"
        alt="Coffee"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Soft Drinks</h3>
      <p className="text-green-600 font-bold">₹99</p>

      <button
        onClick={() => navigate("/grocery")}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 5 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500"
        alt="Soft Drinks"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">fresh meat</h3>
      <p className="text-green-600 font-bold">₹499</p>

      <button
        onClick={() => navigate("/grocery")}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>
     <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://www.thegardener.co.za/wp-content/uploads/2018/05/Fotolia_79072223_Subscription_Monthly_XXL.jpg"
        alt="Soft Drinks"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">organic vegetables</h3>
      <p className="text-green-600 font-bold">₹199</p>

      <button
        onClick={() => navigate("/grocery")}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>


  </div>

</div>

        {/* FURNITURE */}

        <div className="bg-white rounded-3xl p-6 shadow mb-8">

  <div className="flex justify-between items-center mb-5">
    <h2 className="text-3xl font-bold text-orange-600">
      Furniture Collection
    </h2>

    <Link
      to="/furniture"
      className="text-orange-600 font-semibold"
    >
      View All →
    </Link>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {/* Product 1 */}
    <div className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500"
        alt="Sofa"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Luxury Sofa</h3>
      <p className="text-orange-600 font-bold">₹24,999</p>

      <button
        onClick={() => navigate("/furniture")}
        className="mt-3 w-full bg-orange-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 2 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://eurekaergonomic.com/cdn/shop/files/Eureka_Ergonomic_86_Modern_Oval_Dining_Table_set_for_6_Gray.jpg?v=1721899770"
        alt="Dining Table"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Dining Table</h3>
      <p className="text-orange-600 font-bold">₹14,999</p>

      <button
        onClick={() => navigate("/furniture")}
        className="mt-3 w-full bg-orange-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 3 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://ouchcart.com/cdn/shop/files/jacklin-king-size-bed-in-cream-colour-by-durian-jacklin-king-size-bed-in-cream-colour-by-durian-dalq6a.webp?v=1721406917"
        alt="Bed"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">King Size Bed</h3>
      <p className="text-orange-600 font-bold">₹29,999</p>

      <button
        onClick={() => navigate("/furniture")}
        className="mt-3 w-full bg-orange-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    

    {/* Product 4 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
        alt="Wardrobe"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Wooden Wardrobe</h3>
      <p className="text-orange-600 font-bold">₹19,999</p>

      <button
        onClick={() => navigate("/furniture")}
        className="mt-3 w-full bg-orange-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

  </div>

</div>

        {/* BEAUTY */}

       <div className="bg-blue-950 rounded-3xl p-2 shadow mb-8">
         <img
    src="/WhatsApp Image 2026-06-03 at 11.28.12 PM.jpeg"
    alt="SmartMart Grocery Festival"
    className="w-full h-[500px] object-cover  rounded-3xl"
  />

  <div className="flex justify-between items-center mb-5 flex-col">
     
    
    <h2 className="text-3xl font-bold text-pink-500">
      Beauty Collection
    </h2>

    <Link
      to="/beauty"
      className="text-pink-500 font-semibold"
    >
      View All →
    </Link>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {/* Product 1 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500"
        alt="Lipstick"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Luxury Lipstick</h3>
      <p className="text-pink-500 font-bold">₹499</p>

      <button
        onClick={() => navigate("/beauty")}
        className="mt-3 w-full bg-pink-500 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 2 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
        alt="Perfume"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Premium Perfume</h3>
      <p className="text-pink-500 font-bold">₹999</p>

      <button
        onClick={() => navigate("/beauty")}
        className="mt-3 w-full bg-pink-500 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 3 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500"
        alt="Face Wash"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Face Wash</h3>
      <p className="text-pink-500 font-bold">₹299</p>

      <button
        onClick={() => navigate("/beauty")}
        className="mt-3 w-full bg-pink-500 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 4 */}
  

    {/* Product 5 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500"
        alt="Shampoo"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Herbal Shampoo</h3>
      <p className="text-pink-500 font-bold">₹399</p>

      <button
        onClick={() => navigate("/beauty")}
        className="mt-3 w-full bg-pink-500 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

  </div>

</div>

        {/* HARDWARE */}

        <div className="bg-gray-300 rounded-3xl p-6 shadow mb-8">

  <div className="flex justify-between items-center mb-5">
    <h2 className="text-3xl font-bold text-blue-600">
      Hardware Collection
    </h2>

    <Link
      to="/electronics"
      className="text-blue-600 font-semibold"
    >
      View All →
    </Link>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

    {/* Product 1 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://www.totaltools.com.au/media/catalog/product/1/9/192311-kincrome-20oz-claw-hammer-k9052-hero1.jpg?optimize=medium&bg-color=255"
        alt="Hammer"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Hammer</h3>
      <p className="text-blue-600 font-bold">₹399</p>

      <button
        onClick={() => navigate("/electronics")}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 2 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://i5.walmartimages.com/asr/9fb47a2c-f95b-41f8-906f-3402f8697fb6_3.7052f80c1edd9b9a93238a1ab2546ef5.jpeg"
        alt="Screwdriver"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Screwdriver Set</h3>
      <p className="text-blue-600 font-bold">₹599</p>

      <button
        onClick={() => navigate("/electronics")}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 3 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://ts3.mm.bing.net/th?id=OIP.9bXdQv-0xd7jUQA0t-inqAHaHa&pid=15.1&o=7&rm=3"
        alt="Drill Machine"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Drill Machine</h3>
      <p className="text-blue-600 font-bold">₹2499</p>

      <button
        onClick={() => navigate("/electronics")}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 4 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://m.media-amazon.com/images/I/818Ab5jr-mL._AC_.jpg"
        alt="Tool Kit"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Tool Kit</h3>
      <p className="text-blue-600 font-bold">₹1499</p>

      <button
        onClick={() => navigate("/electronics")}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 5 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://i5.walmartimages.com/seo/ABN-Ratchet-Wrench-Sets-Metric-and-Standard-22p-Combo-Ratcheting-Open-Wrenches_019d901d-aef8-49a2-9064-3f7413d4c147.5897577a5f2cf62efaf09ef851bed1c3.jpeg"
        alt="Wrench Set"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Wrench Set</h3>
      <p className="text-blue-600 font-bold">₹799</p>

      <button
        onClick={() => navigate("/electronics")}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

    {/* Product 6 */}
    <div className="bg-gray-50 rounded-2xl p-3 hover:shadow-lg">
      <img
        src="https://www.finderhardware.com/wp-content/uploads/2022/06/16SAFETY-TOOLS.jpg"
        alt="Safety Tools"
        className="h-40 w-full object-cover rounded-xl"
      />
      <h3 className="font-semibold mt-2">Safety Tools</h3>
      <p className="text-blue-600 font-bold">₹999</p>

      <button
        onClick={() => navigate("/electronics")}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl"
      >
        Shop Now
      </button>
    </div>

  </div>

</div>

        {/* WHY SMARTMART */}

      <div className="bg-gradient-to-r from-slate-900 via-black-900 to-slate-700 rounded-[40px] p-10 shadow-2xl text-white mb-10">

  <h2 className="text-4xl font-bold text-center mb-3">
    Why Choose SmartCart? 🚀
  </h2>

  <p className="text-center text-lg mb-10 opacity-90">
    Experience smart shopping with AI-powered recommendations,
    lightning-fast delivery and unbeatable deals.
  </p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl hover:scale-105 transition">
      <div className="text-5xl mb-3">🚚</div>
      <h3 className="font-bold text-xl">Fast Delivery</h3>
      <p className="mt-2 text-sm">
        Get products delivered quickly to your doorstep.
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl hover:scale-105 transition">
      <div className="text-5xl mb-3">💰</div>
      <h3 className="font-bold text-xl">Best Prices</h3>
      <p className="mt-2 text-sm">
        Amazing discounts and everyday low prices.
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl hover:scale-105 transition">
      <div className="text-5xl mb-3">🤖</div>
      <h3 className="font-bold text-xl">AI Recommendations</h3>
      <p className="mt-2 text-sm">
        Smart AI suggests products tailored to you.
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl hover:scale-105 transition">
      <div className="text-5xl mb-3">🔒</div>
      <h3 className="font-bold text-xl">Secure Payments</h3>
      <p className="mt-2 text-sm">
        Safe and trusted payment experience.
      </p>
    </div>

  </div>

</div>

      </div>

      <Footer />
    </>
  );
}