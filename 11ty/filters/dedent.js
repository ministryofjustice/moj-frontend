/**
 * Removes the specified number of spaces from the beginning of each line in a
 * string.
 *
 * @param {string} str - The input string to be dedented.
 * @param {number} spaces - The number of spaces to remove from the beginning of each line.
 * @param {boolean} [firstLine] - Whether to remove spaces from the first line as well.
 * @returns {string} - The dedented string with the specified number of spaces removed from the beginning of each line.
 */
module.exports = function dedent(str, spaces, firstLine = true) {
  return str
    .split('\n')
    .map((line, index) => (firstLine || index > 0 ? line.slice(spaces) : line))
    .join('\n')
}
