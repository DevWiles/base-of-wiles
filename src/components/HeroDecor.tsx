import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import activity from '../data/activity.json'

// 我在 GitHub 上的累计提交（scripts/update-activity.mjs 生成）：按周累计，补齐没有提交的周
const series = (() => {
  const counts = new Map(activity.weeks.map(({ week, count }) => [week, count]))
  const first = new Date(activity.weeks[0].week)
  const last = new Date(activity.weeks[activity.weeks.length - 1].week)
  const values: number[] = []
  let sum = 0
  for (let d = first; d <= last; d = new Date(d.getTime() + 7 * 86400000)) {
    sum += counts.get(d.toISOString().slice(0, 10)) ?? 0
    values.push(sum)
  }
  return values
})()

const total = series[series.length - 1]
const since = activity.weeks[0].week.slice(0, 7).replace('-', '.')
const asOf = activity.generatedAt.replace(/-/g, '.')

// 背景点阵的格距（index.css 的 .backdrop-dots），像素线画在同一套格子上
const CELL = 24

type Cell = { x: number; y: number; col: number; line: boolean; depth: number }

/**
 * 把累计提交曲线栅格化到背景点阵上：曲线经过的格子是亮像素，
 * 相邻两列高度不同时把中间的格子补齐，像素线就是连续的台阶；
 * 曲线下方的格子按深度渐暗，形成像素填充区。
 */
const buildPixels = (width: number, height: number, top: number) => {
  // 点阵的点在每个格子正中；svg 顶边在视口里的位置决定了本地坐标里第一行点的偏移
  const firstRow = ((CELL / 2 - top) % CELL + CELL) % CELL
  const rows: number[] = []
  for (let y = firstRow; y < height; y += CELL) rows.push(y)

  const cols: number[] = []
  for (let x = CELL / 2; x < width - CELL; x += CELL) cols.push(x)

  const valueAt = (t: number) => {
    const pos = t * (series.length - 1)
    const i = Math.floor(pos)
    const next = series[Math.min(series.length - 1, i + 1)]
    return series[i] + (next - series[i]) * (pos - i)
  }

  // 曲线只占画布下部约 80%，最低一行留给「Scroll」
  const topRow = Math.round(rows.length * 0.15)
  const bottomRow = rows.length - 2
  const lineRows = cols.map((_, c) => {
    const v = valueAt(c / Math.max(1, cols.length - 1)) / Math.max(1, total)
    return Math.round(bottomRow - v * (bottomRow - topRow))
  })

  const cells: Cell[] = []
  cols.forEach((x, c) => {
    const row = lineRows[c]
    const prev = c > 0 ? lineRows[c - 1] : row
    // 累计曲线只升不降（行号只减不增）：本列从自己的高度一直补到上一列下面一格，像素线才连续
    for (let r = row; r <= Math.max(row, prev - 1); r++) {
      cells.push({ x, y: rows[r], col: c, line: true, depth: 0 })
    }
    for (let r = row + 1; r < rows.length; r++) {
      cells.push({ x, y: rows[r], col: c, line: false, depth: (r - row) / Math.max(1, rows.length - row) })
    }
  })

  const lastCol = cols.length - 1
  return { cells, end: { x: cols[lastCol], y: rows[lineRows[lastCol]] }, cols: cols.length }
}

const PixelChart = () => {
  const ref = useRef<SVGSVGElement>(null)
  const [frame, setFrame] = useState<{ width: number; height: number; top: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      const top = el.getBoundingClientRect().top + window.scrollY
      setFrame((prev) => (prev && Math.abs(prev.width - width) < 40 && Math.abs(prev.height - height) < 40 ? prev : { width, height, top }))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pixels = frame && buildPixels(frame.width, frame.height, frame.top)
  // 每一列点亮的间隔：整条线约 1.6 秒扫完
  const step = pixels ? 1600 / pixels.cols : 0

  const renderCell = (cell: Cell, i: number) => {
    const size = cell.line ? 10 : 8
    return (
      <rect
        key={i}
        className={`px-cell ${cell.line ? 'px-line' : 'px-area'}`}
        style={{ '--d': `${400 + cell.col * step}ms`, '--a': (1 - cell.depth) ** 1.6 } as CSSProperties}
        x={cell.x - size / 2}
        y={cell.y - size / 2}
        width={size}
        height={size}
        rx={1.5}
      />
    )
  }

  return (
    <>
      <svg ref={ref} className="absolute inset-x-0 bottom-0 h-[32%] w-full md:h-[55%]" viewBox={frame ? `0 0 ${frame.width} ${frame.height}` : undefined}>
        {pixels && frame && (
          <g key={`${Math.round(frame.width)}x${Math.round(frame.height)}`}>
            {pixels.cells.map(renderCell)}
            <rect
              className="px-cursor"
              style={{ '--d': `${400 + pixels.cols * step}ms` } as CSSProperties}
              x={pixels.end.x + CELL / 2 + 2}
              y={pixels.end.y - 8}
              width={8}
              height={16}
              rx={1}
            />
          </g>
        )}
      </svg>
      <p className="hero-fade-late absolute bottom-6 right-6 hidden text-right sm:block font-mono text-[11px] leading-relaxed tracking-wide text-gray-400 dark:text-gray-500">
        git log --author=me | wc -l → <span className="font-semibold text-blue-500">{total}</span>
        <br />
        {since} — {asOf}
      </p>
    </>
  )
}

/** 首屏背景装饰：跟随鼠标的柔光与亮起的点阵、像素风的累计提交曲线 */
const HeroDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="hero-spot absolute inset-0" />
    <div className="hero-dots-hot absolute inset-0" />
    <PixelChart />
  </div>
)

export default HeroDecor
