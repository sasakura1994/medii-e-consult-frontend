/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'low': "0 0 4px rgba(0, 0, 0, 0.2)",
        'high': '0 1px 8px rgba(0, 0, 0, 0.1), 0 1px 16px rgba(0, 0, 0, 0.05);',
      },
      fontSize: {
        'sm': '12px',
        'md': '15px',
        'l': '17px',
        'xl': '19px',
        'xxl': '21px',
        'xxxl': '28px',
      },
      colors: {
        primary: '#5c6bc0',
        'primary-light': '#e2e7ff',
        "secondary": "#667385",
        error: '#f27474',
        strong: '#f5847d',
        bg: '#eff3f6',
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
        "medii-blue-100": "#F2F7FF",
        "medii-blue-200": "#CEDFFD",
        "medii-blue-300": "#BAD2FD",
        "medii-blue-400": "#88B2FB",
        "medii-blue-500": "#5793FA",
        "medii-blue-600": "#2573F8",
        "medii-blue-700": "#0758E4",
        "medii-blue-800": "#0545B2",
        "medii-blue-900": "#043281",
        "medii-blue-950": "#032868",
        "monotone-50": "#F6F7F8",
        "monotone-100": "#E5E8EB",
        "monotone-200": "#D7DAE0",
        "monotone-300": "#BAC0CA",
        "monotone-400": "#9DA6B4",
        "monotone-500": "#808C9D",
        "monotone-600": "#667385",
        "monotone-700": "#505A68",
        "monotone-800": "#39404A",
        "monotone-900": "#24282E",
        "monotone-950": "#16191D",
        "medii-sky-100": "#E6FCFF",
        "medii-sky-200": "#CCF8FF",
        "medii-sky-300": "#6DE1F2",
        "medii-sky-400": "#02CAE8",
        "medii-sky-500": "#02B4CF",
        "medii-sky-600": "#029EB5",
        "medii-sky-700": "#01879C",
        "medii-sky-800": "#017182",
        "medii-sky-900": "#015B69",
        "medii-sky-950": "#01454F",
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
      fontFamily: {
        'sans': ['Noto Sans JP', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
