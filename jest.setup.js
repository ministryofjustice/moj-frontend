require('@testing-library/jest-dom')
require('mock-match-media/jest-setup')

const { toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)

beforeAll(async () => {
  const { style } = document.documentElement

  // Add styles for GOV.UK Frontend checks
  style.setProperty('--govuk-frontend-breakpoint-mobile', '40em')
  style.setProperty('--govuk-frontend-breakpoint-tablet', '80em')

  // Flag GOV.UK Frontend as supported
  document.body.classList.add('govuk-frontend-supported')
})
