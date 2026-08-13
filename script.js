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
const statusBox = document.querySelector('[data-form-status]')
const submitButton = document.querySelector('[data-submit-button]')

if (year) year.textContent = String(new Date().getFullYear())

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
    'Free Lead Audit Request',
    '',
    `Full name: ${payload.fullName}`,
    `Business name: ${payload.businessName}`,
    `Business website: ${payload.businessWebsite}`,
    `Email address: ${payload.emailAddress}`,
    `Phone number: ${payload.phoneNumber}`,
    `Type of business: ${payload.businessType}`,
    '',
    'Biggest lead-generation challenge:',
    payload.leadChallenge,
  ].join('\n')
}

form?.addEventListener('input', (event) => {
  const field = event.target
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
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
    statusBox.textContent = 'Please fix the highlighted fields before requesting your audit.'
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
    const subject = encodeURIComponent(`Free Lead Audit Request - ${payload.businessName}`)
    const body = encodeURIComponent(buildEmailBody(payload))
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    statusBox.textContent = 'Your request has been saved in this browser. A prefilled email is opening so it can be sent while the backend integration is pending.'
    statusBox.className = 'form-status success'
    window.location.href = mailto
    form.reset()
  } catch {
    statusBox.textContent = 'Something went wrong while preparing your request. Your information has not been submitted.'
    statusBox.className = 'form-status error'
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Request My Free Audit'
  }
})
