/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black + purple theme: near-black surfaces with a violet tint, flat accent colors.
        judge: {
          bg: '#000000',
          panel: '#17141d',
          panel2: '#221d2c',
          accent: '#7c5cff',   // violet — primary actions / brand
          accent2: '#30d158',  // green — transparency
          purple: '#d946ef',   // magenta — autonomy (distinct from primary violet)
          warn: '#ff453a',     // red
          gold: '#ff9f0a',     // orange — fairness
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        ringPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(124,92,255,0.55)' },
          '100%': { boxShadow: '0 0 0 10px rgba(124,92,255,0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.4)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '75%': { transform: 'scale(0.92)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out both',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in': 'popIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'ring-pulse': 'ringPulse 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out both',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
