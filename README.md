# Visara - AI Face Intelligence
Visara is a computer vision-based application that analyzes facial structure and provides styling recommendations, along with face similarity comparison using deep learning.

The system combines facial landmark detection with geometric analysis and deep learning embeddings to produce explainable and practical results.

## Overview

**Visara** is an AI-powered facial analysis system that uses deep learning to:

1. **Analyze facial structure** - Extract and measure facial features
2. **Provide styling recommendations** - Suggest glasses, hairstyles, and accessories
3. **Compare faces** - Determine similarity between two faces with confidence scoring
4. **Generate insights** - Provide intelligent summaries and explanations

Built with a modern tech stack: **FastAPI backend** + **React frontend** with real-time CORS support.

---

## Features

### Face Analysis
- Upload a facial image
- Specify gender (male/female) for personalized recommendations
- Get detailed analysis:
  - **Face Shape** - Round, oval, square, etc.
  - **Face Ratio** - Proportions of face dimensions
  - **Jaw Ratio** - Jaw definition metrics
  - **Eye Ratio** - Eye spacing and proportion
  - **Symmetry** - Facial symmetry percentage
- Receive styling recommendations:
  - **Glasses styles** - Frame recommendations
  - **Hairstyle** - Hair cut suggestions
  - **Accessories** - Suggested jewelry/accessories
- View AI-generated summary and explanations

### Face Comparison
- Upload two facial images
- Get instant verdict on face similarity
- **Same Person** - Yes/No determination
- **Confidence Score** - Percentage confidence (0-100%)
- Detailed analysis and verdict explanation

### Modern UI
- Clean, minimal light-mode design
- Responsive layout (desktop, tablet, mobile)
- Real-time image previews
- Loading states and error handling
- Professional styling with smooth interactions

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Python** | 3.10+ | Core language |
| **FastAPI** | 0.110.0 | REST API framework |
| **Uvicorn** | 0.27.1 | ASGI server |
| **OpenCV** | 4.9.0 | Image processing |
| **MediaPipe** | 0.10.8 | Facial landmark detection |
| **TensorFlow** | 2.12.0 | Deep learning framework |
| **DeepFace** | 0.0.79 | Face recognition & analysis |
| **NumPy** | 1.23.5 | Numerical computing |
| **Scikit-Learn** | 1.3.2 | ML utilities |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18 | UI framework |
| **Vite** | 5 | Build tool & dev server |
| **JavaScript/JSX** | ES2022 | Programming language |
| **CSS3** | - | Styling (no frameworks) |
| **Fetch API** | - | HTTP requests |

---

## Project Structure

```
Visara/
├── backend/
│   ├── app/
│   │   ├── main.py                      # FastAPI app setup + CORS
│   │   ├── api/
│   │   │   └── routes.py                # API endpoints
│   │   ├── services/
│   │   │   ├── face_service.py          # Face landmark extraction
│   │   │   ├── feature_service.py       # Feature computation
│   │   │   ├── recommendation_service.py # Styling recommendations
│   │   │   ├── similarity_services.py   # Face comparison
│   │   │   └── summary_service.py       # AI summaries
│   │   ├── models/                      # Data models
│   │   ├── core/                        # Core utilities
│   │   └── utils/                       # Helper functions
│   ├── run.py                           # Entry point
│   ├── requirements.txt                 # Python dependencies
│   └── temp/                            # Temporary image storage
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyzeCard.jsx         # Face analysis UI
│   │   │   └── CompareCard.jsx         # Face comparison UI
│   │   ├── App.jsx                      # Main app component
│   │   ├── main.jsx                     # React entry point
│   │   ├── styles.css                   # All styling
│   │   └── assets/                      # Static files
│   ├── public/                          # Public assets
│   ├── index.html                       # HTML template
│   ├── vite.config.js                   # Vite configuration
│   ├── package.json                     # Dependencies
│   └── README.md                        # Frontend documentation
│
├── .gitignore                           # Git ignore rules
├── README.md                            # This file
└── QUICKSTART.md                        # Quick setup guide
```

---

## Prerequisites

### System Requirements
- **Python 3.10+**
- **Node.js 16+** (for frontend)
- **npm** or **yarn**
- **Git**
- **4GB RAM minimum** (for TensorFlow)
- **2GB free disk space** (for models)

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/AgentR04/Visara.git
cd Visara
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

#### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## Running the Application

### Backend (Terminal 1)

```bash
cd backend
python run.py
```

**Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Access: `http://127.0.0.1:8000`

### Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

**Output:**
```
➜  Local:   http://localhost:5173/
```

Access: `http://localhost:5173`

---

## API Documentation

### Base URL
```
http://127.0.0.1:8000
```

### 1. Analyze Face

```http
POST /analyze?gender={gender}
Content-Type: multipart/form-data
```

**Parameters:**
- `file` (File, required) - Facial image (JPG, PNG, WebP)
- `gender` (String, required) - `"male"` or `"female"`

**Response:**
```json
{
  "analysis": {
    "face_shape": "round",
    "face_ratio": 1.0776659197596581,
    "jaw_ratio": 0.7910934848244136,
    "eye_ratio": 0.2529284165743200,
    "symmetry": 0.0833554863929748
  },
  "recommendations": {
    "glasses": "rectangular frames",
    "hairstyle": "long layers",
    "accessories": "structured hatslong earrings"
  },
  "explanations": "Angular styles balance soft facial curves...",
  "summary": "Your face appears round with softer jawline..."
}
```

### 2. Compare Faces

```http
POST /compare
Content-Type: multipart/form-data
```

**Parameters:**
- `file1` (File, required) - First facial image
- `file2` (File, required) - Second facial image

**Response:**
```json
{
  "same_person": true,
  "confidence_score": 95.67,
  "verdict": "These appear to be the same person with high confidence."
}
```

---

## Frontend Guide

### AnalyzeCard Component
- File upload for facial image
- Gender selection dropdown
- Image preview display
- Analyze button with loading state
- Results display (structured data)
- Error handling

### CompareCard Component
- Dual file inputs for two images
- Side-by-side preview
- Compare button with loading state
- Verdict display with confidence score
- Color-coded results (green for yes, red for no)
- Error handling

### Styling
- **Design:** Minimal light-mode with clean aesthetics
- **Layout:** CSS Grid responsive design
- **Colors:** Professional blue/indigo color scheme
- **Breakpoints:** 1024px (tablet), 768px (mobile), 480px (small mobile)
- **Animations:** Smooth transitions (0.2s ease)

---

## Configuration

### Backend CORS

Edit `backend/app/main.py` to allow additional origins:

```python
allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://yourdomain.com"
]
```

### Frontend API URL

Update fetch URLs in components if backend runs on different host:

```javascript
// AnalyzeCard.jsx
const response = await fetch(
  `http://YOUR_BACKEND_HOST:8000/analyze?gender=${gender}`,
  { method: 'POST', body: formData }
);
```

---

## Troubleshooting

### CORS Error
**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
1. Verify backend is running on `http://127.0.0.1:8000`
2. Check CORS middleware in `backend/app/main.py`
3. Restart backend after changes

### No Face Detected
**Error:** `No clear face detected. Please upload a front-facing image.`

**Solution:**
- Upload clear, front-facing facial images
- Ensure good lighting
- Face should occupy at least 20% of image

### Image Not Previewing
**Solution:**
- Check file is valid image format (JPG, PNG)
- Verify file size < 10MB
- Check browser console for errors

### Slow API Responses
**Cause:** TensorFlow model initialization

**Solution:**
- First request loads models (~30 seconds)
- Subsequent requests are faster (~2-5 seconds)

### Port Already in Use
```bash
# Kill process on port 8000
lsof -i :8000
kill -9 <PID>

# Or use different port
uvicorn app.main:app --port 8001
```

---

## Performance

- **First request:** ~30 seconds (model loading)
- **Subsequent requests:** ~2-5 seconds per image
- **Frontend build size:** ~150KB (gzipped)
- **Vite dev server:** ~400ms startup

---

