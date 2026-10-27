// 全站固定背景层：一层很淡的点阵，四周渐隐，像工程图纸的底稿
const Backdrop = () => (
  <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
    <div className="backdrop-dots absolute inset-0" />
  </div>
)

export default Backdrop
