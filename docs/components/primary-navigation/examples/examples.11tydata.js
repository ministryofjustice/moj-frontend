export default {
  layout: 'layouts/example.njk',
  arguments: 'primary-navigation',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
