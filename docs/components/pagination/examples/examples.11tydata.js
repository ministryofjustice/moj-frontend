export default {
  layout: 'layouts/example.njk',
  arguments: 'pagination',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
