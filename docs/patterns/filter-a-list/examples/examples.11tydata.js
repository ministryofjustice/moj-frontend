export default {
  layout: 'layouts/example.njk',
  arguments: 'filter-a-list',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
