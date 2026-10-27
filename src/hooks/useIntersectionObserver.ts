import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  downwardOnly?: boolean // 是否仅在向下滚动时触发
  stabilizationDelay?: number // 稳定延迟（毫秒），防止阈值附近抖动
}

// 定义动画状态枚举
type AnimationState = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false,
  downwardOnly = false,
  stabilizationDelay = 150, // 默认 150ms 稳定延迟
}: UseIntersectionObserverOptions = {}) => {
  // 使用单一状态机代替多个布尔值
  const [state, setState] = useState<AnimationState>('idle')
  const ref = useRef<T>(null)
  const lastScrollY = useRef(0)
  const stateLockRef = useRef(false) // 状态锁，防止并发更新
  const pendingTimeoutRef = useRef<number | null>(null) // 用于防抖的定时器 ID
  const hasTriggeredRef = useRef(false) // 记录是否已触发过（用于 triggerOnce）

  // 清理待处理的定时器
  const clearPendingTimeout = () => {
    if (pendingTimeoutRef.current !== null) {
      window.clearTimeout(pendingTimeoutRef.current)
      pendingTimeoutRef.current = null
    }
  }

  // 安全地更新状态（带锁保护）
  const updateState = (newState: AnimationState) => {
    if (stateLockRef.current) return false // 如果上锁，拒绝更新
    stateLockRef.current = true // 上锁
    setState(newState)
    return true
  }

  // 释放状态锁
  const releaseLock = () => {
    stateLockRef.current = false
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 清理之前的待处理任务
        clearPendingTimeout()

        const currentScrollY = window.scrollY
        const isScrollingDown = currentScrollY > lastScrollY.current
        const isIntersecting = entry.isIntersecting
        // 元素顶边已在视口上方（整个滚过去了，或正跨在顶边上）：页面中部刷新
        // （浏览器恢复滚动位置）或点导航直接跳过来时会这样
        const isAboveViewport = entry.boundingClientRect.top < 0

        // 延迟判断，避免阈值附近的抖动
        pendingTimeoutRef.current = window.setTimeout(() => {
          if (triggerOnce) {
            // 只播一次的元素不看滚动方向：进入视野、或已经滚过去了，都直接显示。
            // 否则在页面中部刷新后，上方的内容从没「向下滚进视野」过，会一直隐藏
            if ((isIntersecting || isAboveViewport) && !hasTriggeredRef.current && updateState('entering')) {
              hasTriggeredRef.current = true
              requestAnimationFrame(() => {
                setState('entered')
                releaseLock()
              })
            }
            lastScrollY.current = currentScrollY
            return
          }

          if (downwardOnly) {
            // 向下滚动模式
            if (isIntersecting && isScrollingDown) {
              // 向下滚动且元素进入视野 → 触发进入动画
              if (triggerOnce && hasTriggeredRef.current) {
                // 已经触发过，不再重复
                releaseLock()
                return
              }
              
              if (updateState('entering')) {
                hasTriggeredRef.current = true
                // 动画状态转换：entering → entered
                requestAnimationFrame(() => {
                  setState('entered')
                  releaseLock()
                })
              }
            } else if (!isIntersecting && !isScrollingDown) {
              // 向上滚动且元素离开视野 → 触发退出动画
              if (triggerOnce && hasTriggeredRef.current) {
                // triggerOnce 模式下，进入后不退出
                releaseLock()
                return
              }
              
              if (updateState('exiting')) {
                // 动画状态转换：exiting → exited
                requestAnimationFrame(() => {
                  setState('exited')
                  releaseLock()
                })
              }
            } else {
              // 其他情况：向下但未进入，或向上但未离开 → 重置退出状态
              releaseLock()
            }
          } else {
            // 双向触发模式
            if (isIntersecting) {
              // 元素进入视野 → 触发进入动画
              if (triggerOnce && hasTriggeredRef.current) {
                releaseLock()
                return
              }
              
              if (updateState('entering')) {
                hasTriggeredRef.current = true
                requestAnimationFrame(() => {
                  setState('entered')
                  releaseLock()
                })
              }
            } else {
              // 元素离开视野 → 触发退出动画
              if (triggerOnce && hasTriggeredRef.current) {
                releaseLock()
                return
              }
              
              if (updateState('exiting')) {
                requestAnimationFrame(() => {
                  setState('exited')
                  releaseLock()
                })
              }
            }
          }

          // 更新最后滚动位置
          lastScrollY.current = currentScrollY
        }, stabilizationDelay)
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      clearPendingTimeout()
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, downwardOnly, stabilizationDelay])

  // 派生出对外暴露的布尔值
  const isIntersecting = state === 'entered' || state === 'entering'
  // isExiting 在 exiting 和 exited 时都为 true，确保淡出动画完成后保持隐藏状态
  const isExiting = state === 'exiting' || state === 'exited'

  return { ref, isIntersecting, isExiting, state }
}
