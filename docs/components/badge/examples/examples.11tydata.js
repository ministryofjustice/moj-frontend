export default {
  layout: 'layouts/example.njk',
  arguments: 'badge',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
