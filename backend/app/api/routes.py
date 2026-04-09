from fastapi import APIRouter, UploadFile, File
from app.services.face_service import extract_landmarks
from app.services.feature_service import extract_features
from app.services.recommendation_service import generate_recommendations
from app.services.similarity_services import compare_faces
from app.services.summary_service import generate_summary
import cv2
import numpy as np
import uuid
import os

router = APIRouter()

# ROOT
@router.get("/")
def root():
    return {"message": "FaceCraft API is running"}

# ANALYZE FACE
@router.post("/analyze")
async def analyze_face(
    file: UploadFile = File(...),
    gender: str = "unknown"
):
    contents = await file.read()

    np_img = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    landmarks = extract_landmarks(image)

    if landmarks is None:
        return {
            "error": "No clear face detected. Please upload a front-facing image."
        }

    features = extract_features(landmarks)
    recommendations = generate_recommendations(features, gender)

    return {
        "analysis": {
            "face_shape": features["face_shape"],
            "face_ratio": features["ratio"],
            "jaw_ratio": features["jaw_ratio"],
            "eye_ratio": features["eye_ratio"],
            "symmetry": features["symmetry"]
        },
        "recommendations": {
            "glasses": recommendations["glasses"],
            "hairstyle": recommendations["hairstyle"],
            "accessories": recommendations["accessories"],
            "beard": recommendations["beard"]
        },
        "explanations": recommendations["explanation"],
        "summary": generate_summary(features)
    }

# COMPARE FACES
@router.post("/compare")
async def compare_faces_api(
    file1: UploadFile = File(...),
    file2: UploadFile = File(...)
):
    # Unique temp filenames (no overwrite issues)
    path1 = f"temp_{uuid.uuid4()}.jpg"
    path2 = f"temp_{uuid.uuid4()}.jpg"

    try:
        # Save files
        with open(path1, "wb") as f:
            f.write(await file1.read())

        with open(path2, "wb") as f:
            f.write(await file2.read())

        result = compare_faces(path1, path2)

        return result

    finally:
        # Clean up temp files
        if os.path.exists(path1):
            os.remove(path1)
        if os.path.exists(path2):
            os.remove(path2)