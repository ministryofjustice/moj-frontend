const { addFilter } = require('govuk-prototype-kit').views
const getAllFilters = require('./all')

const allFilters = getAllFilters()

Object.keys(allFilters).forEach(name => {
  addFilter(name, allFilters[name])
})
