module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("getStylesPath", function (inputPath) {
    return inputPath.split("/").slice(1, -1).join("/") + "/style.css";
  });
}
