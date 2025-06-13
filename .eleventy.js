const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const matter = require('gray-matter')
const hljs = require('highlight.js')
const beautifyHTML = require('js-beautify').html
const upperFirst = require('lodash/upperFirst')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const nunjucks = require('nunjucks')

const releasePackage = require('./package/package.json')
const mojFilters = require('./src/moj/filters/all')

// Configure highlight.js
hljs.registerAliases(['mjs', 'njk'], { languageName: 'javascript' })

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  const nunjucksEnv = nunjucks.configure([
    '.',
    'src',
    'docs/_includes/',
    'node_modules/govuk-frontend/dist/'
  ])

  Object.entries({
    ...eleventyConfig.nunjucksFilters,
    ...mojFilters()
  }).forEach(([name, callback]) => {
    nunjucksEnv.addFilter(name, callback)
  })

  nunjucksEnv.addFilter(
    'eleventyNavigation',
    eleventyNavigationPlugin.navigation.find
  )

  eleventyConfig.setLibrary('njk', nunjucksEnv)

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      typographer: true,
      quotes: '“”‘’',
      highlight(code, language) {
        const { value } = hljs.highlight(code.trim(), {
          language: language || 'plaintext'
        })

        return value
      }
    })
      .disable('code')
      .use(markdownItAnchor, {
        level: [1, 2, 3, 4]
      })
  )

  eleventyConfig.addShortcode('example', function (exampleHref, height) {
    let { data, content: nunjucksCode } = matter(
      fs
        .readFileSync(
          path.join(__dirname, 'docs', exampleHref, 'index.njk'),
          'utf8'
        )
        .trim()
    )

    nunjucksCode = nunjucksCode.split('<!--no include-->')[0].trim()

    const rawHtmlCode = nunjucksEnv.renderString(nunjucksCode)

    const htmlCode = beautifyHTML(rawHtmlCode.trim(), {
      indent_size: 2,
      end_with_newline: true,
      max_preserve_newlines: 1,
      unformatted: ['code', 'pre', 'em', 'strong']
    })

    let jsCode = ''
    try {
      jsCode = fs
        .readFileSync(
          path.join(__dirname, 'docs', exampleHref, 'script.js'),
          'utf8'
        )
        .trim()
    } catch {}

    return nunjucksEnv.render('example.njk', {
      href: exampleHref,
      id: exampleHref.replace(/\//g, '-'),
      arguments: data.arguments,
      figmaLink: data.figma_link,
      title: data.title,
      height,
      nunjucksCode,
      htmlCode,
      jsCode
    })
  })

  eleventyConfig.addShortcode(
    'dateInCurrentMonth',
    (day) => `${day}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  )

  eleventyConfig.addShortcode('lastUpdated', function (component) {
    if (process.env.ENV === 'staging') return ''

    const dirPath = path.join(__dirname, 'src/moj/components', component)
    const [commit, lastUpdated] = execSync(
      `LANG=en_GB git log -n1 --pretty=format:%H,%ad --date=format:'%e %B %Y' ${dirPath}`
    )
      .toString()
      .split(',')

    return `<p>Last updated: <a href="https://github.com/ministryofjustice/moj-frontend/commit/${commit}">${lastUpdated}</a></p>`
  })

  eleventyConfig.addShortcode('version', function () {
    return releasePackage.version
  })

  // Temp storage for tabs
  let tabsStorage = []

  // Generate govuk tabs
  eleventyConfig.addPairedNunjucksShortcode(
    'tabs',
    function (content, style, title="Contents") {
      const paginate = style === "paginate"
        const tabId = (tab) => {
        return `${tab.label.toLowerCase().replace(/ /g, '-')}-tab`
      }
      const tabsList = tabsStorage
        .map((tab, index) => {
          const isSelected = index === 0 ? '--selected' : ''
          return `
      <li class="govuk-tabs__list-item govuk-tabs__list-item${isSelected} app-layout-tabs__list-item app-layout-tabs__list-item${isSelected}" role="presentation">
        <a class="govuk-tabs__tab app-layout-tabs__tab" href="#${tabId(tab)}" role="tab" >
          ${tab.label}
        </a>
      </li>
    `.trim()
        })
        .join('\n')
        .trim()

      const tabPanels = tabsStorage
        .map((tab, index) => {
          const isHidden = index === 0 ? '' : ' govuk-tabs__panel--hidden'
          const nextTab = tabsStorage.at(index+1)
          let nextTabLink
          if(paginate && nextTab){
          nextTabLink = `<nav class="govuk-pagination govuk-pagination--block" aria-label="Tab navigation"><div class="govuk-pagination__next">
    <a class="govuk-link govuk-pagination__link" href="#${tabId(nextTab)}" rel="next">
      <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
      </svg>
      <span class="govuk-pagination__link-title">
        Next<span class="govuk-visually-hidden"> tab</span>
      </span>
      <span class="govuk-visually-hidden">:</span>
      <span class="govuk-pagination__link-label">${nextTab.label}</span>
    </a>
  </div></nav>`
        }
          return `
      <div class="govuk-tabs__panel${isHidden} app-layout-tabs__panel" id="${tabId(tab)}" role="tabpanel">
        ${tab.content}
        ${nextTabLink ?? ''}
      </div>
    `.trim()
        })
        .join('')
        .trim()

      tabsStorage = []

      return `
    <div class="govuk-tabs app-layout-tabs no-govuk-tabs-styles" data-module="govuk-tabs">
      <h2 class="govuk-tabs__title">${title}</h2>
      <ul class="govuk-tabs__list app-layout-tabs__list" role="tabpanel">
        ${tabsList}
      </ul>
      ${tabPanels}
    </div>
  `.trim()
    }
  )

  // Find and store govuk tab for above tabs
  eleventyConfig.addPairedShortcode('tab', function (content, label) {
    tabsStorage.push({ content, label })
    return ''
  })

  eleventyConfig.addPairedShortcode('banner', function (content, title) {
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
    `
  })

  // Temp storage for tabs
  let accordionSections = []

  // Generate govuk tabs
  eleventyConfig.addPairedShortcode(
    'accordion',
    function (content, accordionId) {
      const sectionId = (section) => {
        return `${section.label.toLowerCase().replace(/ /g, '-')}-section`
      }
      const contentId = (section, index) => {
        return `${accordionId}-content-${index}`
      }

      const accordionContent = accordionSections
        .map((section, index) => {
          return `
        <div class="govuk-accordion__section">
          <div class="govuk-accordion__section-header">
            <h2 class="govuk-accordion__section-heading">
              <span class="govuk-accordion__section-button" id="${sectionId(section)}">
                ${section.label}
              </span>
            </h2>
          </div>
          <div id="${contentId(section, index + 1)}" class="govuk-accordion__section-content">${section.content}</div>
      </div>
    `.trim()
        })
        .join('')
        .trim()

      accordionSections = []

      return `
    <div class="govuk-accordion" data-module="govuk-accordion" id="${accordionId}">
      ${accordionContent}
    </div>
  `.trim()
    }
  )

  // Find and store govuk tab for above tabs
  eleventyConfig.addPairedShortcode(
    'accordionSection',
    function (content, label) {
      accordionSections.push({ label, content })
      return ''
    }
  )

  eleventyConfig.addFilter(
    'addActiveAttribute',
    function (config, filePathStem) {
      if (config.items) {
        return {
          ...config,
          items: config.items.map((item) => ({
            ...item,
            active: filePathStem.indexOf(item.href) > -1
          }))
        }
      } else if (config.sections) {
        return {
          ...config,
          sections: config.sections.map((section) => ({
            ...section,
            items: section.items.map((item) => ({
              ...item,
              active: filePathStem.indexOf(item.href) > -1
            }))
          }))
        }
      }
    }
  )

  eleventyConfig.addFilter('getScriptPath', function (inputPath) {
    return `${inputPath.split('/').slice(1, -1).join('/')}/script.js`
  })

  eleventyConfig.addFilter('getStylesPath', function (inputPath) {
    return `${inputPath.split('/').slice(1, -1).join('/')}/style.css`
  })

  eleventyConfig.addFilter('renderString', function (viewString, context) {
    return nunjucksEnv.renderString(viewString, context)
  })

  eleventyConfig.addFilter('rev', (filepath) => {
    if (process.env.ENV === 'production' || process.env.ENV === 'staging') {
      const manifest = JSON.parse(
        fs.readFileSync('public/rev-manifest.json', 'utf8')
      )
      const revision = manifest[filepath]
      return `/${revision || filepath}`
    }
    return `/${filepath}`
  })

  eleventyConfig.addFilter('upperFirst', upperFirst)

  // Rebuild when a change is made to a component template file
  eleventyConfig.addWatchTarget('src/moj/components/**/*.njk')
  eleventyConfig.addWatchTarget('docs/examples/**/script.js')
  eleventyConfig.addWatchTarget('docs/examples/**/style.css')

  // Give gulp a little time..
  eleventyConfig.setWatchThrottleWaitTime(100)

  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: false,
    // Reload once assets have been rebuilt by gulp
    watch: [
      'public/javascripts/application.min.js',
      'public/javascripts/govuk-frontend.min.js',
      'public/javascripts/moj-frontend.min.js',
      'public/stylesheets/application.min.css',
      'public/stylesheets/govuk-frontend.min.css',
      'public/stylesheets/moj-frontend.min.css'
    ],
    // Show local network IP addresses for device testing
    showAllHosts: true,
    // Show the dev server version number on the command line
    showVersion: true
  })
}

module.exports.config = {
  markdownTemplateEngine: "njk"
}
