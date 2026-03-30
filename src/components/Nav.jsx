import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Nav() {
  const { theme } = useTheme()
  const navLinkClass = ({ isActive }) => isActive
    ? `font-bold not-italic no-underline ${theme === 'light' ? 'text-[#222]' : 'text-gray'}`
    : 'text-pink no-underline hover:text-pink'
  return (
    <nav className="my-10 max-[615px]:mt-4 max-[615px]:mb-2.5" style={{ fontFamily: "'mr-eaves-xl-modern', sans-serif", fontSize: '1.6em' }}>
      <h2 className="inline text-[1em] font-normal tracking-[-0.02em] m-0"><NavLink to="/" className="text-pink no-underline hover:text-pink">@</NavLink>dbow</h2>
      {'\u2019s\u00a0'}
      <NavLink to="/work" className={navLinkClass}>work</NavLink>
      <span>, </span>
      <NavLink to="/music" className={navLinkClass}>music</NavLink>
      <span> &amp; </span>
      <NavLink to="/info" className={navLinkClass}>info</NavLink>
      <span>.</span>
    </nav>
  )
}
