export default {
  layout: 'layouts/example.njk',
  arguments: 'laa-header-nav',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
