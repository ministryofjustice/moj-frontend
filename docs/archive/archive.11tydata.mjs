export default {
  layout: 'layouts/content.njk',
  status: 'Archived',
  subsection: 'Archive',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'MOJ Building blocks' : 'Archive'),
      order: (data) => data.order ?? data.title,
      excerpt: (data) => data.excerpt,
      url: (data) => data.navUrl
    }
  }
}
