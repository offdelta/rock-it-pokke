/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        brown: {
          50: '#fdf6f3',
          100: '#f8e8e0',
          200: '#f0d3c4',
          300: '#e5b7a0',
          400: '#d89670',
          500: '#c97849',
          600: '#b86438',
          700: '#9c502e',
          800: '#7d402a',
          900: '#633224',
        },
        moss: {
          50: '#f3f5f3',
          100: '#e3e8e3',
          200: '#c5d2c5',
          300: '#9fb39f',
          400: '#749074',
          500: '#4d6f4d',
          600: '#3d5a3d',
          700: '#314731',
          800: '#273827',
          900: '#1f2d1f',
        },
      },
      animation: {
        'bounce-horizontal': 'bounce-horizontal 1s ease-in-out infinite',
        'jump-in': 'jump-in 0.8s ease-out forwards',
        'gentle-bounce': 'gentle-bounce 2.2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-horizontal': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'jump-in': {
          '0%': { 
            transform: 'translate(-50px, -100px) rotate(-15deg)',
            opacity: '0',
          },
          '50%': {
            transform: 'translate(0, -20px) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
