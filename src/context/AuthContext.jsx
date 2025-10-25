import React, { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Email Signup
    const signup = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(result.user);
        alert("Verification email sent! Please verify before logging in.");
    };

    // Email Login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Phone OTP
    const setupRecaptcha = (phoneNumber) => {
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
        });
        return signInWithPhoneNumber(auth, phoneNumber, recaptcha);
    };

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider
            value={{ user, signup, login, logout, setupRecaptcha, loading }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
