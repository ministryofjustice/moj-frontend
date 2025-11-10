export default {
  layout: 'layouts/example.njk',
  arguments: 'notification-badge',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
