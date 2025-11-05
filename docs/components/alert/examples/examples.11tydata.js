export default {
  layout: 'layouts/example.njk',
  arguments: 'alert',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
