/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#9B6B0F',
      placeholder: '#594F3F',
      dark: '#010101',
      light: '#F8F8F8',
      error: '#A01818',
      link: '#33A2E0',
      'light-gray': '#E8E8E8',
      'line-light': '#D2D1D0',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        button: '1px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
