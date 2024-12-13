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

  eleventyConfig.addShortcode("example", function (exampleHref, height) {
    let { data, content: nunjucksCode } = matter(
      fs
        .readFileSync(
          path.join(__dirname, "docs", exampleHref, "index.njk"),
          "utf8",
        )
        .trim(),
    );

    nunjucksCode = nunjucksCode.split("<!--no include-->")[0].trim();

    const rawHtmlCode = nunjucksEnv.renderString(nunjucksCode);

    const htmlCode = beautifyHTML(rawHtmlCode.trim(), {
      indent_size: 2,
      end_with_newline: true,
      max_preserve_newlines: 1,
      unformatted: ["code", "pre", "em", "strong"],
    });

    let jsCode = "";
    try {
      jsCode = fs
        .readFileSync(
          path.join(__dirname, "docs", exampleHref, "script.js"),
          "utf8",
        )
        .trim();
    } catch (e) {}

    return nunjucksEnv.render("example.njk", {
      href: exampleHref,
      id: exampleHref.replace(/\//g, "-"),
      arguments: data.arguments,
      figmaLink: data.figma_link,
      title: data.title,
      height,
      nunjucksCode,
      htmlCode,
      jsCode,
    });
  });



  eleventyConfig.addShortcode(
    "dateInCurrentMonth",
    (day) => `${day}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
  );

  eleventyConfig.addShortcode("lastUpdated", function (component) {
    if (process.env.ENV == "staging") return "";

    const dirPath = path.join(__dirname, "src/moj/components", component);
    const [commit, lastUpdated] = execSync(
      `LANG=en_GB git log -n1 --pretty=format:%H,%ad --date=format:'%e %B %Y' ${dirPath}`,
    )
      .toString()
      .split(",");

    return `<p>Last updated: <a href="https://github.com/ministryofjustice/moj-frontend/commit/${commit}">${lastUpdated}</a></p>`;
  });

  eleventyConfig.addShortcode("version", function () {
    return releasePackage.version;
  });

  eleventyConfig.addPairedShortcode("banner", function (content, title) {
    return `
      <div class="govuk-notification-banner" role="region" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
        <div class="govuk-notification-banner__header">
          <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">
            Important
          </h2>
        </div>
        <div class="govuk-notification-banner__content">
          <h3 class="govuk-notification-banner__heading">
            ${title}
          </h3>
          ${content}</div>
      </div>
    `;
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
