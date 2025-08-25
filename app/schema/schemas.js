const path = require('path')
const schemas = {}

// Load all `*.schema.js` under current directory as properties
// i.e. figma-link.schema.js will be eported under schemas['figma-link']
require('fs').readdirSync(path.join(__dirname, '/')).forEach(function(file) {
  if (file.match(/\.schema\.js$/) !== null && file !== 'schemas.js') {
    const name = file.replace('.schema.js', '');
    schemas[name] = require(`./${file}`);
  }
});

const getSchema = (schema) => {
  return schemas[schema]
}

module.exports = {
  getSchema
}
