module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    API_BASE: true,
    page: true,
  },
  rules: {
    quotes: 2,
    'no-console': 0,
    'no-shadow': 0,
    'no-new': 0,
    'no-loop-func': 0,
    'guard-for-in': 0,
    'require-yield': 0,
    'no-nested-ternary': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
