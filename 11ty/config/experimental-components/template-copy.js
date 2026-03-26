const fs = require('fs')

// Copies the 11ty base layout and partials to the experimental
// components app layouts directory
module.exports = (config) => {
  config.on('eleventy.before', async ({ directories }) => {
    const srcDir = `${directories.includes}layouts`
    const destDir = './app/views/common'
    const templates = [
      'base.njk',
      '404.njk',
      '500.njk',
      'partials/header.njk',
      'partials/header-no-nav.njk',
      'partials/footer.njk'
    ]

    templates.forEach((template) => {
      fs.copyFile(`${srcDir}/${template}`, `${destDir}/${template}`, (err) => {
        if (err) {
          console.log('Error Found:', err)
        }
      })
    })
  })
}
