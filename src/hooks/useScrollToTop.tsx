import { useEffect } from 'react'

export const useScrollToTop = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    
    scrollToTop()
    window.addEventListener('load', scrollToTop)
    return () => {
      window.removeEventListener('load', scrollToTop)
    }
  }, [])
}
