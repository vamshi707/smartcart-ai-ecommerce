function Footer() {
  return (
    <footer className="bg-white text-black">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* LOGO */}
        <div className="mb-10">

          <h2 className="text-4xl font-extrabold text-black">
            Smart<span className="text-green-400">Cart</span>
          </h2>

          <p className="text-black mt-3 max-w-2xl leading-7">
            SmartCart is an AI-powered shopping platform where users can
            explore groceries, fashion, furniture, electronics, beauty
            products and much more with smart recommendations, ultra-fast
            delivery and modern shopping experience.
          </p>

        </div>

        {/* TRENDING SEARCHES */}
        <div className="border-b border-white/10 pb-10 mb-10">

          <h3 className="text-2xl font-bold text-black mb-6">
            Trending Searches
          </h3>

          <div className="space-y-5 text-sm leading-8">

            <div>
              <span className="text-black font-bold">
                Categories :
              </span>{" "}
              Grocery | Fashion | Furniture | Electronics |
              Beauty | AI Fashion | Smart Gadgets |
              Home Decor | Mobiles | Kitchen Essentials
            </div>

            <div>
              <span className="text-black font-bold">
                Products :
              </span>{" "}
              OnePlus 13R | Smart Watch | Coconut Water |
              Gaming Laptop | Sofa Set | Makeup Kit |
              Organic Fruits | AI Skin Match |
              Wireless Earbuds | Smart TV
            </div>

            <div>
              <span className="text- black font-bold">
                Brands :
              </span>{" "}
              Apple | Samsung | Nike | Adidas |
              Lenovo | Boat | Amul | Kwality Walls |
              Lenskart | Mamaearth
            </div>

          </div>

        </div>

        {/* POPULAR SEARCHES */}
        <div className="border-b border-white/10 pb-10 mb-10">

          <h3 className="text-2xl font-bold text-black mb-6">
            Popular Searches
          </h3>

          <div className="space-y-5 text-sm leading-8">

            <div>
              <span className="text-black font-bold">
                Products :
              </span>{" "}
              Avocado | Strawberry | Potato | Mushroom |
              Lettuce | Tomato | Carrot | Paneer |
              Milk | Bread | Cold Drinks
            </div>

            <div>
              <span className="text-black font-bold">
                Brands :
              </span>{" "}
              Amul | Fortune | Lays | Yakult |
              Nandini Milk | Too Yumm |
              Aashirvaad Atta | Durex |
              Mother Dairy | Figaro
            </div>

            <div>
              <span className="text-black font-bold">
                Categories :
              </span>{" "}
              Grocery | Fresh Vegetables |
              Beauty Products | Fashion Wear |
              Mobiles | Electronics | Furniture |
              Kitchen Appliances
            </div>

          </div>

        </div>

        {/* CATEGORY GRID */}
        <div className="border-b border-white/10 pb-10 mb-10">

          <h3 className="text-2xl font-bold text-black mb-8">
            Categories
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 text-sm">

            {[
              "Fruits & Vegetables",
              "Atta, Rice & Dals",
              "Frozen Food",
              "Baby Care",
              "Dairy & Eggs",
              "Cold Drinks",
              "Munchies",
              "Breakfast",
              "Beauty",
              "Bath & Body",
              "Furniture",
              "Electricals",
              "Health Care",
              "Fashion",
              "Paan Corner",
            ].map((item, i) => (
              <div
                key={i}
                className="hover:text-green-400 cursor-pointer transition"
              >
                {item}
              </div>
            ))}

          </div>

        </div>
        {/* BOTTOM FOOTER */}
<div className="border-t border-white/10 mt-14 pt-10">

  <div className="grid md:grid-cols-4 gap-10">

    {/* LOGO + SOCIAL */}
    <div>

      <h2 className="text-5xl font-extrabold text-pink-500">
        SmartCart
      </h2>

      <div className="flex gap-5 mt-6 text-3xl text-white">

        <i className="ri-instagram-line hover:text-green-400 cursor-pointer"></i>

        <i className="ri-twitter-x-line hover:text-green-400 cursor-pointer"></i>

        <i className="ri-facebook-fill hover:text-green-400 cursor-pointer"></i>

        <i className="ri-linkedin-fill hover:text-green-400 cursor-pointer"></i>

      </div>

      <p className="text-black mt-6 text-sm leading-7">
        © SmartCart Marketplace Private Limited
        <br />
        FSSAI Lic No : 11224999000872
      </p>

    </div>

    {/* COMPANY */}
    <div>

      <h3 className="text-white text-lg font-bold mb-5">
        Company
      </h3>

      <div className="space-y-4 text-sm">

        <p className="hover:text-green-400 cursor-pointer">
          Home
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Delivery Areas
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Careers
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Customer Support
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Press
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          SmartCart Blog
        </p>

      </div>

    </div>

    {/* POLICIES */}
    <div>

      <h3 className="text-white text-lg font-bold mb-5">
        Policies
      </h3>

      <div className="space-y-4 text-sm">

        <p className="hover:text-green-400 cursor-pointer">
          Privacy Policy
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Terms of Use
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Responsible Disclosure
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Sell on SmartCart
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Deliver with SmartCart
        </p>

        <p className="hover:text-green-400 cursor-pointer">
          Franchise
        </p>

      </div>

    </div>

    {/* DOWNLOAD APP */}
    <div>

      <h3 className="text-white text-lg font-bold mb-5">
        Download App
      </h3>

      <div className="flex flex-col gap-4">

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
          className="h-14 w-fit cursor-pointer"
        />

        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="App Store"
          className="h-14 w-fit bg-white rounded-xl p-1 cursor-pointer"
        />

      </div>

    </div>

  </div>

</div>
         

      </div>

    </footer>
  );
}

export default Footer;