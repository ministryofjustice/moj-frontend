export default {
  layout: 'layouts/example.njk',
  arguments: 'button-menu',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
