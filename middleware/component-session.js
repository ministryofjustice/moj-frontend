const joi = require('joi');
const { COMPONENT_FORM_PAGES } = require('../config')

const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const transformErrorsToErrorList = (errors) => {
  return errors.map((error) => ({
    text: error.message,
    href: `#${camelToKebab(error.path[0])}`,
  }));
};

const nextPage = (url) => {
    const index = COMPONENT_FORM_PAGES.findIndex(page => url.endsWith(page));

    if (index !== -1 && index < COMPONENT_FORM_PAGES.length - 1) {
        return COMPONENT_FORM_PAGES[index + 1];
    }

    return null;
}

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
    //todo ensure no errors etc
    req.nextPage = nextPage(req.originalUrl)

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

const validateFormData = (req, res, next) => {
  const schemaName = req.url.replace('/','')
  const schema = require(`../schema/${schemaName}.schema`)
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    console.error('Validation error:', error.details);
    const formErrors = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {});

    error.details.forEach((error) => {
      const field = error.path[0];
      formErrors[field] = { text: error.message };
    });

    const errorList = transformErrorsToErrorList(error.details);

    res.render(`${req.params.page}`, {
      submitUrl: req.originalUrl,
      formData: req.body,
      formErrors,
      errorList
    });
  } else {
    console.log('Validation success:', value);
    next()
  }
}

const saveSession = (req, res, next) => {
    console.log('saveSession')
  // save to postgres
    //todo potentially could be saving each part to github...

    // todo need a persistent session...
    if(!req.session) {
        req.session = {}
    }

    let body = req.body;
console.log('files?',req.file)
    if(req.file) {
        // console.log('FILE', req.file)
        // console.log('BODY', body)
        // const fileContent = req.file.buffer.toString('utf-8');
        // console.log('Uploaded File Content:', fileContent);
        // body.uploadedFileContent = fileContent;
        const { fieldname } = req.file
        const file = {}
        file[fieldname] = req.file;
        body = { ...body, ...file}
    }

    req.session[req.url] = body;

    console.log('saved session', req.session)

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
