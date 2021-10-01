export default () => {
  return {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,tsx}"
    ],
    coverageReporters: ["text"],
    coverageThreshold: {
      global: {
        branches: 0,
        functions: 10,
        lines: 10,
        statements: -100,
      },
    },
    preset: "ts-jest",
    resetModules: true,
    transform: {
      "^.+\\.(ts|tsx)": "ts-jest",
      "^.+\\.(js|jsx)": "babel-jest",
    },
    moduleNameMapper: {
      "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.test.tsx"],
    verbose: true,
  };
};
