export default {
  layout: 'layouts/example.njk',
  arguments: 'scrollable-pane',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
