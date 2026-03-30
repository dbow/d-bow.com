import { useTheme } from '../context/ThemeContext.jsx'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" fill="currentColor"/>
      <line x1="8" y1="1" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="12.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="8" x2="3.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3.4" y1="3.4" x2="5.2" y2="5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10.8" y1="10.8" x2="12.6" y2="12.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12.6" y1="3.4" x2="10.8" y2="5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5.2" y1="10.8" x2="3.4" y2="12.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2a6 6 0 1 0 7 7 4.5 4.5 0 0 1-7-7z"/>
    </svg>
  )
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 200,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 4,
        opacity: 0.35,
        color: theme === 'dark' ? '#e8ddd0' : '#222',
        transition: 'opacity 0.2s',
        lineHeight: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1}
      onMouseLeave={e => e.currentTarget.style.opacity = 0.35}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
