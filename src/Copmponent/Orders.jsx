import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openRow, setOpenRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
const API = import.meta.env.VITE_API_URL;
  const ordersPerPage = 5;

  useEffect(() => {
    axios
      .get(`${API}/bill/all`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 Reverse order (latest first)
// 🔥 Correct Sorting (Latest First)
const sortedOrders = [...orders].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

  // 🔥 Date Filter
  const filteredOrders = dateFilter
    ? sortedOrders.filter((order) => {
        const orderDate = new Date(order.createdAt)
          .toISOString()
          .split("T")[0];
        return orderDate === dateFilter;
      })
    : sortedOrders;

  // 🔥 Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  // 🔥 Total Revenue (filtered)
  const totalRevenue = filteredOrders.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );

  // 🔥 Delete
  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/bill/delete/${id}`);
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Top */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <Link
          to="/"
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg"
        >
          ⬅ Back
        </Link>

        <h2 className="text-2xl font-bold text-gray-800">
          📊 Orders Dashboard
        </h2>

        {/* 🔍 Date Filter */}
       <div className="relative w-full sm:w-auto">

  {/* Label */}
  <label className="block text-sm font-medium text-gray-600 mb-1">
    📅 Filter by Date
  </label>

  {/* Input Box */}
  <div className="flex items-center bg-white border rounded-xl shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">

    {/* Icon */}
    <span className="text-gray-400 mr-2">📆</span>

    <input
      type="date"
      value={dateFilter}
      onChange={(e) => {
        setDateFilter(e.target.value);
        setCurrentPage(1);
      }}
      className="outline-none bg-transparent text-gray-700 w-full"
    />

    {/* Clear Button */}
    {dateFilter && (
      <button
        onClick={() => setDateFilter("")}
        className="text-gray-400 hover:text-red-500 ml-2"
      >
        ✖
      </button>
    )}
  </div>
</div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-bold text-orange-500">
            {filteredOrders.length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Total Revenue</p>
          <h3 className="text-2xl font-bold text-green-600">
            ₹{totalRevenue}
          </h3>
        </div>

      </div>

      {/* Table */}
      {currentOrders.length === 0 ? (
        <p className="text-center text-gray-500">No Orders Found 😔</p>
      ) : (
        <div className="max-w-6xl mx-auto">

          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
            <table className="w-full text-left">

              <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order, index) => (
                  <React.Fragment key={order._id}>

                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {(currentPage - 1) * ordersPerPage + index + 1}
                      </td>

                      <td className="p-4">{order.customerName}</td>

                      <td className="p-4">{order.phone}</td>

                      <td className="p-4">
                        {order.items.length} items
                      </td>

                      <td className="p-4 text-green-600 font-bold">
                        ₹{order.totalAmount}
                      </td>

                      <td className="p-4 text-sm">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>

                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() =>
                            setOpenRow(openRow === index ? null : index)
                          }
                          className="bg-indigo-500 text-white px-2 py-1 rounded"
                        >
                          View
                        </button>

                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {/* Expand */}
                    {openRow === index && (
                      <tr className="bg-gray-50">
                        <td colSpan="7" className="p-4">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{item.name}</span>
                              <span>
                                ₹{item.price} x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}

                  </React.Fragment>
                ))}
              </tbody>

            </table>
          </div>

          {/* 🔥 Pagination */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-white border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Next
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Orders;