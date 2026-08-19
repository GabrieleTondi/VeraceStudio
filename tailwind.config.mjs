/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        zero: {
          bg: '#FFFDF0', // Canvas Background (Bianco Panna)
          paper: '#FFFDF0', // Surface Cards (Bianco Panna)
          card: '#FFFDF0',
          black: '#373232', // Deep Background / Text (Nero)
          dark: '#373232', // Grid Borders (Nero)
          muted: '#665e5e',
          border: '#373232', // Nero tecnico 1px
          lightborder: '#dcd7cd',
          red: '#02271D', // Secondary Accent (Verde 02271D al posto del rosso)
          redHover: '#011c15',
          green: '#02271D', // Secondary Accent (Verde 02271D)
          greenHover: '#011c15',
          greenTint: '#e8f0ec',
          granata: '#662025', // Details Accent (Granata 662025)
          granataHover: '#50191d',
          yellow: '#ffe600',
        }
      },
      fontFamily: {
        display: ['Populista', 'sans-serif'],
        sans: ['"Unica 77"', 'Helvetica', 'Arial', 'sans-serif'],
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
