import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./Copmponent/HeroSection";
import SectionOne from "./Copmponent/SectionOne";
import SectionTwo from "./Copmponent/SectionTwo";
import SectionThree from "./Copmponent/SectionThree";
import PremiumSection from "./Copmponent/PremiumSection";
import TextSection from "./Copmponent/TextSection";
import IconSection from "./Copmponent/IconSection";
import Navbar from "./Copmponent/Navbar";
import Orders from './Copmponent/Orders';
import FirsPage from "./Copmponent/FirsPage";
import Cart from "./Copmponent/Cart";
import Dashboard from "./Copmponent/Dashboard";
import GoogleLogin from "./Copmponent/GoogleLogin";
import Menu from "./Copmponent/Menu";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<FirsPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<GoogleLogin />} />
      </Routes>
    </>
  );
}

export default App;