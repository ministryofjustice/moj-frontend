const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("rev", (filepath) => {
    if (process.env.ENV === "production" || process.env.ENV === "staging") {
      const manifest = JSON.parse(fs.readFileSync('public/assets/rev-manifest.json', 'utf8'));
      const revision = manifest[filepath];
      return `/${revision || filepath}`;
    } else {
      return `/${filepath}`;
    }
  });
};
