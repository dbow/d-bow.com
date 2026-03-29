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
      {/* Desktop left L-shaped stripes — vertical then turning left to screen edge */}
      <div className="hidden min-[820px]:block fixed top-0 left-0" style={{ right: 'calc(75vw + 130px)', zIndex: 50, pointerEvents: 'none' }}>
        {[
          { color: '#D99065' },
          { color: '#d55c86' },
          { color: '#566956' },
          { color: '#736D62' },
        ].map(({ color }, i) => {
          const rightOffset = (3 - i) * 16
          const turnHeight = `calc(50vh - ${(3 - i) * 16}px)`
          return (
            <div key={i}>
              <div style={{ position: 'absolute', top: 0, right: rightOffset, width: 10, height: turnHeight, background: color }} />
              <div style={{ position: 'absolute', top: turnHeight, right: rightOffset, width: 'calc(100% - 58px)', height: 10, background: color }} />
            </div>
          )
        })}
      </div>

      {/* Desktop right diagonal stripes — 45° from content right edge toward viewport right */}
      {['#D99065', '#d55c86', '#566956', '#736D62'].map((color, i) => (
        <div key={color} className="hidden min-[820px]:block fixed top-0" style={{
          left: `calc(var(--tr-stripe-base) + ${i * 22}px)`,
          width: 10,
          height: '100vh',
          background: color,
          transform: 'rotate(-45deg)',
          transformOrigin: 'top left',
          zIndex: 50,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Mobile L-shaped stripes */}
      <div className="min-[820px]:hidden" style={{ position: 'relative', left: 'calc(-50vw + 50%)', width: '100vw', marginTop: 10, pointerEvents: 'none', height: 29, overflow: 'visible' }}>
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
