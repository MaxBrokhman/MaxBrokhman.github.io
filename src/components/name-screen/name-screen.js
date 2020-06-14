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
          margin-bottom: 30px;
          width: 815px;
          font-size: 96px;
          line-height: 112px;
          font-weight: 500;
        }
        p {
          z-index: 1;
          margin: 0;
          padding: 32px 0;
          padding-bottom: 16px;
          font-size: 32px;
          line-height: 48px;
          color: #f9dd79;
        }
        ::slotted(.button) {
          align-self: start;
          cursor: pointer;
          width: 125px;
          text-align: center;
        }
        @media (max-width: 999px) {
          h1 {
            width: 400px;
            font-size: 50px;
          }
        }
        @media (max-width: 770px) {
          p {
            font-size: 25px;
            padding: 0;
          }
          h1 {
            margin-bottom: 15px;
          }
        }
        @media (max-width: 450px) {
          h1 {
            width: 300px;
            font-size: 30px;
            margin-bottom: 30px;
            line-height: 65px;
          }
          p {
            font-size: 20px;
            padding: 0;
            padding-top: 15px;
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
