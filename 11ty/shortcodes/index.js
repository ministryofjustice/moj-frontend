const dateInCurrentMonth = require('./date-in-current-month')
const example = require('./example')
const version = require('./version')

const shortcodes = {
  dateInCurrentMonth,
  example,
  version
}

module.exports = (config) => {
  Object.entries(shortcodes).forEach((item) => {
    const [name, filter] = item
    config.addShortcode(name, filter)
  })
}
