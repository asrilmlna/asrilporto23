import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Disable automatic browser scroll restoration so it doesn't jump to footer
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
