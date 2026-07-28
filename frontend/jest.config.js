module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts|js)'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  // Seuil minimum de couverture
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 60,
      functions: 65,
      lines: 80
    }
  }
};  