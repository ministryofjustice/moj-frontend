export default {
  layout: 'layouts/example.njk',
  arguments: 'upload-files',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
