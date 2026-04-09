import { useState } from 'react'

export default function AnalyzeCard() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [gender, setGender] = useState('male')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target.result)
      }
      reader.readAsDataURL(selectedFile)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze?gender=${gender}`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok || data.error) {
        setError(data.error || 'Analysis failed. Please try again.')
        setResult(null)
      } else {
        setResult(data)
        setError(null)
      }
    } catch (err) {
      setError('Network error. Make sure the backend is running at http://127.0.0.1:8000')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Analyze Face</h2>

      <div className="form-group">
        <label className="label">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}

      <div className="form-group">
        <label className="label">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="select-input"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || !file}
        className="btn btn-primary"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="results">
          <div className="analysis-section">
            <h3>Analysis</h3>
            <div className="analysis-grid">
              <div className="stat">
                <span className="stat-label">Face Shape</span>
                <span className="stat-value">{result.analysis.face_shape}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Face Ratio</span>
                <span className="stat-value">{result.analysis.face_ratio}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Jaw Ratio</span>
                <span className="stat-value">{result.analysis.jaw_ratio}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Eye Ratio</span>
                <span className="stat-value">{result.analysis.eye_ratio}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Symmetry</span>
                <span className="stat-value">{result.analysis.symmetry}</span>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <h3>Recommendations</h3>
            <div className="recommendations-grid">
              <div className="rec-item">
                <span className="rec-label">Glasses</span>
                <span className="rec-value">{result.recommendations.glasses}</span>
              </div>
              <div className="rec-item">
                <span className="rec-label">Hairstyle</span>
                <span className="rec-value">{result.recommendations.hairstyle}</span>
              </div>
              <div className="rec-item">
                <span className="rec-label">Accessories</span>
                <span className="rec-value">{result.recommendations.accessories}</span>
              </div>
            </div>
          </div>

          {result.summary && (
            <div className="summary-box">
              <h3>Summary</h3>
              <p>{result.summary}</p>
            </div>
          )}

          {result.explanations && (
            <div className="explanations-box">
              <h3>Explanations</h3>
              <p>{result.explanations}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
