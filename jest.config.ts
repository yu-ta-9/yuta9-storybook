module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['esbuild-jest', { sourcemap: true }],
    '^.+\\.svg$': 'jest-transformer-svg',
    '^.+\\.scss$': 'jest-scss-transform',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
