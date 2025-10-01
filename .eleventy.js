const fs = require('fs')

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const upperFirst = require('lodash/upperFirst')

const markdown = require('./config/markdown')
const nunjucksEnv = require('./config/nunjucks')
const { scriptPath, stylePath } = require('./filters/paths')
const renderMarkdown = require('./filters/render-markdown')
const renderNunjucks = require('./filters/render-nunjucks')
const rev = require('./filters/rev')
const timestamp = require('./filters/timestamp')
const accordion = require('./shortcodes/accordion')
const govukNotificationBanner = require('./shortcodes/banner')
const dateInCurrentMonth = require('./shortcodes/date-in-current-month')
const example = require('./shortcodes/example')
const tabs = require('./shortcodes/tabs')
const version = require('./shortcodes/version')
const mojFilters = require('./src/moj/filters/all')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.setLibrary('njk', nunjucksEnv)
  eleventyConfig.setLibrary('md', markdown)

  nunjucksEnv.addFilter(
    'eleventyNavigation',
    eleventyNavigationPlugin.navigation.find
  )

  eleventyConfig.addShortcode('example', example)
  eleventyConfig.addShortcode('dateInCurrentMonth', dateInCurrentMonth)
  eleventyConfig.addShortcode('version', version)
  eleventyConfig.addPairedNunjucksShortcode('tabs', tabs.createTabs)
  eleventyConfig.addPairedShortcode('tab', tabs.createTab)
  eleventyConfig.addPairedShortcode('banner', govukNotificationBanner)
  eleventyConfig.addPairedNunjucksShortcode('accordion', accordion.create)
  eleventyConfig.addPairedShortcode('accordionSection', accordion.addSection)

  eleventyConfig.addFilter('getScriptPath', scriptPath)
  eleventyConfig.addFilter('getStylesPath', stylePath)
  eleventyConfig.addFilter('renderString', renderNunjucks)
  eleventyConfig.addFilter('rev', rev)
  eleventyConfig.addFilter('upperFirst', upperFirst)
  eleventyConfig.addFilter('timestamp', timestamp)
  eleventyConfig.addFilter('markdownify', renderMarkdown)

  Object.entries(mojFilters()).forEach(([name, callback]) => {
    nunjucksEnv.addFilter(name, callback)
  })

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
    showAllHosts: true,
    showVersion: true
  })

  return {
    markdownTemplateEngine: 'njk'
  }
}
