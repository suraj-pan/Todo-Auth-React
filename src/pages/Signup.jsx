import React, { useState } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            // alert("Please enter email and password.");
            toast.error("Please enter email and password.");
            return;
        }
        try {
            // ✅ Create user
            const userCred = await createUserWithEmailAndPassword(auth, email, password);

            // ✅ Send verification email
            await sendEmailVerification(userCred.user);

            toast.success("✅ Registered successfully! Please verify your email before login.");
            navigate("/login");
        } catch (error) {
            // ✅ Handle user already exists
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already registered!");
                // alert("⚠️ This email is already registered. Please log in instead.");
            } else if (error.code === "auth/invalid-email") {
                toast.error('❌ Invalid email format. Please enter a valid email.')
                // alert("❌ Invalid email format. Please enter a valid email.");
            } else if (error.code === "auth/weak-password") {
                toast.error('⚠️ Password is too weak. Please use at least 6 characters.')
                // alert("⚠️ Password is too weak. Please use at least 6 characters.");
            }else if(error.code === "auth/too-many-requests"){
                toast.error('⚠ Too many Hits.. try later')
            } else {
                console.error(error);
                alert("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleEmailSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        required
                    />

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
                        disabled={loading}
                        className={`w-full text-white p-2 rounded-lg transition ${
                            loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {loading ? "Registering..." : "Continue"}
                    </button>
                </form>

                <p className="text-sm text-center mt-6">
                    Already registered?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
