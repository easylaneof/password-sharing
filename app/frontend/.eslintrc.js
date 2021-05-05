module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "react-app/jest",
    "prettier",

    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  overrides: [
    {
      files: [
        "**/*.stories.*"
      ],
      rules: {
        "import/no-anonymous-default-export": "off"
      }
    }
  ]
};
