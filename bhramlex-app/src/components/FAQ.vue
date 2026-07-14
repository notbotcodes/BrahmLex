<script setup>
import { ref } from 'vue'
import { faqs } from '../data/content.js'
import { useTextReveal } from '../composables/useTextReveal.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const heading = ref(null)
const list = ref(null)

useTextReveal(heading)
useScrollReveal(list, '.faq-item')
</script>

<template>
  <section id="faq" class="faq">
    <div class="faq__head">
      <div class="eyebrow" style="justify-content: center">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">Frequently Asked</span>
        <span class="eyebrow__line"></span>
      </div>
      <h2 ref="heading" class="faq__heading">Advocate in Bhopal — common questions.</h2>
    </div>

    <div ref="list" class="faq__list">
      <details v-for="item in faqs" :key="item.q" class="faq-item">
        <summary class="faq-item__q">{{ item.q }}</summary>
        <p class="faq-item__a">{{ item.a }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq {
  max-width: 880px;
  margin: 0 auto;
  padding: 100px 32px;
}

.faq__head {
  text-align: center;
  margin-bottom: 56px;
}

.faq__head .eyebrow {
  display: inline-flex;
}

.faq__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 40px;
  line-height: 1.1;
  color: var(--ink);
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}

.faq-item {
  background: var(--cream);
  padding: 22px 26px;
}

.faq-item__q {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.faq-item__q::-webkit-details-marker {
  display: none;
}

.faq-item__q::after {
  content: '+';
  flex-shrink: 0;
  color: var(--gold);
  font-size: 22px;
  line-height: 1;
  transition: transform 0.2s;
}

.faq-item[open] .faq-item__q::after {
  transform: rotate(45deg);
}

.faq-item__a {
  font-size: 15px;
  line-height: 1.7;
  color: var(--muted);
  margin-top: 14px;
}

@media (max-width: 860px) {
  .faq {
    padding: 64px 24px;
  }

  .faq__heading {
    font-size: 30px;
  }

  .faq-item {
    padding: 20px;
  }
}
</style>
