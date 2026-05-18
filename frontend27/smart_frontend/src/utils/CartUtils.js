export const handleAddToCart = (
  product,
  navigate
) => {

  // CHECK LOGIN

  const isLoggedIn =sessionStorage.getItem("isLoggedIn");

  // USER NOT LOGGED IN

  if (!isLoggedIn) {

    // SAVE PRODUCT TEMPORARILY

    localStorage.setItem(
      "pendingCartItem",
      JSON.stringify(product)
    );

    // OPEN LOGIN PAGE

    navigate("/login");

    return;
  }

  // GET EXISTING CART

  let existingCart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  // CHECK PRODUCT EXISTS

  const existingItem =
    existingCart.find(
      (item) => item.id === product.id
    );

  // IF PRODUCT EXISTS

  if (existingItem) {

    existingCart = existingCart.map(
      (item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
    );

  } else {

    // NEW PRODUCT

    existingCart.push({
      ...product,
      quantity: 1,
    });

  }

  // SAVE CART

  localStorage.setItem(
    "cart",
    JSON.stringify(existingCart)
  );

  // UPDATE NAVBAR COUNT

  window.dispatchEvent(
    new Event("cartUpdated")
  );
};