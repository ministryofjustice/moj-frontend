export default {
  layout: 'layouts/example.njk',
  arguments: 'get-help',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
