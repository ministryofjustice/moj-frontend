const joi = require('joi');
const req = require("express/lib/request");

const componentFormPages = [
    'component-details',
    'component-image',
    'your-details',
    'check-your-answers'
] // todo move to config

const nextPage = (url) => {
    const index = componentFormPages.findIndex(page => url.endsWith(page));

    if (index !== -1 && index < componentFormPages.length - 1) {
        return componentFormPages[index + 1];
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
    req.nextPage = nextPage(req.url)

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
  // run against joi isolated only to the section of the session the form is from
    // set errors to be displayed
    console.log('validateFormData')
    next()
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
