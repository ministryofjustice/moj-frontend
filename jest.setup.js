require('@testing-library/jest-dom')
require('mock-match-media/jest-setup')

const { toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)
