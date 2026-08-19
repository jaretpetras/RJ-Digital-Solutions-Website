const CONTACT_EMAIL = 'hello@rjdigitalsolutions.com'
document.documentElement.classList.add('js')
// Backend integration point:
// Replace this function with a real POST request when the lead-audit endpoint is ready.
async function submitLeadAuditRequest(payload) {
  const storedRequests = JSON.parse(localStorage.getItem('rjLeadAuditRequests') || '[]')
  storedRequests.push({ ...payload, capturedAt: new Date().toISOString() })
  localStorage.setItem('rjLeadAuditRequests', JSON.stringify(storedRequests))
  return { storedLocally: true }
}

const header = document.querySelector('[data-header]')
const menuToggle = document.querySelector('[data-menu-toggle]')
const nav = document.querySelector('[data-nav]')
const navLinks = [...document.querySelectorAll('.site-nav a')]
const year = document.querySelector('[data-year]')
const form = document.querySelector('[data-audit-form]')
const formToggle = document.querySelector('[data-form-toggle]')
const formPanel = document.querySelector('[data-form-panel]')
const statusBox = document.querySelector('[data-form-status]')
const submitButton = document.querySelector('[data-submit-button]')
const serviceInterest = document.querySelector('[data-service-interest]')
const trackedElements = [...document.querySelectorAll('[data-track]')]

function getAttribution() {
  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get('utm_source') || document.referrer || 'direct',
    campaign: params.get('utm_campaign') || '',
    content: params.get('utm_content') || '',
    medium: params.get('utm_medium') || '',
  }
}

function trackEvent(name, detail = {}) {
  const event = {
    name,
    detail,
    attribution: getAttribution(),
    path: window.location.pathname,
    capturedAt: new Date().toISOString(),
  }
  const events = JSON.parse(localStorage.getItem('rjAutomationEvents') || '[]')
  events.push(event)
  localStorage.setItem('rjAutomationEvents', JSON.stringify(events.slice(-100)))
  window.dispatchEvent(new CustomEvent('rj-analytics-event', { detail: event }))
}

if (year) year.textContent = String(new Date().getFullYear())

trackEvent('landing_page_view')

function openFormPanel({ focus = false } = {}) {
  if (!formPanel || !formToggle) return
  formPanel.hidden = false
  formPanel.classList.add('is-open')
  formToggle.setAttribute('aria-expanded', 'true')
  formToggle.textContent = 'Close Contact Form'
  if (focus) form?.querySelector('input[required], textarea[required]')?.focus()
}

function closeFormPanel() {
  if (!formPanel || !formToggle) return
  formPanel.classList.remove('is-open')
  formPanel.hidden = true
  formToggle.setAttribute('aria-expanded', 'false')
  formToggle.textContent = 'Open Contact Form'
}

formToggle?.addEventListener('click', () => {
  const isOpen = formToggle.getAttribute('aria-expanded') === 'true'
  if (isOpen) closeFormPanel()
  else {
    openFormPanel({ focus: true })
    trackEvent('contact_form_opened')
  }
})

trackedElements.forEach((element) => {
  element.addEventListener('click', () => {
    trackEvent(element.dataset.track, { label: element.dataset.trackLabel || element.textContent.trim() })
  })
})

document.querySelectorAll('[data-service]').forEach((element) => {
  element.addEventListener('click', () => {
    const service = element.dataset.service
    openFormPanel()
    if (serviceInterest) serviceInterest.value = service
    if (statusBox) {
      statusBox.textContent = `Interested in: ${service}. Send the consultation request and we will start there.`
      statusBox.className = 'form-status'
    }
    trackEvent('service_interest_selected', { service })
  })
})

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 12)
}

window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()

function closeMenu() {
  document.body.classList.remove('menu-open')
  nav?.classList.remove('open')
  menuToggle?.setAttribute('aria-expanded', 'false')
}

function openMenu() {
  document.body.classList.add('menu-open')
  nav?.classList.add('open')
  menuToggle?.setAttribute('aria-expanded', 'true')
  navLinks[0]?.focus()
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  isOpen ? closeMenu() : openMenu()
})

navLinks.forEach((link) => link.addEventListener('click', closeMenu))

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu()
  if (event.key !== 'Tab' || !nav?.classList.contains('open')) return

  const focusableItems = [menuToggle, ...navLinks].filter(Boolean)
  const first = focusableItems[0]
  const last = focusableItems[focusableItems.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
})

const revealItems = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.14 })

  revealItems.forEach((item) => revealObserver.observe(item))
} else {
  revealItems.forEach((item) => item.classList.add('visible'))
}

function setFieldError(field, message) {
  const wrapper = field.closest('.field')
  const error = wrapper?.querySelector('.field-error')
  wrapper?.classList.toggle('invalid', Boolean(message))
  field.setAttribute('aria-invalid', message ? 'true' : 'false')
  if (error) {
    error.textContent = message
    if (message) field.setAttribute('aria-describedby', error.id)
    else field.removeAttribute('aria-describedby')
  }
}

function validateField(field) {
  const label = form?.querySelector(`label[for="${field.id}"]`)?.textContent || 'This field'
  const value = field.value.trim()
  let message = ''

  if (field.required && !value) message = `${label} is required.`
  else if (field.type === 'email' && value && !field.validity.valid) message = 'Enter a valid email address.'
  else if (field.type === 'url' && value && !field.validity.valid) message = 'Enter a valid website URL, including https://.'

  setFieldError(field, message)
  return !message
}

function buildEmailBody(payload) {
  return [
    'Free Consultation Request',
    '',
    `Full name: ${payload.fullName}`,
    `Business name: ${payload.businessName}`,
    `Business website: ${payload.businessWebsite}`,
    `Email address: ${payload.emailAddress}`,
    `Phone number: ${payload.phoneNumber}`,
    `Approx. monthly lead volume: ${payload.leadVolume}`,
    `Interested service/product: ${payload.serviceInterest || 'Not specified'}`,
    '',
    'Biggest bottleneck:',
    payload.leadChallenge,
  ].join('\n')
}

form?.addEventListener('input', (event) => {
  const field = event.target
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    if (!form.dataset.started) {
      form.dataset.started = 'true'
      trackEvent('form_started')
    }
    validateField(field)
  }
})

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  const honey = form.elements.namedItem('companyUrl')
  if (honey instanceof HTMLInputElement && honey.value) return

  const fields = [...form.querySelectorAll('input[required], textarea[required]')]
  const validationResults = fields.map(validateField)
  const valid = validationResults.every(Boolean)
  if (!valid) {
    statusBox.textContent = 'Please fix the highlighted fields before requesting your consultation.'
    statusBox.className = 'form-status error'
    fields.find((field) => field.getAttribute('aria-invalid') === 'true')?.focus()
    return
  }

  const formData = new FormData(form)
  const payload = Object.fromEntries(formData.entries())

  submitButton.disabled = true
  submitButton.textContent = 'Preparing request...'
  statusBox.textContent = ''
  statusBox.className = 'form-status'

  try {
    await submitLeadAuditRequest(payload)
    const subject = encodeURIComponent(`Free Consultation Request - ${payload.businessName}`)
    const body = encodeURIComponent(buildEmailBody(payload))
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    trackEvent('form_completed', { businessName: payload.businessName })
    statusBox.textContent = 'Your request is saved in this browser. A prepared email is opening so you can send it now.'
    statusBox.className = 'form-status success'
    window.location.href = mailto
    form.reset()
  } catch {
    statusBox.textContent = 'Something went wrong while preparing your request. Your information has not been submitted.'
    statusBox.className = 'form-status error'
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Request My Free Consultation'
  }
})
