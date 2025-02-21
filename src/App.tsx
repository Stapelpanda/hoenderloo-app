import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Map from './pages/Map'
import Treasure from './pages/Treasure'
import InstallPrompt from './components/InstallPrompt'

function App() {
  return (
    <>
      <InstallPrompt />
      <Router basename="/">
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/speurtocht" element={<Treasure />} />
          </Routes>
        </div>
        <nav className="bottom-nav">
          <Link to="/" className="nav-item">
            <span className="nav-icon">🗺️</span>
            <span className="nav-text">Terrein</span>
          </Link>
          <Link to="/speurtocht" className="nav-item">
            <span className="nav-icon">🔍</span>
            <span className="nav-text">Speurtocht</span>
          </Link>
        </nav>
      </div>
      </Router>
    </>
  )
}

export default App
