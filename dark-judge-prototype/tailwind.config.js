/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        judge: {
          bg: '#0f1115',
          panel: '#171a21',
          accent: '#7c5cff',
          accent2: '#22d3a5',
          warn: '#ff5c72',
          gold: '#f5c451',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 3px rgba(124,92,255,0.35)',
      },
    },
  },
  plugins: [],
}
