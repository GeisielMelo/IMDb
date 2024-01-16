export type Languages = 'de-DE' | 'es-ES' | 'fr-FR' | 'en-US' | 'pt-BR'

export const useLanguages = () => {
  const userLocale = localStorage.getItem('language')
  const navigatorLocale = navigator.language

  const setLanguage = (language: Languages) => {
    localStorage.setItem('language', language)
    window.location.reload()
  }

  return { locale: userLocale ? userLocale : navigatorLocale, setLanguage }
}
