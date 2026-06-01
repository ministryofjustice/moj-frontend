/**
 * Dedent the content of a govuk-tabs__panel by 2 spaces, but only for lines
 * inside the panel. This filter is required because the indenting causes our
 * code examples to be indented by 2 extra spaces.
 *
 * @param {string} str - The input string containing the HTML of the tab panel.
 * @returns {string} - The dedented string with only the content of the panel modified.
 */
module.exports = function dedentGovUkTabPanel(str) {
  const lines = str.split('\n')
  let inPanel = false
  let depth = 0

  return lines
    .map((line) => {
      const trimmed = line.trimStart()

      // Check for the start of a govuk-tabs__panel
      if (!inPanel) {
        if (trimmed.startsWith('<div class="govuk-tabs__panel')) {
          inPanel = true
          depth = 0
        }
        return line
      }

      // Count the number of opening and closing divs to track nesting depth
      const opens = (trimmed.match(/<div[\s>]/g) || []).length
      const closes = (trimmed.match(/<\/div>/g) || []).length

      depth += opens - closes

      // If we've closed the initial panel div, we're done dedenting and can
      // return the line as is
      if (depth < 0) {
        inPanel = false
        depth = 0
        return line
      }

      // For lines inside the panel, remove the first 2 spaces of indentation
      return line.slice(2)
    })
    .join('\n')
}
