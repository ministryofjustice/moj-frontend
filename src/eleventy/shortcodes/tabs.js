module.exports = function (eleventyConfig) {
  // Temp storage for tabs
  let tabsStorage = [];

  // Generate govuk tabs
  eleventyConfig.addPairedShortcode("tabs", function (content, label = "Contents") {
    const tabId = (tab) => {
      return `${tab.label.toLowerCase().replace(/ /g, "-")}-tab`
    }
    const tabsList = tabsStorage.map((tab, index) => {
      const isSelected = index === 0 ? '--selected' : '';
      return `
<li class="govuk-tabs__list-item${isSelected} app-navigation__item">
    <a class="govuk-tabs__tab app-navigation__link app-navigation__link" href="#${tabId(tab)}">
        ${tab.label}
    </a>
</li>
`.trim();
    }).join("\n").trim();

    const tabPanels = tabsStorage.map((tab, index) => {
      const isHidden = index === 0 ? '' : ' govuk-tabs__panel--hidden';
      return `
<div class="govuk-tabs__panel${isHidden}" id="${tabId(tab)}">
    ${tab.content}
</div>
`.trim();
    }).join("\n").trim();

    tabsStorage = [];

    return `
<div class="govuk-tabs app-navigation no-govuk-tabs-styles" data-module="govuk-tabs">
    <h2 class="govuk-tabs__title">${label}</h2>
    <ul class="govuk-tabs__list app-navigation__list">
        ${tabsList}
    </ul>
    ${tabPanels}
</div>
`.trim();
  });

  // Find and store govuk tab for above tabs
  eleventyConfig.addPairedShortcode("tab", function (content, label) {
    tabsStorage.push({ label, content });
    return "";
  });
}
