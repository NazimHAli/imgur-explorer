/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

export default () => {
  return {
    // Bug with vite + ts-jest + import.meta syntax + coverage
    collectCoverage: true,
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{ts,tsx}",
      "!<rootDir>/src/__tests__/**/*",
    ],
    coverageReporters: ["text"],
    coverageThreshold: {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: -500,
      },
    },
    preset: "ts-jest",
    restoreMocks: true,
    resetMocks: true,
    resetModules: true,
    transform: {
      "^.+\\.(ts|tsx)": "ts-jest",
      "^.+\\.(js|jsx)": "babel-jest",
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["node_modules", "fixtures"],
    verbose: true,
  };
};
