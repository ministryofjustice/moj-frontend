export default {
  layout: 'layouts/example.njk',
  arguments: 'sub-navigation',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
