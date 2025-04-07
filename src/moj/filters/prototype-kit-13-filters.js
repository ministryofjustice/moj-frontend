// @ts-expect-error - No types available
const { addFilter } = require('govuk-prototype-kit').views

const getAllFilters = require('./all')

const allFilters = getAllFilters()

for (const [name, filter] of Object.entries(allFilters)) {
  addFilter(name, filter)
}
