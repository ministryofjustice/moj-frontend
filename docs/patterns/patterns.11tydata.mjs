export default {
  layout: 'layouts/content.njk',
  type: 'pattern',
  subsection: 'Patterns',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'MOJ building blocks' : 'Patterns'),
      order: (data) => data.order ?? data.title,
      lede: (data) => data.lede,
      url: (data) => data.navUrl
    }
  }
}
