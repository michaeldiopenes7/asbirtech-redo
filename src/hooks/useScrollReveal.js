import { useEffect } from 'react'

export default function useScrollReveal(selector = '[data-reveal]', options = {}) {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    if (!els.length) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0
          setTimeout(() => entry.target.classList.add('is-revealed'), Number(delay))
          io.unobserve(entry.target)
        }
      })
    }, { threshold: options.threshold ?? 0.12, ...options })

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}
