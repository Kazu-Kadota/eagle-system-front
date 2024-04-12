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
      success: '#239B0F',
      link: '#33A2E0',
      blue: '#097FB1',
      accent: '#36448A',
      opaque: '#6A8D94',
      brown: '#7B4302',
      purple: '#7F6A94',
      'dark-purple': '#100649',
      'light-primary': '#F8E1B5',
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
      fontSize: {
        md: ['0.8125rem', 1.2],
      },
    },
  },
  plugins: [],
}
