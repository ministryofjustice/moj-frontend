const moment = require('moment')

const combineDateFields = (data, format = 'D MMMM YYYY') => {
  const result = {}
  for (const [key, value] of Object.entries(data)) {
    const match = key.match(/^(.*)-(day|month|year)$/)
    if (match) {
      const baseKey = match[1]
      if (!result[`${baseKey}--date`]) {
        const day = data[`${baseKey}-day`]
        const month = data[`${baseKey}-month`]
        const year = data[`${baseKey}-year`]
        if (day && month && year) {
          const dateString = `${year}-${month}-${day}`
          result[`${baseKey}`] = combineDateFields
            ? moment(dateString, 'YYYY-M-D').format(format)
            : dateString
        }
      }
    } else if (
      !key.endsWith('-day') &&
      !key.endsWith('-month') &&
      !key.endsWith('-year')
    ) {
      result[key] = value
    }
  }
  return result
}

module.exports = {
  combineDateFields
}
