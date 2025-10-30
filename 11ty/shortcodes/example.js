const fs = require('fs')
const path = require('path')

const matter = require('gray-matter')
const beautifyHTML = require('js-beautify').html

const nunjucksEnv = require('../config/nunjucks')

module.exports = function (params) {
  let templateFile = ''
  let templatePath
  if(params.colocated) {
        templatePath = path.resolve(
          this.eleventy.env.root,
          path.dirname(this.page.inputPath),
          params.template,
          'index.njk'
        )
  } else {
    // templatePath = path.join(
    //       __dirname,
    //       '../',
    //       '../',
    //       'docs',
    //       params.template,
    //       'index.njk'
    //     )
    //     'j'
        templatePath = path.join(
          this.eleventy.env.root,
          this.eleventy.directories.input,
          params.template,
          'index.njk'
        )
    console.log(templatePath)
  }
  try {
    templateFile = fs
      .readFileSync(
        templatePath,
        'utf8'
      )
      .trim()
  } catch {
    console.error(`Template '${params.template}' could not be found.`)
    return ''
  }
  let { data, content: nunjucksCode } = matter(templateFile)

  nunjucksCode = nunjucksCode.split('<!--no include-->')[0].trim()

  const rawHtmlCode = nunjucksEnv.renderString(nunjucksCode)

  const htmlCode = beautifyHTML(rawHtmlCode.trim(), {
    indent_size: 2,
    end_with_newline: true,
    max_preserve_newlines: 0,
    unformatted: ['code', 'pre', 'em', 'strong']
  })

  let jsCode = ''
  try {
    jsCode = fs
      .readFileSync(
        path.join(__dirname, 'docs', params.template, 'script.js'),
        'utf8'
      )
      .trim()
  } catch {}

  return nunjucksEnv.render('example.njk', {
    href: params.template,
    id: params.template.replace(/\//g, '-'),
    arguments: this.page.fileSlug,
    figmaLink: this.ctx.figma_link,
    title: data.title,
    height: params.height,
    showTab: params.showTab,
    nunjucksCode,
    htmlCode,
    jsCode
  })
}
