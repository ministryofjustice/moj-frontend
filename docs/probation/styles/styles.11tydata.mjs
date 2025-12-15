export default {
  layout: 'layouts/content.njk',
  type: 'component',
  subsection: 'Probation styles',
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: (data) =>
        data.index ? 'Probation building blocks' : 'Probation styles',
      order: (data) => data.order ?? data.title,
      lede: (data) => data.lede,
      url: (data) => data.navUrl
    }
  }
}
