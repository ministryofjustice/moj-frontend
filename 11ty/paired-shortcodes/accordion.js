module.exports = (function () {
  const config = {
    id: ''
  }
  let sections = []

  function sectionId(section) {
    return `${section.label.toLowerCase().replace(/ /g, '-')}-section`
  }

  function contentId(section, index) {
    return `${config.id}-content-${index}`
  }

  function sectionHTML(section, index) {
    return `<div class="govuk-accordion__section">
          <div class="govuk-accordion__section-header">
            <h2 class="govuk-accordion__section-heading">
              <span class="govuk-accordion__section-button" id="${sectionId(section)}">
                ${section.label}
              </span>
            </h2>
          </div>
          <div id="${contentId(section, index)}" class="govuk-accordion__section-content">${section.content}</div>
      </div>
    `.trim()
  }

  function build() {
    sections.forEach((section, index) => {
      section.html = sectionHTML(section, index + 1)
    })
  }

  function render() {
    const html = `
    <div class="govuk-accordion" data-module="govuk-accordion" id="${config.id}">
      ${sections
        .map((section) => section.html)
        .join('\n')
        .trim()}
    </div>`.trim()
    reset()
    return html
  }

  function reset() {
    sections = []
  }

  return {
    accordion: function (content, id) {
      config.id = id

      build()
      return render()
    },
    accordionSection: function (content, label) {
      sections.push({ content, label })
      return ''
    }
  }
})()
