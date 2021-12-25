module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*(*.)@(test).[tj]s?(x)'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest",
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
