import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/Constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="bg-red-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <div className="logo-container">
          <img
            className="w-20 transition-transform transform hover:scale-110 duration-200"
            src={LOGO_URL}
            alt="Logo"
          />
        </div>

        {/* Navigation and Status Section */}
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-white text-sm md:text-lg">
            <li>
              Online Status:{" "}
              <span className="font-bold">
                {onlineStatus ? "✅" : "🔴"}
              </span>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-yellow-300 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-300 transition duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-300 transition duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="font-bold hover:text-yellow-300 transition duration-200"
              >
                Cart ({cartItems.length} items)
              </Link>
            </li>
          </ul>

          {/* Login/Logout Button */}
          <button
            className="ml-4 px-4 py-2 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-600 transition duration-200"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>

          {/* User Greeting */}
          {loggedInUser && (
            <span className="text-white font-semibold ml-4 hidden md:inline">
              Welcome, {loggedInUser}
            </span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
