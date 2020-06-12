class NameScreen extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.className = 'container active'
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.html
  }

  get html() {
    return `
      <style>
        :host {
          display: block;
        }
        h1 {
          z-index: 1;
          order: 2;
          margin: 0 0 0 -10px;
          width: 815px;
          font-size: 96px;
          line-height: 112px;
          font-weight: 500;
        }
        p {
          z-index: 1;
          order: 1;
          margin: 0;
          padding: 32px 0;
          padding-bottom: 16px;
          font-size: 32px;
          line-height: 48px;
          color: #f9dd79;
        }
      </style>
      <h1>Max Brokhman</h1>
      <p>Front-end developer</p>
    `
  }
}

customElements.define('name-screen', NameScreen)
