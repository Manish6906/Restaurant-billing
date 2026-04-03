import React, { useState } from 'react'
import Menu from "./Menu";
import Cart from "./Cart";
function FirsPage() {
     const [cart, setCart] = useState([]);
  return (
    <>
     <div className="min-h-screen bg-gray-100">
      
      

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        
        {/* Menu Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4">
          <Menu cart={cart} setCart={setCart} />
        </div>

        {/* Cart Section */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <Cart cart={cart} setCart={setCart} />
        </div>

      </div>
    </div>
      
    </>
  )
}

export default FirsPage
