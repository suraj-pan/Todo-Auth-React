import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "react-hot-toast";

export default function Login() {
    const { login, setupRecaptcha } = useAuth();
    const navigate = useNavigate();

    const [isEmailMode, setIsEmailMode] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // --- Email Login ---
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            // alert("Please enter email and password.");
            toast.error("Please enter email and password.");
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.code);
        } finally {
            setLoading(false);
        }
    };

    // --- Phone Login ---
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (!phone) return setError("Enter a valid phone number");
        try {
            const result = await setupRecaptcha(phone);
            setConfirmation(result);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await confirmation.confirm(otp);
            navigate("/");
        } catch (err) {
            setError("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96 text-gray-800 dark:text-gray-100">
                <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back 👋</h2>

                {/* Toggle */}
                {/*<div className="flex justify-center mb-6">*/}
                {/*    <button*/}
                {/*        onClick={() => setIsEmailMode(true)}*/}
                {/*        className={`px-4 py-2 rounded-l-lg border ${*/}
                {/*            isEmailMode ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"*/}
                {/*        }`}*/}
                {/*    >*/}
                {/*        Email*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        onClick={() => setIsEmailMode(false)}*/}
                {/*        className={`px-4 py-2 rounded-r-lg border ${*/}
                {/*            !isEmailMode ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"*/}
                {/*        }`}*/}
                {/*    >*/}
                {/*        Mobile*/}
                {/*    </button>*/}
                {/*</div>*/}

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-center text-sm">
                        {error}
                    </div>
                )}

                {/* EMAIL LOGIN FORM */}
                {isEmailMode ? (
                    <form onSubmit={handleEmailLogin}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                        {/* Password Input with Eye Icon */}
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"} // 👈 Toggle type
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 pr-10"
                                required
                            />
                            {/* 👁️ Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
                                className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-2 rounded-lg font-medium text-white ${
                                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                ) : (
                    // PHONE LOGIN FORM
                    <div>
                        {!confirmation ? (
                            <form onSubmit={handleSendOtp}>
                                <input
                                    type="text"
                                    placeholder="+91XXXXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                                <div id="recaptcha-container"></div>
                                <button
                                    type="submit"
                                    className="w-full p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Send OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp}>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full p-2 mb-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full p-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                                >
                                    Verify OTP
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {/* Footer Links */}
                <p className="text-sm text-center mt-6">
                    New user?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
