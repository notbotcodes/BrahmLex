import { onMounted, onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger, SplitText } from '../gsap.js'

/**
 * Animates a heading's words appearing one after another, as if being
 * generated/typed in. Pass `immediate: true` for above-the-fold text
 * (runs on mount); otherwise it plays once the element scrolls into view.
 */
export function useTextReveal(targetRef, { immediate = false, delay = 0 } = {}) {
  let split
  let trigger
  let tween

  onMounted(() => {
    const el = targetRef.value
    if (!el) return

    document.fonts?.ready.then(() => {
      if (!targetRef.value) return

      split = SplitText.create(el, {
        type: 'words,chars',
        wordsClass: 'reveal-word',
        charsClass: 'reveal-char',
      })

      gsap.set(split.chars, { opacity: 0, yPercent: 130, rotateZ: 4 })

      const play = () => {
        tween = gsap.to(split.chars, {
          opacity: 1,
          yPercent: 0,
          rotateZ: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: { each: 0.018, from: 'start' },
          delay,
        })
      }

      if (immediate) {
        play()
      } else {
        trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: play,
        })
      }
    })
  })

  onBeforeUnmount(() => {
    tween?.kill()
    trigger?.kill()
    split?.revert()
  })
}
