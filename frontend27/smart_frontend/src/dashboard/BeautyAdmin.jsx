import { useState, useEffect } from "react";

export default function BeautyAdmin() {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [skinType, setSkinType] = useState("");
  const [gender, setGender] = useState("");
  const [shade, setShade] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/beauty/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const clearForm = () => {
    setName("");
    setCategory("");
    setBrand("");
    setImage("");
    setPrice("");
    setOldPrice("");
    setStock("");
    setRating("");
    setSkinType("");
    setGender("");
    setShade("");
    setDescription("");
  };

  const addProduct = async () => {
    const response = await fetch("http://127.0.0.1:8000/beauty/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        brand,
        image,
        price,
        old_price: oldPrice,
        stock,
        rating,
        skin_type: skinType,
        gender,
        shade,
        description,
      }),
    });

    const data = await response.json();

    setProducts([...products, data]);
    clearForm();

    setMessage("✅ Beauty Product Added Successfully");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const deleteProduct = async (id) => {
    await fetch(`http://127.0.0.1:8000/beauty/delete/${id}/`, {
      method: "DELETE",
    });

    setProducts(products.filter((item) => item.id !== id));

    setMessage("❌ Beauty Product Deleted");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-rose-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-12 text-pink-700">
        Beauty Admin Dashboard
      </h1>

      <div className="flex gap-5 justify-center mb-10">
        <button
          onClick={() => {
            setShowAdd(true);
            setShowDelete(false);
          }}
          className="bg-pink-600 text-white px-8 py-4 rounded-2xl"
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
            Add Beauty Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option value="">Select Category</option>
              <option value="Sunscreen">Sunscreen</option>
              <option value="Lipstick">Lipstick</option>
              <option value="Face Wash">Face Wash</option>
              <option value="Moisturizer">Moisturizer</option>
              <option value="Serum">Serum</option>
            </select>

            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
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
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              step="0.1"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Skin Type"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="border p-4 rounded-xl"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border p-4 rounded-xl"
            >
              <option value="">Select Gender</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Unisex">Unisex</option>
            </select>

            <input
              type="text"
              placeholder="Shade"
              value={shade}
              onChange={(e) => setShade(e.target.value)}
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
            className="bg-pink-600 text-white px-8 py-4 rounded-2xl mt-8"
          >
            Add Beauty Product
          </button>
        </div>
      )}

      {showDelete && (
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">
            Delete Beauty Product
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
                    className="w-32 h-32 object-contain rounded-lg"
                  />

                  <div>
                    <h3 className="font-bold text-2xl">
                      {item.name}
                    </h3>

                    <p>{item.brand}</p>
                    <p>{item.category}</p>
                    <p>Skin Type: {item.skin_type}</p>
                    <p>Gender: {item.gender}</p>
                    <p className="font-bold">₹{item.price}</p>
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