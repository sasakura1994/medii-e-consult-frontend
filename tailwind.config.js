/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5c6bc0',
        error: '#f27474',
        'toast-success': '#3f51b5',
        'toast-error': '#f27474',
        'login-container-frame': '#ddd',
        'text-field-frame': '#999',
        'guide-link': 'rgb(0, 0, 238)',
        'btn-gray': '#999',
        'btn-hover-gray': '#dcdcdc',
        'btn-light-gray': '#ccc',
        'block-gray': '#999',
        'heading-line': '#dcdcdc',
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
      dropShadow: {
        button: '0 4px 10px rgba(92,107,192,0.3)',
      },
    },
  },
  plugins: [],
};
