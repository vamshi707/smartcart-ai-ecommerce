import { useState, useEffect } from "react";

export default function FashionAdmin() {

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [skinType, setSkinType] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:8000/fashion/")

      .then((response) => response.json())

      .then((data) => {

        setProducts(data);

      });

  }, []);

  const addProduct = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/fashion/",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          name: name,
          brand: brand,
          description: description,
          image: image,
          price: price,
          old_price: oldPrice,
          rating: rating,
          skin_type: skinType,
          stock: stock,
          gender: gender,

        }),

      }
    );

     const data = await response.json();

    setProducts([...products, data]);

    setMessage("✅ Product Added Successfully");
    setTimeout(() => {

  setMessage("");

}, 3000);
  }

  const deleteProduct = async (id) => {

    await fetch(

      `http://127.0.0.1:8000/fashion/delete/${id}/`,

      {
        method: "DELETE",
      }

    );

        setProducts(products.filter((item) => item.id !== id));

        setMessage("❌ Product Deleted Successfully");
        setTimeout(() => {

  setMessage("");

}, 3000);

  }

  return (

    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-10">

      <h1 className="text-5xl font-bold text-center mb-12">
   
        Fashion Admin Dashboard
      </h1>

      {/* Top Buttons */}

      <div className="flex flex-wrap gap-5 justify-center mb-12">

        <button
          onClick={() => {
            setShowAdd(true)
            setShowDelete(false)
            setShowUpdate(false)
          }}
          className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >
          Add Product
        </button>

        <button
          onClick={() => {
            setShowDelete(true)
            setShowAdd(false)
            setShowUpdate(false)
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >
          Delete Product
        </button>

        <button
          onClick={() => {
            setShowUpdate(true)
            setShowAdd(false)
            setShowDelete(false)
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg transition duration-300"
        >
          Update Product
        </button>

      </div>

      {/* ADD PRODUCT SECTION */}

      {showAdd && (

        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto mb-10">

          <h2 className="text-3xl font-bold mb-8">
            Add New Product
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
              placeholder="Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-4 rounded-xl md:col-span-2"
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
              type="number"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-4 rounded-xl"
            />
           <select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  className="border p-4 rounded-xl md:col-span-2"
>

  <option value="">

    Select Gender

  </option>

  <option value="men">

    Men

  </option>

  <option value="women">

    Women

  </option>

</select>

            <input
              type="text"
              placeholder="Skin Type"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="border p-4 rounded-xl md:col-span-2"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-4 rounded-xl md:col-span-2 h-32"
            ></textarea>

          </div>

          <button
            onClick={addProduct}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl mt-8 transition duration-300"
          >
            Post Product
          </button>
          <br /><br />
          <div>
              {message && (

        <div className="bg-green-500 text-white text-center p-4 rounded-2xl mb-8 max-w-2xl mx-auto shadow-lg">

         {message}

  </div>

)}
          </div>

        </div>
        
        

      )}
       

      {/* DELETE PRODUCT SECTION */}

      {showDelete && (

        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto max-h-55 mb-10">

          <h2 className="text-1xl font-bold mb-2">
            Delete Products
          </h2>

          {products.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between border p-5 rounded-2xl mb-5"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
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
          <div>
                  {message && (

  <div className="bg-green-500 text-white text-center p-4 rounded-2xl mb-8 max-w-2xl mx-auto shadow-lg">

    {message}

  </div>

)}
          </div>

        </div>

      )}

    </div>
    

  )


}