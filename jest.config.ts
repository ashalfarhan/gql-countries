export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/**/*(*.)@(test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
}
