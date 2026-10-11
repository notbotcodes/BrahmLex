<script setup>
import { ref } from 'vue'
import { practiceAreas } from '../data/content.js'
import { useTextReveal } from '../composables/useTextReveal.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const heading = ref(null)
const grid = ref(null)

useTextReveal(heading)
useScrollReveal(grid, '.card')
</script>

<template>
  <section id="practice" class="practice">
    <div class="practice__inner">
      <div class="practice__head">
        <div>
          <div class="eyebrow">
            <span class="eyebrow__line"></span>
            <span class="eyebrow__label">Practice Areas</span>
          </div>
          <h2 ref="heading" class="practice__heading">
            Focused advice across complex personal and commercial matters.
          </h2>
        </div>
        <p class="practice__note">
          Every engagement begins with a careful assessment of the facts, applicable law, available
          remedies, and the most proportionate path forward.
        </p>
      </div>

      <div ref="grid" class="practice__grid">
        <div v-for="area in practiceAreas" :key="area.num" class="card">
          <div class="card__num">{{ area.num }}</div>
          <h3 class="card__title">{{ area.title }}</h3>
          <p class="card__desc">{{ area.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.practice {
  background:
    linear-gradient(135deg, rgba(255,255,255,0.5), transparent 40%),
    var(--panel);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.practice__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 32px;
}

.practice__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 56px;
  flex-wrap: wrap;
  gap: 24px;
}

.practice__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 44px;
  line-height: 1.08;
  color: var(--ink);
  max-width: 560px;
}

.practice__note {
  font-size: 15px;
  color: var(--muted);
  max-width: 300px;
  line-height: 1.6;
}

.practice__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: transparent;
  border: 0;
}

.card {
  position: relative;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(212, 201, 186, 0.78);
  border-radius: 12px;
  padding: 38px 32px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gold);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease;
}

.card:hover {
  background: #ffffff;
  border-color: var(--gold-soft);
  box-shadow: var(--shadow-sm);
  transform: translateY(-6px);
}

.card:hover::before {
  transform: scaleY(1);
}

.card__num {
  font-family: var(--font-serif);
  font-size: 30px;
  font-weight: 600;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 20px;
}

.card__title {
  font-family: var(--font-serif);
  font-size: 25px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 12px;
}

.card__desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
}

@media (max-width: 860px) {
  .practice__inner {
    padding: 64px 24px;
  }

  .practice__heading {
    font-size: 32px;
  }

  .practice__grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 861px) and (max-width: 1080px) {
  .practice__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
