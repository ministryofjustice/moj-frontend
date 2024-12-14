module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("addActiveAttribute", function (config, filePathStem) {
    if (config.items) {
      return {
        ...config,
        items: config.items.map((item) => ({
          ...item,
          active: filePathStem.indexOf(item.href) > -1,
        })),
      };
    } else if (config.sections) {
      return {
        ...config,
        sections: config.sections.map((section) => ({
          ...section,
          items: section.items.map((item) => ({
            ...item,
            active: filePathStem.indexOf(item.href) > -1,
          })),
        })),
      };
    }
  });
};
