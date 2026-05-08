const accordion = require('./accordion')
const banner = require('./banner')
const tabs = require('./tabs')

const shortcodes = {
  ...accordion,
  banner,
  ...tabs
}

module.exports = (config) => {
  Object.entries(shortcodes).forEach((item) => {
    const [name, shortcode] = item
    config.addPairedNunjucksShortcode(name, shortcode)
  })
}
