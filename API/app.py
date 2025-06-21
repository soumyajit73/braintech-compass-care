from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Frontend dev server
        "https://dementia-dreamscape-ui.vercel.app",  # Vercel production domain
        "https://dementia-dreamscape-ui-*.vercel.app"  # Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# Load the model
model = tf.keras.models.load_model('alzheimers_detection_model.h5')

# Class labels
CLASS_LABELS = ["Mild Dementia", "Moderate Dementia", "Non Demented", "Very Mild Dementia"]

def preprocess_image(image_bytes):
    # Open image from bytes
    img = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize to model's expected input size (assuming 224x224)
    img = img.resize((224, 224))
    
    # Convert to numpy array and preprocess
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize pixel values
    
    return img_array

async def generate_insights(predicted_class: str, confidences: dict) -> str:
    # Create a prompt for Gemini
    prompt = f"""
    Generate a detailed medical analysis report for an MRI brain scan with the following structure:

    MRI Brain Scan Analysis Report

    First paragraph: Summarize the findings mentioning that the AI analysis indicates a diagnosis of {predicted_class} with a confidence score of {confidences[predicted_class]*100:.1f}%. Explain what this means and emphasize this is a preliminary AI assessment requiring professional confirmation.

    1. Explanation of Diagnosis
    [Explain what {predicted_class} means in terms of cognitive abilities and daily life impact]

    2. Key Observations Associated with {predicted_class}
    [List typical MRI findings and characteristics associated with this condition]

    3. Recommended Next Steps
    [Provide actionable recommendations for medical follow-up and care]

    4. Lifestyle and Care Considerations
    [Suggest lifestyle modifications and care strategies]

    Important: Format the response with proper headings and paragraphs, but DO NOT include any HTML tags or markdown. Use plain text formatting only.
    Keep the tone professional but compassionate.
    """

    # Generate response using Gemini
    response = await gemini_model.generate_content_async(prompt)
    return response.text

@app.post("/analyze")
async def analyze_mri(file: UploadFile = File(...)):
    # Read image file
    contents = await file.read()
    
    try:
        # Preprocess the image
        img_array = preprocess_image(contents)
        
        # Make prediction
        predictions = model.predict(img_array)
        
        # Get predicted class and confidences
        confidences = predictions[0].tolist()
        predicted_class = CLASS_LABELS[np.argmax(confidences)]
        
        # Create confidence dictionary
        confidence_dict = {label: float(conf) for label, conf in zip(CLASS_LABELS, confidences)}
        
        # Generate insights using Gemini
        insights = await generate_insights(predicted_class, confidence_dict)
        
        return {
            "predictedClass": predicted_class,
            "confidences": confidence_dict,
            "insights": insights
        }
        
    except Exception as e:
        return {"error": str(e)} 