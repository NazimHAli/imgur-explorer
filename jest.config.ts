/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

export default () => {
  return {
    collectCoverage: true,
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{ts,tsx}",
      "!<rootDir>/src/__tests__/**/*",
      "!<rootDir>/src/*.d.ts",
    ],
    coverageReporters: ["text"],
    coverageThreshold: {
      global: {
        branches: 29,
        functions: 36,
        lines: 39,
        statements: -295,
      },
    },
    moduleDirectories: [
      "<rootDir>/node_modules",
      "<rootDir>",
      "<rootDir>/src/__tests__",
    ],
    preset: "ts-jest",
    restoreMocks: true,
    resetMocks: true,
    resetModules: true,
    transform: {
      "^.+\\.(ts|tsx)": "ts-jest",
      "^.+\\.(js|jsx)": "babel-jest",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/src/__tests__/fixtures/fileTransformer.ts",
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["node_modules", "fixtures"],
    verbose: true,
  };
};
