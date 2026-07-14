<script setup>
import { ref } from 'vue'
import { useTextReveal } from '../composables/useTextReveal.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const heading = ref(null)
const grid = ref(null)

useTextReveal(heading)
useScrollReveal(grid, '.fact')

const facts = [
  { label: 'Education', value: 'LL.B. & LL.M.<br>Corporate & Litigation focus' },
  { label: 'Languages', value: 'English · Hindi' },
  { label: 'Enrolment', value: 'Bar Council of India' },
  { label: 'Appears before', value: 'Madhya Pradesh High Court<br>&amp; Bhopal District Courts' },
]
</script>

<template>
  <section id="about" class="about">
    <div>
      <div class="eyebrow">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">About</span>
      </div>
      <h2 ref="heading" class="about__heading">A practice built on trust and precision.</h2>
    </div>
    <div>
      <p class="about__p about__p--lead">
        Abhishek Tiwari founded Bhramlex in Bhopal to offer clients something increasingly rare in
        legal practice: undivided attention. Every matter is handled personally, from the first
        consultation to the final resolution.
      </p>
      <p class="about__p">
        With over a decade advising individuals, families, and businesses across Bhopal and the
        surrounding region, his approach pairs sharp courtroom advocacy with a preference for
        pragmatic, cost-effective outcomes. Clients come for the counsel and stay for the candour.
      </p>
      <div ref="grid" class="facts">
        <div v-for="fact in facts" :key="fact.label" class="fact">
          <div class="fact__label">{{ fact.label }}</div>
          <div class="fact__value" v-html="fact.value"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 32px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  align-items: start;
}

.about__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 44px;
  line-height: 1.08;
  color: var(--ink);
}

.about__p {
  font-size: 16px;
  line-height: 1.75;
  color: var(--body-text-soft);
  margin-bottom: 22px;
}

.about__p--lead {
  font-size: 17px;
  color: #3f4a43;
  margin-bottom: 22px;
}

.facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  margin-top: 14px;
}

.fact {
  background: var(--cream);
  padding: 22px 24px;
}

.fact__label {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 6px;
}

.fact__value {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.5;
}

@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
    padding: 64px 24px;
    gap: 32px;
  }

  .about__heading {
    font-size: 34px;
  }
}

@media (max-width: 480px) {
  .facts {
    grid-template-columns: 1fr;
  }
}
</style>
