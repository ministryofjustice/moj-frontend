export default {
  layout: 'layouts/example.njk',
  arguments: 'currency-input',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
