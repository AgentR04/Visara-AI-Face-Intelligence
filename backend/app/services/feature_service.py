import numpy as np


def distance(p1, p2):
    return np.linalg.norm(np.array(p1) - np.array(p2))


def extract_features(landmarks):
    left_cheek = landmarks[234]
    right_cheek = landmarks[454]
    chin = landmarks[152]
    forehead = landmarks[10]

    left_jaw = landmarks[172]
    right_jaw = landmarks[397]

    left_eye = landmarks[133]
    right_eye = landmarks[362]

    face_width = distance(left_cheek, right_cheek)
    face_height = distance(forehead, chin)
    jaw_width = distance(left_jaw, right_jaw)
    eye_distance = distance(left_eye, right_eye)

    ratio = face_width / face_height
    jaw_ratio = jaw_width / face_width
    eye_ratio = eye_distance / face_width

    if ratio > 1.05:
        face_shape = "round"
    elif ratio < 0.75:
        face_shape = "long"
    else:
        if jaw_ratio > 0.8:
            face_shape = "square"
        else:
            face_shape = "oval"

    symmetry = abs(left_cheek[0] - (1 - right_cheek[0]))

    return {
        "face_width": float(face_width),
        "face_height": float(face_height),
        "ratio": float(ratio),
        "jaw_ratio": float(jaw_ratio),
        "eye_ratio": float(eye_ratio),
        "symmetry": float(symmetry),
        "face_shape": face_shape
    }