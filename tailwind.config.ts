import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      primary: '#9B6B0F',
      primaryLight: '#D49E35',
      placeholder: '#594F3F',
      empty: '#B2B2B2',
      dark: '#010101',
      light: '#F8F8F8',
      error: '#A01818',
      errorLight: '#E87934',
      success: '#239B0F',
      successLight: '#47B86D',
      warningLight: '#D3C053',
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
      card: '#F3F3F3',
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        poppins: ['var(--font-poppings'],
      },
      boxShadow: {
        button: '1px 2px 4px 0px rgba(0, 0, 0, 0.25)',
        processCard: '3px -3px 15.4px 1px #00000036',
        infoCard: '1px 1px 4px 0px #00000075',
      },
      fontSize: {
        md: ['0.8125rem', '1.2'],
        '2xs': ['0.625rem', '1.2'],
      },
    },
  },
  plugins: [],
} satisfies Config;
