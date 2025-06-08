from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow requests from your TSX frontend

# Load the pre-trained model
model_path = os.path.join("model", "sugarcane_disease_model_improved.h5")
model = tf.keras.models.load_model(model_path)

# Define disease classes (updated to match your model)
disease_classes = ["Healthy", "Mosaic", "RedRot", "Rust", "Yellow"]

# Image preprocessing function
def preprocess_image(image):
    image = image.resize((180, 180))
    image_array = np.array(image)  # No division by 255.0
    if image_array.shape[-1] == 4:
        image_array = image_array[..., :3]
    image_array = np.expand_dims(image_array, axis=0)
    print("Processed image shape:", image_array.shape)
    print("Processed image min/max:", image_array.min(), image_array.max())
    return image_array

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]
        if not file:
            return jsonify({"error": "Invalid image file"}), 400

        image = Image.open(file.stream).convert("RGB")
        processed_image = preprocess_image(image)

        predictions = model.predict(processed_image)
        predicted_class = np.argmax(predictions[0])
        probability = float(predictions[0][predicted_class])

        disease = disease_classes[predicted_class]

        return jsonify({
            "disease": disease,
            "probability": probability
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)