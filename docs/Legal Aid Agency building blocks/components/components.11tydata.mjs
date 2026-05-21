export default {
  layout: 'layouts/content.njk',
  type: 'component',
  subsection: 'LAA components',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) =>
        data.index ? 'Legal Aid Agency building blocks' : 'LAA components',
      order: (data) => data.order ?? data.title,
      lede: (data) => data.lede,
      url: (data) => data.navUrl
    }
  }
}
