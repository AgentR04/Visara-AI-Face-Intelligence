from deepface import DeepFace


def compare_faces(img1_path, img2_path):
    try:
        result = DeepFace.verify(
            img1_path=img1_path,
            img2_path=img2_path,
            model_name="Facenet",
            detector_backend="mtcnn",
            enforce_detection=False,
            align=True
        )

        distance = float(result["distance"])
        confidence = round((1 - distance) * 100, 2)

        if distance < 0.35:
            same_person = True
            verdict = "Same Person (High Confidence)"
        elif distance < 0.6:
            same_person = True
            verdict = "Same Person (Moderate Confidence)"
        else:
            same_person = False
            verdict = "Different Persons"

        return {
            "same_person": same_person,
            "distance": distance,
            "confidence_score": confidence,
            "verdict": verdict
        }

    except Exception as e:
        return {
            "error": str(e),
            "same_person": False,
            "distance": None,
            "confidence_score": None,
            "verdict": "Comparison Failed"
        }