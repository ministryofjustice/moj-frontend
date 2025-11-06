export default {
  layout: 'layouts/example.njk',
  arguments: 'calendar',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
