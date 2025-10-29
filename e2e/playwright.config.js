const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 30 * 1000,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
    trace: 'off',
  },
  webServer: {
    command: 'node ../serve-build.js',
    url: 'http://localhost:5000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});