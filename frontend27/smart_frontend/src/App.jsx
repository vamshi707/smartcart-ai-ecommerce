import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import All from "./pages/All";
import Groceries from "./pages/Groceries";
import Fashion from "./pages/Fashion";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import Cart from "./pages/Cart";

import FashionAdmin from "./dashboard/FashionAdmin";
import Admin from "./dashboard/Admin";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/all"
          element={<All />}
        />

        <Route
          path="/groceries"
          element={<Groceries />}
        />

        <Route
          path="/fashion"
          element={<Fashion />}
        />

        <Route
          path="/electronics"
          element={<Electronics />}
        />

        <Route
          path="/furniture"
          element={<Furniture />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/fashion-admin"
          element={<FashionAdmin />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;