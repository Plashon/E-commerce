import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Profile from "./Profile";
import UserIcon from "../icon/UserIcon";
import Modal from "./Modal";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul>
            <li>
              <a href="/shop">All</a>
            </li>
            <li>
              <a href="/shop?category=clothing">Clothing</a>
            </li>
            <li>
              <a href="/shop?category=accessories">Accessories</a>
            </li>
            <li>
              <a href="/shop?category=gadgets">Gadgets</a>
            </li>
            <li>
              <a href="/shop?category=swag">Swag</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="">Service</a>
      </li>
      <li>
        <a href="">Promotion</a>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 z-50 sticky top-0 bg-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost font-semibold text-xl">
          <img src="/logo.png" alt="" className="w-8 h-8" />
          SE Souvenirs
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end space-x-1">
        {
          //ternary operator
          user ? (
            <Profile />
          ) : (
            <div className="flex space-x-4">
              <div
                className="btn "
                onClick={() =>
                  document.getElementById("Register").showModal()
                }
              >
                Register{" "}
              </div>
              <div
                className="btn bg-red text-white "
                onClick={() =>
                  document.getElementById("Login").showModal()
                }
              >
                <UserIcon />
                Login{" "}
              </div>
            </div>
          )
        }
      </div>
      <Modal name="Login" />
      <Modal name="Register" />
    </div>
  );
};

export default Navbar;
