const beautifyHTML = require("js-beautify").html;
const fs = require("fs");
const hljs = require("highlight.js");
const nunjucks = require("nunjucks");
const path = require("path");

module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  eleventyConfig.setLibrary("md", markdownIt({ html: true }).disable("code"));

  eleventyConfig.addShortcode("example", function (exampleHref, height) {
    const nunjucksCode = fs.readFileSync(
      path.join(__dirname, "docs", exampleHref, "example.njk"),
      "utf8"
    );

    const rawHtmlCode = nunjucks.renderString(nunjucksCode);

    const htmlCode = beautifyHTML(rawHtmlCode.trim(), {
      indent_size: 2,
      end_with_newline: true,
      max_preserve_newlines: 1,
      unformatted: ["code", "pre", "em", "strong"],
    });

    const jsCode = fs.readFileSync(
      path.join(__dirname, "docs", exampleHref, "scripts.html"),
      "utf8"
    );

    const code = exampleHref.replace(/\//g, "-");

    return `<div class="app-example">
      <span class="app-example__new-window">
        <a href="${exampleHref}" target="_blank">Open this example in a new window</a>
      </span>
      <iframe class="app-example__frame" scrolling="auto" frameborder="0" height="${height}" src="${exampleHref}"></iframe>
    </div>
    <div class="app-tabs" data-module="app-tabs">
<ul class="app-tabs__list" role="tablist">
<li class="app-tabs__list-item" role="presentation"><a class="app-tabs__tab" href="#html-default-${code}" role="tab" id="tab_html-default-${code}" aria-controls="html-default-${code}">HTML</a></li>
<li class="app-tabs__list-item" role="presentation"><a class="app-tabs__tab" href="#nunjucks-default-${code}" role="tab" id="tab_nunjucks-default-${code}" aria-controls="nunjucks-default-${code}">Nunjucks</a></li>
<li class="app-tabs__list-item" role="presentation"><a class="app-tabs__tab" href="#js-default-${code}" role="tab" id="tab_j-default-${code}" aria-controls="js-default-${code}">JavaScript</a></li></ul>

<div class="app-tabs__panel app-tabs__panel--hidden" id="html-default-${code}" data-module="app-copy" role="tabpanel" aria-labelledby="tab_html-default-${code}"><button class="app-copy-button js-copy-button" aria-live="assertive">Copy code</button>

<pre><code class="hljs html">${
      hljs.highlight(htmlCode, { language: "html" }).value
    }</code></pre>
</div>

<div class="app-tabs__panel app-tabs__panel--hidden" id="nunjucks-default-${code}" data-module="app-copy" role="tabpanel" aria-labelledby="tab_nunjucks-default-${code}"><button class="app-copy-button js-copy-button" aria-live="assertive">Copy code</button>

<pre><code class="hljs jinja">${
      hljs.highlight(nunjucksCode, { language: "jinja" }).value
    }</code></pre>

    <p>You can configure this component using the <a href="https://github.com/ministryofjustice/moj-frontend/tree/main/src/moj/components/add-another#arguments">Nunjucks macro arguments</a></p>

</div>

<div class="app-tabs__panel app-tabs__panel--hidden" id="js-default-${code}" data-module="app-copy" role="tabpanel" aria-labelledby="tab_js-default-${code}"><button class="app-copy-button js-copy-button" aria-live="assertive">Copy code</button>

<pre><code class="hljs html">${
      hljs.highlight(jsCode, { language: "html" }).value
    }</code></pre>

</div>

</div>`;
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
