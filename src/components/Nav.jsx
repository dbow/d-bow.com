import { NavLink } from 'react-router-dom'

function navLinkClass({ isActive }) {
  return isActive
    ? 'font-bold not-italic text-[#D99065] no-underline'
    : 'text-gray no-underline hover:text-pink'
}

export default function Nav() {
  return (
    <nav className="my-10 max-[615px]:mt-4 max-[615px]:mb-2.5" style={{ fontFamily: "'mr-eaves-xl-modern', sans-serif", fontSize: '1.6em' }}>
      <h2 className="inline text-[1em] font-normal tracking-[-0.02em] m-0">Danny Bowman</h2>
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
