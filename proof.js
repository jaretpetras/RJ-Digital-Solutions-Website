const projectLinks = {
  rj: 'https://github.com/jaretpetras/RJ-Digital-Solutions-Website',
  game: 'https://github.com/J-RLLC/GameOnDemand',
  neuro: 'https://github.com/J-RLLC/GameOnDemand',
  consult: 'index.html#lead-audit',
}

const journeyStages = [
  {
    id: 'attention',
    label: 'Get Attention',
    summary: 'Create useful demand and point it somewhere intentional.',
    visual: 'signal',
    tools: [
      {
        name: 'Short Form Content System',
        project: 'Content workflow system',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.consult,
      },
      {
        name: 'Automated Outreach',
        project: 'Lead workflow system',
        image: 'assets/hero-business-system.png',
        href: projectLinks.consult,
      },
      {
        name: 'Lead Magnets',
        project: 'Lead capture funnel',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.rj,
      },
      {
        name: 'QR Campaigns',
        project: 'Campaign-to-form flow',
        image: 'assets/rj-digital-solutions-logo-transparent.png',
        href: projectLinks.consult,
      },
    ],
  },
  {
    id: 'trust',
    label: 'Build Trust',
    summary: 'Make the business feel credible before the prospect reaches out.',
    visual: 'trust',
    tools: [
      {
        name: 'Conversion Website / Landing Page',
        project: 'RJ Digital Solutions Website',
        image: 'assets/hero-business-system.png',
        href: projectLinks.rj,
      },
      {
        name: 'Proof-of-Work Portfolios',
        project: 'Interactive proof-of-work page',
        image: 'assets/lead-system-hero.png',
        href: 'what-we-build.html',
      },
    ],
  },
  {
    id: 'capture',
    label: 'Capture Leads',
    summary: 'Turn interest into organized contact information and context.',
    visual: 'capture',
    tools: [
      {
        name: 'Lead Capture System',
        project: 'RJ consultation intake flow',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.rj,
      },
      {
        name: 'CRM Setup',
        project: 'Pipeline and booking infrastructure',
        image: 'assets/hero-business-system.png',
        href: projectLinks.game,
      },
    ],
  },
  {
    id: 'convert',
    label: 'Convert',
    summary: 'Move interested prospects toward booking, buying, or starting.',
    visual: 'convert',
    tools: [
      {
        name: 'Automated Follow-Up System',
        project: 'Follow-up automation structure',
        image: 'assets/hero-business-system.png',
        href: projectLinks.consult,
      },
      {
        name: 'Booking System',
        project: 'Game On Demand booking flow',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.game,
      },
    ],
  },
  {
    id: 'deliver',
    label: 'Deliver',
    summary: 'Build the software layer behind the customer experience.',
    visual: 'deliver',
    featured: true,
    tools: [
      {
        name: 'Custom Web Apps',
        project: 'Neuro Football / Game On Demand',
        image: 'assets/hero-business-system.png',
        href: projectLinks.neuro,
      },
      {
        name: 'Custom Mobile Apps',
        project: 'Mobile app delivery systems',
        image: 'assets/rj-digital-solutions-logo-transparent.png',
        href: projectLinks.consult,
      },
    ],
  },
]

const flow = document.querySelector('[data-journey-flow]')
const detail = document.querySelector('[data-stage-detail]')

function allTools() {
  return journeyStages.flatMap((stage) => stage.tools.map((tool) => ({ ...tool, stage: stage.label })))
}

function renderPreview(tool) {
  detail.innerHTML = `
    <a class="minimal-project-preview" href="${tool.href}" ${tool.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''} data-project-interest="${tool.name}">
      <img src="${tool.image}" alt="">
      <span>
        <small>${tool.stage}</small>
        <strong>${tool.project}</strong>
        <em>View project -></em>
      </span>
    </a>
  `
}

function renderFlow() {
  flow.innerHTML = journeyStages.map((stage, index) => `
    <section class="minimal-stage ${stage.featured ? 'featured' : ''}" data-stage-id="${stage.id}">
      <div class="minimal-stage-marker">
        <span class="stage-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="stage-orbit ${stage.visual}" aria-hidden="true"></span>
      </div>
      <div class="minimal-stage-content">
        <div class="minimal-stage-heading">
          <h3>${stage.label}</h3>
          <p>${stage.summary}</p>
        </div>
        <div class="minimal-tool-list">
          ${stage.tools.map((tool) => `
            <a href="${tool.href}" ${tool.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''} data-tool-name="${tool.name}">
              ${tool.name}
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `).join('')

  const tools = allTools()
  const toolLinks = [...document.querySelectorAll('[data-tool-name]')]

  toolLinks.forEach((link) => {
    const tool = tools.find((item) => item.name === link.dataset.toolName)
    if (!tool) return
    link.addEventListener('mouseenter', () => renderPreview(tool))
    link.addEventListener('focus', () => renderPreview(tool))
    link.addEventListener('click', () => localStorage.setItem('rjSelectedSolution', tool.name))
  })

  renderPreview(tools[0])
}

document.addEventListener('click', (event) => {
  const project = event.target.closest('[data-project-interest]')
  if (!project) return
  localStorage.setItem('rjSelectedSolution', project.dataset.projectInterest)
})

if (flow && detail) renderFlow()
