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

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
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
      typographer:  true,
      quotes: '“”‘’',
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

  // Temp storage for tabs
  let accordionSections = [];

  // Generate govuk tabs
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
    }).join("\n").trim();

    accordionSections = [];

    return `
    <div class="govuk-accordion" data-module="govuk-accordion" id="${accordionId}">
      ${accordionContent}
    </div>
  `.trim();
  });

// Find and store govuk tab for above tabs
  eleventyConfig.addPairedShortcode("accordionSection", function (content, label) {
    accordionSections.push({ label, content });
    return "";
  });


  eleventyConfig.addFilter(
    "addActiveAttribute",
    function (config, filePathStem) {
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
    },
  );

  eleventyConfig.addFilter("getScriptPath", function (inputPath) {
    return inputPath.split("/").slice(1, -1).join("/") + "/script.js";
  });

  eleventyConfig.addFilter("getStylesPath", function (inputPath) {
    return inputPath.split("/").slice(1, -1).join("/") + "/style.css";
  });

  eleventyConfig.addFilter(
    "rev",
    (filepath) => {
      if (process.env.ENV == "production" || process.env.ENV == "staging") {
        const manifest = JSON.parse(fs.readFileSync('public/assets/rev-manifest.json', 'utf8'));
        const revision = manifest[filepath]
        return `/${revision || filepath}`
      } else {
        return `/${filepath}`
      }
    }
  )

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
