class NameScreen extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.className = 'container'
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.html
    this.insertAdjacentHTML('beforeend', `
      <a 
        class="button cv-button" 
        download 
        href="./files/Max Brokhman Front-end developer CV.docx"
      >
        Get CV
      </a>
    `)
  }

  get html() {
    return `
      <style>
        :host {
          display: block;
        }
        h1 {
          z-index: 1;
          margin: 0;
          margin-bottom: 0.3em;
          font-size: 6rem;
          line-height: 1.2;
          font-weight: 500;
        }
        p {
          z-index: 1;
          margin: 0;
          padding: 1em 0;
          padding-bottom: 0.5em;
          font-size: 2rem;
          line-height: 1.2;
          color: #f9dd79;
        }
        ::slotted(.button) {
          align-self: start;
          cursor: pointer;
          width: 125px;
          text-align: center;
        }
        @media (max-width: 770px) {
          h1 {
            font-size: 4rem;
          }
          p {
            padding: 0;
          }
          ::slotted(.button) {
            width: 100px;
          }
        }
        @media (max-width: 450px) {
          h1 {
            font-size: 2.2rem;
          }
          p {
            font-size: 1.5rem;
          }
          h1, p {
            line-height: 3;
          }
        }
      </style>
      <p>Front-end developer</p>
      
      <h1>Max Brokhman</h1>
      <slot></slot>
    `
  }
}

customElements.define('name-screen', NameScreen)
