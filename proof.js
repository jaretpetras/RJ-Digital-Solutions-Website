const journeyStages = [
  {
    id: 'attention',
    label: 'Get Attention',
    summary: 'Create useful demand and send it somewhere intentional.',
    services: ['Short Form Content System', 'Automated Outreach', 'Lead Magnets', 'QR Campaigns'],
    problems: ['People do not know the business exists', 'Content is inconsistent', 'Promotions do not connect to a next step'],
    outcome: 'More qualified people discover the business and enter a clear path instead of scattering across disconnected channels.',
    visual: 'signal',
  },
  {
    id: 'trust',
    label: 'Build Trust',
    summary: 'Make the business look credible before a prospect ever reaches out.',
    services: ['Conversion Website / Landing Page', 'Proof-of-Work Portfolios'],
    problems: ['The offer is hard to understand', 'The website does not make the business feel current', 'There is no simple proof that the business can deliver'],
    outcome: 'Visitors quickly understand what the business does, why it matters, and why they should take the next step.',
    visual: 'trust',
  },
  {
    id: 'capture',
    label: 'Capture Leads',
    summary: 'Turn interest into organized contact information and useful context.',
    services: ['Lead Capture System', 'CRM Setup'],
    problems: ['Leads disappear in DMs, calls, and inboxes', 'There is no central place to track prospects', 'Follow-up starts without enough information'],
    outcome: 'Every real opportunity enters one system with the right details attached.',
    visual: 'capture',
  },
  {
    id: 'convert',
    label: 'Convert',
    summary: 'Move interested prospects toward booking, buying, or starting.',
    services: ['Automated Follow-Up System', 'Booking System'],
    problems: ['Leads go cold', 'Response times are slow', 'Scheduling creates friction'],
    outcome: 'Prospects get timely follow-up, fewer steps, and a cleaner path to becoming customers.',
    visual: 'convert',
  },
  {
    id: 'deliver',
    label: 'Deliver',
    summary: 'Build the software layer behind the actual customer experience.',
    services: ['Custom Web Apps', 'Custom Mobile Apps'],
    problems: ['The business has outgrown generic tools', 'Customers need a better digital experience', 'Internal work depends on too many manual steps'],
    outcome: "Sometimes the solution isn't another marketing campaign. It's better software.",
    visual: 'deliver',
    featured: true,
  },
]

const flow = document.querySelector('[data-journey-flow]')
const detail = document.querySelector('[data-stage-detail]')
let activeStageId = journeyStages[0].id

function renderDetail(stage) {
  detail.innerHTML = `
    <div class="stage-detail-copy">
      <span class="stage-number">${String(journeyStages.indexOf(stage) + 1).padStart(2, '0')}</span>
      <h3>${stage.label}</h3>
      <p>${stage.summary}</p>
      <strong>${stage.outcome}</strong>
    </div>
    <div class="stage-service-panel">
      <div>
        <h4>What RJ Digital builds here</h4>
        <div class="minimal-service-list">
          ${stage.services.map((service) => `<a href="index.html#lead-audit" data-solution-interest="${service}">${service}<span>Start here</span></a>`).join('')}
        </div>
      </div>
      <div>
        <h4>What this fixes</h4>
        <ul class="minimal-problem-list">${stage.problems.map((problem) => `<li>${problem}</li>`).join('')}</ul>
      </div>
    </div>
  `
}

function setActiveStage(stageId, { scroll = false } = {}) {
  activeStageId = stageId
  const stage = journeyStages.find((item) => item.id === stageId) || journeyStages[0]
  document.querySelectorAll('[data-stage-id]').forEach((button) => {
    const active = button.dataset.stageId === stageId
    button.classList.toggle('active', active)
    button.setAttribute('aria-pressed', String(active))
  })
  renderDetail(stage)
  if (scroll) detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function renderFlow() {
  flow.innerHTML = journeyStages.map((stage, index) => `
    <button class="journey-stage ${stage.featured ? 'featured' : ''}" type="button" data-stage-id="${stage.id}" aria-pressed="false">
      <span class="stage-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="stage-orbit ${stage.visual}" aria-hidden="true"></span>
      <strong>${stage.label}</strong>
      <small>${stage.services.join(' / ')}</small>
      <span class="stage-tooltip" role="presentation">
        <b>What we can build</b>
        ${stage.services.map((item) => `<span>${item}</span>`).join('')}
        <em>Explore -></em>
      </span>
    </button>
  `).join('')

  document.querySelectorAll('[data-stage-id]').forEach((button) => {
    button.addEventListener('click', () => setActiveStage(button.dataset.stageId, { scroll: true }))
    button.addEventListener('mouseenter', () => setActiveStage(button.dataset.stageId))
    button.addEventListener('focus', () => setActiveStage(button.dataset.stageId))
  })
  setActiveStage(activeStageId)
}

document.addEventListener('click', (event) => {
  const interest = event.target.closest('[data-solution-interest]')
  if (!interest) return
  localStorage.setItem('rjSelectedSolution', interest.dataset.solutionInterest)
})

if (flow && detail) renderFlow()
