export default {
  layout: 'layouts/example.njk',
  arguments: 'banner',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
