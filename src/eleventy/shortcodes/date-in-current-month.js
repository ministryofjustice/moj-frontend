module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode(
    "dateInCurrentMonth",
    (day) => `${day}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
  );
}
