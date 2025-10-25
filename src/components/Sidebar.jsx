import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation();
    const navItems = [
        { name: "Dashboard", path: "/" },
        { name: "Analytics", path: "/analytics" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
            <div className="p-6 text-2xl font-bold">TaskFlow Pro</div>
            <nav className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`p-2 rounded-lg transition ${
                            pathname === item.path
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
