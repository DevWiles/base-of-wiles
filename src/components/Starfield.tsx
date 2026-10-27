import { useEffect, useRef, useState } from 'react'

type Star = { x: number; y: number; r: number; base: number; speed: number; phase: number; color: string }
type Meteor = { x: number; y: number; vx: number; vy: number; length: number; life: number; maxLife: number }

// 大多数星星是白色，少数偏蓝或偏暖，更像真实的夜空
const STAR_COLORS = ['255 255 255', '255 255 255', '255 255 255', '191 219 254', '254 240 200']

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
    let width = 0
    let height = 0
    let stars: Star[] = []
    const meteors: Meteor[] = []
    let nextMeteorAt = performance.now() + 1500
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

    const spawnMeteor = () => {
      // 从画面上半部、偏右的地方出发，朝左下方划过
      const angle = (200 + Math.random() * 25) * (Math.PI / 180)
      const speed = 9 + Math.random() * 6
      meteors.push({
        x: width * (0.35 + Math.random() * 0.65),
        y: height * Math.random() * 0.35,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        length: 120 + Math.random() * 140,
        life: 0,
        maxLife: 55 + Math.random() * 35,
      })
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(now * 0.001 * star.speed + star.phase)
        ctx.fillStyle = `rgb(${star.color} / ${star.base * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
        // 亮星加一圈柔光
        if (star.r > 1.1) {
          ctx.fillStyle = `rgb(${star.color} / ${0.08 * twinkle})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduceMotion) {
        if (now > nextMeteorAt) {
          spawnMeteor()
          // 下一颗在 3~8 秒后，偶尔紧跟着来第二颗
          nextMeteorAt = now + (Math.random() < 0.15 ? 400 : 3000 + Math.random() * 5000)
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
          gradient.addColorStop(0, `rgb(255 255 255 / ${0.95 * alpha})`)
          gradient.addColorStop(0.25, `rgb(191 219 254 / ${0.45 * alpha})`)
          gradient.addColorStop(1, 'rgb(96 165 250 / 0)')
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
          // 流星头部的亮点
          ctx.fillStyle = `rgb(255 255 255 / ${alpha})`
          ctx.beginPath()
          ctx.arc(m.x, m.y, 1.4, 0, Math.PI * 2)
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
