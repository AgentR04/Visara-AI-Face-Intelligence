import { useState } from 'react'

export default function CompareCard() {
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [preview1, setPreview1] = useState(null)
  const [preview2, setPreview2] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e, fileNum) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (fileNum === 1) {
        setFile1(selectedFile)
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview1(event.target.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setFile2(selectedFile)
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview2(event.target.result)
        }
        reader.readAsDataURL(selectedFile)
      }
      setError(null)
    }
  }

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError('Please select both images')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file1', file1)
    formData.append('file2', file2)

    try {
      const response = await fetch('http://127.0.0.1:8000/compare', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        setError(data.error || 'Comparison failed. Please try again.')
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
      <h2 className="card-title">Compare Faces</h2>

      <div className="compare-inputs">
        <div className="input-group">
          <label className="label">First Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 1)}
            className="file-input"
          />
          {preview1 && (
            <div className="preview-container">
              <img src={preview1} alt="Preview 1" className="preview-image" />
            </div>
          )}
        </div>

        <div className="input-group">
          <label className="label">Second Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 2)}
            className="file-input"
          />
          {preview2 && (
            <div className="preview-container">
              <img src={preview2} alt="Preview 2" className="preview-image" />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={loading || !file1 || !file2}
        className="btn btn-primary"
      >
        {loading ? 'Comparing...' : 'Compare'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="results">
          <div className="verdict-box">
            <h3>Verdict</h3>
            <div className="verdict-content">
              <div className="verdict-item">
                <span className="verdict-label">Same Person:</span>
                <span className={`verdict-value ${result.same_person ? 'yes' : 'no'}`}>
                  {result.same_person ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="verdict-item">
                <span className="verdict-label">Confidence Score:</span>
                <span className="verdict-value">
                  {typeof result.confidence_score === 'number'
                    ? `${result.confidence_score.toFixed(2)}%`
                    : result.confidence_score}
                </span>
              </div>
            </div>
          </div>

          {result.verdict && (
            <div className="summary-box">
              <h3>Analysis</h3>
              <p>{result.verdict}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
