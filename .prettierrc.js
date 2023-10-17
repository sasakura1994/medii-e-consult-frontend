module.exports = {
  trailingComma: 'es5',
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 2,
  printWidth: 120,
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
