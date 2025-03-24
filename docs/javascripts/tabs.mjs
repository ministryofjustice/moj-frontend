const Tabs = function (container) {
  this.container = container
  this.keys = { left: 37, right: 39, up: 38, down: 40 }
  this.cssHide = 'app-tabs__panel--hidden'

  this.tabs = Array.from(this.container.querySelectorAll('.app-tabs__tab'))
  this.panels = Array.from(this.container.querySelectorAll('.app-tabs__panel'))

  this.tabs.forEach(($tab) => {
    $tab.addEventListener('click', (event) => this.onTabClick(event))
    $tab.addEventListener('keydown', (event) => this.onTabKeydown(event))
  })

  this.setupHtml()
}

Tabs.prototype.hasTab = function (hash) {
  return !!this.container.querySelector(hash)
}

Tabs.prototype.hideTab = function (tab) {
  this.unhighlightTab(tab)
  this.hidePanel(tab)
}

Tabs.prototype.showTab = function (tab) {
  this.highlightTab(tab)
  this.showPanel(tab)
}

Tabs.prototype.getTab = function (hash) {
  return this.tabs.find((tab) => tab.hash === hash)
}

Tabs.prototype.setupHtml = function () {
  const tabLists = this.container.querySelectorAll('.app-tabs__list')
  const tabListItems = this.container.querySelectorAll('.app-tabs__list-item')

  tabLists.forEach((tabList) => {
    tabList.setAttribute('role', 'tablist')
  })

  tabListItems.forEach((tabListItem) => {
    tabListItem.setAttribute('role', 'presentation')
  })

  this.tabs.forEach((tab) => {
    const panel = this.getPanel(tab)

    tab.setAttribute('id', `tab_${panel.id}`)
    tab.setAttribute('role', 'tab')
    tab.setAttribute('aria-controls', panel.id)
    tab.setAttribute('aria-selected', 'false')
    // $tab.setAttribute('tabindex', '-1')

    panel.setAttribute('role', 'tabpanel')
    panel.setAttribute('aria-labelledby', tab.id)
    panel.classList.add(this.cssHide)
  })
}

Tabs.prototype.onTabClick = function (event) {
  event.preventDefault()
  const newTab = event.target
  const currentTab = this.getCurrentTab()
  if (currentTab) {
    this.hideTab(currentTab)
  }
  if (newTab !== currentTab) {
    this.showTab(newTab)
  }
}

Tabs.prototype.onTabKeydown = function (event) {
  switch (event.keyCode) {
    case this.keys.left:
    case this.keys.up:
      this.activatePreviousTab()
      event.preventDefault()
      break
    case this.keys.right:
    case this.keys.down:
      this.activateNextTab()
      event.preventDefault()
      break
  }
}

Tabs.prototype.activateNextTab = function () {
  const currentTab = this.getCurrentTab()

  const nextTabListItem = currentTab.parentElement.nextElementSibling
  const nextTab = this.tabs.find((tab) => tab.parentElement === nextTabListItem)

  if (nextTab) {
    this.hideTab(currentTab)
    this.showTab(nextTab)
    nextTab.focus()
  }
}

Tabs.prototype.activatePreviousTab = function () {
  const currentTab = this.getCurrentTab()

  const previousTabListItem = currentTab.parentElement.previousElementSibling
  const previousTab = this.tabs.find(
    (tab) => tab.parentElement === previousTabListItem
  )

  if (previousTab) {
    this.hideTab(currentTab)
    this.showTab(previousTab)
    previousTab.focus()
  }
}

Tabs.prototype.getPanel = function ($tab) {
  const panelId = $tab.hash.slice(1)
  return this.panels.find((panel) => panel.id === panelId)
}

Tabs.prototype.showPanel = function (tab) {
  this.getPanel(tab).classList.remove(this.cssHide)
}

Tabs.prototype.hidePanel = function (tab) {
  this.getPanel(tab).classList.add(this.cssHide)
}

Tabs.prototype.unhighlightTab = function (tab) {
  tab.setAttribute('aria-selected', 'false')
  // tab.setAttribute('tabindex', '-1');
}

Tabs.prototype.highlightTab = function (tab) {
  tab.setAttribute('aria-selected', 'true')
  // tab.setAttribute('tabindex', '0');
}

Tabs.prototype.getCurrentTab = function () {
  return (
    this.tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ??
    this.tabs[0]
  )
}

// this is because IE doesn't always return the actual value but a relative full path
// should be a utility function most prob
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getHref = function (tab) {
  const href = tab.getAttribute('href')
  return href.slice(href.indexOf('#'), href.length)
}

export default Tabs
