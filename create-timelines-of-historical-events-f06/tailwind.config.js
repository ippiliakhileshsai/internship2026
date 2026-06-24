/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0F172A',
          950: '#090D1A',
        },
        gold: {
          500: '#F59E0B',
        },
        slate: {
          200: '#E2E8F0',
          500: '#64748B',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
