module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  globals: {
    JSX: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "no-shadow": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
    "prettier/prettier": "error",
  },
};
