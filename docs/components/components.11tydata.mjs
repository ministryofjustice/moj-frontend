export default {
  layout: 'layouts/content.njk',
  type: 'component',
  subsection: 'Components',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) => (data.index ? 'MOJ building blocks' : 'Components'),
      order: (data) => data.order ?? data.title,
      lede: (data) => data.lede,
      url: (data) => data.navUrl
    }
  }
}
