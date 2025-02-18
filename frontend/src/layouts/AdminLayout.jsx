import React from "react";
import { Outlet } from "react-router";
import logo from "/logo.png";
import "./main.css";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const AdminLayout = () => {
  const isAdmin = true;
  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify-start mb-3 ">
                  <img src={logo} className="w-20" />
                  <div className="badge">admin</div>
                </a>
              </li>
              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/dashboard">
                  <MdDashboard />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/manage-orders">
                  <FaShoppingCart />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/create">
                  <FaCirclePlus />
                  Create New Product
                </a>
              </li>
              <li>
                <a href="/manage-product">
                  <AiOutlineProduct />
                  Manage Product
                </a>
              </li>
              <li>
                <a href="/all-user">
                  <FaUserCircle />
                  All Users
                </a>
              </li>
              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/create">Home</a>
              </li>
              <li>
                <a href="/create">Product</a>
              </li>
              <li>
                <a href="/create">Order Tracking</a>
              </li>
              <li>
                <a href="/create">Customer Support</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>you are not Admin! Back to Home</div>
      )}
    </div>
  );
};

export default AdminLayout;
