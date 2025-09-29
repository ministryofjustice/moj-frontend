export default {
  layout: 'layouts/content.njk',
  tags: "style-guide-entry",
  eleventyComputed: {
    letter: (data) => data.title.charAt(0).toUpperCase()
  }
}

