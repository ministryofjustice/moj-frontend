const fs = require('fs')
const path = require('path')

const matter = require('gray-matter')
const beautifyHTML = require('js-beautify').html

const nunjucksEnv = require('../config/nunjucks')

module.exports = function (params) {
  let templateFile = ''
  let templatePath
  let argumentsPath
  let figmaLink
  if (params.colocated) {
    templatePath = path.resolve(
      this.eleventy.env.root,
      path.dirname(this.page.inputPath),
      params.template,
      'index.njk'
    )
    const includesPath = path.resolve(
      this.eleventy.env.root,
      'docs/_includes'
    )
    const argumentsAbsPath = path.resolve(
      this.eleventy.env.root,
      path.dirname(this.page.inputPath),
      '_arguments.md'
    )
    argumentsPath = path.relative(includesPath, argumentsAbsPath)
  } else {
    templatePath = path.join(
      this.eleventy.env.root,
      this.eleventy.directories.input,
      params.template,
      'index.njk'
    )
    argumentsPath = `arguments/${this.page.fileSlug}.md`
  }
  try {
    templateFile = fs.readFileSync(templatePath, 'utf8').trim()
  } catch {
    console.error(`Template '${params.template}' could not be found.`)
    return ''
  }
  let { data, content: nunjucksCode } = matter(templateFile)

  if (params.colocated) {
    figmaLink = this.ctx.figma_link
  } else {
    figmaLink = data.figma_link
  }

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
    arguments: argumentsPath,
    figmaLink,
    figmaTabContent: params.figmaTabContent,
    title: data.title,
    height: params.height,
    showTab: params.showTab,
    nunjucksCode,
    htmlCode,
    jsCode,
    tabWarning: this.ctx.tab_warning
  })
}
