def generate_recommendations(features, gender="unknown"):
    face_shape = features["face_shape"]
    eye_ratio = features["eye_ratio"]
    jaw_ratio = features["jaw_ratio"]

    recs = {
        "glasses": [],
        "hairstyle": [],
        "beard": [],
        "accessories": [],
        "explanation": []
    }

    # Face shape logic
    if face_shape == "round":
        recs["glasses"].append("rectangular frames")
        recs["hairstyle"].append("long layers")
        recs["accessories"].append("structured hats")
        recs["explanation"].append("Angular styles balance soft facial curves")

    elif face_shape == "square":
        recs["glasses"].append("round frames")
        recs["hairstyle"].append("soft waves")
        recs["accessories"].append("rounded accessories")
        recs["explanation"].append("Rounded styles soften strong jawlines")

    elif face_shape == "oval":
        recs["glasses"].append("most frame styles")
        recs["hairstyle"].append("any balanced style")
        recs["accessories"].append("minimal accessories")
        recs["explanation"].append("Balanced proportions suit most styles")

    # Eye spacing
    if eye_ratio > 0.35:
        recs["glasses"].append("wide bridge glasses")
        recs["explanation"].append("Wider frames complement larger eye spacing")

    elif eye_ratio < 0.25:
        recs["glasses"].append("narrow bridge glasses")
        recs["explanation"].append("Narrow frames suit closer eye spacing")

    # Beard logic
    if gender.lower() == "male":
        if jaw_ratio > 0.85:
            recs["beard"].append("light stubble")
            recs["explanation"].append("Softens strong jaw structure")
        else:
            recs["beard"].append("defined beard")
            recs["explanation"].append("Enhances weaker jawline")
    else:
        recs["beard"] = ["not applicable"]

    # Extra accessories
    if face_shape == "long":
        recs["accessories"].append("wide hats")
        recs["explanation"].append("Adds width to elongated face")

    if face_shape == "round":
        recs["accessories"].append("long earrings")
        recs["explanation"].append("Elongates round face")

    # Fallbacks
    if not recs["hairstyle"]:
        recs["hairstyle"] = ["side part", "textured layers"]

    if not recs["accessories"]:
        recs["accessories"] = ["simple accessories"]

    return recs