import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Info from './pages/Info.jsx'
import Work from './pages/Work.jsx'
import Music from './pages/Music.jsx'

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/info" replace />} />
        <Route path="/info" element={<Info />} />
        <Route path="/work" element={<Work />} />
        <Route path="/music" element={<Music />} />
      </Routes>
      <Footer />
    </div>
  )
}
