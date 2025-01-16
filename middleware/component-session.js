const joi = require('joi');

const createSession = (req, res) => {
  // creates a new object in the session with the property communityComponent based on an imported JSON file named defaultCommunityComponentSession
  // each element of the object will have information about a form:
  /*
  {
    route: 'form1',
    fields: [{
    type: 'input',
    name: 'fieldname',
    value: null // this gets set as use fills in data
    }],
    nextPage: '' // might simply be a string or might be some logic based on field values
  }
   */
}

const validateSession = (req, res) => {
  const schema = joi.object({
    communityComponent: joi.array()
      .items(
        joi.object({
          route: joi.string().required(),
          fields: joi.array()
            .items(
              joi.object({
                type: joi.string().required(),
                name: joi.string().required(),
                label: joi.string(),
                maxlength: joi.number(),
                value: joi.any(),
              })
            )
            .required(),
          nextPage: joi.any(),
        })
      )
      .required(),
  });

  const { error } = schema.validate({ communityComponent: req.session.communityComponent });

  if (error) {
    return res.status(400).json({ message: "Invalid session", error: error.details });
  }
  res.status(200).json({ message: "Session is valid" });
};

const setNextPage = (req, res, next) => {
  // req.nextPage set based on logic found in the communityComponent session object
  // this object will have data set as we go through the various pages
    next()
}

const getFormData = (req, res, next) => {
  // extra the fields from the request
  req.form = {
    fields: [{
      name: 'test1'
    },
      {
        name: 'test2'
      }]
  }
  next()
}

const validateFormData = (req, res) => {
  // run against joi isolated only to the section of the session the form is from
    // set errors to be displayed
    next()
}

const saveSession = (req, res) => {
  // save to postgres
    next()
}

const submitSession = (req, res) => {
  // generate a markup
  // create a zip of resources
  // send an email
}

module.exports = {
  createSession,
  setNextPage,
  getFormData,
  validateFormData,
  saveSession
}
