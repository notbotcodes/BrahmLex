<script setup>
const items = [
  'Enrolled Advocate',
  'Bar Council of India',
  'High Court & District Courts',
  'Confidential & Independent',
]
</script>

<template>
  <section class="trust">
    <div class="trust__inner">
      <template v-for="(item, i) in items" :key="item">
        <span class="trust__item">{{ item }}</span>
        <span v-if="i < items.length - 1" class="trust__dot"></span>
      </template>
    </div>
  </section>
</template>

<style scoped>
.trust {
  background: var(--ink);
  color: #cdd4cd;
}

.trust__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.trust__item {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #8fa093;
}

.trust__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
}

@media (max-width: 640px) {
  .trust__inner {
    gap: 20px;
    padding: 18px 24px;
  }

  .trust__dot {
    display: none;
  }
}
</style>
