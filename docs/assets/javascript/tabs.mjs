const Tabs = function (container) {
  this.container = container
  this.keys = { left: 37, right: 39, up: 38, down: 40 }
  this.cssHide = 'app-tabs__panel--hidden'
  this.tabs = container.find('.app-tabs__tab')
  this.panels = container.find('.app-tabs__panel')
  this.container.on('click', '[role=tab]', $.proxy(this, 'onTabClick'))
  this.container.on('keydown', '[role=tab]', $.proxy(this, 'onTabKeydown'))
  this.setupHtml()
}

Tabs.prototype.hasTab = function (hash) {
  return this.container.find(hash).length
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
  return this.tabs.filter(`a[href="${hash}"]`)
}

Tabs.prototype.setupHtml = function () {
  this.container.find('.app-tabs__list').attr('role', 'tablist')
  this.container.find('.app-tabs__list-item').attr('role', 'presentation')
  this.tabs.attr('role', 'tab')
  this.panels.attr('role', 'tabpanel')
  this.tabs.each(
    $.proxy(function (i, tab) {
      const panelId = this.getHref($(tab)).slice(1)
      tab.id = `tab_${panelId}`
      $(tab).attr('aria-controls', panelId)
    }, this)
  )
  this.panels.each(
    $.proxy(function (i, panel) {
      $(panel).attr('aria-labelledby', this.tabs[i].id)
    }, this)
  )

  // setup state
  // this.tabs.attr('tabindex', '-1');
  this.panels.addClass(this.cssHide)
}

Tabs.prototype.onTabClick = function (event) {
  event.preventDefault()
  const newTab = $(event.target)
  const currentTab = this.getCurrentTab()
  if (currentTab[0]) {
    this.hideTab(currentTab)
  }
  if (newTab[0] !== currentTab[0]) {
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
  const nextTab = currentTab.parent().next().find('[role=tab]')
  if (nextTab[0]) {
    this.hideTab(currentTab)
    this.showTab(nextTab)
    nextTab.focus()
    this.createHistoryEntry(nextTab)
  }
}

Tabs.prototype.activatePreviousTab = function () {
  const currentTab = this.getCurrentTab()
  const previousTab = currentTab.parent().prev().find('[role=tab]')
  if (previousTab[0]) {
    this.hideTab(currentTab)
    this.showTab(previousTab)
    previousTab.focus()
    this.createHistoryEntry(previousTab)
  }
}

Tabs.prototype.getPanel = function (tab) {
  return $(this.getHref(tab))
}

Tabs.prototype.showPanel = function (tab) {
  $(this.getHref(tab)).removeClass(this.cssHide)
}

Tabs.prototype.hidePanel = function (tab) {
  $(this.getHref(tab)).addClass(this.cssHide)
}

Tabs.prototype.unhighlightTab = function (tab) {
  tab.attr('aria-selected', 'false')
  // tab.attr('tabindex', '-1');
}

Tabs.prototype.highlightTab = function (tab) {
  tab.attr('aria-selected', 'true')
  // tab.attr('tabindex', '0');
}

Tabs.prototype.getCurrentTab = function () {
  return this.container.find('[role=tab][aria-selected=true]')
}

// this is because IE doesn't always return the actual value but a relative full path
// should be a utility function most prob
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getHref = function (tab) {
  const href = tab.attr('href')
  return href.slice(href.indexOf('#'), href.length)
}

export default Tabs
