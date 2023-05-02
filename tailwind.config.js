/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#6500CB'
      },
      backgroundImage: {
        'auth': 'linear-gradient(90deg, rgba(101, 0, 203, 0.9) 44.27%, rgba(0, 0, 0, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.76) 20.83%, rgba(5, 9, 19, 0.6004) 92.19%),url("/img/auth-bg.jpg")',
        'gradient-main': 'linear-gradient(90deg, #6500CB 0%, #A37ACC 100%)',
        'gradient-white': 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)'
      },
    },
  },
  plugins: [],
})
