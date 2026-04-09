import mediapipe as mp
import cv2

mp_face_mesh = mp.solutions.face_mesh


def extract_landmarks(image):
    with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1) as face_mesh:
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb)

        if not results.multi_face_landmarks:
            return None

        landmarks = []
        for lm in results.multi_face_landmarks[0].landmark:
            landmarks.append((lm.x, lm.y))

        return landmarks