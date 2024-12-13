module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("getScriptPath", function (inputPath) {
    return inputPath.split("/").slice(1, -1).join("/") + "/script.js";
  });
}
