const sanitizeHtml = require('sanitize-html')

const hrefRoot = '/get-involved/add-new-component'
const maxWords = 10

const toCamelCaseWithRows = (str) => {
  return (
    str
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^\w/, (c) => c.toLowerCase()) + 'Rows'
  )
}

const truncateText = (text, maxWords) => {
  try {
    const words = String(text).split(' ')
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...'
    }
    return text
  } catch (e) {
    console.error('oh no', e)
  }
}

const sanitizeText = (text) => {
  return sanitizeHtml(String(text), {
    allowedTags: [],
    allowedAttributes: {}
  })
}

const answersFromSession = (forms, session) => {
  return forms.reduce((acc, form) => {
    if (Array.isArray(form)) {
      const topLevelKey = toCamelCaseWithRows(form[0])
      acc[topLevelKey] = form.flatMap((field) =>
        extractFieldData(field, session)
      )
    } else {
      const key = toCamelCaseWithRows(form)
      acc[key] = extractFieldData(form, session)
    }
    return acc
  }, {})
}

const extractFieldData = (field, session) => {
  const fieldName = field
  const fieldPath = `/${field}`
  const changeHref = `${fieldPath}`
  const fieldData = session[fieldPath]

  // Collect all entries that match the field pattern (e.g., /foo, /foo/1, /foo/2)
  const fieldPattern = new RegExp(`^${fieldPath}(?:/\\d+)?$`)
  const matchingEntries = Object.entries(session).filter(([key]) =>
    fieldPattern.test(key)
  )

  if (matchingEntries.length === 0) return []

  return matchingEntries.flatMap(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // multiple entries
      return Object.entries(value).map(([subKey, subValue]) => ({
        key: { text: formatLabel(subKey) },
        value: { text: sanitizeText(truncateText(subValue, maxWords)) },
        actions: {
          items: [
            {
              href: `${hrefRoot}${key}`,
              text: 'Change',
              visuallyHiddenText:
                formatLabel(fieldName) + ' - ' + formatLabel(subKey)
            }
          ]
        }
      }))
    }

    // single entry
    return [
      {
        key: { text: formatLabel(fieldName) },
        value: { text: sanitizeText(truncateText(value, maxWords)) },
        actions: {
          items: [
            {
              href: `${hrefRoot}${key}`,
              text: 'Change',
              visuallyHiddenText: formatLabel(fieldName)
            }
          ]
        }
      }
    ]
  })
}

// Format field names into readable labels
const formatLabel = (field) => {
  return field
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

const checkYourAnswers = (session) => {
  const forms = [
    ['accessibility-findings', 'accessibility-findings-more'],
    'additional-information',
    ['component-code', 'component-code-details'],
    'component-details',
    'component-image',
    ['prototype', 'prototype-url'],
    'your-details'
  ]
  return answersFromSession(forms, session)
}
module.exports = checkYourAnswers
