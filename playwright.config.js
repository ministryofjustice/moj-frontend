import path from 'path'

import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname, `app/.env.${process.env.ENV || 'test'}`),
  debug: true
})

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './app/tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Stop on CI after first failure */
  /*   maxFailures: process.env.CI ? 1 : 0, */
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${process.env.APP_URL}/contribute/add-new-component/`,
    screenshot: 'only-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    {
      name: 'Experimental Components Setup',
      testMatch: /.*\.setup\.js/,
      use: {
        webServer: {
          command: 'npm run start:e2e',
          url: `${process.env.APP_URL}/contribute/add-new-component/`,
          reuseExistingServer: !process.env.CI
        }
      }
    },
    {
      name: 'Experimental Components',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.state/session.json',
        webServer: {
          command: 'npm run start:e2e',
          url: `${process.env.APP_URL}/contribute/add-new-component/`,
          reuseExistingServer: !process.env.CI
        }
      },
      dependencies: ['Experimental Components Setup']
    },
    {
      name: 'Experimental Components No Session',
      testMatch: /.*\.setup\.js/,
      use: {
        ...devices['Desktop Chrome'],
        webServer: {
          command: 'npm run start:e2e',
          url: `${process.env.APP_URL}/contribute/add-new-component/`,
          reuseExistingServer: !process.env.CI
        }
      }
    },
    {
      name: 'Design System Docs',
      testDir: './tests/e2e',
      use: {
        baseURL: `${process.env.APP_URL}/`,
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'Components',
      testDir: './src/moj/components/',
      testMatch: '**/*.playwright.spec.js',
      use: {
        baseURL: `${process.env.APP_URL}/`,
        ...devices['Desktop Chrome']
      }
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
})
