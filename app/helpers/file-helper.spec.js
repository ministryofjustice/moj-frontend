const { extractFilename, getUniqueFilename } = require('./file-helper')

describe('extractFilename', () => {
  it('handles starting slash', () => {
    expect(extractFilename('/your-details')).toBe('your-details.txt')
  })
  it('handles no starting slash', () => {
    expect(extractFilename('your-details')).toBe('your-details.txt')
  })
  it('handles subpages', () => {
    expect(extractFilename('/component-code/2')).toBe('component-code-2.txt')
  })
  it('handles extension already present', () => {
    expect(extractFilename('component-image.md')).toBe('component-image.md')
  })
})

describe('getUniqueFilename', () => {
  it('returns oiginalname if valid and no duplicates', () => {
    expect(getUniqueFilename('my-file.jpg', new Set())).toBe('my-file.jpg')
  })
  it('returns sanitized originalName if no duplicates', () => {
    expect(getUniqueFilename('my file.jpg', new Set())).toBe('my-file.jpg')
  })
  it('generates a unique incremented filename if there is a duplicate', () => {
    const existingFiles = new Set(['my-file.jpg'])
    expect(getUniqueFilename('my file.jpg', existingFiles)).toBe(
      'my-file-1.jpg'
    )
  })
  it('increments for successive duplicates', () => {
    const existingFiles = new Set(['my-file.jpg', 'my-file-1.jpg'])
    expect(getUniqueFilename('my file.jpg', existingFiles)).toBe(
      'my-file-2.jpg'
    )
  })
})
