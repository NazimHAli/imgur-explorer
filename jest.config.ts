import type { InitialOptionsTsJest } from "ts-jest/dist/types";
import { jsWithTsESM as tsjPreset } from "ts-jest/presets";

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

const config: InitialOptionsTsJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/__tests__/**/*",
    "!<rootDir>/src/*.d.ts",
  ],
  // @ts-ignore: Unreachable code error
  coverageReporters: ["text", "text-summary", "jest-badges"],
  coverageThreshold: {
    global: {
      branches: 34,
      functions: 46,
      lines: 50,
      statements: 50,
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
    ...tsjPreset.transform,
    "^.+\\.(ts|tsx|js|jsx)": "ts-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__tests__/fixtures/fileTransformer.ts",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules", "fixtures"],
};

export default config;
