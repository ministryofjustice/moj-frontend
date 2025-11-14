export default {
  layout: 'layouts/example.njk',
  arguments: 'page-header-actions',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
