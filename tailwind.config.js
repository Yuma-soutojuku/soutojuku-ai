/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // 他のパスがあれば追加
  ],
  // ここから追加
  safelist: [
    // Orange to Pink
    'from-orange-400',
    'to-pink-500',
    // Green to Emerald
    'from-green-500',
    'to-emerald-500',
    // Blue to Cyan
    'from-blue-500',
    'to-cyan-500',
    // Purple to Indigo
    'from-purple-500',
    'to-indigo-500',
    // Slate
    'from-slate-500',
    'to-slate-400',
    // 勾配の方向指定も念のため
    'bg-gradient-to-r',
  ],
  // ここまで
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}