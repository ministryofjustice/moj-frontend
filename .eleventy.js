const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const matter = require('gray-matter')
const beautifyHTML = require('js-beautify').html
const upperFirst = require('lodash/upperFirst')
const nunjucks = require('nunjucks')
const nunjucksEnv = require('./config/nunjucks')
const markdown = require('./config/markdown')
const rev = require('./filters/rev')
const releasePackage = require('./package/package.json')
const govukNotificationBanner = require('./shortcodes/banner')
const dateInCurrentMonth = require('./shortcodes/date-in-current-month')
const example = require('./shortcodes/example')
const tabs = require('./shortcodes/tabs')
const mojFilters = require('./src/moj/filters/all')


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

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

  eleventyConfig.setLibrary('md', markdown)

  eleventyConfig.addShortcode('example', example)

  eleventyConfig.addShortcode('dateInCurrentMonth', dateInCurrentMonth)

  eleventyConfig.addShortcode('version', function () {
    return releasePackage.version
  })

  // Generate govuk tabs
  eleventyConfig.addPairedNunjucksShortcode('tabs', tabs.createTabs)
  // Find and store govuk tab for above tabs
  eleventyConfig.addPairedShortcode('tab', tabs.createTab)

  eleventyConfig.addPairedShortcode('banner', govukNotificationBanner)

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

  eleventyConfig.addFilter('rev', rev)

  eleventyConfig.addFilter('upperFirst', upperFirst)

  // Implements a url transform to enable us to show the correct page
  // highlighted within the 11ty generated nav for the contributions app
  // - if page has a permalink starting with views, then the url is set to the
  // community start page
  eleventyConfig.addUrlTransform(({ url }) => {
    if (url.match(/^\/views/i)) {
      return '/contribute/add-new-component/start'
    }
    // Returning undefined skips the url transform.
  })

  // Copies the 11ty base layout and partials to the contributions app layouts directory
  eleventyConfig.on('eleventy.before', async ({ directories }) => {
    const srcDir = `${directories.includes}layouts`
    const destDir = './app/views/common'
    const templates = [
      'base.njk',
      '404.njk',
      '500.njk',
      'partials/header.njk',
      'partials/header-no-nav.njk',
      'partials/footer.njk'
    ]

    templates.forEach((template) => {
      fs.copyFile(`${srcDir}/${template}`, `${destDir}/${template}`, (err) => {
        if (err) {
          console.log('Error Found:', err)
        }
      })
    })
  })

  eleventyConfig.addFilter('timestamp', (date) => {
    return date.getTime()
  })

  eleventyConfig.addFilter('markdownify', (content) => {
    return `${markdown.render(content)}`
  })

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
  markdownTemplateEngine: 'njk'
}
