import { onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '../gsap.js'

/**
 * Fades + slides a group of child elements up into place, staggered,
 * as the container scrolls into view. `selector` picks the items to
 * animate inside `containerRef`.
 */
export function useScrollReveal(containerRef, selector, opts = {}) {
  const { y = 32, stagger = 0.1, duration = 0.8, start = 'top 82%' } = opts
  let trigger
  let tween

  onMounted(() => {
    const container = containerRef.value
    if (!container) return
    const items = selector ? container.querySelectorAll(selector) : [container]
    if (!items.length) return

    gsap.set(items, { opacity: 0, y })

    trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        tween = gsap.to(items, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
        })
      },
    })
  })

  onBeforeUnmount(() => {
    tween?.kill()
    trigger?.kill()
  })
}
