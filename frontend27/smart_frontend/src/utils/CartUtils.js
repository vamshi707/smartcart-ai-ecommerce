export const handleAddToCart = (product, navigate) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    localStorage.setItem(
      "pendingCartItem",
      JSON.stringify(product)
    );

    navigate("/login");
    return;
  }

  let existingCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = existingCart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    existingCart = existingCart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  } else {
    existingCart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(existingCart)
  );

  window.dispatchEvent(new Event("cartUpdated"));
};