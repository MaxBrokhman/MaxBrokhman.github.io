import './components/contacts-block/contacts-block.js'
import './components/name-screen/name-screen.js'
import './components/intro-screen/intro-screen.js'
import './components/portfolio-screen/portfolio-screen.js'

const intro = document.querySelector('.intro')
const introObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return;
  entries[0].target.innerHTML = '<intro-screen></intro-screen>'
  introObserver.unobserve(intro)
}, {
  threshold: 0.2,
})
introObserver.observe(intro)

const portfolio = document.querySelector('.portfolio')
const portfolioObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return;
  entries[0].target.innerHTML = '<portfolio-screen></portfolio-screen>'
  portfolioObserver.unobserve(portfolio)
}, {
  threshold: 0.2,
})
portfolioObserver.observe(portfolio)
