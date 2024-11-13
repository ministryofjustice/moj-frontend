export default class CollapsibleNav extends HTMLElement {
  constructor() {
    super();

    this.collapsibleItems = this.querySelectorAll("li:has(ul)");

    this.collapsibleItems.forEach(($item, index) => {
      const $link = $item.querySelector("a");
      const $list = $item.querySelector("ul");
      const $button = document.createElement("button");

      if (!$list.id) {
        $list.id = `moj-collapsible-nav-${index}`;
      }

      $button.setAttribute("aria-controls", $list.id);
      $button.setAttribute("aria-expanded", true);
      $button.classList.add("app-vertical-nav__toggle");

      $button.insertAdjacentHTML("afterbegin", $link.innerHTML);
      $item.replaceChild($button, $link);
      if (!this.isOpen($item)) {
        this.close($item)
      }
    });

    this.addEventListener("click", this);
  }

  handleEvent(event) {
    this[`on${event.type}`](event);
  }

  onclick(event) {
    const $button = event.target.closest("button");
    if (!$button) return;
    const $item = $button.parentNode;
    if (!$item) return;
console.log($item)
console.log(this.isOpen($item))
    if (this.isOpen($item)) {
console.log($item)
      this.close($item);
    } else {
      this.closeOpenItems();
      this.open($item);
    }
  }

  isOpen($item) {
    return $item.classList.contains(this.openClass);
  }

  open($item) {
    const $button = $item.querySelector("button");
    const $list = $item.querySelector("ul");

    $list.hidden = false;
    $item.classList.add(this.openClass);
    $button.setAttribute("aria-expanded", true);
  }

  close($item) {
console.log($item)
    const $button = $item.querySelector("button");
    const $list = $item.querySelector("ul");
console.log($item)
console.log($button)
console.log($list)

    $list.hidden = true;
    $item.classList.remove(this.openClass);
    $button.setAttribute("aria-expanded", false);
  }

  closeOpenItems() {
console.log(this.openItems)
    this.openItems.forEach((item) => this.close(item));
  }

  get openClass() {
    return this.getAttribute("open-class") || "is-open";
  }

  get openItems() {
    return this.querySelectorAll(`.${this.openClass}`);
  }
}
