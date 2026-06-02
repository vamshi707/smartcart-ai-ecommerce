export const handleAddToCart = (product, navigate) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  const userEmail = localStorage.getItem("userEmail");
  const cartKey = userEmail ? `cart_${userEmail}` : "cart";

  let existingCart =
    JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItem = existingCart.find(
    (item) =>
      item.id === product.id &&
      item.category === product.category
  );

  if (existingItem) {
    existingCart = existingCart.map((item) =>
      item.id === product.id &&
      item.category === product.category
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    existingCart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(existingCart));

  window.dispatchEvent(new Event("cartUpdated"));

  
};