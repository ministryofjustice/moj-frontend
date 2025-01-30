const hrefRoot = '/get-involved/add-new-component'

const toCamelCaseWithRows = (str) => {
  return (
    str
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^\w/, (c) => c.toLowerCase()) + 'Rows'
  )
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
  const fieldData = session[fieldPath]
  const changeHref = `${fieldPath}`

  if (!fieldData) return []

  if (typeof fieldData === 'object' && !Array.isArray(fieldData)) {
    // multiple entries
    return Object.entries(fieldData).map(([subKey, value]) => ({
      key: { text: formatLabel(subKey) },
      value: { text: value },
      actions: {
        items: [
          {
            href: `${hrefRoot}${changeHref}`,
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
      value: { text: fieldData },
      actions: {
        items: [
          {
            href: `${hrefRoot}${changeHref}`,
            text: 'Change',
            visuallyHiddenText: formatLabel(fieldName)
          }
        ]
      }
    }
  ]
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
    'component-image',
    ['prototype', 'prototype-url'],
    'your-details'
  ]
  return answersFromSession(forms, session)
}
module.exports = checkYourAnswers
