import { useState, useEffect } from "react";

export default function ElectronicsAdmin() {

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // COMMON INPUTS

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");

  // SCREW INPUTS

  const [lengthMM, setLengthMM] = useState("");
  const [diameterMM, setDiameterMM] = useState("");
  const [headType, setHeadType] = useState("");
  const [threadType, setThreadType] = useState("");

  // MOTOR INPUTS

  const [voltage, setVoltage] = useState("");
  const [rpm, setRPM] = useState("");
  const [power, setPower] = useState("");

  // PIPE INPUTS

  const [pipeDiameter, setPipeDiameter] = useState("");
  const [pipeLength, setPipeLength] = useState("");
  const [pressure, setPressure] = useState("");

  // SPANNER INPUTS

  const [sizeMM, setSizeMM] = useState("");
  const [finish, setFinish] = useState("");
  const [spannerType, setSpannerType] = useState("");

  // FETCH PRODUCTS

  useEffect(() => {

    fetch("http://127.0.0.1:8000/hardware/")

      .then((response) => response.json())

      .then((data) => {

        setProducts(data);

      });

  }, []);

  // ADD PRODUCT

  const addProduct = async () => {

    let specifications = {};

    // SCREW

    if (category === "Screw") {

      specifications = {

        length_mm: lengthMM,
        diameter_mm: diameterMM,
        head_type: headType,
        thread_type: threadType,

      }

    }

    // MOTOR

    else if (category === "Motor") {

      specifications = {

        voltage: voltage,
        rpm: rpm,
        power: power,

      }

    }

    // PIPE

    else if (category === "Pipe") {

      specifications = {

        diameter: pipeDiameter,
        length: pipeLength,
        pressure: pressure,

      }

    }

    // SPANNER

    else if (category === "Spanner") {

      specifications = {

        size_mm: sizeMM,
        finish: finish,
        type: spannerType,

      }

    }

    const response = await fetch(
      "http://127.0.0.1:8000/hardware/",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          name: name,
          category: category,
          brand: brand,
          image: image,
          price: price,
          stock: stock,
          material: material,
          description: description,

          specifications: specifications,

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

  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    await fetch(

      `http://127.0.0.1:8000/hardware/delete/${id}/`,

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

    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 p-10">

      <h1 className="text-5xl font-bold text-center mb-12">

        Electronics Admin Dashboard

      </h1>

      {/* TOP BUTTONS */}

      <div className="flex flex-wrap gap-5 justify-center mb-12">

        <button
          onClick={() => {
            setShowAdd(true)
            setShowDelete(false)
          }}
          className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl shadow-lg"
        >
          Add Product
        </button>

        <button
          onClick={() => {
            setShowDelete(true)
            setShowAdd(false)
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl shadow-lg"
        >
          Delete Product
        </button>

      </div>

      {/* ADD PRODUCT */}

      {showAdd && (

        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-5xl mx-auto mb-10">

          <h2 className="text-3xl font-bold mb-8">

            Add Product

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* COMMON INPUTS */}

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-4 rounded-xl"
            />

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-4 rounded-xl"
            >

              <option value="">Select Category</option>

              <option value="Screw">Screw</option>

              <option value="Motor">Motor</option>

              <option value="Pipe">Pipe</option>

              <option value="Spanner">Spanner</option>

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
              placeholder="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
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
              className="border p-4 rounded-xl md:col-span-2"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-4 rounded-xl h-32 md:col-span-2"
            ></textarea>

            {/* SCREW INPUTS */}

            {category === "Screw" && (

              <>

                <input
                  type="number"
                  placeholder="Length MM"
                  value={lengthMM}
                  onChange={(e) => setLengthMM(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Diameter MM"
                  value={diameterMM}
                  onChange={(e) => setDiameterMM(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Head Type"
                  value={headType}
                  onChange={(e) => setHeadType(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Thread Type"
                  value={threadType}
                  onChange={(e) => setThreadType(e.target.value)}
                  className="border p-4 rounded-xl"
                />

              </>

            )}

            {/* MOTOR INPUTS */}

            {category === "Motor" && (

              <>

                <input
                  type="text"
                  placeholder="Voltage"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="RPM"
                  value={rpm}
                  onChange={(e) => setRPM(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Power"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="border p-4 rounded-xl"
                />

              </>

            )}

            {/* PIPE INPUTS */}

            {category === "Pipe" && (

              <>

                <input
                  type="text"
                  placeholder="Pipe Diameter"
                  value={pipeDiameter}
                  onChange={(e) => setPipeDiameter(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Pipe Length"
                  value={pipeLength}
                  onChange={(e) => setPipeLength(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Pressure"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  className="border p-4 rounded-xl"
                />

              </>

            )}

            {/* SPANNER INPUTS */}

            {category === "Spanner" && (

              <>

                <input
                  type="text"
                  placeholder="Size MM"
                  value={sizeMM}
                  onChange={(e) => setSizeMM(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Finish"
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="border p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Type"
                  value={spannerType}
                  onChange={(e) => setSpannerType(e.target.value)}
                  className="border p-4 rounded-xl"
                />

              </>

            )}

          </div>

          <button
            onClick={addProduct}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl mt-8"
          >
            Add Product
          </button>

          <br /><br />

          {message && (

            <div className="bg-green-500 text-white text-center p-4 rounded-2xl">

              {message}

            </div>

          )}

        </div>

      )}

      {/* DELETE SECTION */}

      {showDelete && (

        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-5xl mx-auto">

          <h2 className="text-2xl font-bold mb-5">

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
                  alt=""
                  className="w-24 h-20 rounded-xl object-cover"
                />

                <div>

                  <h3 className="text-2xl font-bold">

                    {item.name}

                  </h3>

                  <p className="text-gray-500">

                    {item.category}

                  </p>

                  <p className="text-gray-500">

                    ₹{item.price}

                  </p>

                </div>

              </div>

              <button
                onClick={() => deleteProduct(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}