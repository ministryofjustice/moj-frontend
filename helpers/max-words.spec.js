const schema = require('../schema/component-details.schema')

describe('component-details schema', () => {
  it('should validate a valid object', () => {
    const validObject = {
      componentName: 'Test Component',
      componentOverview: 'This is a valid overview with less than fifty words.',
      howIsTheComponentUsed:
        'This is a valid usage description with less than fifty words.'
    }
    const { error } = schema.validate(validObject)
    expect(error).toBeUndefined()
  })

  it('should return an error for an invalid componentName', () => {
    const invalidObject = {
      componentName: 'Invalid Component Name 123',
      componentOverview: 'This is a valid overview with less than fifty words.',
      howIsTheComponentUsed:
        'This is a valid usage description with less than fifty words.'
    }
    const { error } = schema.validate(invalidObject)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe(
      'The component name must only include letters a to z, and special characters such as hyphens, spaces and apostrophes'
    )
  })

  it('should return an error for componentOverview exceeding word limit', () => {
    const invalidObject = {
      componentName: 'Test Component',
      componentOverview: 'This overview has too many words '.repeat(100),
      howIsTheComponentUsed:
        'This is a valid usage description with less than fifty words.'
    }
    const { error } = schema.validate(invalidObject)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe(
      'The overview description must be 250 words or less'
    )
  })

  it('should return an error for howIsTheComponentUsed exceeding word limit', () => {
    const invalidObject = {
      componentName: 'Test Component',
      componentOverview: 'This is a valid overview with less than fifty words.',
      howIsTheComponentUsed:
        'This usage description has too many words '.repeat(100)
    }
    const { error } = schema.validate(invalidObject)
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe(
      'The how the component is used currently must be 250 words or less'
    )
  })
})
