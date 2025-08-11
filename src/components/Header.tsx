import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center justify-between">
          <div style={{ paddingRight: "15px" }}>
            <img
              src="./images/universal-client-logo.png"
              className="header-logo-class"
              alt="universal-client-logo"
            />
          </div>
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            Universal Client
          </Link>
        </div>

        <div className="flex items-center space-x-6">
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
      </nav>
    </header>
  );
}
