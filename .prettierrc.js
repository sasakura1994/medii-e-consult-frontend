module.exports = {
  trailingComma: 'es5',
  plugins: [require('prettier-plugin-tailwindcss')],
  tabWidth: 2,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
      },
    },
  ],
  endOfLine: 'lf',
};
