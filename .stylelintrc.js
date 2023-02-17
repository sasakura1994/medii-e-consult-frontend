module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-prettier/recommended', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'string-quotes': [
      'double',
      {
        ignoreAtRules: ['import'],
        except: ['inside-brackets', 'block'],
        ignore: ['comments'],
      },
    ],
  },
  ignoreFiles: ['**/node_modules/**'],
};
