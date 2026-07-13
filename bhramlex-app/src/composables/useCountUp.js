import { onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '../gsap.js'

/**
 * Animates a number counting up from 0 to `target` when the element
 * scrolls into view. `target` and `suffix` come from a numeric string
 * like "400+" (target: 400, suffix: "+").
 */
export function useCountUp(targetRef, valueString, { duration = 1.6 } = {}) {
  const match = String(valueString).match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''

  let trigger
  let tween

  onMounted(() => {
    const el = targetRef.value
    if (!el) return

    const counter = { val: 0 }
    el.textContent = '0' + suffix

    trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        tween = gsap.to(counter, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix
          },
        })
      },
    })
  })

  onBeforeUnmount(() => {
    tween?.kill()
    trigger?.kill()
  })
}
