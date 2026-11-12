export default {
  layout: 'layouts/example.njk',
  arguments: 'header',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
