import { skills } from '../../config.js'

class IntroScreen extends HTMLElement {
  constructor() {
    super()
    this.className = 'container active'
  }

  connectedCallback() {
    this.innerHTML = this.html
  }

  _renderSkill(skills) {
    return skills.map(([skill, value]) => `
      <dt class="skill-${skill.toLowerCase()}">${skill}</dt>
      <dd class="level"><div style="width: ${value}%;">${value}%</div></dd>
    `).join('')
  }

  get html() {
    return `
      <h2 class="subheading">About me</h2>
        
      <p>Self-taught Front-end developer with strong knowledge of JavaScript and React. In my free time I always work on side projects in order to learn new technologies and become better in those that I know.</p>

      <figure class="user-image">
        <img width="640px;" height="640px;" src="./files/qTqNlJYHtGk-min.jpg" alt="developer photo">
      </figure>
      <div class="skills">
        <h3>My skills</h3>
        <dl class="skills-list">
          ${this._renderSkill(skills)}
        </dl>
      </div>
    `
  }
}

customElements.define('intro-screen', IntroScreen)
