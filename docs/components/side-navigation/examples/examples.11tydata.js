export default {
  layout: 'layouts/example.njk',
  arguments: 'side-navigation',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
