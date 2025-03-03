const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const cheerio = require('cheerio')
const matter = require('gray-matter')
const hljs = require('highlight.js')
const beautifyHTML = require('js-beautify').html
const upperFirst = require('lodash/upperFirst')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const nunjucks = require('nunjucks')

const releasePackage = require('./package/package.json')
const mojFilters = require('./src/moj/filters/all')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  /*
   * If the node env is 'dev' then we include the src dir allowing components
   * under development to be watched and loaded
   */
  const templatePaths =
    process.env.ENV === 'dev'
      ? [
          '.',
          'src',
          'docs/_includes/',
          'node_modules/govuk-frontend/dist/',
          'node_modules/@ministryofjustice/frontend/'
        ]
      : [
          '.',
          'docs/_includes/',
          'node_modules/govuk-frontend/dist/',
          'node_modules/@ministryofjustice/frontend/'
        ]

  const nunjucksEnv = nunjucks.configure(templatePaths)

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
      highlight: (str, language) =>
        language ? hljs.highlight(str, { language }).value : str
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
    } catch (e) {}

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

  eleventyConfig.addShortcode('form', function (file, variables = '') {
    try {
      // Read the file directly
      const filePath = path.join(__dirname, 'docs', file)
      const fileContent = fs.readFileSync(filePath, 'utf8').trim()

      // Parse front matter and extract Nunjucks code
      const { data, content: nunjucksCode } = matter(fileContent)

      let parsedVariables = {}

      if (variables !== '') {
        // Turn variables into an object
        const fixedVariables = variables
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":')

        parsedVariables = JSON.parse(fixedVariables)
      }

      const context = { ...data, ...parsedVariables }

      // Render the Nunjucks code as HTML (renderString directly processes content)
      const rawHtmlCode = nunjucksEnv.renderString(nunjucksCode.trim(), context)

      const htmlCode = beautifyHTML(rawHtmlCode.trim(), {
        indent_size: 2,
        end_with_newline: true,
        max_preserve_newlines: 1,
        unformatted: ['code', 'pre', 'em', 'strong']
      })

      return htmlCode
    } catch (error) {
      console.error('Error in form shortcode:', error)
      return `<div>Error loading file: ${file}</div>`
    }
  })

  eleventyConfig.addShortcode('contentsList', function (itemsJson = '') {
    try {
      const items = JSON.parse(itemsJson);
      return `
        <aside class="part-navigation-container" role="complementary">
          <nav class="govuk-!-margin-bottom-4">
            <h2 class="gem-c-contents-list__title">Contents</h2>
            <ol class="gem-c-contents-list__list">
              ${items
                .map((item) => item.href 
                  ? `<li class="gem-c-contents-list__list-item gem-c-contents-list__list-item--dashed">
                       <span class="gem-c-contents-list__list-item-dash" aria-hidden="true"></span>
                       <a class="gem-c-contents-list__link govuk-link gem-c-force-print-link-styles" href="${item.href}">${item.text}</a>
                     </li>`
                  : `<li class="gem-c-contents-list__list-item gem-c-contents-list__list-item--dashed gem-c-contents-list__list-item--active" aria-current="true">
                       <span class="gem-c-contents-list__list-item-dash" aria-hidden="true"></span>
                       ${item.text}
                     </li>`
                )
                .join('')}
            </ol>
          </nav>
        </aside>
      `.trim();
    } catch (error) {
      console.error('Error in form shortcode:', error)
      return `<div>Error loading list: ${list}</div>`
    }
  });
  

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
  eleventyConfig.addPairedShortcode(
    'tabs',
    function (content, label = 'Contents') {
      const tabId = (tab) => {
        return `${tab.label.toLowerCase().replace(/ /g, '-')}-tab`
      }
      const tabsList = tabsStorage
        .map((tab, index) => {
          const isSelected = index === 0 ? '--selected' : ''
          return `
      <li class="govuk-tabs__list-item${isSelected} app-navigation__item" role="presentation">
        <a class="govuk-tabs__tab app-navigation__link app-navigation__link" href="#${tabId(tab)}" role="tab" >
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
          return `
      <div class="govuk-tabs__panel${isHidden}" id="${tabId(tab)}" role="tabpanel">${tab.content}</div>
    `.trim()
        })
        .join('')
        .trim()

      tabsStorage = []

      return `
    <div class="govuk-tabs app-navigation no-govuk-tabs-styles" data-module="govuk-tabs">
      <h2 class="govuk-tabs__title">${label}</h2>
      <ul class="govuk-tabs__list app-navigation__list" role="tabpanel">
        ${tabsList}
      </ul>
      ${tabPanels}
    </div>
  `.trim()
    }
  )

  // Find and store govuk tab for above tabs
  eleventyConfig.addPairedShortcode('tab', function (content, label) {
    tabsStorage.push({ label, content })
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
        fs.readFileSync('public/assets/rev-manifest.json', 'utf8')
      )
      const revision = manifest[filepath]
      return `/${revision || filepath}`
    }
    return `/${filepath}`
  })

  const createLayoutFromHTML = (sourceFile, destinationFile) => {
    try {
      const htmlContent = fs.readFileSync(sourceFile, 'utf8');
      const $ = cheerio.load(htmlContent);
  
      // Check if we are generating a community page layout
      const isCommunityPage = destinationFile.includes('/views/common/');
  
      // If it's a community page, remove the class from <main>
      if (isCommunityPage) {
        $('main').removeAttr('class'); 
      }
  
      // Replace #main-content with Nunjucks block
      const nunjucksBlock = `
      {% block content %}
          {{ content | safe }}
      {% endblock %}
      `.trim();
      $('#main-content').html(nunjucksBlock);
  
      // Beautify HTML
      const modifiedContent = beautifyHTML($.html(), {
        indent_size: 2,
        end_with_newline: true,
        max_preserve_newlines: 1,
        unformatted: ['code', 'pre', 'em', 'strong']
      });
  
      // Write the modified content back
      fs.writeFileSync(destinationFile, modifiedContent);
      console.log(`Generated base.njk at ${destinationFile}`);
    } catch (error) {
      console.error('Error during base.njk generation:', error);
    }
  };
  // Create base.njk for community form based on the add-new-component page (to use the correct navigation)
  eleventyConfig.on('afterBuild', () => {
    // Add new component layout
    const componentSourceFile = path.join(
      __dirname,
      'public/get-involved/add-new-component/index.html'
    )
    const componentDestinationFile = path.join(
      __dirname,
      'views/community/pages/base.njk'
    )
    createLayoutFromHTML(componentSourceFile, componentDestinationFile)

    // Common layout
    const sourceFile = path.join(__dirname, 'public/index.html')
    const destinationFile = path.join(__dirname, 'views/common/base.njk')
    createLayoutFromHTML(sourceFile, destinationFile)
  })

  eleventyConfig.addFilter('upperFirst', upperFirst)

  // Rebuild when a change is made to a component template file
  eleventyConfig.addWatchTarget('src/moj/components/**/*.njk')

  // Give gulp a little time..
  eleventyConfig.setWatchThrottleWaitTime(100)

  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: false,
    port: 8080,
    // Reload once assets have been rebuilt by gulp
    watch: [
      'public/assets/stylesheets/application.css',
      'public/assets/javascript/application.js'
    ],
    // Show local network IP addresses for device testing
    showAllHosts: true,
    // Show the dev server version number on the command line
    showVersion: true
  })
}
