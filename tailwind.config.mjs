/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        zero: {
          bg: '#FFFEF3', // Canvas Background (Nuovo Bianco #FFFEF3)
          paper: '#FFFEF3', // Surface Cards (Nuovo Bianco #FFFEF3)
          card: '#FFFEF3',
          black: '#000000', // Deep Background / Text (Nero Puro #000000)
          dark: '#000000', // Dark Text / Accents
          muted: '#555555',
          border: 'transparent',
          lightborder: '#ebe6df',
          red: '#B53D33', // Primary Accent (Nuovo Rosso #B53D33)
          redHover: '#972f26',
          green: '#B53D33', // Sostituito con Nuovo Rosso
          greenHover: '#972f26',
          greenTint: '#fcedeb',
          granata: '#B53D33', // Sostituito con Nuovo Rosso
          granataHover: '#972f26',
          yellow: '#ffe600',
        }
      },
      fontFamily: {
        display: ['Populista', 'sans-serif'],
        sans: ['"Unica 77"', 'Helvetica', 'Arial', 'sans-serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
