/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'login-container': '476px',
    },
    extend: {
      colors: {
        primary: '#5c6bc0',
        error: '#e20000',
        'toast-success': '#3f51b5',
        'toast-error': '#e20000',
        'login-container-frame': '#ddd',
        'text-field-frame': '#999',
        'guide-link': 'rgb(0, 0, 238)',
      },
      fontSize: {
        xxs: '10px',
      },
      width: {
        'login-container': '476px',
      },
      maxWidth: {
        'login-container': '476px',
      },
    },
  },
  plugins: [],
};
