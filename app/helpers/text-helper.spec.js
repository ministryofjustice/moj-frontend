const {
  humanReadableLabel,
  urlToTitleCase,
  ucFirst,
  truncateText,
  sanitizeText,
  camelToKebab
} = require('./text-helper')

describe('ucFirst', () => {
  it('uppercases the first letter', () => {
    expect(ucFirst('hello')).toBe('Hello')
  })
  it('only uppercases the first of multiple words', () => {
    expect(ucFirst('hello world')).toBe('Hello world')
  })
})

describe('humanReadableLabel', () => {
  it('creates a human readable label from camelCase', () => {
    expect(humanReadableLabel('helloWorld')).toBe('Hello world')
  })
  it('creates a human readable label from kebab-case', () => {
    expect(humanReadableLabel('hello-world')).toBe('Hello world')
  })
})

describe('urlToTitleCase', () => {
  it('creates a title from a url', () => {
    expect(urlToTitleCase('component-details')).toBe('Component details')
  })
})

describe('tuncateText', () => {
  it('does not truncate short text', () => {
    const text = 'only three words'
    expect(truncateText(text, 5)).toBe('only three words')
  })
  it('truncates longer text', () => {
    const text = 'this is more than five words'
    expect(truncateText(text, 5)).toBe('this is more than five...')
  })
})

describe('sanitizeText', () => {
  it('strips html', () => {
    const text = 'this is text <span>with html</span>'
    expect(sanitizeText(text)).toBe('this is text with html')
  })
})

describe('camelToKebab', () => {
  it('converts camelCase to kebab-case', () => {
    expect(camelToKebab('component-image')).toBe('component-image')
  })
})
