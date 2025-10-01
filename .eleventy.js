const fs = require('fs')

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const upperFirst = require('lodash/upperFirst')

const markdown = require('./config/markdown')
const nunjucksEnv = require('./config/nunjucks')
const filters = require('./filters')
const shortcodes = require('./shortcodes')
const mojFilters = require('./src/moj/filters/all')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.setLibrary('njk', nunjucksEnv)
  eleventyConfig.setLibrary('md', markdown)

  nunjucksEnv.addFilter(
    'eleventyNavigation',
    eleventyNavigationPlugin.navigation.find
  )

  eleventyConfig.addShortcode('example', shortcodes.example)
  eleventyConfig.addShortcode('dateInCurrentMonth', shortcodes.dateInCurrentMonth)
  eleventyConfig.addShortcode('version', shortcodes.version)
  eleventyConfig.addPairedNunjucksShortcode('tabs', shortcodes.tabs.create)
  eleventyConfig.addPairedShortcode('tab', shortcodes.tabs.addTab)
  eleventyConfig.addPairedShortcode('banner', shortcodes.banner)
  eleventyConfig.addPairedNunjucksShortcode('accordion', shortcodes.accordion.create)
  eleventyConfig.addPairedShortcode('accordionSection', shortcodes.accordion.addSection)

  eleventyConfig.addFilter('getScriptPath', filters.scriptPath)
  eleventyConfig.addFilter('getStylesPath',filters.stylePath)
  eleventyConfig.addFilter('renderString', filters.renderNunjucks)
  eleventyConfig.addFilter('rev', filters.rev)
  eleventyConfig.addFilter('upperFirst', upperFirst)
  eleventyConfig.addFilter('timestamp', filters.timestamp)
  eleventyConfig.addFilter('markdownify', filters.renderMarkdown)

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
