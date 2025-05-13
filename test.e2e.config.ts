export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.\\e2e-spec\\.ts$',
  transform: {
    '^.\\.(t|j)s$': 'ts-jest',
  },
  collectionCoverageFrom: ['**/*.(t|s)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
