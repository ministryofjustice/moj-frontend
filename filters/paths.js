module.exports = {
  scriptPath: function (inputpath) {
    return `${inputpath.split('/').slice(1, -1).join('/')}/script.js`
  },
  stylePath: function (inputPath) {
    return `${inputPath.split('/').slice(1, -1).join('/')}/style.css`
  }
}
