import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [password, setPassword] = useState(""); // State to store password input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook to navigate between pages

  const hardcodedPassword = "123"; // Hardcoded password

  const handleSignIn = (e) => {
    e.preventDefault();

    if (password === hardcodedPassword) {
      // If password matches, redirect to home page
      navigate("/home");
    } else {
      // If password doesn't match, show error
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Sign In
        </h1>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
