def generate_summary(features):
    face_shape = features["face_shape"]
    jaw_ratio = features["jaw_ratio"]
    eye_ratio = features["eye_ratio"]

    summary = f"Your face appears {face_shape} with "

    if jaw_ratio > 0.8:
        summary += "a strong jawline, "
    else:
        summary += "a softer jawline, "

    if eye_ratio > 0.3:
        summary += "and wider eye spacing. "
    else:
        summary += "and closer eye spacing. "

    summary += "Based on this, balanced and structured styles will enhance your appearance."

    return summary