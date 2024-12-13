const beautifyHTML = require("js-beautify").html;
const fs = require("fs");
const hljs = require("highlight.js");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const matter = require("gray-matter");
const mojFilters = require("./src/moj/filters/all");
const nunjucks = require("nunjucks");
const path = require("path");
const { execSync } = require("child_process");
const releasePackage = require("./package/package.json");
const sass = require("sass");
const esbuild = require('esbuild');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {

  // Load plugins
  const pluginDir = path.join(__dirname, "src/eleventy/plugins");
  fs.readdirSync(pluginDir).forEach((file) => {
    const plugin = require(path.join(pluginDir, file));
    plugin(eleventyConfig);
  });

  /*
   * If the node env is 'dev' then we include the src dir allowing components
   * under development to be watched and loaded
   */
  const templatePaths =
    process.env.ENV === "dev"
      ? [
          ".",
          "src",
          "docs/_includes/",
          "node_modules/govuk-frontend/dist/",
          "node_modules/@ministryofjustice/frontend/",
        ]
      : [
          ".",
          "docs/_includes/",
          "node_modules/govuk-frontend/dist/",
          "node_modules/@ministryofjustice/frontend/",
        ];

  const nunjucksEnv = nunjucks.configure(templatePaths);

  Object.entries({
    ...eleventyConfig.nunjucksFilters,
    ...mojFilters(),
  }).forEach(([name, callback]) => {
    nunjucksEnv.addFilter(name, callback);
  });

  nunjucksEnv.addFilter("eleventyNavigation", eleventyNavigationPlugin.navigation.find);

  eleventyConfig.setLibrary("njk", nunjucksEnv);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      highlight: (str, language) =>
        language ? hljs.highlight(str, { language }).value : str,
    })
      .disable("code")
      .use(markdownItAnchor, {
        level: [1, 2, 3, 4],
      }),
  );

  // Load short codes
  const shortcodeDir = path.join(__dirname, "src/eleventy/shortcodes");
  const rootDir = path.resolve(__dirname)
  fs.readdirSync(shortcodeDir).forEach((file) => {
    const shortcode = require(path.join(shortcodeDir, file));
    shortcode(eleventyConfig, rootDir, nunjucksEnv);
  });

  // Load filters
  const filterDir = path.join(__dirname, "src/eleventy/filters");
  fs.readdirSync(filterDir).forEach((file) => {
    const filter = require(path.join(filterDir, file));
    filter(eleventyConfig);
  });

  // Rebuild when a change is made to a component template file
  eleventyConfig.addWatchTarget("src/moj/components/**/*.njk");

  // Give gulp a little time..
  eleventyConfig.setWatchThrottleWaitTime(100);

  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: false,
    port: 8080,
    // Reload once assets have been rebuilt by gulp
    watch: [
      "public/assets/stylesheets/application.css",
      "public/assets/javascript/all.js",
    ],
    // Show local network IP addresses for device testing
    showAllHosts: true,
    // Show the dev server version number on the command line
    showVersion: true,
  });
};
