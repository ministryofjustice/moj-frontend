export default {
  layout: 'layouts/content.njk',
  type: 'page',
  subsection: 'Pages',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'MOJ building blocks' : 'Pages'),
      order: (data) => data.order ?? data.title,
      lede: (data) => data.lede,
      url: (data) => data.navUrl
    }
  }
}
