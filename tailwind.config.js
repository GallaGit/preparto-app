/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f9',
          100: '#fceef1',
          200: '#f9dde3',
          300: '#f2c0cc',
          400: '#e8b4bc',
          500: '#d4899a',
          600: '#c06b7f',
          700: '#a35268',
          800: '#874558',
          900: '#703d4c',
        },
        accent: {
          50: '#f0f9f4',
          100: '#dcf0e4',
          200: '#bce1cc',
          300: '#8ecbab',
          400: '#5eae87',
          500: '#3d9169',
          600: '#2d7454',
          700: '#255d45',
          800: '#204a39',
          900: '#1b3d30',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
