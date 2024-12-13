const path = require("path");
const {execSync} = require("child_process");
module.exports = function (eleventyConfig, rootDir) {
  eleventyConfig.addShortcode("lastUpdated", function (component) {
    if (process.env.ENV == "staging") return "";

    const dirPath = path.join(rootDir, "src/moj/components", component);
    const [commit, lastUpdated] = execSync(
      `LANG=en_GB git log -n1 --pretty=format:%H,%ad --date=format:'%e %B %Y' ${dirPath}`,
    )
      .toString()
      .split(",");

    return `<p>Last updated: <a href="https://github.com/ministryofjustice/moj-frontend/commit/${commit}">${lastUpdated}</a></p>`;
  });
}
