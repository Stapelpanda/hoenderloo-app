import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Map from './pages/Map'
import Treasure from './pages/Treasure'
import Info from './pages/Info'
import Posts from './pages/Posts'

function App() {
  return (
    <Router basename="/hoenderloo-app">
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/speurtocht" element={<Treasure />} />
            <Route path="/info" element={<Info />} />
            <Route path="/posten" element={<Posts />} />
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
          <Link to="/info" className="nav-item">
            <span className="nav-icon">i️</span>
            <span className="nav-text">Info</span>
          </Link>
          <Link to="/posten" className="nav-item">
            <span className="nav-icon">📍</span>
            <span className="nav-text">Posten</span>
          </Link>
        </nav>
      </div>
    </Router>
  )
}

export default App
