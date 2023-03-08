/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5c6bc0',
        error: '#e20000',
        'toast-success': '#3f51b5',
        'toast-error': '#e20000',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};
