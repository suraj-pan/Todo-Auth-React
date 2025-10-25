import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB5hFAOz_4yRGGyYKPFHvqqXgItKbclTSs",
    authDomain: "movies-ada4d.firebaseapp.com",
    databaseURL: "https://movies-ada4d-default-rtdb.firebaseio.com",
    projectId: "movies-ada4d",
    storageBucket: "movies-ada4d.firebasestorage.app",
    messagingSenderId: "852856357076",
    appId: "1:852856357076:web:a319c74e319fc895857b41"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
