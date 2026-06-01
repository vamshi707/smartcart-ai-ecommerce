import { useState, useEffect } from "react";

export default function FurnitureAdmin() {

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");
  const [priority, setPriority] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:8000/furniture/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });

  }, []);

  const addProduct = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/furniture/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          brand,
          category,
          position,
          priority,
          image,
          price,
          stock,
          description,
        }),
      }
    );

    const data = await response.json();

    setProducts([...products, data]);

    setMessage("✅ Furniture Added Successfully");

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };

  const deleteProduct = async (id) => {

    await fetch(
      `http://127.0.0.1:8000/furniture/delete/${id}/`,
      {
        method: "DELETE",
      }
    );

    setProducts(
      products.filter((item) => item.id !== id)
    );

    setMessage("❌ Furniture Deleted");

    setTimeout(() => {
      setMessage("");
    }, 3000);

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-12">

        Furniture Admin Dashboard

      </h1>

      <div className="flex gap-5 justify-center mb-10">

        <button
          onClick={() => {
            setShowAdd(true);
            setShowDelete(false);
          }}
          className="bg-black text-white px-8 py-4 rounded-2xl"
        >
          Add Product
        </button>

        <button
          onClick={() => {
            setShowDelete(true);
            setShowAdd(false);
          }}
          className="bg-red-500 text-white px-8 py-4 rounded-2xl"
        >
          Delete Product
        </button>

      </div>

      {message && (

        <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-8 text-center">

          {message}

        </div>

      )}

      {showAdd && (

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">

            Add Furniture Product

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Furniture Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option value="">Select Category</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Living Room">Living Room</option>
              <option value="Office">Office</option>
              <option value="Kitchen">Kitchen</option>
            </select>

            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option value="">Select Position</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
              <option value="Center">Center</option>
              <option value="Corner">Corner</option>
              <option value="Front">Front</option>
              <option value="Back">Back</option>
              <option value="Wall">Wall</option>
            </select>

            <input
              type="number"
              placeholder="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-4 rounded-xl md:col-span-2"
            />

          </div>

          <button
            onClick={addProduct}
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl mt-8"
          >
            Add Furniture
          </button>

        </div>

      )}

      {showDelete && (

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">

            Delete Furniture

          </h2>

          <div className="space-y-4">

            {products.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center border p-6 rounded-xl"
              >

                <div className="flex items-center gap-6">

  <img
    src={item.image}
    alt={item.name}
    className="w-40 h-30 object-cover rounded-lg"
  />

  <div>

    <h3 className="font-bold text-2xl">
      {item.name}
    </h3>

    <p>₹{item.price}</p>

    <p>{item.brand}</p>

  </div>

</div>

 

                <button
                  onClick={() => deleteProduct(item.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );
}