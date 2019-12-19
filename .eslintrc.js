'use strict'

module.exports = {
  extends: [
    '@strv/node/v12',
    '@strv/node/optional',
    '@strv/node/style',
    '@strv/mocha',
    '@strv/eslint-config-typescript',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
    project: './tsconfig.json',
  },
  rules: {
    'import/group-exports': 0,
    '@typescript-eslint/promise-function-async': 0,
    'require-await': 0,
    'import/exports-last': 0,
    'max-classes-per-file': 0,
    // todo: consider using this -> it doesn't look like it's needed everywhere
    '@typescript-eslint/explicit-function-return-type': 0,
  },
}
