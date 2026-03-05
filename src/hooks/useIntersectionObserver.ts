import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  downwardOnly?: boolean // 是否仅在向下滚动时触发
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false, // 改为默认 false，支持反复触发
  downwardOnly = false, // 默认允许双向触发
}: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [isExiting, setIsExiting] = useState(false) // 新增：是否正在退出（向上滚动时）
  const ref = useRef<T>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (downwardOnly) {
          // 仅在向下滚动时触发：当元素从底部进入视口时才激活
          const currentScrollY = window.scrollY
          const isScrollingDown = currentScrollY > lastScrollY.current
          
          if (entry.isIntersecting && isScrollingDown) {
            setIsIntersecting(true)
            setIsExiting(false)
          } else if (!entry.isIntersecting && !isScrollingDown) {
            // 向上滚动且元素离开视口时重置
            if (!triggerOnce) {
              setIsIntersecting(false)
              setIsExiting(true) // 标记为退出状态
            }
          } else if (!entry.isIntersecting && isScrollingDown) {
            // 向下滚动但元素未进入视野，重置退出状态
            setIsExiting(false)
          }
          lastScrollY.current = currentScrollY
        } else {
          // 双向触发模式
          if (entry.isIntersecting) {
            setIsIntersecting(true)
            setIsExiting(false)
          } else {
            if (!triggerOnce) {
              setIsIntersecting(false)
              setIsExiting(true)
            }
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, downwardOnly])

  return { ref, isIntersecting, isExiting }
}
