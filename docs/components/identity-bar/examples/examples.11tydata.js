export default {
  layout: 'layouts/example.njk',
  arguments: 'identity-bar',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
