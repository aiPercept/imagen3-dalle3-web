import os
from flask import Flask, request, jsonify, send_file
from vertexai.preview.vision_models import ImageGenerationModel
from flask_cors import CORS 

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Google Cloud Configuration
PROJECT_ID = "smiling-height-441611-c1"  # Replace with your Google Cloud project ID
LOCATION = "us-central1"  # Modify if needed
CREDENTIALS_FILE = "google-res.json"  # Path to your GCP service account JSON key

# Set up GCP credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_FILE

# Authenticate and initialize Vertex AI
import vertexai
vertexai.init(project=PROJECT_ID, location=LOCATION)

# Define the directory for saving images temporarily
TEMP_IMAGE_DIR = "temp_images"
os.makedirs(TEMP_IMAGE_DIR, exist_ok=True)

# Image Generation Endpoint
@app.route("/generate-image", methods=["POST"])
def generate_image():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        prompt = data.get("prompt", "aerial shot of a river flowing up a mystical valley")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Generate the image using Vertex AI
        model = ImageGenerationModel.from_pretrained("imagegeneration@006")
        response = model.generate_images(prompt=prompt)

        # Save the image locally in the temp_images directory
        image_path = os.path.join(TEMP_IMAGE_DIR, "generated_image.png")
        response.images[0].save(image_path)

        # Return the image directly to the client
        return send_file(image_path, mimetype="image/png")

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
