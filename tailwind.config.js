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
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        md: '1.0625rem',
      },
    },
  },
  plugins: [],
}
