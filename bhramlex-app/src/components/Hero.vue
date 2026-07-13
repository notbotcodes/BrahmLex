<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '../gsap.js'
import { useTextReveal } from '../composables/useTextReveal.js'
import { useCountUp } from '../composables/useCountUp.js'

const headline = ref(null)
const portrait = ref(null)
const card = ref(null)
const intro = ref(null)

const stat1 = ref(null)
const stat2 = ref(null)
const stat3 = ref(null)

useTextReveal(headline, { immediate: true, delay: 0.15 })
useCountUp(stat1, '12+')
useCountUp(stat2, '400+')
useCountUp(stat3, '6')

onMounted(() => {
  gsap.from(intro.value, {
    opacity: 0,
    y: 16,
    duration: 0.9,
    delay: 0.1,
    ease: 'power2.out',
  })
  gsap.from(portrait.value, {
    opacity: 0,
    scale: 0.96,
    duration: 1,
    delay: 0.35,
    ease: 'power2.out',
  })
  gsap.from(card.value, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.9,
    ease: 'power2.out',
  })
})
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__copy">
      <div ref="intro" class="eyebrow">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">Advocate &amp; Legal Counsel</span>
      </div>
      <h1 ref="headline" class="hero__title">Considered counsel for matters that matter.</h1>
      <p class="hero__lede">
        Bhramlex is the practice of <strong>Abhishek Tiwari</strong> — advising individuals and
        businesses across litigation, corporate, and dispute resolution with clarity, discretion,
        and rigour.
      </p>
      <div class="hero__actions">
        <a href="#contact" class="btn btn--primary">Request a consultation</a>
        <a href="#practice" class="btn btn--text">View practice areas</a>
      </div>
      <div class="hero__stats">
        <div class="stat">
          <div ref="stat1" class="stat__num">0+</div>
          <div class="stat__label">Years of practice</div>
        </div>
        <div class="stat">
          <div ref="stat2" class="stat__num">0+</div>
          <div class="stat__label">Matters handled</div>
        </div>
        <div class="stat">
          <div ref="stat3" class="stat__num">0</div>
          <div class="stat__label">Areas of practice</div>
        </div>
      </div>
    </div>

    <div class="hero__visual">
      <div ref="portrait" class="portrait">
        <img src="/1764166015896.jpg" alt="Abhishek Tiwari, Founder & Principal Advocate" class="portrait__img" />
      </div>
      <div ref="card" class="portrait__card">
        <div class="portrait__name">Abhishek Tiwari</div>
        <div class="portrait__role">Founder &amp; Principal Advocate</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 32px 84px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;
}

.hero__title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 66px;
  line-height: 1.02;
  letter-spacing: -0.5px;
  color: var(--ink);
  margin-bottom: 26px;
  text-wrap: balance;
}

.hero__lede {
  font-size: 17px;
  line-height: 1.7;
  color: var(--body-text-soft);
  max-width: 500px;
  margin-bottom: 38px;
}

.hero__lede strong {
  font-weight: 600;
  color: var(--ink);
}

.hero__actions {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.btn {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: background 0.2s, border-color 0.2s;
}

.btn--primary {
  background: var(--ink);
  color: var(--cream);
  padding: 15px 30px;
  border-radius: 2px;
}

.btn--primary:hover {
  background: var(--hover-ink);
  color: var(--cream);
}

.btn--text {
  color: var(--ink);
  padding: 15px 8px;
  border-bottom: 1px solid var(--border-strong);
}

.btn--text:hover {
  border-color: var(--ink);
  color: var(--ink);
}

.hero__stats {
  display: flex;
  gap: 44px;
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}

.stat__num {
  font-family: var(--font-serif);
  font-size: 38px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1;
}

.stat__label {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--faint);
  margin-top: 8px;
}

.hero__visual {
  position: relative;
}

.portrait {
  aspect-ratio: 4 / 5;
  background: #e7e1d3;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  overflow: hidden;
}

.portrait__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.portrait__card {
  position: absolute;
  bottom: -18px;
  left: -18px;
  background: var(--ink);
  color: var(--cream);
  padding: 18px 22px;
  border-radius: 3px;
  max-width: 210px;
}

.portrait__name {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
}

.portrait__role {
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 4px;
}

@media (max-width: 960px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 56px 24px 64px;
  }

  .hero__title {
    font-size: 44px;
  }

  .hero__visual {
    max-width: 360px;
    margin: 0 auto;
  }

  .hero__stats {
    gap: 32px;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 34px;
  }
}
</style>
