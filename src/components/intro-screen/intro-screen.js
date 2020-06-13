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
    this.className = 'container active'
    this.innerHTML = this.html
  }

  connectedCallback() {
    let skillsCounter = 0
    this.innerHTML = this.html
    const list = this.querySelector('.skills-list')
    list.innerHTML = IntroScreen.renderSkill(skills[skillsCounter].skill)
    let currentItem = list.querySelector('.level')

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
        list.insertAdjacentHTML('beforeend', newItemHtml)
        currentItem = list.querySelector('.level:last-child')

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

      <figure class="user-image" width="640px;" height="640px;">
        <img width="640px;" height="640px;" src="./files/qTqNlJYHtGk-min.jpg" alt="developer photo">
      </figure>
      <div class="skills">
        <h3>My skills</h3>
        <dl class="skills-list">
          
        </dl>
      </div>
    `
  }
}

customElements.define('intro-screen', IntroScreen)
