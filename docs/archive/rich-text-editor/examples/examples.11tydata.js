export default {
  layout: 'layouts/example.njk',
  arguments: 'rich-text-editor',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
