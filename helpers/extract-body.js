const { COMPONENT_FORM_HIDDEN_FIELDS } = require("../config");

const extractBody = (url, body) => {
  const result = { ...body };
  const dateFields = {};

  Object.keys(body).forEach((key) => {
    const match = key.match(/(.*)-(day|month|year)$/);
    if (match) {
      const prefix = match[1];
      if (!dateFields[prefix]) {
        dateFields[prefix] = {};
      }
      dateFields[prefix][match[2]] = body[key];
    }
  });

  Object.keys(dateFields).forEach((prefix) => {
    const { day, month, year } = dateFields[prefix];
    const paddedDay = day.padStart(2, '0');
    const paddedMonth = month.padStart(2, '0');
    result[prefix] = `${year}-${paddedMonth}-${paddedDay}`;
  });

  return result;
};

module.exports = extractBody
