export default {
  layout: 'layouts/content.njk',
  type: 'pattern',
  subsection: 'Patterns',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'Building blocks' : 'Patterns'),
      order: (data) => data.order ?? data.title,
      excerpt: (data) => data.excerpt,
      url: (data) => data.navUrl
    }
  }
}
