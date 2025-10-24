export default {
  layout: 'layouts/content.njk',
  type: 'page',
  subsection: 'Pages',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'MOJ Building blocks' : 'Pages'),
      order: (data) => data.order ?? data.title,
      excerpt: (data) => data.excerpt,
      url: (data) => data.navUrl
    }
  }
}
