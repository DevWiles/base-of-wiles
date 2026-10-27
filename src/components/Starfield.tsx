import { useEffect, useRef, useState } from 'react'

type Star = { x: number; y: number; r: number; base: number; speed: number; phase: number; color: string }
type Meteor = { x: number; y: number; vx: number; vy: number; length: number; life: number; maxLife: number; width: number; bright: number }
// 排好时间、还没出发的流星：同一群共用一个方向
type Pending = { at: number; angle: number; x: number; y: number }

// 大多数星星是白色，少数偏蓝或偏暖，更像真实的夜空
const STAR_COLORS = ['255 255 255', '255 255 255', '255 255 255', '191 219 254', '254 240 200']

/**
 * 预先画好的四角星芒贴图：亮核 + 柔光 + 上下左右四道由粗变细、渐渐淡出的光芒。
 * 每帧直接贴图缩放，不在动画里反复创建渐变。
 */
const SPRITE_SIZE = 96
const createStarSprite = (rgb: string) => {
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = SPRITE_SIZE
  const g = sprite.getContext('2d')!
  const c = SPRITE_SIZE / 2

  const glow = g.createRadialGradient(c, c, 0, c, c, c * 0.32)
  glow.addColorStop(0, `rgb(${rgb} / 0.55)`)
  glow.addColorStop(1, `rgb(${rgb} / 0)`)
  g.fillStyle = glow
  g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)

  for (let k = 0; k < 4; k++) {
    g.save()
    g.translate(c, c)
    g.rotate((k * Math.PI) / 2)
    const spike = g.createLinearGradient(0, 0, c, 0)
    spike.addColorStop(0, `rgb(${rgb} / 0.9)`)
    spike.addColorStop(0.35, `rgb(${rgb} / 0.25)`)
    spike.addColorStop(1, `rgb(${rgb} / 0)`)
    g.fillStyle = spike
    // 细长的三角形：根部约 2.4px 宽，尖端收成一点
    g.beginPath()
    g.moveTo(0, -1.2)
    g.lineTo(c, 0)
    g.lineTo(0, 1.2)
    g.closePath()
    g.fill()
    g.restore()
  }

  g.fillStyle = 'rgb(255 255 255)'
  g.beginPath()
  g.arc(c, c, 2.2, 0, Math.PI * 2)
  g.fill()
  return sprite
}

const useIsDark = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(document.documentElement.classList.contains('dark')))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return dark
}

/** 黑夜模式下的全屏星空：星星各自闪烁，每隔几秒划过一颗流星 */
const Starfield = () => {
  const dark = useIsDark()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!dark || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sprites = new Map(STAR_COLORS.map((rgb) => [rgb, createStarSprite(rgb)]))
    let width = 0
    let height = 0
    let stars: Star[] = []
    const meteors: Meteor[] = []
    const pending: Pending[] = []
    const start = performance.now()
    // 零星流星：0.8~2.5 秒一拨；流星雨：15~25 秒一阵，第一阵在打开页面 6 秒后
    let nextSingleAt = start + 600
    let nextShowerAt = start + 6000
    let frame = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // 按面积撒星星：大约每 3200 平方像素一颗，越大的越少
      const count = Math.round((width * height) / 3200)
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.06
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: big ? 1.1 + Math.random() * 0.8 : 0.3 + Math.random() * 0.7,
          base: big ? 0.7 + Math.random() * 0.3 : 0.25 + Math.random() * 0.5,
          speed: 0.4 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        }
      })
    }

    const rand = (min: number, max: number) => min + Math.random() * (max - min)
    // 方向：从右上往左下，角度在 200°~225° 之间
    const randomAngle = () => rand(200, 225)

    const launch = ({ angle, x, y }: Pending) => {
      const rad = angle * (Math.PI / 180)
      // 大小流星拉开差距：约四分之一是又长又亮的大流星，其余一闪而过
      const big = Math.random() < 0.25
      const speed = big ? rand(10, 15) : rand(7, 12)
      meteors.push({
        x,
        y,
        vx: Math.cos(rad) * speed,
        vy: -Math.sin(rad) * speed,
        length: big ? rand(180, 300) : rand(70, 160),
        life: 0,
        maxLife: big ? rand(60, 90) : rand(35, 60),
        width: big ? rand(1.6, 2.2) : rand(0.8, 1.4),
        bright: big ? 1 : rand(0.55, 0.85),
      })
    }

    // 一拨流星：count 颗共用一个方向，起点彼此靠近，前后错开出发
    const scheduleGroup = (now: number, count: number, spreadMs: number, area: number) => {
      const angle = randomAngle()
      const cx = width * rand(0.3, 1)
      const cy = height * rand(0, 0.3)
      for (let i = 0; i < count; i++) {
        pending.push({
          at: now + (i === 0 ? 0 : rand(0, spreadMs)),
          angle: angle + rand(-3, 3),
          x: cx + rand(-area, area) * width,
          y: Math.max(0, cy + rand(-area, area) * height * 0.6),
        })
      }
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(now * 0.001 * star.speed + star.phase)
        if (star.r > 0.85) {
          // 亮星和中等亮度的星：贴四角星芒，星芒随闪烁微微伸缩；越亮的星芒越长
          const size = star.r * (star.r > 1.1 ? 15 : 7) * (0.8 + 0.2 * twinkle)
          ctx.globalAlpha = star.base * twinkle * (star.r > 1.1 ? 1 : 0.7)
          ctx.drawImage(sprites.get(star.color)!, star.x - size / 2, star.y - size / 2, size, size)
          ctx.globalAlpha = 1
        } else {
          // 暗星只是一个小点，真实夜空里绝大多数星星都是这样
          ctx.fillStyle = `rgb(${star.color} / ${star.base * twinkle})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduceMotion) {
        if (now > nextSingleAt) {
          // 约三成的时候成群来 2~4 颗
          const count = Math.random() < 0.3 ? 2 + Math.floor(Math.random() * 3) : 1
          scheduleGroup(now, count, 600, 0.12)
          nextSingleAt = now + rand(800, 2500)
        }
        if (now > nextShowerAt) {
          // 流星雨：6~10 颗在 2.5 秒内从同一方向密集划过
          scheduleGroup(now, 6 + Math.floor(Math.random() * 5), 2500, 0.35)
          nextShowerAt = now + rand(15000, 25000)
        }
        for (let i = pending.length - 1; i >= 0; i--) {
          if (now >= pending[i].at) {
            launch(pending[i])
            pending.splice(i, 1)
          }
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i]
          m.life++
          m.x += m.vx
          m.y += m.vy
          // 淡入、匀速、淡出
          const t = m.life / m.maxLife
          const alpha = t < 0.15 ? t / 0.15 : t > 0.7 ? (1 - t) / 0.3 : 1
          const speed = Math.hypot(m.vx, m.vy)
          const tailX = m.x - (m.vx / speed) * m.length
          const tailY = m.y - (m.vy / speed) * m.length
          const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
          const a = alpha * m.bright
          gradient.addColorStop(0, `rgb(255 255 255 / ${0.95 * a})`)
          gradient.addColorStop(0.25, `rgb(191 219 254 / ${0.45 * a})`)
          gradient.addColorStop(1, 'rgb(96 165 250 / 0)')
          ctx.strokeStyle = gradient
          ctx.lineWidth = m.width
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
          // 流星头部的亮点
          ctx.fillStyle = `rgb(255 255 255 / ${alpha * m.bright})`
          ctx.beginPath()
          ctx.arc(m.x, m.y, m.width * 0.9, 0, Math.PI * 2)
          ctx.fill()
          if (m.life >= m.maxLife) meteors.splice(i, 1)
        }
      }

      // 不需要动的时候只画一帧
      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [dark])

  if (!dark) return null
  return <canvas ref={canvasRef} className="absolute inset-0" />
}

export default Starfield
