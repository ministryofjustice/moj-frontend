export default {
  layout: 'layouts/example.njk',
  arguments: 'sortable-table',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
