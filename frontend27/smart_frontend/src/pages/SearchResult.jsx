import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAddToCart } from "../utils/cartUtils";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const query =
    new URLSearchParams(location.search).get("query") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/search/?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend data:", data);
        setProducts(data);
      })
      .catch((err) => console.log("Search error:", err));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for "{query}"
      </h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={`${product.category}-${product.id}-${index}`}
              className="bg-white p-4 rounded-2xl shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-contain"
              />

              <h2 className="font-bold mt-3">
                {product.name}
              </h2>

              <p className="font-bold">₹{product.price}</p>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>

              <button
  onClick={() => {
    if (product.category === "Fashion") {
      navigate("/product", {
        state: { product },
      });
    } else {
      handleAddToCart(product, navigate);
    }
  }}
  className="mt-3 w-full bg-pink-500 text-white font-bold py-2 rounded-xl hover:bg-pink-600 transition"
>
  {product.category === "Fashion" ? "View Product" : "ADD"}
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}