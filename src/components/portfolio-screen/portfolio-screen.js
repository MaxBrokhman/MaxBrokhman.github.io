import { projects } from '../../config.js'

class PortfolioScreen extends HTMLElement {
  static renderProject({
    image,
    name,
    description,
    repo,
    stack,
  }, idx) {
    const side = idx % 2 === 0 ? 'left' : 'right'
    return `
      <li class="project project__${side}">
        <figure class="project-image project-image__${side}-sided">
          <img 
            src="./files/${image}" 
            width="928" 
            height="536" 
            alt="web site picture"
          >
        </figure>
        <h3>${name}</h3>
        <p class="project-description">${description}</p>
        <p class="project-description">Technology stack: ${stack}</p>
        <a class="button" href="${repo}">See on github</a>
      </li>
    `
  }

  constructor() {
    super()
    this.className = 'container active'
    this.list = null
  }

  connectedCallback() {
    this.innerHTML = this.html
    this.list = this.querySelector('ul')
    let projectsCounter = 0
    const firstItem = PortfolioScreen.renderProject(projects[projectsCounter], projectsCounter++)
    this.list.innerHTML = firstItem
    const currentItem = this.list.querySelector('li')
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        this.observer.unobserve(entries[0].target)
        if (projectsCounter >= projects.length) {
          this.observer = null
          return
        }
        const newItem = PortfolioScreen.renderProject(projects[projectsCounter], projectsCounter++)
        this.list.insertAdjacentHTML('beforeend', newItem)
        this.observer.observe(this.list.querySelector('li:last-child'))
      }
    })
    
    this.observer.observe(currentItem)
  }

  get html() {
    return `
      <h2 class="subheading">My works</h2>
      <ul class="projects"></ul>
    `
  }
}

customElements.define('portfolio-screen', PortfolioScreen)
