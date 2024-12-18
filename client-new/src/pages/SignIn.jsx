import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const hardcodedPassword = import.meta.env.VITE_PASS;

  const handleSignIn = () => {
    if (password === hardcodedPassword) {
      login();
      navigate('/');
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <div className="mt-6 w-full max-w-sm">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}

        <button
          onClick={handleSignIn}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
