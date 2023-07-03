import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Dashboard from "./Views/Dashboard";
import Homepage from "./Views/Homepage";
import Loginpage from "./Views/Loginpage";
import Navbar from "./Views/Navbar";
import Registerpage from "./Views/Registerpage";
import MyCart from "./Views/MyCart";
import { CartProvider } from "./context/CartContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";

function App() {
  let token = localStorage.getItem("Authorization");
  let user = null;
  useEffect(() => {
    if (token) {
      user = jwtDecode(localStorage.getItem("Authorization"));
      console.log(user);
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            {/* <PrivateRoute element={<Dashboard/>} path="/dashboard" /> */}
            <>
              <Route element={<Homepage />} path="/" />
              <Route element={<Loginpage />} path="/login" />
              <Route element={<Registerpage />} path="/register" />
              <Route element={<MyCart />} path="/mycart" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route
                exact
                path="/"
                render={() =>
                  user ? <Navigate to="/dashboard" /> : <Route element={<Homepage />} path="/" />
                }
              />
            </>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
