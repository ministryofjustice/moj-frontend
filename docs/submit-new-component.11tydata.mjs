export default {
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => (data.env.showCommunity ? 'Submit a component' : ''),
      parent: (data) =>
        data.env.showCommunity ? 'About the Design System' : ''
    }
  }
}
