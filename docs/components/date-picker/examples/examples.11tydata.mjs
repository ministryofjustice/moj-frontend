export default {
  layout: 'layouts/example.njk',
  arguments: 'date-picker',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
