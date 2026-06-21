/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f3',
        'off-white': '#fefcf7',
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
        'luxury': '0 4px 20px rgba(61, 53, 41, 0.08)',
        'luxury-lg': '0 8px 40px rgba(61, 53, 41, 0.12)',
      },
      backdropBlur: {
        'navbar': '20px',
      },
    },
  },
  plugins: [],
};
