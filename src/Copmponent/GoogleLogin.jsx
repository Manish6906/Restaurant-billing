import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);

  //     const user = result.user;

  //     // 👉 user data store (optional but recommended)
  //     localStorage.setItem("user", JSON.stringify(user));

  //     // 👉 redirect with data
  //     navigate("/dashboard", { state: { user } });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    console.log(user,"result");
    

    // ✅ Clean object (serializable)
    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      uid: user.uid,
    };

    // localStorage me save
    localStorage.setItem("user", JSON.stringify(userData));

    // redirect
    navigate("/dashboard", { state: userData });

  } catch (error) {
    console.log(error);
  }
};
  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;