/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f3',
        'off-white': '#fefcf7',
        champagne: '#f7f0e3',
        charcoal: '#3d3529',
        stone: '#78716c',
        gold: {
          light: '#e9bf86',
          DEFAULT: '#dfa256',
          deep: '#c4a96e',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4bf8c, #e9bf86, #dfa256)',
      },
      letterSpacing: {
        'ultrawide': '0.2em',
      },
      boxShadow: {
        'luxury': '0 4px 30px rgba(212, 191, 140, 0.18)',
        'luxury-lg': '0 16px 50px rgba(223, 162, 86, 0.3)',
      },
      backdropBlur: {
        'navbar': '20px',
      },
    },
  },
  plugins: [],
};
