import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("tw-dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("tw-dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="tw-flex tw-justify-end">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="tw-bg-gray-200 dark:tw-bg-gray-800 tw-p-2 tw-rounded-full tw-shadow-md"
      >
        {darkMode ? (
          <FaSun className="tw-text-yellow-400" />
        ) : (
          <FaMoon className="tw-text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
