import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./layouts/CustomerLayout";

import Home from "./pages/Home";
import All from "./pages/All";
import Groceries from "./pages/Groceries";
import Fashion from "./pages/Fashion";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import Cart from "./pages/Cart";

import Admin from "./dashboard/Admin";
import FashionAdmin from "./dashboard/FashionAdmin";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* CUSTOMER LAYOUT */}

        <Route element={<CustomerLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/all" element={<All />} />

          <Route path="/groceries" element={<Groceries />} />

          <Route path="/fashion" element={<Fashion />} />

          <Route path="/electronics" element={<Electronics />} />

          <Route path="/furniture" element={<Furniture />} />

          <Route path="/cart" element={<Cart />} />

        </Route>

        {/* ADMIN PAGES */}

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/fashion-admin"
          element={<FashionAdmin />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App;