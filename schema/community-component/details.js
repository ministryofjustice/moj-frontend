module.exports = {
  route: 'details',
  fields: [
    {
      type: 'input',
      name: 'componentName',
      label: 'What is the name of the component?'
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Add a brief description about the component',
      maxlength: 500,
    },
    {
      type: 'textarea',
      name: 'whyNeeded',
      label: 'Why do you think the component is needed?',
      maxlength: 500,
    }
  ],
  nextPage: 'other-information'
}
