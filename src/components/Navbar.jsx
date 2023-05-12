import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Store } from "../context/GlobalContext";

const Navbar = () => {
  const { state, dipatchLogout } = useContext(Store);

  const handleLogout = () => {
    localStorage.removeItem("User");
    dipatchLogout();
  };

  return (
    <div>
      <header aria-label="Site Header" className="shadow-sm">
        <div className="mx-auto max-w-screen-xl p-4">
          <div className="flex items-center justify-between gap-4 lg:gap-10">
            <div className="flex lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">Logo</span>
                <span className="flex items-center justify-center inline-block h-10 w-32 rounded-lg bg-gray-200">
                  Logo
                </span>
              </Link>
            </div>

            <nav
              aria-label="Site Nav"
              className="hidden gap-8 text-sm font-medium md:flex"
            >
              <Link to={"/products"} className="text-gray-500">
                Products
              </Link>
              <Link to={"/cart"} className="text-gray-500">
                Cart
              </Link>
              <Link to={"/"} className="text-gray-500">
                About
              </Link>
              <Link to={"/"} className="text-gray-500">
                Contact
              </Link>
            </nav>

            <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
              {state.isLogged ? (
                <>
                  <Link
                    className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500"
                    to="/"
                  >
                    {state.username}
                  </Link>

                  <Link
                    onClick={handleLogout}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                    to="/"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500"
                    to="/login"
                  >
                    Log in
                  </Link>

                  <Link
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                    to="/register"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <div className="lg:hidden">
              <button
                className="rounded-lg bg-gray-100 p-2 text-gray-600"
                type="button"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
