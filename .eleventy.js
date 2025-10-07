const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

const experimentalComponentsTemplateCopy = require('./11ty/config/experimental-components/template-copy')
const experimentalComponentsUrlTransform = require('./11ty/config/experimental-components/url-transform')
const markdown = require('./11ty/config/markdown')
const nunjucksEnv = require('./11ty/config/nunjucks')
const filters = require('./11ty/filters')
const pairedShortcodes = require('./11ty/paired-shortcodes')
const shortcodes = require('./11ty/shortcodes')
const mojFilters = require('./src/moj/filters/all')

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('njk', nunjucksEnv)
  eleventyConfig.setLibrary('md', markdown)

  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(filters)
  eleventyConfig.addPlugin(shortcodes)
  eleventyConfig.addPlugin(pairedShortcodes)

  eleventyConfig.addPlugin(experimentalComponentsUrlTransform)
  eleventyConfig.addPlugin(experimentalComponentsTemplateCopy)

  nunjucksEnv.addFilter(
    'eleventyNavigation',
    eleventyNavigationPlugin.navigation.find
  )

  Object.entries(mojFilters()).forEach(([name, callback]) => {
    nunjucksEnv.addFilter(name, callback)
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
