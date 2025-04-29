/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#fff',
        },
        red: {
          DEFAULT: '#fc4100',
        },
        black: {
          DEFAULT: '#000',
          100: '#6b6b6b',
          200: '#525252',
          300: '#373737',
          400: '#1f1f1f',
          500: '#040404',
        },
        gray: {
          100: '#dedede',
          200: '#c4c4c4',
          300: '#ababab',
          400: '#999',
          500: '#808080',
        },
        primaryOrange: {
          100: '#fff7eb',
          200: '#fcc369',
          300: '#fbaf37',
          400: '#f89a05',
          500: '#e18c05',
        },
        primaryBlue: {
          100: '#535779',
          200: '#3e415b',
          300: '#2a2c3d',
        },
        background: {
          100: '#fcfcfc',
          200: '#f7f7f7',
          300: '#efefef',
        },
        line: {
          100: '#f2f2f2',
          200: '#e6e6e6',
        },
      },
    },
  },
  plugins: [],
};
