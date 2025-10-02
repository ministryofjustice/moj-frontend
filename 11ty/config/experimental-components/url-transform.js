// Implements a url transform to enable us to show the correct page
// highlighted within the 11ty generated nav for the contributions app
// - if page has a permalink starting with views, then the url is set to the
// community start page
module.exports = (config) => {
  config.addUrlTransform(({ url }) => {
    if (url.match(/^\/views/i)) {
      return '/contribute/add-new-component/start'
    }
    // Returning undefined skips the url transform.
  })
}
