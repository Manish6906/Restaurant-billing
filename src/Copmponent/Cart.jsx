import React, { useState } from "react";
import axios from "axios";
import { Toaster,toast } from "react-hot-toast";
import imgage from "../assets/Images/biling.png"
const Cart = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: ""
  });
  const API = import.meta.env.VITE_API_URL;

  const updateQuantity = (item, type) => {
    setCart(
      cart
        .map((x) =>
          x.id === item.id
            ? {
                ...x,
                quantity:
                  type === "inc"
                    ? x.quantity + 1
                    : x.quantity - 1,
              }
            : x
        )
        .filter((x) => x.quantity > 0)
    );
  };

  const calculateBill = async () => {
    if (!customer.name || !customer.phone) {
      alert("Enter customer details");
      return;
    }

    const res = await axios.post(
      `${API}/bill/calculate`,
      { cart, customer }
    );

    setTotal(res.data.totalAmount);
    setShowReceipt(true);
    toast.success("✅ Order Saved & Bill Generated!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
<Toaster position="top-right" reverseOrder={false} />
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🛒 Cart Summary
      </h2>

      {/* Cart Items */}
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-2xl shadow-lg space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No items in cart</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <h3 className="font-semibold text-gray-700">
                  {item.name}
                </h3>
                <p className="text-green-600 font-bold">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item, "dec")}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  -
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item, "inc")}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Customer Details */}
      <div className="max-w-3xl mx-auto mt-6 bg-white p-5 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          👤 Customer Details
        </h3>

        <input
          type="text"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Button */}
      <div className="text-center mt-6">
        <button
          onClick={calculateBill}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
        >
          💳 Generate Bill
        </button>
      </div>

      {/* 🔥 Receipt */}
      {showReceipt && (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-2xl border print-area">

          {/* Header */}
          <h2 className="text-xl font-bold text-center">
              <img src ={imgage} alt ="logo " className="h-10 w-10 inline-block mr-2 rounded-md" /> 🍽️ Sharma Restaurant
          </h2>
          <p className="text-center text-xs text-gray-500">
            Near City Center, India
          </p>

          <div className="mt-4 text-sm">
            <p><b>Name:</b> {customer.name}</p>
            <p><b>Phone:</b> {customer.phone}</p>
            <p><b>Date:</b> {new Date().toLocaleString()}</p>
          </div>

          <hr className="my-3 border-dashed" />

          {/* Items */}
          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-3 border-dashed" />

          {/* Total */}
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <hr className="my-3 border-dashed" />

          {/* Footer */}
          <p className="text-center text-green-600 font-semibold">
            🙏 Thank You! Visit Again
          </p>
          <p className="text-center text-xs text-gray-500">
            Powered by Your Restaurant
          </p>

          {/* Print */}
          <div className="text-center mt-4">
            <button
              onClick={() => window.print()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              🖨️ Print Receipt
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;