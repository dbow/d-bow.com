import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const BG = '#222'
const LINK_COLORS = {
  work:  '#566956',
  music: '#566956',
  info:  '#566956',
}

const COLORS = [
  [217, 144, 101],
  [217, 144, 101],
  [230, 165, 120],
  [245, 190, 145],
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
    this.large = Math.random() < 0.07
    this.r = this.large ? Math.random() * 2.5 + 1.5 : Math.random() * 1.2 + 0.3
    this.glow = this.r * (this.large ? 15 : 7)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.peak = this.large ? Math.random() * 0.22 + 0.08 : Math.random() * 0.8 + 0.2
    this.opacity = 0
    this.wFreq = Math.random() * 0.013 + 0.003
    this.wAmp = Math.random() * 1.3 + 0.2
    this.wPhase = Math.random() * Math.PI * 2
    this.age = 0
    this.life = this.large ? 420 + Math.random() * 280 : 160 + Math.random() * 360
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
  const particleCanvasRef = useRef(null)
  const maskCanvasRef     = useRef(null)
  const navRef            = useRef(null)
  const workRef           = useRef(null)
  const musicRef          = useRef(null)
  const infoRef           = useRef(null)
  const wordRectsRef      = useRef({})
  const boostRef          = useRef(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    boostRef.current = hovered !== null
  }, [hovered])

  // Fit font to 85% of viewport height, then snapshot link word positions
  useEffect(() => {
    const fitAndMeasure = () => {
      const nav = navRef.current
      if (!nav) return
      const maxH = window.innerHeight * 0.85
      let lo = 16, hi = 600
      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2
        nav.style.fontSize = mid + 'px'
        nav.scrollHeight <= maxH && nav.scrollWidth <= nav.clientWidth ? (lo = mid) : (hi = mid)
      }
      nav.style.fontSize = lo + 'px'
      wordRectsRef.current = {
        work:  workRef.current?.getBoundingClientRect(),
        music: musicRef.current?.getBoundingClientRect(),
        info:  infoRef.current?.getBoundingClientRect(),
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
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, w, h)

      // Vignette before word rects so coral is unaffected
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.22, w * 0.5, h * 0.5, h * 0.92)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(20,20,20,0.65)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      for (const [key, rect] of Object.entries(rects)) {
        if (rect) {
          ctx.fillStyle = LINK_COLORS[key]
          ctx.fillRect(rect.left, rect.top, rect.width, rect.height)
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
      mCtx.fillStyle = BG
      mCtx.fillRect(0, 0, w, h)
      const fontSize = parseFloat(navRef.current?.style.fontSize || '0')
      if (fontSize > 0) {
        mCtx.globalCompositeOperation = 'destination-out'
        mCtx.fillStyle = 'rgba(0,0,0,1)'
        mCtx.font = `900 ${fontSize}px 'mr-eaves-xl-modern-narrow', sans-serif`
        if ('letterSpacing' in mCtx) mCtx.letterSpacing = `${(-0.02 * fontSize).toFixed(2)}px`
        mCtx.textBaseline = 'alphabetic'
        const words = [
          { text: 'work',  rect: rects.work },
          { text: 'music', rect: rects.music },
          { text: 'info',  rect: rects.info },
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
    <div className="fixed inset-0" style={{ background: BG }}>
      {/* Canvas 1: particles on top of pink link-word backgrounds */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 block"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
      {/* Racing stripes */}
      <div className="absolute top-0 right-2 sm:right-10 flex gap-1.5 sm:gap-2.5 items-start" style={{ zIndex: 3, pointerEvents: 'none' }}>
        <div className="w-[8px] sm:w-[14px] h-[50vh]" style={{ background: '#D99065' }} />
        <div className="w-[8px] sm:w-[14px] h-[calc(50vh-20px)]" style={{ background: '#d55c86' }} />
      </div>

      {/* Canvas 2: solid green mask with transparent holes revealing Canvas 1 */}
      <canvas
        ref={maskCanvasRef}
        className="absolute inset-0 block"
        style={{ zIndex: 1, pointerEvents: 'none' }}
      />

      {/* HTML text: non-link words are #eceddf; links are transparent (just click targets) */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-6 pr-20 sm:px-10"
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
            color: '#e8ddd0',
          }}
        >
          <span>Danny<br />Bowman{'\u2019'}s<br /></span>
          <span ref={workRef}>
            <Link
              to="/work"
              style={{ color: 'transparent', textDecoration: 'none', cursor: 'pointer' }}
              onMouseEnter={() => setHovered('work')}
              onMouseLeave={() => setHovered(null)}
            >
              work
            </Link>
          </span>
          <span>,<br /></span>
          <span ref={musicRef}>
            <Link
              to="/music"
              style={{ color: 'transparent', textDecoration: 'none', cursor: 'pointer' }}
              onMouseEnter={() => setHovered('music')}
              onMouseLeave={() => setHovered(null)}
            >
              music
            </Link>
          </span>
          <span> &amp;<br /></span>
          <span ref={infoRef}>
            <Link
              to="/info"
              style={{ color: 'transparent', textDecoration: 'none', cursor: 'pointer' }}
              onMouseEnter={() => setHovered('info')}
              onMouseLeave={() => setHovered(null)}
            >
              info
            </Link>
          </span>
          <span>.</span>
        </nav>
      </div>
    </div>
  )
}
