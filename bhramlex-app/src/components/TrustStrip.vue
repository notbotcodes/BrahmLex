<script setup>
const cities = ['Bhopal', 'Jabalpur', 'Raisen', 'Berasia', 'Sehore']
</script>

<template>
  <section class="trust" aria-label="Areas served by Brahmlex">
    <div class="trust__label">Serving Madhya Pradesh</div>
    <div class="trust__marquee">
      <div class="trust__track">
        <div v-for="group in 2" :key="group" class="trust__group" :aria-hidden="group === 2">
          <template v-for="city in cities" :key="`${group}-${city}`">
            <span class="trust__item">{{ city }}</span>
            <span class="trust__dot"></span>
          </template>
          <span class="trust__item trust__item--scope">Courts · Tribunals · Arbitration</span>
          <span class="trust__dot"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: stretch;
  background: var(--ink);
  color: #eef3f9;
  overflow: hidden;
}

.trust__label {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 22px 32px;
  background: var(--gold);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: nowrap;
}

.trust__marquee {
  min-width: 0;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}

.trust__track {
  display: flex;
  width: max-content;
  animation: city-marquee 28s linear infinite;
}

.trust__group {
  display: flex;
  align-items: center;
  gap: 34px;
  padding: 22px 17px;
}

.trust__item {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--footer-text);
  white-space: nowrap;
}

.trust__item--scope {
  color: var(--gold-soft);
}

@keyframes city-marquee {
  to {
    transform: translateX(-50%);
  }
}

.trust__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
}

@media (max-width: 640px) {
  .trust {
    grid-template-columns: 1fr;
  }

  .trust__label {
    justify-content: center;
    padding: 12px 20px;
  }

  .trust__group {
    padding-block: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust__track {
    animation: none;
  }
}
</style>
