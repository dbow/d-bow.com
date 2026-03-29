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
      <div className="fixed top-0 right-6 sm:right-10 flex gap-2.5 items-start" style={{ zIndex: 50, pointerEvents: 'none' }}>
        <div className="w-[14px] h-[50vh]" style={{ background: '#DBB066' }} />
        <div className="w-[14px] h-[calc(50vh-20px)]" style={{ background: '#DB7D5E' }} />
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
