import { Link } from "react-router-dom";

export default function Admin() {

  return (

    <div className="min-h-screen bg-black p-10">

      <h1 className="text-5xl font-bold text-center mb-14 text-white">
        SMARTCART  Owner Dashboard 
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Fashion */}

        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

          <h2 className="text-3xl font-bold mb-4">
            Fashion
          </h2>

          <p className="text-gray-500 mb-6">
            Add, update and manage fashion products.
          </p>

         <Link to="/fashion-admin">

        <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl transition duration-300">
            Open
        </button>

        </Link>

        </div>

        {/* Electronics */}

        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

          <h2 className="text-3xl font-bold mb-4">
            Hardware product
          </h2>

          <p className="text-gray-500 mb-6">
            Manage electrical and hardware products.
          </p>

          <Link to="/hardware">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition duration-300">

            Open

          </button>

        </Link>

        </div>

        {/* Furniture */}

        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

          <h2 className="text-3xl font-bold mb-4">
            Furniture
          </h2>

          <p className="text-gray-500 mb-6">
            Add room furniture and home decor products.
          </p>
          <Link to="/furniture-admin"> 

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl transition duration-300">
            Open
          </button>
          </Link>

        </div>

        {/* Groceries */}

        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        
          <h2 className="text-3xl font-bold mb-4">
            Groceries
          </h2>

          <p className="text-gray-500 mb-6">
            Manage grocery and daily essential products.
          </p>
           <Link to="/grocery-admin"> 
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl transition duration-300">
            Open
          </button>
          </Link>

        </div>
         <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        
          <h2 className="text-3xl font-bold mb-4">
            Beauty
          </h2>

          <p className="text-gray-500 mb-6">
            Manage  Beauty and daily essential products.
          </p>
           <Link to="/beauty-admin"> 
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl transition duration-300">
            Open
          </button>
          </Link>

        </div>
        <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

  <h2 className="text-3xl font-bold mb-4">
    📦 Orders & Analytics
  </h2>

  <p className="text-gray-500 mb-6">
    Manage customer orders, revenue and reports.
  </p>

  <Link to="/admin-orders"> 

  <button
  
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition duration-300"
  >
    Open
  </button>
  </Link>

</div>

      </div>

    </div>

  )

}