export default {
  layout: 'layouts/example.njk',
  arguments: 'filter',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
