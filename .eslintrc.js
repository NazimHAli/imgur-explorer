module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "sort-keys-fix"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["src/components/*.ts*", "src/services/*.ts*", "src/utils/*.ts*"],
      rules: {
        "sort-keys-fix/sort-keys-fix": "warn",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
