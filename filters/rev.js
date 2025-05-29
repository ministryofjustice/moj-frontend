const fs = require('fs')

const rev = (filepath) => {
      if (process.env.ENV === 'production' || process.env.ENV === 'staging') {
      const manifest = JSON.parse(
        fs.readFileSync('public/rev-manifest.json', 'utf8')
      )
      const revision = manifest[filepath]
      return `/${revision || filepath}`
    }
    return `/${filepath}`
}

module.exports = rev
