import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./layouts/CustomerLayout";

import Home from "./pages/Home";
import All from "./pages/All";
import Grocery from "./pages/Grocery";
import Fashion from "./pages/Fashion";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ScrollToTop";

import Admin from "./dashboard/Admin";
import FashionAdmin from "./dashboard/FashionAdmin";
import GroceryAdmin from "./dashboard/GroceryAdmin";

function App() {

  return (

    <BrowserRouter>
    <ScrollToTop />

      <Routes>

        <Route element={<CustomerLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/Home" element={<Home />} />

          <Route path="/all" element={<All />} />

          <Route path="/grocery" element={<Grocery />} />

          <Route path="/fashion" element={<Fashion />} />

          <Route path="/electronics" element={<Electronics />} />

          <Route path="/furniture" element={<Furniture />} />

          <Route path="/cart" element={<Cart />} />

        </Route>

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/fashion-admin"
          element={<FashionAdmin />}
        />

        <Route
          path="/grocery-admin"
          element={<GroceryAdmin />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App;