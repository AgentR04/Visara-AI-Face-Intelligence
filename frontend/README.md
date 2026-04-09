# Visara Frontend

A modern, clean React + Vite frontend for the Visara AI-powered facial analysis system.

## Features

✨ **Analyze Face**
- Upload single facial image
- Select gender (male/female)
- Get detailed facial analysis:
  - Face Shape
  - Face Ratio
  - Jaw Ratio
  - Eye Ratio
  - Symmetry
- Receive styling recommendations:
  - Glasses
  - Hairstyle
  - Accessories
- View intelligent summary

🔍 **Compare Faces**
- Upload two facial images for comparison
- Determine if faces belong to the same person
- Get confidence score (%)
- View detailed verdict with analysis

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Plain CSS** - Styling (no frameworks)
- **Fetch API** - Backend communication

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AnalyzeCard.jsx      # Face analysis component
│   │   └── CompareCard.jsx      # Face comparison component
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   ├── styles.css                # Global styles (glassmorphism)
│   └── assets/                   # Static files
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies
```

## Setup & Installation

### Prerequisites
- Node.js 16+
- Backend running at `http://127.0.0.1:8000`

### Install Dependencies

```bash
cd frontend
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Configuration

The frontend connects to the backend at `http://127.0.0.1:8000` by default. 

**Backend Endpoints Used:**
- `POST /analyze?gender={gender}` - Analyze face with gender parameter
- `POST /compare` - Compare two faces

## Design Features

🎨 **Modern UI**
- Gradient backgrounds (soft purples & blues)
- Glassmorphism cards with backdrop blur
- Smooth animations & transitions
- Responsive grid layout

🎯 **UX Enhancements**
- Image preview before submission
- Loading states (Analyzing... / Comparing...)
- Error handling with user-friendly messages
- Structured result display (not raw JSON)
- Mobile-friendly responsive design

⚡ **Performance**
- Fast dev server with HMR
- Optimized production build
- Minimal dependencies
- No CSS frameworks overhead

## API Integration

### Analyze Face

```javascript
POST http://127.0.0.1:8000/analyze?gender={gender}
Content-Type: multipart/form-data

Body:
- file: Image file
- gender: "male" or "female"

Response:
{
  "analysis": {
    "face_shape": string,
    "face_ratio": string,
    "jaw_ratio": string,
    "eye_ratio": string,
    "symmetry": string
  },
  "recommendations": {
    "glasses": string,
    "hairstyle": string,
    "accessories": string
  },
  "summary": string,
  "explanations": string
}
```

### Compare Faces

```javascript
POST http://127.0.0.1:8000/compare
Content-Type: multipart/form-data

Body:
- file1: First image file
- file2: Second image file

Response:
{
  "same_person": boolean,
  "confidence_score": number (0-1),
  "verdict": string
}
```

## Error Handling

- **No image selected**: "Please select an image"
- **No face detected**: Backend returns error message
- **Network error**: "Network error. Make sure the backend is running..."
- **API error**: Displays server error message

## Styling System

### Color Palette
- **Primary Gradient**: `#667eea` to `#764ba2` (purples/blues)
- **Secondary Gradient**: `#f093fb` to `#f5576c` (pinks/reds)
- **Text Primary**: `#1a1a2e`
- **Text Secondary**: `#5a5a7a`
- **Error**: `#ff6b6b`
- **Success**: `#51cf66`

### Design Tokens
- **Border Radius**: 20px (cards), 12px (inputs)
- **Box Shadow**: Glassmorphic with subtle blur
- **Font**: System-ui stack for optimal readability
- **Spacing**: 20px base unit

## Responsive Breakpoints

- **Desktop**: Full grid layout (2 columns)
- **Tablet** (≤ 768px): Responsive grid with adjustments
- **Mobile** (≤ 480px): Single column stack, optimized spacing

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips

### Fast Refresh
Changes to `.jsx` or `.css` files automatically reload the app without losing state.

### Debugging
Use browser DevTools:
- React DevTools extension recommended
- Network tab to inspect API calls
- Console for any errors

### Environment Variables
To use a different backend URL, modify the fetch calls in:
- `src/components/AnalyzeCard.jsx` (line 42)
- `src/components/CompareCard.jsx` (line 54)

Or create a `.env` file:
```
VITE_API_URL=http://127.0.0.1:8000
```

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Output in `dist/` folder is ready for deployment

3. Deploy to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting

**Important**: Ensure CORS is enabled on your backend for production domains.

## Troubleshooting

**Q: "Network error" when submitting**
- Check backend is running: `http://127.0.0.1:8000`
- Verify CORS settings on backend

**Q: Images not previewing**
- Check browser console for errors
- Verify file format is supported (JPG, PNG, WebP)

**Q: Slow API responses**
- Backend processing intensive tasks
- Check backend logs for errors
- Verify image size isn't too large

## License

MIT License - See LICENSE file in parent directory

## Support

For issues or questions:
1. Check backend logs
2. Verify API endpoints are responding
3. Review browser console for errors
4. Check network tab in DevTools

---

**Built with ❤️ for Visara** | AI-powered facial analysis system
