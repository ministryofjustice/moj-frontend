module.exports = (function () {
  const config = {
    title: 'Contents',
    paginate: false,
    hiddenClassModifier: '--hidden',
    selectedClassModifier: '--selected'
  }
  let tabs = []
  let tabListItems = []
  let tabPanels = []

  function tabId(tab) {
    return `${tab.label.toLowerCase().replace(/ /g, '-')}-tab`
  }

  function tabItemHTML(id, label, isSelected) {
    const selectedClass = isSelected
      ? `govuk-tabs__list-item${config.selectedClassModifier}`
      : ''
    return `
      <li class="govuk-tabs__list-item ${selectedClass} app-layout-tabs__list-item" role="presentation">
        <a class="govuk-tabs__tab app-layout-tabs__tab" href="#${id}" role="tab" >
          ${label}
        </a>
      </li>
    `.trim()
  }

  function tabPanelHTML(id, content, isHidden, nextTabLink) {
    const hiddedClass = isHidden
      ? `govuk-tabs__panel${config.hiddenClassModifier}`
      : ''
    return `
      <div class="govuk-tabs__panel ${hiddedClass} app-layout-tabs__panel" id="${id}" role="tabpanel">
        ${content}
        ${nextTabLink ?? ''}
      </div>
    `.trim()
  }

  function paginationHTML(nextTab) {
    return `<nav class="govuk-pagination govuk-pagination--block" aria-label="Tab navigation"><div class="govuk-pagination__next">
    <a class="govuk-link govuk-pagination__link" href="#${tabId(nextTab)}" rel="next">
      <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg>
      <span class="govuk-pagination__link-title">
        Next<span class="govuk-visually-hidden"> tab</span>
      </span>
      <span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">${nextTab.label}</span>
    </a>
  </div></nav>`.trim()
  }

  function build() {
    tabs.forEach((tab, index) => {
      const id = tabId(tab)
      const isSelected = index === 0
      const isHidden = !isSelected
      const nextTab = tabs.at(index + 1)
      let nextTabLink

      if (config.paginate && nextTab) {
        nextTabLink = paginationHTML(nextTab)
      }

      tabListItems.push(tabItemHTML(id, tab.label, isSelected))
      tabPanels.push(tabPanelHTML(id, tab.content, isHidden, nextTabLink))
    })
  }

  function render() {
    const html = `
    <div class="govuk-tabs app-layout-tabs no-govuk-tabs-styles" data-module="govuk-tabs">
      <h2 class="govuk-tabs__title">${config.title}</h2>
      <ul class="govuk-tabs__list app-layout-tabs__list" role="tabpanel">
        ${tabListItems.join('\n').trim()}
      </ul>
      ${tabPanels.join('\n').trim()}
    </div>
  `.trim()

    reset()
    return html
  }

  function reset() {
    tabs = []
    tabListItems = []
    tabPanels = []
  }

  return {
    createTabs: function (content, style, label) {
      config.title = label ?? 'Contents'
      config.paginate = style === 'paginate'

      build()
      return render()
    },
    createTab: function (content, label) {
      tabs.push({ content, label })
      return ''
    }
  }
})()
