const beautifyHTML = require("js-beautify").html;
const fs = require("fs");
const hljs = require("highlight.js");
const nunjucks = require("nunjucks");
const path = require("path");

module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      highlight: (str, language) =>
        language ? hljs.highlight(str, { language }).value : str,
    })
  );

  eleventyConfig.addShortcode("example", function (exampleHref, height) {
    const nunjucksCode = fs
      .readFileSync(
        path.join(__dirname, "docs", exampleHref, "example.njk"),
        "utf8"
      )
      .trim();

    const rawHtmlCode = nunjucks.renderString(nunjucksCode);

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
          path.join(__dirname, "docs", exampleHref, "scripts.html"),
          "utf8"
        )
        .trim();
    } catch (e) {}

    return nunjucks.render("docs/_includes/example.njk", {
      href: exampleHref,
      id: exampleHref.replace(/\//g, "-"),
      height,
      nunjucksCode,
      htmlCode,
      jsCode,
    });
  });

  eleventyConfig.addNunjucksFilter(
    "addActiveAttribute",
    function (config, filePathStem) {
      return {
        ...config,
        items: config.items.map((item) => ({
          ...item,
          active: filePathStem.indexOf(item.href) > -1,
        })),
      };
    }
  );
};
