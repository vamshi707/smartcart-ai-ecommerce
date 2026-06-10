import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  ShoppingCart,
  User,
  Search,
  Shirt,
  Wrench,
  Sofa,
  Apple,
  LayoutGrid,
  MapPin,
  ChevronDown,
  HeartHandshake,
} from "lucide-react";



export default function Navbar() {
 const [cartCount, setCartCount] = useState(0);
 
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const [showAdminModal, setShowAdminModal] =
useState(false);

const [adminId, setAdminId] =
useState("");

useEffect(() => {
 const updateCartCount = () => {
  const userEmail = localStorage.getItem("userEmail");
  const cartKey = userEmail ? `cart_${userEmail}` : "cart";

  const cart =
    JSON.parse(localStorage.getItem(cartKey)) || [];

  setCartCount(cart.length);

  };

  updateCartCount();

  window.addEventListener(
    "cartUpdated",
    updateCartCount
  );

  return () => {
    window.removeEventListener(
      "cartUpdated",
      updateCartCount
    );
  };
}, []);
const handleSearch = (e) => {
  e.preventDefault();

  if (searchText.trim()) {
    navigate(`/search?query=${searchText}`);
  }
};
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("redirectAfterLogin");

  navigate("/", { replace: true });
  window.location.reload();
};

 const checkAdmin = () => {

  if(adminId === "SMART123"){

    navigate("/admin");

  }else{

    alert("Wrong Admin ID");

    navigate("/");

  }

  setShowAdminModal(false);

  setAdminId("");

};

  return (

    <div className="bg-white shadow-md sticky fixed top-0 z-50">

      {/* TOP NAVBAR */}

      <div className="flex items-center justify-between px-18 py-3 border-b">

        {/* LEFT SIDE */}

        <div className="flex items-center gap-6">

          {/* LOGO */}

          <h1 className="text-4xl font-extrabold text-purple-600 tracking-wide cursor-pointer">

            SmartCart

          </h1>

          {/* LOCATION */}

          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-purple-600 transition">

            <MapPin size={20} className="text-purple-600" />

            <div>

              <p className="text-sm text-gray-500">
                Deliver To
              </p>

              <div className="flex items-center">

                <span className="font-semibold text-gray-800">
                  Hyderabad
                </span>

                <ChevronDown size={18} />

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH BAR */}

        <form
  onSubmit={handleSearch}
  className="flex items-center bg-gray-100 px-4 py-3 rounded-2xl w-[42%] shadow-sm border"
>
  <Search className="text-gray-500" size={20} />

  <input
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder='Search "Milk, Shoes, Mobiles..."'
    className="bg-transparent outline-none ml-3 w-full text-gray-700"
  />
</form>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-8">

          {/* LOGIN */}

      {/* LOGIN */}

{localStorage.getItem("isLoggedIn") === "true" ? (
  <div
    onClick={handleLogout}
    className="flex flex-col items-center cursor-pointer hover:text-red-600 transition"
  >
    <User size={26} />

    <span className="text-sm font-medium">
      Logout
    </span>
  </div>
) : (
  <Link to="/login">
    <div className="flex flex-col items-center cursor-pointer hover:text-purple-600 transition">
      <User size={26} />

      <span className="text-sm font-medium">
        Login
      </span>
    </div>
  </Link>
)}



          {/* CART */}

         <Link to="/cart">
  <div className="relative flex flex-col items-center cursor-pointer hover:text-purple-600 transition">
    <ShoppingCart size={28} />

    {cartCount > 0 && (
  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
    {cartCount}
  </span>
)}

    <span className="text-sm font-medium">
      Cart
    </span>
  </div>
</Link>
<Link to="/my-orders">
    <div className="flex flex-col items-center cursor-pointer hover:text-purple-600 transition">
      <span className="text-2xl">📦</span>
      <span className="text-sm font-medium">My Orders</span>
    </div>
  </Link>

 <div
  onClick={() => setShowAdminModal(true)}
  className="flex flex-col items-center cursor-pointer hover:text-purple-600 transition"
>
  <span className="text-xl md:text-2xl">
    ⚙️
  </span>

  <span className="text-xs md:text-sm font-medium">
    Admin
  </span>
</div>

        </div>

      </div>

      {/* CATEGORY SECTION */}
   

      <div className="flex items-center justify-center gap-12 overflow-x-auto px-8 py-2 bg-white">
               <Link
  to="/Home"> 
          <div className="flex items-center gap-3 cursor-pointer hover:text-red-600 transition">

          <Home size={26} className="text-red-600" />

          <span className="font-medium">
            Home
          </span>
        

        </div>
        </Link>
        {/* ALL */}
                  <Link
  to="/All"> 


        <div className="flex items-center gap-3 cursor-pointer hover:text-pink-600 transition">

          <LayoutGrid size={26} className="text-pink-600" />

          <span className="font-medium">
            All
          </span>

        </div>
        </Link>

        {/* GROCERIES */}
   <Link
  to="/grocery">

        <div className="flex items-center gap-3 cursor-pointer hover:text-green-600 transition">
 
          <Apple size={26} className="text-green-600" />

          <span className="font-medium">
            Groceries
          </span>
           

        

        </div>
        </Link>
        

        {/* FASHION */}
 <Link
  to="/fashion"
  className="flex items-center gap-3 cursor-pointer hover:text-pink-600 transition"
>

  <Shirt size={26} className="text-pink-600" />

  <span className="font-medium">
    Fashion
  </span>

</Link>

        {/* ELECTRONICS */}

                <Link
  to="/Electronics">

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
    
             <Wrench size={26} className="text-blue-600" />

          <span className="font-medium">
            Hardware tools
          </span>
           

        </div>
        </Link>

        {/* FURNITURE */}
          <Link
  to="/Furniture"> 

        <div className="flex items-center gap-3 cursor-pointer hover:text-orange-600 transition">

          <Sofa size={26} className="text-orange-600" />

          <span className="font-medium">
            Furniture
          </span>

        </div>
        </Link>


        {/* BEAUTY */}

        <Link to="/beauty">
  <div className="flex items-center gap-3 cursor-pointer hover:text-rose-500 transition">

    <HeartHandshake
      size={26}
      className="text-rose-500"
    />

    <span className="font-medium">
      Beauty
    </span>

  </div>
</Link>
        </div>
        {showAdminModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

  <div className="bg-white p-6 rounded-3xl shadow-2xl w-[90%] max-w-sm">

    <h2 className="text-2xl font-bold text-center mb-4">
      Admin Login
    </h2>

    <input
      type="password"
      value={adminId}
      onChange={(e)=>
        setAdminId(e.target.value)
      }
      placeholder="Enter Admin ID"
      className="w-full border p-3 rounded-xl"
    />

    <div className="flex gap-3 mt-5">

      <button
        onClick={() =>
          setShowAdminModal(false)
        }
        className="flex-1 bg-gray-300 py-3 rounded-xl"
      >
        Cancel
      </button>

      <button
        onClick={checkAdmin}
        className="flex-1 bg-purple-600 text-white py-3 rounded-xl"
      >
        Login
      </button>

    </div>

  </div>

</div>

)}

        
        

      </div>

      

  

  )

}

