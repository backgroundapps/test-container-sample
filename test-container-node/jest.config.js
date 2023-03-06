module.exports = {
    "preset": 'ts-jest',
    "testEnvironment": 'node',
    "testMatch": [
        "<rootDir>/tests/**/*.+(ts|tsx|js)"
    ],
    "reporters": ["default", [ "jest-junit", { suiteName: "jest tests", outputDirectory: "./coverage/" } ]],
    "coverageReporters": ["text", "cobertura"],
    "collectCoverageFrom": [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!**/node_modules/**",
    ],
    "clearMocks": true,
    "setupFilesAfterEnv":[],
    "coverageThreshold": {
        "global": {
            "branches": 80,
            "functions": 80,
            "lines": 80,
            "statements": 80
          }
        }
}