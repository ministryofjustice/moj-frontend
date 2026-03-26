export default {
  layout: 'layouts/example.njk',
  arguments: 'moj-header',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
