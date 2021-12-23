module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'prettier',
    'plugin:node/recommended-module',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'node/no-extraneous-import': 0,
    'node/no-missing-import': [
      'error',
      {
        tryExtensions: ['.js', '.ts'],
      },
    ],
  },
}
