export default {
  layout: 'layouts/example.njk',
  arguments: 'password-reveal',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
