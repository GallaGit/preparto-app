/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#fff8f7',
        surface: {
          DEFAULT: '#fff8f7',
          dim: '#e8d6d6',
          bright: '#fff8f7',
          variant: '#f0dede',
        },
        'surface-container': {
          lowest: '#ffffff',
          low: '#fff0f0',
          DEFAULT: '#fceae9',
          high: '#f6e4e4',
          highest: '#f0dede',
        },
        'on-surface': {
          DEFAULT: '#221919',
          variant: '#524343',
        },
        outline: {
          DEFAULT: '#847373',
          variant: '#d6c2c1',
        },
        primary: {
          DEFAULT: '#874f4f',
          50: '#fff8f7',
          100: '#fff0f0',
          200: '#fceae9',
          300: '#f0dede',
          400: '#e8a2a2',
          500: '#874f4f',
          600: '#6a3738',
          700: '#524343',
          800: '#382e2e',
          900: '#221919',
          container: '#e8a2a2',
          'on-container': '#6a3738',
        },
        'on-primary': '#ffffff',
        secondary: {
          DEFAULT: '#665c5c',
          container: '#eedfdf',
          'on-container': '#6c6262',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          'on-container': '#93000a',
        },
        'on-error': '#ffffff',
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
          'Outfit',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glass: '0 40px 40px -15px rgba(135, 79, 79, 0.04)',
      },
    },
  },
  plugins: [],
};
