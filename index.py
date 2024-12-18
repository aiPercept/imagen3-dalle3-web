import os
import sys

# Install required dependencies at runtime
try:
    from google.cloud import aiplatform
    from vertexai.preview.vision_models import ImageGenerationModel
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "google-cloud-aiplatform"])
    from google.cloud import aiplatform
    from vertexai.preview.vision_models import ImageGenerationModel

# Authenticate Google Cloud (Make sure you have a valid key file or gcloud configured)
def authenticate_gcp():
    # Set your project information
    PROJECT_ID = "smiling-height-441611-c1"  # Replace with your project ID
    LOCATION = "us-central1"  # Change location if needed

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google-res.json"  # Replace with your key file
    print("Initializing Vertex AI...")
    import vertexai
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    return PROJECT_ID, LOCATION

def generate_image(prompt):
    print(f"Loading model and generating image for prompt: '{prompt}'...")
    # Load the Vertex AI Image Generation model
    generation_model = ImageGenerationModel.from_pretrained("imagegeneration@006")

    # Generate the image
    response = generation_model.generate_images(prompt=prompt)
    
    # Display or save the image
    image = response.images[0]
    image_path = "generated_image.png"
    image.save(image_path)
    print(f"Image generated and saved to {image_path}")

def main():
    print("Starting Image Generation...")
    prompt = "aerial shot of a river flowing up a mystical valley"  # Modify prompt as needed
    
    authenticate_gcp()
    generate_image(prompt)

if __name__ == "__main__":
    main()
