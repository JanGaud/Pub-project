/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'background': '#222222',
        'gold': '#DCBD5B',
        'gold-second': '#897C4A',
        'greenish': '#8D8248',
        'main-white': '#FFFDF4',
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      },
      fontFamily: {
        'main': ['handlee', 'sans-serif'],
        'secondary': ['Dm Sans', 'sans-serif'],
      },
    }
  },
  plugins: [],
};
