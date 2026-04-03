import React, { useState } from "react";
import FirsPage from "./Copmponent/FirsPage";
import Orders from "./Copmponent/Orders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast from "./assets/Images/biling.png"
function App() {


  return (
     <>
     {/* Navbar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 shadow-md sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-center">
           <img src ={toast} alt ="logo " className="h-10 w-10 inline-block mr-2 rounded-md" /> 🍽️ Sharma Restaurant Billing System
        </h1>
      </div>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirsPage />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
 </>
  );
}

export default App;