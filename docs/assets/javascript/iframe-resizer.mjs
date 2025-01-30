export default class IFrameResizer {
  constructor(iframe) {
    this.iframe = iframe
    this.observer = null
    this.contentWindow = null

    // Bind methods
    this.init = this.init.bind(this)
    this.cleanup = this.cleanup.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMutation = this.onMutation.bind(this)

    // Start initialization
    this.iframe.addEventListener('load', this.onLoad)
  }

  init() {
    try {
      this.contentWindow = this.iframe.contentWindow

      // Create ResizeObserver to watch the iframe content
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.onResize(entry)
        }
      })

      // Create MutationObserver to watch for visibility changes
      this.mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          this.onMutation(mutation)
        }
      })

      // Observe the body of the iframe content
      const targetNode = this.contentWindow.document.body
      this.resizeObserver.observe(targetNode)

      // Observe for attribute changes that might affect visibility
      this.mutationObserver.observe(targetNode, {
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden', 'aria-expanded'],
        attributeOldValue: true,
        childList: true,
        subtree: true
      })

      // Initial size adjustment
      this.adjustSize()
    } catch (error) {
      console.error('Failed to initialize IframeResizer:', error)
    }
  }

  onLoad() {
    this.init()
  }

  onMutation(mutation) {
    // Ideally we might want to restrict this slightly to check if we
    // need to adjust size, but this is tricky. Most of our components are
    // relatively static, so if something changes its likely to be
    // visibility-related
    this.adjustSize()
  }

  onResize(entry) {
    this.adjustSize()
  }

  adjustSize() {
    if (!this.contentWindow) return

    try {
      const body = this.contentWindow.document.body
      const html = this.contentWindow.document.documentElement
      const elements = body.getElementsByTagName('*')

      let maxHeight = html.offsetHeight
      let padding = 30

      // Check each element's bottom edge position
      for (const element of elements) {
        const rect = element.getBoundingClientRect()
        const bottomPos = rect.top + rect.height
        // If maxHeight is bigger, that includes the body padding, if bottomPos
        // is higher, that is the exact bottom of the element, so we add some padding
        maxHeight = maxHeight > bottomPos ? maxHeight : bottomPos + padding
      }

      // Update iframe height
      this.iframe.style.height = `${maxHeight}px`
    } catch (error) {
      console.error('Failed to adjust iframe size:', error)
    }
  }

  cleanup() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
    this.iframe.removeEventListener('load', this.onLoad)
  }
}
