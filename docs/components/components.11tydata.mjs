export default {
  type: 'component',
  subsection: 'Components',
  eleventyComputed: {
    layout: (data) =>
      data.tabCollection ? 'layouts/content-tabs' : 'layouts/content.njk',
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'MOJ building blocks' : 'Components'),
      order: (data) => data.order ?? data.title,
      excerpt: (data) => data.excerpt,
      url: (data) => data.navUrl
    }
  }
}
