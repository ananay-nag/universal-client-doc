import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo + Title */}
        <div className="flex items-center">
          <div className="pr-4">
            <img
              src="./images/universal-client-logo.png"
              className="header-logo-class"
              alt="universal-client-logo"
            />
          </div>
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            Universal Client
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${
                isActive
                  ? "underline underline-offset-4 decoration-indigo-600"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              `text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${
                isActive
                  ? "underline underline-offset-4 decoration-indigo-600"
                  : ""
              }`
            }
          >
            Documentation
          </NavLink>
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-gray-900 shadow-inner">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${
                isActive
                  ? "underline underline-offset-4 decoration-indigo-600"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/docs"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${
                isActive
                  ? "underline underline-offset-4 decoration-indigo-600"
                  : ""
              }`
            }
          >
            Documentation
          </NavLink>
          <DarkModeToggle />
        </div>
      )}
    </header>
  );
}
