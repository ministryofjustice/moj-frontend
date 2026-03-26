export default {
  layout: 'layouts/example.njk',
  arguments: 'organisation-switcher',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
