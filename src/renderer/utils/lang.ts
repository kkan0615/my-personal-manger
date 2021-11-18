export const getCurrentLanguage = () => {
  return window.navigator.language.split('-')[0]
}
