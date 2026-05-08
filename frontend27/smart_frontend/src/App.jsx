import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import All from "./pages/All";
import Groceries from "./pages/Groceries";
import Fashion from "./pages/Fashion";
import Electronics from "./pages/Electronics";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Furniture from "./pages/Furniture";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

         <Route
          path="/All"
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
          path="/Furniture"
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

      </Routes>

    </BrowserRouter>

  );
}

export default App;