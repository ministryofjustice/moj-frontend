export default {
  layout: 'layouts/example.njk',
  arguments: 'timeline',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
