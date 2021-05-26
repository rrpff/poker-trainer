module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./test/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest'
  },
}
