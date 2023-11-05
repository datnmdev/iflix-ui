import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        growWidth: {
          '0%': {
            width: '0',
            opacity: '0'
          },
          '100%': {
            width: '100px',
            opacity: '1'
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        anim: {
          '100%': {
            'stroke-dashoffset': '157.5'
          }
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        growWidth: 'growWidth 0.5s ease-in-out forwards',
        fadeIn: 'fadeIn 0.5s linear forwards',
        anim: 'anim 2s linear forwards',
        scaleIn: 'scaleIn 0.5s ease-in-out forwards'
      }
    }
  },
  plugins: [],
} satisfies Config

