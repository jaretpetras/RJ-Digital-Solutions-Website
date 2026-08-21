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
    image: 'assets/lead-system-hero.png',
    tools: [
      {
        name: 'Short Form Content System',
        subtitle: 'A repeatable system for turning ideas into publishable content.',
        project: 'Content workflow system',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.consult,
      },
      {
        name: 'Automated Outreach',
        subtitle: 'Structured outreach that starts conversations without manual chaos.',
        project: 'Lead workflow system',
        image: 'assets/hero-business-system.png',
        href: projectLinks.consult,
      },
      {
        name: 'Lead Magnets',
        subtitle: 'Simple offers that turn attention into contact information.',
        project: 'Lead capture funnel',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.rj,
      },
      {
        name: 'QR Campaigns',
        subtitle: 'Offline attention routed into a measurable digital flow.',
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
    image: 'assets/hero-business-system.png',
    tools: [
      {
        name: 'Conversion Website / Landing Page',
        subtitle: 'A focused web experience built to explain and convert.',
        project: 'RJ Digital Solutions Website',
        image: 'assets/hero-business-system.png',
        href: projectLinks.rj,
      },
      {
        name: 'Proof-of-Work Portfolios',
        subtitle: 'A clean way to show capability before a sales call.',
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
    image: 'assets/lead-system-hero.png',
    tools: [
      {
        name: 'Lead Capture System',
        subtitle: 'Forms, funnels, and routing that keep leads from getting lost.',
        project: 'RJ consultation intake flow',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.rj,
      },
      {
        name: 'CRM Setup',
        subtitle: 'A central place to track leads, status, and next steps.',
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
    image: 'assets/hero-business-system.png',
    tools: [
      {
        name: 'Automated Follow-Up System',
        subtitle: 'Timely follow-up that keeps interested prospects warm.',
        project: 'Follow-up automation structure',
        image: 'assets/hero-business-system.png',
        href: projectLinks.consult,
      },
      {
        name: 'Booking System',
        subtitle: 'A smoother path from interest to scheduled appointment.',
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
    image: 'assets/rj-digital-solutions-logo-transparent.png',
    featured: true,
    tools: [
      {
        name: 'Custom Web Apps',
        subtitle: 'Software for workflows, portals, dashboards, and operations.',
        project: 'Neuro Football / Game On Demand',
        image: 'assets/hero-business-system.png',
        href: projectLinks.neuro,
      },
      {
        name: 'Custom Mobile Apps',
        subtitle: 'Mobile experiences for customers, teams, or delivery.',
        project: 'Mobile app delivery systems',
        image: 'assets/rj-digital-solutions-logo-transparent.png',
        href: projectLinks.consult,
      },
      {
        name: 'Online Schools',
        subtitle: 'Course and membership platforms for digital education.',
        project: 'Course and membership platforms',
        image: 'assets/lead-system-hero.png',
        href: projectLinks.neuro,
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
        <em>Check it out -></em>
      </span>
    </a>
  `
}

function renderFlow() {
  flow.innerHTML = journeyStages.map((stage, index) => `
    <section class="minimal-stage ${stage.featured ? 'featured' : ''}" data-stage-id="${stage.id}">
      <div class="minimal-stage-marker">
        <span class="stage-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="stage-orbit ${stage.visual}" aria-hidden="true">
          <img src="${stage.image}" alt="">
        </span>
      </div>
      <div class="minimal-stage-content">
        <div class="minimal-stage-heading">
          <h3>${stage.label}</h3>
          <p>${stage.summary}</p>
        </div>
        <div class="minimal-tool-list">
          ${stage.tools.map((tool) => `
            <a href="${tool.href}" ${tool.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''} data-tool-name="${tool.name}">
              <strong>${tool.name}</strong>
              <span>${tool.subtitle}</span>
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
