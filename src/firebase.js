


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUQbVoMb6JQyG-I04HxH9_v9I1QY3PvUU",
  authDomain: "signin-15d07.firebaseapp.com",
  projectId: "signin-15d07",
  storageBucket: "signin-15d07.firebasestorage.app",
  messagingSenderId: "449560188892",
  appId: "1:449560188892:web:b7a0753d7f7ad2d7666119",
  measurementId: "G-HMHZGB4ER3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT (ye hi missing tha)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();