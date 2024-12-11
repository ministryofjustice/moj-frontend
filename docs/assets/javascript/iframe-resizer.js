export default class IFrameResizer {
  constructor(iframe) {
    this.iframe = iframe;
    this.observer = null;
    this.contentWindow = null;

    // Bind methods
    this.init = this.init.bind(this);
    this.cleanup = this.cleanup.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onMutation = this.onMutation.bind(this);

    // Start initialization
    this.iframe.addEventListener("load", this.onLoad);
  }

  init() {
    try {
      this.contentWindow = this.iframe.contentWindow;

      // Create ResizeObserver to watch the iframe content
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.onResize(entry);
        }
      });

      // Create MutationObserver to watch for visibility changes
      this.mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          this.onMutation(mutation);
        }
      });

      // Observe the body of the iframe content
      const targetNode = this.contentWindow.document.body;
      this.resizeObserver.observe(targetNode);

      // Observe for attribute changes that might affect visibility
      this.mutationObserver.observe(targetNode, {
        attributes: true,
        attributeFilter: ["style", "class"],
        childList: true,
        subtree: true,
      });

      // Initial size adjustment
      this.adjustSize();
    } catch (error) {
      console.error("Failed to initialize IframeResizer:", error);
    }
  }

  onLoad() {
    this.init();
  }

  onMutation(mutation) {
    // Check if the mutation is related to visibility
    if (mutation.type === "attributes") {
      const target = mutation.target;
      const computedStyle = window.getComputedStyle(target);

      if (
        mutation.attributeName === "style" ||
        mutation.attributeName === "class"
      ) {
        // Check if visibility-related properties changed
        if (
          computedStyle.display !== "none" ||
          computedStyle.visibility !== "hidden" ||
          computedStyle.opacity !== "0"
        ) {
          this.adjustSize();
        }
      }
    }
    // Check for added/removed nodes
    else if (mutation.type === "childList") {
      this.adjustSize();
    }
  }

  onResize(entry) {
    this.adjustSize();
  }

  adjustSize() {
    if (!this.contentWindow) return;

    try {
      const body = this.contentWindow.document.body;
      const html = this.contentWindow.document.documentElement;
      const elements = body.getElementsByTagName("*");

      let maxHeight = html.offsetHeight;
      let padding = 30

      // Check each element's bottom edge position
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const bottomPos = rect.top + rect.height;
        // If maxHeight is bigger, that includes the body padding, if bottomPos
        // is higher, that is the exact bottom of the element, so we add some padding
        maxHeight = ( maxHeight > bottomPos ? maxHeight : bottomPos + padding )
      }

      // Update iframe height
      this.iframe.style.height = `${maxHeight}px`;
    } catch (error) {
      console.error("Failed to adjust iframe size:", error);
    }
  }

  cleanup() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    this.iframe.removeEventListener("load", this.onLoad);
  }
}
