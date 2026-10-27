/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 背景色由 CSS 变量驱动，切换黑夜模式时所有 bg-background 自动跟随
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: '#ffffff',
      },
    },
  },
  plugins: [],
}
