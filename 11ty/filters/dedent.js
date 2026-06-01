module.exports = function dedent(str, spaces, firstLine = true) {
  return str
    .split('\n')
    .map((line, index) => (firstLine || index > 0 ? line.slice(spaces) : line))
    .join('\n')
}
