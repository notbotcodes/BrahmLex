<script setup>
import { ref } from 'vue'
import { approachSteps } from '../data/content.js'
import { useTextReveal } from '../composables/useTextReveal.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const heading = ref(null)
const grid = ref(null)

useTextReveal(heading)
useScrollReveal(grid, '.step')
</script>

<template>
  <section id="approach" class="approach">
    <div class="approach__head">
      <div class="eyebrow" style="justify-content: center">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">How We Work</span>
        <span class="eyebrow__line"></span>
      </div>
      <h2 ref="heading" class="approach__heading">A straightforward path, start to finish.</h2>
    </div>
    <div ref="grid" class="approach__grid">
      <div v-for="step in approachSteps" :key="step.num" class="step">
        <div class="step__num">{{ step.num }}</div>
        <div class="step__rule"></div>
        <h3 class="step__title">{{ step.title }}</h3>
        <p class="step__desc">{{ step.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.approach {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 32px;
}

.approach__head {
  text-align: center;
  margin-bottom: 64px;
}

.approach__head .eyebrow {
  display: inline-flex;
}

.approach__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 44px;
  line-height: 1.08;
  color: var(--ink);
}

.approach__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.step__num {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.step__rule {
  height: 1px;
  background: var(--border);
  margin-bottom: 20px;
}

.step__title {
  font-family: var(--font-serif);
  font-size: 23px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 10px;
}

.step__desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
}

@media (max-width: 860px) {
  .approach {
    padding: 64px 24px;
  }

  .approach__heading {
    font-size: 32px;
  }

  .approach__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .approach__grid {
    grid-template-columns: 1fr;
  }
}
</style>
