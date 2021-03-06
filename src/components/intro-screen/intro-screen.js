import { skills } from '../../config.js'

class IntroScreen extends HTMLElement {
  static renderSkill(skill) {
    return `
      <dt class="skill-${skill.toLowerCase()}">${skill}</dt>
      <dd class="level"><div style="width: 0;">0%</div></dd>
    `
  }

  static animateValue({ 
    from, 
    to, 
    time, 
    element, 
  }) {
    return new Promise((resolve) => {
      const step = (to - from) / time
      let currentValue = from
      const animate = () => {
        if (currentValue >= to) {
          return resolve(true)
        }
        currentValue += step
        element.style.width = `${currentValue}%`
        element.textContent = `${currentValue}%`
        requestAnimationFrame(animate)
      }
      animate()
    })
  } 

  constructor() {
    super()
    this.className = 'container'
    this.innerHTML = this.html
    
    this.list = this.querySelector('.skills-list')
  }

  connectedCallback() {
    let skillsCounter = 0
    this.list.innerHTML = IntroScreen.renderSkill(skills[skillsCounter].skill)
    let currentItem = this.list.querySelector('.level')

    this.observer = new IntersectionObserver(async (entries) => {
      if (entries[0].intersectionRatio > 0) {
        this.observer.unobserve(currentItem)
        await IntroScreen.animateValue({
          from: 0,
          to: skills[skillsCounter].value,
          time: 40,
          element: currentItem.querySelector('div')
        })
        skillsCounter++
        if (skillsCounter >= skills.length) {
          this.observer = null
          return
        }
        const newItemHtml = IntroScreen.renderSkill(skills[skillsCounter].skill)
        this.list.insertAdjacentHTML('beforeend', newItemHtml)
        currentItem = this.list.querySelector('.level:last-child')

        this.observer.observe(currentItem)
      }
    }, {
      threshold: 1,
    })

    this.observer.observe(currentItem)
  }

  get html() {
    return `
      <h2 class="subheading">About me</h2>
        
      <p>Self-taught Front-end developer with strong knowledge of JavaScript and React. In my free time I always work on side projects in order to learn new technologies and become better in those that I know.</p>
      <div class="skills-wrapper">
        <figure class="user-image" width="640px;" height="640px;">
          <img 
            src="./img/qTqNlJYHtGk.jpg" 
            srcset="
            ./img/qTqNlJYHtGk-min.jpg 450w,
            ./img/qTqNlJYHtGk.jpg 700w
            "
            alt="developer photo"
          >
        </figure>
        <div class="skills">
          <h3>My skills</h3>
          <dl class="skills-list">
            
          </dl>
        </div>
      </div>
    `
  }
}

customElements.define('intro-screen', IntroScreen)
