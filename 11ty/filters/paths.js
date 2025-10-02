module.exports = {
  getScriptPath: function (inputpath) {
    return `${inputpath.split('/').slice(1, -1).join('/')}/script.js`
  },
  getStylesPath: function (inputPath) {
    return `${inputPath.split('/').slice(1, -1).join('/')}/style.css`
  }
}
