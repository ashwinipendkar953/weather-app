import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetState } from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
    navigate("/login");
    window.location.reload();
  };

  return (
    <header>
      <nav className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 dark:bg-gray-900 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl whitespace-nowrap text-white font-bold">
              WeatherWave
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10  border-white border-2  h-10 justify-center text-sm text-black-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block py-2 text-lg px-3 fw-semibold rounded md:bg-transparent 
                    text-white hover:underline md:p-0  
                    ${
                      isActive
                        ? "underline"
                        : "hover:text-white hover:underline"
                    }`
                      }
                      aria-current="page"
                    >
                      Cities
                    </NavLink>
                  </li>
                  <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse group">
                    <button
                      type="button"
                      className="flex text-sm bg-white rounded-full md:me-0 hover:ring-4 hover:ring-gray-300 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      id="user-menu-button"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="w-10 h-10 flex justify-center items-center text-xl rounded-full uppercase">
                        {user?.name?.charAt(0)}
                      </div>
                    </button>

                    {/* Dropdown menu */}
                    <div
                      className="absolute top-[20px] right-[10px] z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 group-hover:block"
                      id="user-dropdown"
                    >
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white capitalize">
                          {user?.name}
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          {user?.email}
                        </span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 text-lg px-3 fw-semibold rounded md:bg-transparent 
                      text-white md:p-0 hover:underline
                      ${
                        isActive
                          ? "text-white underline"
                          : "hover:text-white hover:underline"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
