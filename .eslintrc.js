module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'comma-dangle': 2,
    'no-console': 'off',
    'no-debugger': 'off'
  }
}
