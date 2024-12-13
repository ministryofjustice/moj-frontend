const releasePackage = require("@ministryofjustice/frontend/package.json");
module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("version", function () {
    return releasePackage.version;
  });
}
