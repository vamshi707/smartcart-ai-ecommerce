import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./layouts/CustomerLayout";
import OrderSuccess from "./pages/OrderSuccess";
import Home from "./pages/Home";
import All from "./pages/All";
import Grocery from "./pages/Grocery";
import Fashion from "./pages/Fashion";
import Electronics from "./pages/Electronics";
import Furniture from "./pages/Furniture";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import SearchResult from "./pages/SearchResult";
import MyOrders from "./pages/MyOrders";
import Admin from "./dashboard/Admin";
import FashionAdmin from "./dashboard/FashionAdmin";
import ElectronicsAdmin from "./dashboard/ElectronicsAdmin";
import GroceryAdmin from "./dashboard/GroceryAdmin";
import FurnitureAdmin from "./dashboard/FurnitureAdmin";
import BeautyAdmin from "./dashboard/BeautyAdmin";
import Beauty from "./pages/Beauty";
import Payment from "./pages/Payment";
import AdminOrders from "./dashboard/AdminOrders";

function App() {

  return (

    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        <Route element={<CustomerLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Home />} />

          <Route path="/all" element={<All />} />

          <Route path="/grocery" element={<Grocery />} />

          <Route path="/fashion" element={<Fashion />} />

          <Route path="/electronics" element={<Electronics />} />

          <Route path="/furniture" element={<Furniture />} />

          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<Cart />} />
         <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/order-success" element={<OrderSuccess />}/>

          <Route path="/payment" element={<Payment />} />
          <Route path="/search" element={<SearchResult />} />
           <Route path="/beauty" element={<Beauty />} />
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

        <Route
          path="/hardware"
          element={<ElectronicsAdmin />}
        />
        <Route
            path="/furniture-admin"
            element={<FurnitureAdmin />}
          />
          <Route
  path="/beauty-admin"
  element={<BeautyAdmin />}
/>

      <Route
  path="/admin-orders"
  element={<AdminOrders />}
/>

      </Routes>
      

    </BrowserRouter>

  );
}

export default App;