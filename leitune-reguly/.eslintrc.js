module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'max-len': [
      'error',
      {
        code: 200,
      },
    ],
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['warn'],
    'no-return-assign': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': ['off'],
    'import/prefer-default-export': ['off'],
    'react/button-has-type': ['off'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
