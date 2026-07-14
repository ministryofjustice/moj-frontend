/**
 * Removes the specified number of spaces from the beginning of each line in a
 * string.
 *
 * @param {string} str - The input string to be dedented.
 * @param {number} spaces - The number of spaces to remove from the beginning of each line.
 * @returns {string} - The dedented string with the specified number of spaces removed from the beginning of each line.
 */
module.exports = function dedent(str, spaces) {
  return str
    .split('\n')
    .map((line) => {
      // remove spaces from the line only if they are whitespace
      return line.slice(0, spaces).trim() === '' ? line.slice(spaces) : line
    })
    .join('\n')
}
