<script setup>
import { ref } from 'vue'
import { testimonials } from '../data/content.js'
import { useTextReveal } from '../composables/useTextReveal.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const heading = ref(null)
const grid = ref(null)

useTextReveal(heading)
useScrollReveal(grid, '.quote')
</script>

<template>
  <section id="testimonials" class="testimonials">
    <div class="testimonials__inner">
      <div class="eyebrow">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">In Their Words</span>
      </div>
      <h2 ref="heading" class="testimonials__heading">
        What clients say about working with Brahmlex.
      </h2>
      <div ref="grid" class="testimonials__grid">
        <div v-for="q in testimonials" :key="q.name" class="quote">
          <div class="quote__mark">&ldquo;</div>
          <p class="quote__text">{{ q.text }}</p>
          <div class="quote__name">{{ q.name }}</div>
          <div class="quote__role">{{ q.role }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  position: relative;
  background:
    radial-gradient(circle at 85% 15%, rgba(189, 114, 40, 0.18), transparent 28rem),
    linear-gradient(145deg, var(--ink), var(--footer-bg));
  color: #f4f7fb;
}

.testimonials__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 120px 32px;
}

.testimonials__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 44px;
  line-height: 1.08;
  color: var(--cream);
  margin-bottom: 56px;
  max-width: 640px;
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.quote {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(4px);
}

.quote__mark {
  font-family: var(--font-serif);
  font-size: 40px;
  color: var(--gold);
  line-height: 0.5;
  margin-bottom: 20px;
}

.quote__text {
  font-size: 16px;
  line-height: 1.7;
  color: var(--footer-text-soft);
  margin-bottom: 24px;
}

.quote__name {
  font-size: 14px;
  font-weight: 600;
  color: var(--cream);
}

.quote__role {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--footer-text);
  margin-top: 3px;
}

@media (max-width: 860px) {
  .testimonials__inner {
    padding: 64px 24px;
  }

  .testimonials__heading {
    font-size: 32px;
  }

  .testimonials__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
