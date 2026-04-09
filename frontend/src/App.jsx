import AnalyzeCard from './components/AnalyzeCard'
import CompareCard from './components/CompareCard'
import './styles.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Visara</h1>
        <p className="subtitle">AI Face Intelligence</p>
        <p className="description">
          Visara analyzes facial structure and provides intelligent styling recommendations along with face similarity comparison using deep learning.
        </p>
      </header>

      <main className="container">
        <div className="cards-grid">
          <AnalyzeCard />
          <CompareCard />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Visara. AI-powered facial analysis.</p>
      </footer>
    </div>
  )
}

export default App
