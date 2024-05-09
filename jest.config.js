const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  testEnvironment: "jsdom",
  globals: {
    fetch: global.fetch,
  }
};

module.exports = createJestConfig(config);
