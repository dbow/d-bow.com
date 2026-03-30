import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

const BG = '#222'
const LINK_COLORS = {
  dbow: '#000',
}

const COLORS = [
  [217, 144, 101],
  [217, 144, 101],
  [230, 165, 120],
  [245, 190, 145],
  [213, 92, 134],
  [225, 110, 150],
  [232, 221, 208],
]

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.init(false)
  }

  init(fromBottom = true) {
    const { width, height } = this.canvas
    this.x = Math.random() * width
    this.y = fromBottom ? height + Math.random() * 160 : Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.45
    this.vy = -(Math.random() * 0.65 + 0.12)
    const roll = Math.random()
    this.xlarge = roll < 0.02
    this.large = roll < 0.09
    this.r = this.xlarge ? Math.random() * 2.5 + 2 : this.large ? Math.random() * 2.5 + 1.5 : Math.random() * 1.2 + 0.3
    this.glow = this.r * (this.xlarge ? 20 : this.large ? 15 : 7)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.peak = this.xlarge ? Math.random() * 0.5 + 0.4 : this.large ? Math.random() * 0.4 + 0.3 : Math.random() * 0.5 + 0.5
    this.opacity = 0
    this.wFreq = Math.random() * 0.013 + 0.003
    this.wAmp = Math.random() * 1.3 + 0.2
    this.wPhase = Math.random() * Math.PI * 2
    this.age = 0
    this.life = this.xlarge ? 600 + Math.random() * 300 : this.large ? 420 + Math.random() * 280 : 160 + Math.random() * 360
    this.alive = true
  }

  update(frame, boost) {
    const spd = boost ? 2.1 : 1
    this.x += (this.vx + Math.sin(frame * this.wFreq + this.wPhase) * this.wAmp) * spd
    this.y += this.vy * spd
    this.age++
    const fadeIn = Math.min(this.age / 38, 1)
    const fadeOut = Math.max(0, Math.min((this.life - this.age) / 55, 1))
    this.opacity = Math.min(this.peak * fadeIn * fadeOut * (boost ? 1.75 : 1), 1)
    if (this.age >= this.life || this.y < -90 || this.x < -90 || this.x > this.canvas.width + 90) {
      this.alive = false
    }
  }

  draw(ctx) {
    if (this.opacity < 0.008) return
    const [r, g, b] = this.color
    const o = this.opacity
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glow)
    grad.addColorStop(0, `rgba(${r},${g},${b},${(o * 0.88).toFixed(3)})`)
    grad.addColorStop(0.3, `rgba(${r},${g},${b},${(o * 0.35).toFixed(3)})`)
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.glow, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(o * 1.3, 1).toFixed(3)})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function Home() {
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  const particleCanvasRef = useRef(null)
  const maskCanvasRef     = useRef(null)
  const navRef            = useRef(null)
  const dbowRef           = useRef(null)
  const wordRectsRef      = useRef({})
  const boostRef          = useRef(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    boostRef.current = hovered !== null
  }, [hovered])

  // Fit font to 85% of viewport height, then snapshot link word positions
  useEffect(() => {
    const fitAndMeasure = () => {
      const nav = navRef.current
      if (!nav) return
      const isDesktop = window.innerWidth >= 820
      const maxH = window.innerHeight * (isDesktop ? 0.72 : 0.85)
      let lo = 16, hi = 600
      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2
        nav.style.fontSize = mid + 'px'
        nav.scrollHeight <= maxH && nav.scrollWidth <= nav.clientWidth ? (lo = mid) : (hi = mid)
      }
      nav.style.fontSize = lo + 'px'
      wordRectsRef.current = {
        dbow: dbowRef.current?.getBoundingClientRect(),
      }
    }
    document.fonts.ready.then(fitAndMeasure)
    window.addEventListener('resize', fitAndMeasure)
    return () => window.removeEventListener('resize', fitAndMeasure)
  }, [])

  useEffect(() => {
    const pc  = particleCanvasRef.current  // Canvas 1: bg + pink word areas + particles
    const mc  = maskCanvasRef.current      // Canvas 2: solid green mask with holes at link words
    const ctx  = pc.getContext('2d')
    const mCtx = mc.getContext('2d')
    let raf, particles = [], frame = 0

    const bgImg = new Image()
    bgImg.src = '/images/tropicalpattern.png'
    let bgPattern = null
    bgImg.onload = () => {
      bgPattern = ctx.createPattern(bgImg, 'repeat')
    }

    const populate = (spread) => {
      particles = Array.from({ length: 220 }, () => {
        const p = new Particle(pc)
        if (spread) p.init(false)
        return p
      })
    }

    const resize = () => {
      pc.width = mc.width = window.innerWidth
      pc.height = mc.height = window.innerHeight
      populate(true)
    }

    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      const boost = boostRef.current
      const rects = wordRectsRef.current
      const w = pc.width, h = pc.height

      // — Canvas 1: bg → vignette → word rects → particles —
      const bg = themeRef.current === 'light' ? '#e8ddd0' : BG
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Vignette before word rects so coral is unaffected
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.22, w * 0.5, h * 0.5, h * 0.92)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(20,20,20,0.65)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      for (const [key, rect] of Object.entries(rects)) {
        if (rect) {
          ctx.filter = `brightness(${themeRef.current === 'light' ? 0.7 : 0.3})`
          ctx.fillStyle = bgPattern || LINK_COLORS[key]
          ctx.fillRect(rect.left, rect.top, rect.width, rect.height)
          ctx.filter = 'none'
        }
      }

      // Connection tendrils
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        if (a.opacity < 0.06) continue
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          if (b.opacity < 0.06) continue
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 7225) {
            const op = Math.min(a.opacity, b.opacity) * (1 - Math.sqrt(d2) / 85) * 0.11
            if (op > 0.003) {
              const [r, g, b2] = a.color
              ctx.strokeStyle = `rgba(${r},${g},${b2},${op.toFixed(3)})`
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(frame, boost)
        if (!particles[i].alive) {
          particles[i] = new Particle(pc)
        } else {
          particles[i].draw(ctx)
        }
      }

      // — Canvas 2: solid BG, letter-shaped holes punched at each link word —
      mCtx.clearRect(0, 0, w, h)
      mCtx.fillStyle = bg
      mCtx.fillRect(0, 0, w, h)
      const fontSize = parseFloat(navRef.current?.style.fontSize || '0')
      if (fontSize > 0) {
        mCtx.globalCompositeOperation = 'destination-out'
        mCtx.fillStyle = 'rgba(0,0,0,1)'
        mCtx.font = `900 ${fontSize}px 'mr-eaves-xl-modern-narrow', sans-serif`
        if ('letterSpacing' in mCtx) mCtx.letterSpacing = `${(-0.02 * fontSize).toFixed(2)}px`
        mCtx.textBaseline = 'alphabetic'
        const words = [
          { text: '@dbow\u2019s', rect: rects.dbow },
        ]
        for (const { text, rect } of words) {
          if (!rect) continue
          const m = mCtx.measureText(text)
          mCtx.fillText(text, rect.left, rect.top + m.fontBoundingBoxAscent)
        }
        mCtx.globalCompositeOperation = 'source-over'
      }

      frame++
      raf = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0" style={{ background: theme === 'light' ? '#e8ddd0' : BG }}>
      {/* Canvas 1: particles on top of pink link-word backgrounds */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 block"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
      {/* Mobile L-shaped stripes */}
      <div aria-hidden="true" className="min-[820px]:hidden" style={{ position: 'absolute', top: 10, left: 0, right: 0, height: 29, overflow: 'visible', pointerEvents: 'none', zIndex: 3 }}>
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

      {/* Diagonal stripes — desktop only */}
      {['#D99065', '#d55c86', '#566956', '#736D62'].map((color, i) => (
        <div key={color} aria-hidden="true" className="absolute top-0 hidden min-[820px]:block" style={{
          left: `calc(50vw + ${i * 22}px)`,
          width: 10,
          height: '100vmax',
          background: color,
          transform: 'rotate(-45deg)',
          transformOrigin: 'top left',
          zIndex: 3,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Canvas 2: solid green mask with transparent holes revealing Canvas 1 */}
      <canvas
        ref={maskCanvasRef}
        className="absolute inset-0 block"
        style={{ zIndex: 1, pointerEvents: 'none' }}
      />

      {/* HTML text: non-link words are #eceddf; links are transparent (just click targets) */}
      <div
        className="absolute inset-0 flex items-center min-[820px]:items-start min-[820px]:pt-[20vh] justify-start pl-6 pr-20 sm:px-10"
        style={{ zIndex: 2 }}
      >
        <nav
          ref={navRef}
          className="select-none sm:max-w-[75vw]"
          style={{
            fontFamily: "'mr-eaves-xl-modern-narrow', sans-serif",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            width: '100%',
            color: theme === 'light' ? '#222' : '#e8ddd0',
          }}
        >
          <span ref={dbowRef} style={{ color: 'transparent' }}>@dbow{'\u2019'}s<br /></span>
          <span>
            <Link
              to="/work"
              className="text-inherit no-underline hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered('work')}
              onMouseLeave={() => setHovered(null)}
            >
              work
            </Link>
          </span>
          <span>,<br /></span>
          <span>
            <Link
              to="/music"
              className="text-inherit no-underline hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered('music')}
              onMouseLeave={() => setHovered(null)}
            >
              music
            </Link>
          </span>
          <span> &amp;<br /></span>
          <span>
            <Link
              to="/info"
              className="text-inherit no-underline hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered('info')}
              onMouseLeave={() => setHovered(null)}
            >
              info
            </Link>
          </span>
          <span>.</span>
        </nav>
      </div>
      <ThemeToggle />
    </div>
  )
}
