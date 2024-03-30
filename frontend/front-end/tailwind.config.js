/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "brown-c": {
          100: "#6C4F41",
          200: "#433833",
        },
        "grey-c": {
          100: "#F0F0F0",
          200: "#A88768"
        },
        "green-c": {
          100: "#507A4C"
        },
        'Primary': {
          DEFAULT: '#FF7D00',
          50: '#FFFEFC',
          100: '#FFEFE0',
          200: '#FFD3A8',
          300: '#FFB670',
          400: '#FF9A38',
          500: '#FF7D00',
          600: '#CC6400',
          700: '#994B00',
          800: '#663200',
          900: '#331900',
          950: '#1A0D00'
        },
        'Secondary': {
          DEFAULT: '#29BCD4',
          50: '#E8F8FB',
          100: '#D3F1F6',
          200: '#A8E4EE',
          300: '#7DD7E6',
          400: '#52CADE',
          500: '#29BCD4',
          600: '#229AAE',
          700: '#1A7887',
          800: '#135661',
          900: '#0B343A',
          950: '#082327'
        }

      }
    },
  },
  plugins: [],
}


