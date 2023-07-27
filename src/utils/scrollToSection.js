export const scrollToSection = (elementId, options) => {
  const element = document.getElementById(elementId)
  element.scrollIntoView({
    behavior: 'smooth',
    ...options,
  })
}
