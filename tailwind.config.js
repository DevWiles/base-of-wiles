/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // 英文用 Inter，中文用思源黑体；字体加载完成前回退到系统字体
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      colors: {
        // 背景色由 CSS 变量驱动，切换黑夜模式时所有 bg-background 自动跟随
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: '#ffffff',
      },
    },
  },
  plugins: [],
}
