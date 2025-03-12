module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:jsx-a11y/strict',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'jsx-a11y'],
  rules: {
    'import/prefer-default-export': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    // The following rule is because the way immerjs works is to modify the input parameter,
    // usually you do not want to do this.  This rule will allow any object named 'draft', which
    // matches immer's template to have properties reassigned.
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/function-component-definition': 0,
    'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    // Typescript should make this unnecessary
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: true,
      },
    ],
  },
};
