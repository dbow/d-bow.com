import { Routes, Route, Outlet } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Info from './pages/Info.jsx'
import Work from './pages/Work.jsx'
import Music from './pages/Music.jsx'

function Layout() {
  return (
    <div>
      {/* Green background band — desktop only */}
      <div className="hidden sm:block fixed top-0 left-0 w-full h-[35vh]" style={{ background: '#566956', zIndex: -1, pointerEvents: 'none' }} />

      {/* Desktop vertical stripes */}
      <div className="hidden sm:flex fixed top-0 right-10 flex-row gap-2.5 items-start" style={{ zIndex: 50, pointerEvents: 'none' }}>
        <div className="w-[14px] h-[50vh]" style={{ background: '#D99065' }} />
        <div className="w-[14px] h-[calc(50vh-20px)]" style={{ background: '#d55c86' }} />
      </div>

      {/* Mobile L-shaped stripes */}
      <div className="sm:hidden" style={{ position: 'relative', left: 'calc(-50vw + 50%)', width: '100vw', marginTop: 10, pointerEvents: 'none', height: 29, overflow: 'visible' }}>
        {[
          { color: '#D99065', tail: 88 },
          { color: '#d55c86', tail: 72 },
          { color: '#566956', tail: 56 },
          { color: '#736D62', tail: 40 },
        ].map(({ color, tail }, i) => (
          <div key={i} style={{ position: 'absolute', top: i * 8, left: 0, right: 0 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: `calc(100% - ${i * 8 + 15}px)`, height: 5, background: color }} />
            <div style={{ position: 'absolute', right: i * 8 + 10, top: 0, width: 5, height: 5 + tail, background: color }} />
          </div>
        ))}
      </div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/info" element={<Info />} />
        <Route path="/work" element={<Work />} />
        <Route path="/music" element={<Music />} />
      </Route>
    </Routes>
  )
}
