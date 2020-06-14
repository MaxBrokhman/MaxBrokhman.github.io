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
    const item = document.createElement('li')
    item.className = `project project__${side}`
    item.innerHTML = `
      <figure 
        class="project-image project-image__${side}-sided" 
        width="928" 
        height="536"
      >
        <img 
          src="./img/${image}" 
          width="928" 
          height="536" 
          alt="web site picture"
        >
      </figure>
      <h3>${name}</h3>
      <p class="project-description">${description}</p>
      <p class="project-description">Technology stack: ${stack}</p>
      <a class="button" href="${repo}">See on github</a>
    `
    return item
  }

  constructor() {
    super()
    this.className = 'container'
    this.list = null
    this.currentItem = PortfolioScreen.renderProject(projects[0], 0)
    this.nextItem = PortfolioScreen.renderProject(projects[1], 1)
  }

  connectedCallback() {
    this.innerHTML = this.html
    this.list = this.querySelector('ul')
    let projectsCounter = 2
    this.list.appendChild(this.currentItem)
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        this.observer.unobserve(this.currentItem)
        if (projectsCounter > projects.length) {
          this.observer = null
          return
        }
        this.currentItem = this.nextItem
        if (projectsCounter !== projects.length) {
          this.nextItem = PortfolioScreen.renderProject(projects[projectsCounter], projectsCounter)
        }
        projectsCounter++
        this.list.appendChild(this.currentItem)
        
        this.observer.observe(this.currentItem)
      }
    })
    
    this.observer.observe(this.currentItem)
  }

  get html() {
    return `
      <h2 class="subheading">My works</h2>
      <ul class="projects"></ul>
    `
  }
}

customElements.define('portfolio-screen', PortfolioScreen)
