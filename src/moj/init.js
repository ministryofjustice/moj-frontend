import * as MOJFrontend from '../moj/moj-frontend.min.js'

// Maintain window global for compatibility
window.MOJFrontend = MOJFrontend

if (
  window.GOVUKPrototypeKit &&
  window.GOVUKPrototypeKit.documentReady &&
  window.GOVUKPrototypeKit.majorVersion >= 13
) {
  window.GOVUKPrototypeKit.documentReady(() => {
    window.MOJFrontend.initAll()
  })
}
