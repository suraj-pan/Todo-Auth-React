import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import {Toaster} from "react-hot-toast";

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <AuthProvider>
            <TaskProvider>
                <Router>
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            style: {
                                background: "#333",
                                color: "#fff",
                                borderRadius: "8px",
                                padding: "12px",
                            },
                        }}
                    />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected Routes */}
                        <Route
                            path="/*"
                            element={
                                <ProtectedRoute>
                                    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
                                        <Sidebar />
                                        <div className="flex-1 flex flex-col">
                                            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                                            <main className="flex-1 overflow-y-auto p-6">
                                                <Routes>
                                                    <Route path="/" element={<Dashboard />} />
                                                    <Route path="/analytics" element={<Analytics />} />
                                                    <Route path="/settings" element={<Settings />} />
                                                </Routes>
                                            </main>
                                        </div>
                                    </div>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </TaskProvider>
        </AuthProvider>
    );
}
