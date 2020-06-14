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
      <a href="mailto:maxbrokhman@gmail.com" class="contact-link email-link">maxbrokhman@gmail.com</a>
      <a href="tel:0583975010" class="contact-link phone-link">058 397 50 10</a>
      <a 
        href="./files/Max Brokhman Front-end developer CV.docx" 
        class="contact-link cv-link"
        download
      >
        download CV
      </a>
    `
  }
}

customElements.define('contacts-block', ContentsBlock)
