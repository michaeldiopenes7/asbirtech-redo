import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Declarative scroll/entrance animations driven by data attributes.
 *
 * Add `data-anim="<preset>"` to any element. Optional modifiers:
 *   data-anim-delay="0.15"        — extra delay in seconds
 *   data-anim-stagger="0.08"      — stagger between this element's direct children
 *   data-anim-once="false"        — replay each time it re-enters (default: play once)
 *
 * Presets:
 *   fade-up      — fade + rise (default for headings, paragraphs, buttons)
 *   fade         — opacity only
 *   left / right — slide in horizontally (for split layouts)
 *   scale        — gentle scale + fade (cards, feature panels)
 *   stagger-up   — fade-up applied to direct children with a stagger
 *
 * Honors prefers-reduced-motion: everything snaps to its final state instantly.
 */

const EASE = 'power3.out'
const DUR = 0.9

const PRESETS = {
  'fade-up': { from: { opacity: 0, y: 32 }, to: { opacity: 1, y: 0 } },
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  left: { from: { opacity: 0, x: -48 }, to: { opacity: 1, x: 0 } },
  right: { from: { opacity: 0, x: 48 }, to: { opacity: 1, x: 0 } },
  scale: { from: { opacity: 0, y: 24, scale: 0.97 }, to: { opacity: 1, y: 0, scale: 1 } },
}

export default function useGsapReveal() {
  // useLayoutEffect: apply the hidden "from" state before the browser paints,
  // so there's no flash of fully-rendered content before it animates in.
  useLayoutEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) return // leave content in its natural final state, no motion

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-anim]')

      els.forEach((el) => {
        const preset = el.dataset.anim
        const delay = parseFloat(el.dataset.animDelay) || 0
        const stagger = parseFloat(el.dataset.animStagger) || 0
        const once = el.dataset.animOnce !== 'false'

        const trigger = {
          trigger: el,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        }

        // stagger-up animates the element's direct children instead of itself
        if (preset === 'stagger-up' || stagger > 0) {
          const targets = stagger > 0 && preset !== 'stagger-up' ? el : el.children
          const config = PRESETS['fade-up']
          gsap.set(targets, config.from)
          gsap.to(targets, {
            ...config.to,
            duration: DUR,
            ease: EASE,
            delay,
            stagger: stagger || 0.1,
            scrollTrigger: trigger,
          })
          return
        }

        const config = PRESETS[preset] || PRESETS['fade-up']
        gsap.set(el, config.from)
        gsap.to(el, {
          ...config.to,
          duration: DUR,
          ease: EASE,
          delay,
          scrollTrigger: trigger,
        })
      })

      // Recalculate trigger positions once async content (images, WebGL) settles
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
