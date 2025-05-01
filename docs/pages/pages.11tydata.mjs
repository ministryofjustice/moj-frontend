export default {
  layout: 'layouts/pages.njk',
  type: 'page',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'Building blocks' : 'Pages'),
      order: (data) => data.order ?? data.title,
      excerpt: (data) => data.excerpt,
      url: (data) => data.navUrl
    }
  }
}
