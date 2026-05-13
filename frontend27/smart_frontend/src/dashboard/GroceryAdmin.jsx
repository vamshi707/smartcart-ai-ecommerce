import { useState, useEffect } from "react";

export default function GroceryAdmin() {

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [weight, setWeight] = useState("");
  const [rating, setRating] = useState("");
  const [ratingCount, setRatingCount] = useState("");



  // FETCH PRODUCTS

  useEffect(() => {

    fetch("http://127.0.0.1:8000/grocery/")

      .then((response) => response.json())

      .then((data) => {

        setProducts(data);

      });

  }, []);




  // ADD PRODUCT

  const addProduct = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/grocery/",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          name: name,

          image: image,

          price: Number(price),

          old_price: Number(oldPrice),

          discount: discount,

          weight: weight,

          rating: Number(rating),

          rating_count: ratingCount,

        }),

      }
    );

    const data = await response.json();

    setProducts([...products, data]);

    setMessage("✅ Grocery Product Added");

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };




  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    await fetch(

      `http://127.0.0.1:8000/grocery/delete/${id}/`,

      {
        method: "DELETE",
      }

    );

    setProducts(products.filter((item) => item.id !== id));

    setMessage("❌ Grocery Product Deleted");

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };




  return (

    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-10">

      <h1 className="text-5xl font-bold text-center mb-12 text-green-700">

        Grocery Admin Dashboard

      </h1>



      {/* TOP BUTTONS */}

      <div className="flex gap-5 justify-center mb-12">

        <button
          onClick={() => {

            setShowAdd(true);

            setShowDelete(false);

          }}
          className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >

          Add Product

        </button>



        <button
          onClick={() => {

            setShowDelete(true);

            setShowAdd(false);

          }}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >

          Delete Product

        </button>

      </div>




      {/* ADD PRODUCT SECTION */}

      {showAdd && (

        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto mb-10">

          <h2 className="text-3xl font-bold mb-8">

            Add Grocery Product

          </h2>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Old Price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Rating Count"
              value={ratingCount}
              onChange={(e) => setRatingCount(e.target.value)}
              className="border p-4 rounded-xl"
            />

          </div>



          <button
            onClick={addProduct}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl mt-8 transition duration-300"
          >

            Post Product

          </button>



          <br /><br />



          {message && (

            <div className="bg-green-500 text-white text-center p-4 rounded-2xl mb-8 max-w-2xl mx-auto shadow-lg">

              {message}

            </div>

          )}

        </div>

      )}




      {/* DELETE SECTION */}

      {showDelete && (

        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">

            Delete Grocery Products

          </h2>



          {products.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between border p-5 rounded-2xl mb-5"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-20 rounded-xl object-cover"
                />

                <div>

                  <h3 className="text-2xl font-bold">

                    {item.name}

                  </h3>

                  <p className="text-gray-500">

                    ₹{item.price}

                  </p>

                </div>

              </div>



              <button
                onClick={() => deleteProduct(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl transition duration-300"
              >

                Delete

              </button>

            </div>

          ))}



          {message && (

            <div className="bg-green-500 text-white text-center p-4 rounded-2xl mb-8 max-w-2xl mx-auto shadow-lg">

              {message}

            </div>

          )}

        </div>

      )}

    </div>

  );

}