# 滚动触发渐进式显示效果设计文档

**日期：** 2026-03-05
**功能：** 滚动到 section 时触发整体淡入动画

---

## 目标

当用户向下滚动，页面中每个 section（About、Skills、Projects、Contact）进入视口时，触发从下方向上渐进淡入的动画效果，提升页面的视觉体验和层次感。

---

## 技术方案

**方案 A（选定）：useIntersectionObserver hook + Tailwind CSS class 切换**

### 核心思路

1. 复用已有的 `useIntersectionObserver` hook（`src/hooks/useIntersectionObserver.ts`）
2. 每个 section 初始状态为 `opacity-0 translate-y-8`（透明 + 向下偏移）
3. 当 section 进入视口后，切换为 `opacity-100 translate-y-0`（完全可见）
4. 通过 `transition-all duration-700 ease-out` 实现过渡动画

### 不选择的方案

- **方案 B（CSS keyframes）**：需要手动管理 animation class 的添加/移除，不如 Tailwind class 切换直观
- **方案 C（第三方库如 framer-motion）**：引入额外依赖，对当前需求过于重量级

---

## 实现细节

### Tailwind 配置

在 `tailwind.config.js` 中添加 `transitionTimingFunction` 或直接使用内置 class。

### 各组件改动

修改 `About.tsx`、`Skills.tsx`、`Projects.tsx`、`Contact.tsx` 四个组件：

```tsx
// 改动模式（以 About 为例）
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="about"
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      ...
    </section>
  )
}
```

### 动画参数

| 参数 | 值 | 说明 |
|------|----|------|
| `threshold` | `0.1` | 元素进入视口 10% 时触发 |
| `triggerOnce` | `true`（默认）| 只触发一次，避免反复动画 |
| `duration` | `700ms` | 动画持续时间 |
| `easing` | `ease-out` | 开始快、结束慢，自然感 |
| 初始偏移 | `translate-y-8`（32px） | 从下方 32px 处滑入 |

---

## 受影响的文件

- `src/components/About.tsx` — 添加 hook 和动画 class
- `src/components/Skills.tsx` — 添加 hook 和动画 class
- `src/components/Projects.tsx` — 添加 hook 和动画 class
- `src/components/Contact.tsx` — 添加 hook 和动画 class
- `src/hooks/useIntersectionObserver.ts` — 无需改动，直接复用

> **注意：** `Hero` section 不添加动画（首屏直接展示），`Footer` 也不处理。

---

## 验收标准

1. 刷新页面后，首屏（Hero）正常显示，无动画
2. 向下滚动时，About / Skills / Projects / Contact 依次从下方淡入
3. 动画只触发一次（不会在滚回去后重置）
4. 不影响现有的交互（技能卡片 hover、Contact 复制等）
