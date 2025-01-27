const Joi = require('joi');

const schema = Joi.object({
  fullName: Joi.string().label('Full Name'),
  emailAddress: Joi.string().label('Email Address'),
  jobRole: Joi.string().label('Job Role'),
  team: Joi.string().label('Team Name'),
  showEmailAddress: Joi.string().label('Show Email Address'),
});

module.exports = schema;
