const {
  humanReadableLabel,
  urlToTitleCase,
  ucFirst,
  truncateText,
  sanitizeText,
  camelToKebab,
  titleize,
  urlize,
  stripFrontmatter,
  replaceTemplateVars
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
    expect(urlToTitleCase('component-details')).toBe('Component Details')
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

describe('titleize', () => {
  it('converts a string to titleCase', () => {
    expect(titleize('component NAme')).toBe('Component name')
  })
  it('returns an empty string if called with a falsy val', () => {
    expect(titleize(undefined)).toBe('')
  })
})
describe('urlize', () => {
  it('replaces non alphanumeric characters with hyphens', () => {
    expect(urlize('Comp%one@nt Name 2!')).toBe('comp-one-nt-name-2')
  })
  it('returns an empty string if called with a falsy val', () => {
    expect(titleize(undefined)).toBe('')
  })
})

describe('stripFrontmatter', () => {
  it('strips frontmatter', () => {
    const str = `---
key: value
---
This is content
`
    expect(stripFrontmatter(str)).toBe('This is content')
  })
  it('strips empty frontmatter', () => {
    const str = `---
---
This is content
`
    expect(stripFrontmatter(str)).toBe('This is content')
  })
})

describe('replaceTemplateVars', () => {
  it('replaces a value in a single line string', () => {
    const str = 'My name is __NAME__'
    const replacements = { NAME: 'Bob' }
    expect(replaceTemplateVars(str, replacements)).toBe('My name is Bob')
  })
  it('replaces values in a multi line string', () => {
    const str = 'My name is __NAME__\r\nMy age is __AGE__'
    const replacements = { NAME: 'Bob', AGE: 25 }
    expect(replaceTemplateVars(str, replacements)).toBe(
      'My name is Bob\r\nMy age is 25'
    )
  })
  it('allows for tag customisation', () => {
    const str = 'My name is {{NAME}}\r\nMy age is {{AGE}}'
    const replacements = { NAME: 'Bob', AGE: 25 }
    expect(replaceTemplateVars(str, replacements, '{{', '}}')).toBe(
      'My name is Bob\r\nMy age is 25'
    )
  })
  it('allows doesnt replace if tags dont match', () => {
    const str = 'My name is __NAME__\r\nMy age is __AGE__'
    const replacements = { NAME: 'Bob', AGE: 25 }
    expect(replaceTemplateVars(str, replacements, '{{', '}}')).toBe(
      'My name is __NAME__\r\nMy age is __AGE__'
    )
  })
})
