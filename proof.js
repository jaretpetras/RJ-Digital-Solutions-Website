const journeyStages = [
  {
    id: 'attention',
    label: 'Get Attention',
    summary: 'Help the business get discovered and make a strong first impression.',
    preview: ['Premium websites', 'Landing pages', 'Content workflows', 'SEO-ready infrastructure'],
    problems: ['Outdated website', 'No clear online presence', 'Weak brand presentation', 'Traffic going nowhere', 'Inconsistent content production'],
    solutions: ['Premium websites', 'Landing pages', 'Sales pages', 'Social media content systems', 'Short-form content workflows', 'Automated content production', 'SEO-ready web infrastructure', 'QR-based campaigns', 'Digital promotional assets'],
    visual: 'signal',
    projects: ['lead-system', 'business-website', 'content-engine'],
  },
  {
    id: 'trust',
    label: 'Build Trust',
    summary: 'Turn attention into credibility with sharper digital proof.',
    preview: ['Brand presentation', 'Proof-of-work pages', 'Interactive demos', 'Review systems'],
    problems: ['Business looks outdated', 'Customers cannot immediately understand the offer', 'No proof of expertise', 'Poor digital credibility', 'Strong service but weak presentation'],
    solutions: ['Modern website design', 'Brand presentation', 'Case-study systems', 'Proof-of-work pages', 'Testimonials and review systems', 'Professional digital experiences', 'Interactive demos', 'Product demonstrations', 'Educational content', 'Authority-building assets'],
    visual: 'trust',
    projects: ['proof-page', 'education-platform', 'business-website'],
  },
  {
    id: 'capture',
    label: 'Capture Leads',
    summary: 'Turn anonymous visitors and social followers into identifiable prospects.',
    preview: ['AI chatbots', 'Lead forms', 'Interactive assessments', 'CRM integration', 'Lead routing'],
    problems: ['Website visitors leave without taking action', 'Leads get lost in DMs', 'No central database', 'Manual data entry', 'No follow-up information collected'],
    solutions: ['Lead-generation forms', 'Lead magnets', 'Interactive assessments', 'Quizzes', 'AI chatbots', 'Contact forms', 'CRM integrations', 'Email capture', 'SMS capture', 'QR-code funnels', 'Automated lead routing', 'Custom lead-generation tools'],
    visual: 'capture',
    projects: ['lead-system', 'crm-dashboard', 'automation-workflow'],
  },
  {
    id: 'convert',
    label: 'Convert',
    summary: 'Turn interested leads into paying customers with less friction.',
    preview: ['Sales funnels', 'Email/SMS follow-up', 'Booking systems', 'Pipeline management'],
    problems: ['Leads go cold', 'Slow response times', 'Too much manual follow-up', 'Complicated booking', 'Friction during payment', 'No organized sales pipeline'],
    solutions: ['Sales funnels', 'Automated email follow-up', 'SMS follow-up', 'AI lead qualification', 'Appointment scheduling', 'Booking systems', 'Payment systems', 'Checkout flows', 'CRM automations', 'Pipeline management', 'Proposal systems', 'Automated reminders'],
    visual: 'convert',
    projects: ['booking-flow', 'crm-dashboard', 'automation-workflow'],
  },
  {
    id: 'deliver',
    label: 'Deliver',
    summary: "Build the software infrastructure businesses use to deliver their product or service.",
    supporting: "Sometimes the solution isn't another marketing campaign. It's better software.",
    preview: ['Web applications', 'Mobile apps', 'Customer portals', 'Internal tools', 'Online schools'],
    problems: ['Service delivery relies on scattered tools', 'Customers lack a clean portal', 'Operations are too manual', 'Teams cannot see the same information', 'The business has outgrown generic software'],
    solutions: ['Custom web applications', 'Mobile applications', 'Customer portals', 'Client dashboards', 'Internal business software', 'Online schools', 'Course platforms', 'Membership platforms', 'Employee portals', 'Booking platforms', 'Marketplace applications', 'Analytics dashboards', 'Custom CRM tools', 'Workflow tools', 'AI-powered internal tools'],
    visual: 'deliver',
    featured: true,
    projects: ['neuro-football', 'game-on-demand', 'education-platform'],
  },
  {
    id: 'retain',
    label: 'Retain & Grow',
    summary: 'Increase customer lifetime value and make the system smarter over time.',
    preview: ['Email campaigns', 'Review automation', 'Referral systems', 'KPI dashboards'],
    problems: ['One-time customers never return', 'No referral process', 'No visibility into business performance', "Customer data isn't being used", 'No automated re-engagement'],
    solutions: ['Email campaigns', 'Customer re-engagement', 'Review automation', 'Referral systems', 'Membership systems', 'Loyalty systems', 'Push notifications', 'Customer dashboards', 'Analytics', 'Reporting', 'KPI dashboards', 'Retention automations', 'Upsell systems', 'Customer segmentation'],
    visual: 'retain',
    projects: ['crm-dashboard', 'automation-workflow', 'customer-portal'],
  },
]

const projectCards = {
  'lead-system': {
    name: 'Lead Generation System',
    description: 'A replaceable proof card for landing pages, capture forms, routing, and follow-up infrastructure.',
    built: 'Landing page, lead capture, routing logic, follow-up structure',
    tags: ['Website', 'Lead Generation', 'Automation'],
  },
  'business-website': {
    name: 'Premium Business Website',
    description: 'A clean conversion-focused web presence that explains the offer and moves visitors toward action.',
    built: 'Website structure, messaging, CTA flow, credibility sections',
    tags: ['Website', 'Brand System', 'Sales Page'],
  },
  'content-engine': {
    name: 'Content Production Workflow',
    description: 'A placeholder for repeatable content systems that help small businesses publish more consistently.',
    built: 'Content workflow, asset structure, publishing process',
    tags: ['Automation', 'Content System', 'Operations'],
  },
  'proof-page': {
    name: 'Interactive Proof-of-Work Page',
    description: 'A proof page structure that lets visitors explore capabilities without reading a static service list.',
    built: 'Interactive journey, solution panels, proof-card system',
    tags: ['Website', 'Interactive Demo', 'Proof of Work'],
  },
  'crm-dashboard': {
    name: 'CRM & Visibility Dashboard',
    description: 'A safe placeholder for pipeline, source tracking, and reporting systems built around lead visibility.',
    built: 'Pipeline view, source tracking, reporting dashboard',
    tags: ['CRM', 'Analytics', 'Dashboard'],
  },
  'automation-workflow': {
    name: 'Automated Workflow System',
    description: 'A reusable structure for lead alerts, reminders, review requests, handoffs, and internal routing.',
    built: 'Automation flows, notifications, reminders, task routing',
    tags: ['Automation', 'Internal Tool', 'CRM'],
  },
  'booking-flow': {
    name: 'Booking & Conversion Flow',
    description: 'A streamlined path for prospects to qualify, schedule, confirm, and move toward payment.',
    built: 'Scheduling flow, reminders, qualification, confirmation logic',
    tags: ['Booking', 'Sales Funnel', 'Automation'],
  },
  'neuro-football': {
    name: 'Neuro Football',
    description: 'A structured digital product ecosystem with education, performance content, and application workflows.',
    built: 'Web app, course structure, legal acceptance flow, user journey',
    tags: ['Web App', 'Online School', 'Digital Product'],
  },
  'game-on-demand': {
    name: 'Game On Demand',
    description: 'A custom application concept for coordinating player demand, scheduling, and service delivery.',
    built: 'Marketplace-style flows, booking logic, operational dashboard',
    tags: ['Web App', 'Marketplace', 'Booking'],
  },
  'education-platform': {
    name: 'Online Education Platform',
    description: 'A replaceable proof card for courses, member experiences, modules, and educational delivery.',
    built: 'Course structure, member flow, progress-oriented experience',
    tags: ['Online School', 'Membership', 'Web App'],
  },
  'customer-portal': {
    name: 'Customer Portal',
    description: 'A private digital space where customers can see status, resources, next steps, and account data.',
    built: 'Portal experience, dashboard views, customer-facing workflows',
    tags: ['Customer Portal', 'Dashboard', 'Web App'],
  },
}

const solutionCategories = [
  'Website',
  'Web App',
  'Mobile App',
  'AI Automation',
  'Lead Generation System',
  'CRM',
  'Online School',
  'Customer Portal',
  'Internal Business Tool',
  'Sales Funnel',
  'Dashboard',
  'Custom Solution',
]

const flow = document.querySelector('[data-journey-flow]')
const detail = document.querySelector('[data-stage-detail]')
const picker = document.querySelector('[data-solution-picker]')
let activeStageId = journeyStages[0].id

function renderProjectCard(projectId) {
  const project = projectCards[projectId]
  if (!project) return ''
  return `
    <article class="project-card">
      <div class="project-visual" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <h4>${project.name}</h4>
        <p>${project.description}</p>
      </div>
      <dl>
        <dt>What was built</dt>
        <dd>${project.built}</dd>
      </dl>
      <div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <a href="index.html#lead-audit" data-project-interest="${project.name}">View Project</a>
    </article>
  `
}

function renderDetail(stage) {
  detail.innerHTML = `
    <div class="stage-detail-copy">
      <span class="stage-number">${String(journeyStages.indexOf(stage) + 1).padStart(2, '0')}</span>
      <h3>${stage.label}</h3>
      <p>${stage.summary}</p>
      ${stage.supporting ? `<strong>${stage.supporting}</strong>` : ''}
      <div class="detail-columns">
        <div>
          <h4>Common problems</h4>
          <ul>${stage.problems.map((problem) => `<li>${problem}</li>`).join('')}</ul>
        </div>
        <div>
          <h4>Relevant solutions</h4>
          <ul>${stage.solutions.slice(0, 8).map((solution) => `<li>${solution}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
    <div class="proof-card-grid">
      ${stage.projects.map(renderProjectCard).join('')}
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
  if (scroll) detail.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function renderFlow() {
  flow.innerHTML = journeyStages.map((stage, index) => `
    <button class="journey-stage ${stage.featured ? 'featured' : ''}" type="button" data-stage-id="${stage.id}" aria-pressed="false">
      <span class="stage-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="stage-orbit ${stage.visual}" aria-hidden="true"></span>
      <strong>${stage.label}</strong>
      <small>${stage.preview.slice(0, 3).join(' / ')}</small>
      <span class="stage-tooltip" role="presentation">
        <b>What we can build</b>
        ${stage.preview.slice(0, 5).map((item) => `<span>${item}</span>`).join('')}
        <em>Explore Solutions -></em>
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

function renderPicker() {
  picker.innerHTML = solutionCategories.map((category) => `
    <a href="index.html#lead-audit" data-solution-interest="${category}">
      <span>${category}</span>
      <small>Explore -></small>
    </a>
  `).join('')
}

document.addEventListener('click', (event) => {
  const interest = event.target.closest('[data-solution-interest], [data-project-interest]')
  if (!interest) return
  const value = interest.dataset.solutionInterest || interest.dataset.projectInterest
  localStorage.setItem('rjSelectedSolution', value)
})

if (flow && detail) renderFlow()
if (picker) renderPicker()
