import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Collections from "./pages/Collections";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminProtectedRoute from "./admin-side/components/AdminProtected";
import UserRoute from "./components/UserRoute";

import AdminRoutes from "./admin-side/components/AdminRoutes";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>

        {/* ADMIN — must be before /* */}
        <Route path="/admin/*" element={
          <AdminProtectedRoute>
            <AdminRoutes />
          </AdminProtectedRoute>
        } />

        {/* USER CATCH-ALL */}
        <Route path="/*" element={
          <UserRoute>
            <>
              <Navbar />
              <Routes>
                {/* Public */}
                <Route path="/"                element={<Home />} />
                <Route path="/products"        element={<Products />} />
                <Route path="/contact"         element={<Contact />} />
                <Route path="/about"           element={<About />} />
                <Route path="/login"           element={<Login />} />
                <Route path="/collections"     element={<Collections />} />
                <Route path="/collections/:id" element={<ProductDetails />} />

                {/* Protected */}
                <Route path="/cart" element={
                  <ProtectedRoute><Cart /></ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute><Checkout /></ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute><Orders /></ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute><Profile /></ProtectedRoute>
                } />
                <Route path="/placeorder" element={
                  <ProtectedRoute><PlaceOrder /></ProtectedRoute>
                } />
              </Routes>
              <Footer />
            </>
          </UserRoute>
        } />

      </Routes>

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;