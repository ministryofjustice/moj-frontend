export default {
  layout: 'layouts/content.njk',
  tags: 'style-guide-entry',
  permalink: false,
  eleventyComputed: {
    letter: (data) => data.title.charAt(0).toUpperCase()
  }
}
