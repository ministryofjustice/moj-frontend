export default {
  layout: 'layouts/example.njk',
  arguments: 'search',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
