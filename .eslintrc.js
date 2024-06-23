module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["airbnb-base", "airbnb-typescript/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // custom rules...
    "no-param-reassign": [2, { props: false }],
  },
};
