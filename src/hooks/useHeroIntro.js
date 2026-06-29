import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Hero entrance timeline — plays once on mount (not scroll-triggered, since the
 * hero is above the fold). Pill → headline lines → description paragraphs,
 * each easing up in a smooth, staggered sequence.
 *
 * Pass a ref to the hero-content root. Honors prefers-reduced-motion.
 */
export default function useHeroIntro(rootRef) {
  // useLayoutEffect so the timeline's initial hidden state is set before paint
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      const pill = root.querySelector('.hero-pill')
      const lines = root.querySelectorAll('.hero-headline > span')
      const paras = root.querySelectorAll('.hero-description')
      const actions = root.querySelector('.hero-actions')

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (pill) {
        tl.from(pill, { opacity: 0, y: 20, duration: 0.7 }, 0)
      }
      if (lines.length) {
        tl.from(
          lines,
          { opacity: 0, y: 40, duration: 0.9, stagger: 0.12 },
          0.15
        )
      }
      if (paras.length) {
        tl.from(
          paras,
          { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 },
          0.5
        )
      }
      if (actions) {
        tl.from(actions, { opacity: 0, y: 20, duration: 0.7 }, 0.68)
      }
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}
