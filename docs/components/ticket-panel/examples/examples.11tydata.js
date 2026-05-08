export default {
  layout: 'layouts/example.njk',
  arguments: 'ticket-panel',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
