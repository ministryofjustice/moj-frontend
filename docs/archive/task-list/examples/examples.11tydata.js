export default {
  layout: 'layouts/example.njk',
  arguments: 'task-list',
  eleventyComputed: {
    'override:eleventyNavigation': false
  }
}
