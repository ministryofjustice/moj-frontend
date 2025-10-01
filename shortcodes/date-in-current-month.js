/**
 * Generates a date string in the current month
 *
 * @param {string | number} day - the day of the month
 * @returns {string}
 */
const dateInCurrentMonth = function (day) {
  return `${day}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
}

module.exports = dateInCurrentMonth
