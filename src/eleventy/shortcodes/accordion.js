module.exports = function (eleventyConfig) {
  // Temp storage for accordion
  let accordionSections = [];

  // Generate govuk accordion
  eleventyConfig.addPairedShortcode("accordion", function (content, accordionId) {
    const sectionId = (section) => {
      return `${section.label.toLowerCase().replace(/ /g, "-")}-section`
    }
    const contentId = (section) => {
      return `${section.label.toLowerCase().replace(/ /g, "-")}-section-content`
    }

    const accordionContent = accordionSections.map((section) => {
      return `
        <div class="govuk-accordion__section">
          <div class="govuk-accordion__section-header">
            <h2 class="govuk-accordion__section-heading">
              <span class="govuk-accordion__section-button" id="${sectionId(section)}">
                ${section.label}
              </span>
            </h2>
          </div>
          <div id="${contentId(section)}" class="govuk-accordion__section-content">
            ${section.content}
          </div>
      </div>
    `.trim();
    }).join("").trim();

    accordionSections = [];

    return `
    <div class="govuk-accordion" data-module="govuk-accordion" id="${accordionId}">
      ${accordionContent}
    </div>
  `.trim();
  });

  // Find and store govuk selection for above accordion
  eleventyConfig.addPairedShortcode("accordionSection", function (content, label) {
    accordionSections.push({ label, content });
    return "";
  });
}
