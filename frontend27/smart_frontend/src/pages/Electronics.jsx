import { useState } from "react";

export default function Electronics() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detected, setDetected] = useState(false);

  const products = [

    {
      id: 1,
      name: "Steel Screw",
      price: 50,
      image:
        "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg",
    },

    {
      id: 2,
      name: "DC Motor",
      price: 450,
      image:
        "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",
    },

    {
      id: 3,
      name: "Pipe",
      price: 250,
      image:
        "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg",
    },

    {
      id: 4,
      name: "Spanner",
      price: 150,
      image:
        "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
    },

  ];

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  const detectHardware = () => {

    setDetected(true);

  };

  return (

    <div className="min-h-screen bg-gray-100 pb-20">

      {/* HERO */}

      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-10 rounded-b-[50px] shadow-2xl">

        <h1 className="text-5xl font-bold mb-5">

          SmartCart Hardware AI

        </h1>

        <p className="text-gray-300 text-lg max-w-2xl">

          Upload screws, motors, pipes, spanners and hardware products.
          AI automatically detects products and shows matching items.

        </p>

        <div className="mt-8 flex flex-wrap gap-5">

          <label className="bg-white text-black px-8 py-4 rounded-2xl font-semibold cursor-pointer hover:scale-105 transition duration-300">

            Upload Product Image

            <input
              type="file"
              hidden
              onChange={handleImage}
            />

          </label>

          <button
            onClick={detectHardware}
            className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl font-semibold transition duration-300"
          >
            Detect Hardware
          </button>

        </div>

      </div>

      {/* IMAGE PREVIEW */}

      {preview && (

        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            Uploaded Image

          </h2>

          <img
            src={preview}
            alt=""
            className="w-full h-[350px] object-cover rounded-3xl"
          />

        </div>

      )}

      {/* AI RESULT */}

      {detected && (

        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-xl">

          <div className="flex flex-wrap items-center justify-between gap-5">

            <div>

              <h2 className="text-4xl font-bold mb-3">

                AI Detection Result

              </h2>

              <p className="text-gray-600 text-lg">

                Detected Product:
                <span className="font-bold text-black">
                  {" "}Steel Screw
                </span>

              </p>

              <p className="text-gray-600 text-lg mt-2">

                Length:
                <span className="font-bold text-black">
                  {" "}35 MM
                </span>

              </p>

              <p className="text-gray-600 text-lg mt-2">

                Confidence:
                <span className="font-bold text-green-600">
                  {" "}98%
                </span>

              </p>

            </div>

            <div className="bg-green-100 text-green-700 px-6 py-4 rounded-2xl font-bold text-xl">

              AI Matched Successfully

            </div>

          </div>

        </div>

      )}

      {/* PRODUCTS */}

      <div className="max-w-7xl mx-auto mt-14 px-5">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold">

            Trending Hardware Products

          </h2>

          <button className="bg-black text-white px-6 py-3 rounded-2xl">

            View All

          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <img
                src={item.image}
                alt=""
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold mb-2">

                  {item.name}

                </h3>

                <p className="text-gray-500 mb-5">

                  High quality hardware product.

                </p>

                <div className="flex items-center justify-between">

                  <span className="text-2xl font-bold text-green-600">

                    ₹{item.price}

                  </span>

                  <button className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-2xl">

                    Add

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}