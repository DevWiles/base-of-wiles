import Starfield from './Starfield'

// 全站固定背景层：白天是一层很淡的点阵，像工程图纸的底稿；黑夜换成星空和流星
const Backdrop = () => (
  <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
    <div className="backdrop-dots absolute inset-0 dark:hidden" />
    <div className="backdrop-nebula absolute inset-0 hidden dark:block" />
    <Starfield />
  </div>
)

export default Backdrop
