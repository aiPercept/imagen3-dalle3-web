import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState(""); // State to store the prompt
  const [imageSrc, setImageSrc] = useState(null); // State to store the image URL
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const generateImage = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      setImageSrc(null); // Clear previous images

      // POST request to the backend API
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-image", // Update the backend URL if necessary
        { prompt: prompt },
        { responseType: "blob" }
      );

      // Create a local URL for the received image blob
      const imageUrl = URL.createObjectURL(response.data);
      setImageSrc(imageUrl); // Set the image source to display
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          AI Image Generator
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter a text prompt below and generate a unique AI-powered image.
        </p>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Describe your image..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateImage}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        {imageSrc && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Generated Image:
            </h3>
            <img
              src={imageSrc}
              alt="Generated"
              className="w-full max-w-sm mx-auto rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
