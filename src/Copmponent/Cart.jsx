import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import image from "../assets/Images/biling.png";

const Cart = ({ cart = [], setCart = () => {} }) => {
  const [total, setTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });
// cjjdsjjs
  const API = import.meta.env.VITE_API_URL;

  // Increase / Decrease Quantity
  const updateQuantity = (item, type) => {
    setCart(
      cart
        .map((x) =>
          x.id === item.id
            ? {
                ...x,
                quantity:
                  type === "inc" ? x.quantity + 1 : x.quantity - 1,
              }
            : x
        )
        .filter((x) => x.quantity > 0)
    );
  };

  // Generate Bill
  const calculateBill = async () => {
    if (!customer.name || !customer.phone) {
      toast.error("Enter customer details");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/bill/calculate`, {
        cart,
        customer,
      });

      setTotal(res.data.totalAmount);
      setShowReceipt(true);

      toast.success("✅ Order Saved & Bill Generated!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to generate bill");
    } finally {
      setLoading(false);
    }
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
                <h3 className="font-semibold text-gray-700">{item.name}</h3>
                <p className="text-green-600 font-bold">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item, "dec")}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  -
                </button>

                <span className="font-semibold text-lg">{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item, "inc")}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
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
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* Generate Button */}
      <div className="text-center mt-6">
        <button
          onClick={calculateBill}
          disabled={loading || cart.length === 0}
          className={`px-8 py-3 rounded-xl text-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mx-auto
            ${
              loading || cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  className="opacity-90"
                  fill="white"
                  d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
                />
              </svg>
              Generating...
            </>
          ) : (
            <>💳 Generate Bill</>
          )}
        </button>
      </div>

      {/* Receipt */}
      {showReceipt && (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-2xl border print-area">
          {/* Header */}
          <h2 className="text-xl font-bold text-center flex items-center justify-center">
            <img
              src={image}
              alt="logo"
              className="h-10 w-10 mr-2 rounded-md"
            />
            🍽️ Sharma Restaurant
          </h2>

          <p className="text-center text-xs text-gray-500">
            Near City Center, India
          </p>

          <div className="mt-4 text-sm space-y-1">
            <p>
              <b>Name:</b> {customer.name}
            </p>
            <p>
              <b>Phone:</b> {customer.phone}
            </p>
            <p>
              <b>Date:</b> {new Date().toLocaleString()}
            </p>
          </div>

          <hr className="my-3 border-dashed" />

          {/* Items */}
          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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