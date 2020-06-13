class ContentsBlock extends HTMLElement {
  constructor() {
    super()
    this.className = 'container'
  }

  connectedCallback() {
    this.innerHTML = this.html
  }

  get html() {
    return `
      <a href="mailto:maxbrokhman@gmail.com" class="header-email">maxbrokhman@gmail.com</a>
      <a href="tel:0583975010" class="header-phone">058 397 50 10</a>
    `
  }
}

customElements.define('contacts-block', ContentsBlock)
