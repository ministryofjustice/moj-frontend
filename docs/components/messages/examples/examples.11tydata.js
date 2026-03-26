export default {
  layout: 'layouts/example.njk',
  arguments: 'messages',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
