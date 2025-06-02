export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/test-utils.js"],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js", "config/**/*.js", "!src/app.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  verbose: true,
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
