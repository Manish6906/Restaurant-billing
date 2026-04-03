import React, { useState, useEffect } from "react";
import menu from "../Data";
import { Link } from "react-router-dom";

const Menu = ({ cart, setCart }) => {

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === item.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // 🔍 Filtered Data
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination based on filtered data
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = filteredMenu.slice(startIndex, startIndex + itemsPerPage);

  // 🔥 Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // 🔥 Scroll top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
<div className="sm:flex  items-center space-x-70">
     <button className="py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md"><Link to="/Orders"> All Orders</Link></button>
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🍽️ Our Menu
      </h2>
</div>

      {/* 🔍 Search Input */}
      <div className="max-w-md mx-auto mb-8 ">
        <input
          type="text"
          placeholder="🔍 Search food item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {item.name}
              </h3>

              <p className="text-xl font-bold text-green-600 mb-4">
                ₹{item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="mt-auto bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl hover:scale-105 transition"
              >
                ➕ Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No items found 😔
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredMenu.length > itemsPerPage && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            ⬅ Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white border"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Next ➡
          </button>

        </div>
      )}
    </div>
  );
};

export default Menu;