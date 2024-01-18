export const openNewTab = (url: string) => {
  return window.open(url, '_blank')
}

export const mailTo = (email: string) => {
  return (window.location.href = `mailto:${email}`)
}

export const toggleDarkMode = () => {
  return document.documentElement.classList.toggle('dark')
}

export const internalLinkClick = (url: string) => {
  return (window.location.href = url)
}