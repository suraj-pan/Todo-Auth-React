import React from "react";

export default function Header({ darkMode, setDarkMode }) {
    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
            <h1 className="text-xl font-semibold">Make Task Here 👋</h1>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg"
            >
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </header>
    );
}
