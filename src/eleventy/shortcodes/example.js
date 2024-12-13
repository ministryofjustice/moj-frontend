const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");
const {html: beautifyHTML} = require("js-beautify");
module.exports = function (eleventyConfig, rootDir, nunjucksEnv) {
  eleventyConfig.addShortcode("example", function (exampleHref, height) {
    let { data, content: nunjucksCode } = matter(
      fs
        .readFileSync(
          path.join(rootDir, "docs", exampleHref, "index.njk"),
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
          path.join(rootDir, "docs", exampleHref, "script.js"),
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
}
