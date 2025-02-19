const { COMPONENT_FORM_HIDDEN_FIELDS } = require("../config");

const getHiddenFields = (req) => {
  const path = req.url.split('/')[1];
  const hiddenFields = COMPONENT_FORM_HIDDEN_FIELDS[path];
  const nameValuePairs = {};

  if (hiddenFields) {
    Object.keys(hiddenFields).forEach((key) => {
      hiddenFields[key].forEach((field) => {
        if (req.session[key] && req.session[key][field] !== undefined) {
          nameValuePairs[field] = req.session[key][field];
        }
      });
    });
  }

  return nameValuePairs;
};

module.exports = getHiddenFields;
