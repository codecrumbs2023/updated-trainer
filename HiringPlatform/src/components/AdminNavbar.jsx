import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete token from localStorage
    localStorage.removeItem("token");
    // Redirect to home page
    navigate("/");
  };

  return (
    <nav className="bg-gray-800">
      <ul className="flex">
        <li className="mr-6">
          <NavLink
            to="/admin-dashboard"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
            activeClassName="bg-yellow-500"
          >
            Admin Dashboard
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            to="/trainers-details"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
            activeClassName="bg-yellow-500"
          >
            Trainers Details
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            to="/companies-details"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
            activeClassName="bg-green-500"
          >
            Companies Details
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            to="/business-requests"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
            activeClassName="bg-purple-500"
          >
            Business Requests
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            to="/purchase-orders"
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
            activeClassName="bg-pink-500"
          >
            Purchase Order
          </NavLink>
        </li>
        <li className="mr-6">
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 px-4 py-2 inline-block transition duration-300 ease-in-out rounded-full"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
