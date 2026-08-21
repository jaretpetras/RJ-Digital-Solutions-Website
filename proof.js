const projectLinks = {
  rj: 'https://github.com/jaretpetras/RJ-Digital-Solutions-Website',
  game: 'https://github.com/J-RLLC/GameOnDemand',
  neuro: 'https://github.com/J-RLLC/GameOnDemand',
  systems: 'index.html#lead-audit',
  consult: 'index.html#lead-audit',
}

const journeyStages = [
  {
    id: 'attention',
    label: 'Get Attention',
    summary: 'Create useful demand and point it somewhere intentional.',
    visual: 'eye',
    image: 'assets/flagship-rj-digital-systems.png',
    tools: [
      {
        name: 'Short Form Content System',
        subtitle: 'A repeatable system for turning ideas into publishable content.',
        project: 'Content workflow system',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.consult,
      },
      {
        name: 'Automated Outreach',
        subtitle: 'Structured outreach that starts conversations without manual chaos.',
        project: 'Lead workflow system',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.consult,
      },
      {
        name: 'Lead Magnets',
        subtitle: 'Simple offers that turn attention into contact information.',
        project: 'Lead capture funnel',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.rj,
      },
      {
        name: 'QR Campaigns',
        subtitle: 'Offline attention routed into a measurable digital flow.',
        project: 'Campaign-to-form flow',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.consult,
      },
    ],
  },
  {
    id: 'trust',
    label: 'Build Trust',
    summary: 'Make the business feel credible before the prospect reaches out.',
    visual: 'handshake',
    image: 'assets/flagship-rj-digital-systems.png',
    tools: [
      {
        name: 'Conversion Website / Landing Page',
        subtitle: 'A focused web experience built to explain and convert.',
        project: 'RJ Digital Solutions Website',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.rj,
      },
      {
        name: 'Proof-of-Work Portfolios',
        subtitle: 'A clean way to show capability before a sales call.',
        project: 'Interactive proof-of-work page',
        image: 'assets/flagship-rj-digital-systems.png',
        href: 'what-we-build.html',
      },
    ],
  },
  {
    id: 'capture',
    label: 'Capture Leads',
    summary: 'Turn interest into organized contact information and context.',
    visual: 'download',
    image: 'assets/flagship-rj-digital-systems.png',
    tools: [
      {
        name: 'Lead Capture System',
        subtitle: 'Forms, funnels, and routing that keep leads from getting lost.',
        project: 'RJ consultation intake flow',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.rj,
      },
      {
        name: 'CRM Setup',
        subtitle: 'A central place to track leads, status, and next steps.',
        project: 'Pipeline and booking infrastructure',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.game,
      },
      {
        name: 'AI Chatbot',
        subtitle: 'A site assistant that answers questions and captures qualified leads.',
        project: 'Lead qualification assistant',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.consult,
      },
    ],
  },
  {
    id: 'convert',
    label: 'Convert',
    summary: 'Move interested prospects toward booking, buying, or starting.',
    visual: 'arrow',
    image: 'assets/flagship-game-on-demand.png',
    tools: [
      {
        name: 'Automated Follow-Up System',
        subtitle: 'Timely follow-up that keeps interested prospects warm.',
        project: 'Follow-up automation structure',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.consult,
      },
      {
        name: 'Booking System',
        subtitle: 'A smoother path from interest to scheduled appointment.',
        project: 'Game On Demand booking flow',
        image: 'assets/flagship-game-on-demand.png',
        href: projectLinks.game,
      },
      {
        name: 'Workflow Automations',
        subtitle: 'Automated handoffs, reminders, tasks, and status updates.',
        project: 'Operations automation system',
        image: 'assets/flagship-rj-digital-systems.png',
        href: projectLinks.consult,
      },
    ],
  },
  {
    id: 'deliver',
    label: 'Deliver',
    summary: 'Build the software layer behind the customer experience.',
    visual: 'devices',
    image: 'assets/flagship-neuro-football.png',
    featured: true,
    tools: [
      {
        name: 'Custom Web Apps',
        subtitle: 'Software for workflows, portals, dashboards, and operations.',
        project: 'Neuro Football / Game On Demand',
        image: 'assets/flagship-neuro-football.png',
        href: projectLinks.neuro,
      },
      {
        name: 'Custom Mobile Apps',
        subtitle: 'Mobile experiences for customers, teams, or delivery.',
        project: 'Mobile app delivery systems',
        image: 'assets/flagship-neuro-football.png',
        href: projectLinks.consult,
      },
      {
        name: 'Online Schools',
        subtitle: 'Course and membership platforms for digital education.',
        project: 'Course and membership platforms',
        image: 'assets/flagship-neuro-football.png',
        href: projectLinks.neuro,
      },
    ],
  },
]

const flow = document.querySelector('[data-journey-flow]')
const detail = document.querySelector('[data-stage-detail]')
let activeStageId = null

const stageIcons = {
  eye: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Visibility">
      <path d="M5.5 24s6.8-11 18.5-11 18.5 11 18.5 11-6.8 11-18.5 11S5.5 24 5.5 24Z"></path>
      <circle cx="24" cy="24" r="5.5"></circle>
    </svg>
  `,
  handshake: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Trust">
      <path d="M18.5 27.5 23 32c1.4 1.4 3.6 1.4 5 0l8.2-8.2"></path>
      <path d="m20 17 3.1-3.1c1.4-1.4 3.6-1.4 5 0l11 11c1.1 1.1 1.1 2.9 0 4l-6.9 6.9c-1.1 1.1-2.9 1.1-4 0L16 23.6"></path>
      <path d="m9 24 9-9 6 6"></path>
      <path d="m5 28 10 10"></path>
      <path d="m43 20-7 7"></path>
    </svg>
  `,
  download: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Capture leads">
      <path d="M24 7v22"></path>
      <path d="m15 20 9 9 9-9"></path>
      <path d="M10 32v5c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4v-5"></path>
    </svg>
  `,
  arrow: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Convert">
      <circle cx="24" cy="24" r="18"></circle>
      <path d="M17 24h14"></path>
      <path d="m26 17 7 7-7 7"></path>
    </svg>
  `,
  devices: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Deliver">
      <rect x="6" y="10" width="25" height="19" rx="3"></rect>
      <rect x="29" y="18" width="13" height="22" rx="3"></rect>
      <path d="M14 37h14"></path>
      <path d="M21 29v8"></path>
      <path d="M34.5 35h2"></path>
    </svg>
  `,
}

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
    <section class="minimal-stage ${stage.featured ? 'featured' : ''}" data-stage-id="${stage.id}" tabindex="0">
      <div class="minimal-stage-marker">
        <span class="stage-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="stage-orbit ${stage.visual}" aria-hidden="true">
          ${stageIcons[stage.visual]}
        </span>
      </div>
      <div class="minimal-stage-content">
        <div class="minimal-stage-heading">
          <h3>${stage.label}</h3>
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
  const stages = [...document.querySelectorAll('[data-stage-id]')]

  function setActiveStage(stageId) {
    activeStageId = stageId
    stages.forEach((stageNode) => stageNode.classList.toggle('active', stageNode.dataset.stageId === stageId))
    const stage = journeyStages.find((item) => item.id === stageId)
    if (stage) renderPreview({ ...stage.tools[0], stage: stage.label })
  }

  stages.forEach((stageNode) => {
    stageNode.addEventListener('mouseenter', () => setActiveStage(stageNode.dataset.stageId))
    stageNode.addEventListener('focus', () => setActiveStage(stageNode.dataset.stageId))
  })

  document.querySelectorAll('[data-tool-name]').forEach((link) => {
    const tool = tools.find((item) => item.name === link.dataset.toolName)
    if (!tool) return
    const stageNode = link.closest('[data-stage-id]')
    link.addEventListener('mouseenter', () => renderPreview(tool))
    link.addEventListener('focus', () => renderPreview(tool))
    link.addEventListener('click', () => {
      if (stageNode) setActiveStage(stageNode.dataset.stageId)
      localStorage.setItem('rjSelectedSolution', tool.name)
    })
  })
}

document.addEventListener('click', (event) => {
  const project = event.target.closest('[data-project-interest]')
  const solution = event.target.closest('[data-solution-interest]')
  if (project) localStorage.setItem('rjSelectedSolution', project.dataset.projectInterest)
  if (solution) localStorage.setItem('rjSelectedSolution', solution.dataset.solutionInterest)
})

if (flow && detail) renderFlow()
