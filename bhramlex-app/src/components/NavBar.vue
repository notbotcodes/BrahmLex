<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navLinks } from '../data/content.js'

const menuOpen = ref(false)
const activeSection = ref('top')

function closeMenu() {
  menuOpen.value = false
}

let observer
onMounted(() => {
  const sections = ['about', 'practice', 'approach', 'testimonials', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  )
  sections.forEach((section) => observer.observe(section))
})

onUnmounted(() => observer && observer.disconnect())
</script>

<template>
  <header class="nav">
    <nav class="nav__inner">
      <a href="#top" class="nav__brand" @click="closeMenu">
        <span class="nav__brand-name">Bhramlex</span>
        <span class="nav__brand-tag">Advocates</span>
      </a>

      <div class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav__link"
          :class="{ 'nav__link--active': activeSection === link.href.slice(1) }"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
        <a href="#contact" class="nav__cta" @click="closeMenu">Book Consultation</a>
      </div>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <span :class="{ 'nav__toggle-bar--open': menuOpen }" class="nav__toggle-bar"></span>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(246, 244, 238, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: var(--ink);
}

.nav__brand-name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.5px;
}

.nav__brand-tag {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 34px;
}

.nav__link {
  color: var(--body-text);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav__link:hover,
.nav__link--active {
  color: var(--gold);
}

.nav__cta {
  background: var(--ink);
  color: var(--cream);
  padding: 11px 22px;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background 0.2s;
}

.nav__cta:hover {
  background: var(--hover-ink);
  color: var(--cream);
}

.nav__toggle {
  display: none;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  position: relative;
}

.nav__toggle-bar,
.nav__toggle-bar::before,
.nav__toggle-bar::after {
  content: '';
  position: absolute;
  left: 6px;
  right: 6px;
  height: 2px;
  background: var(--ink);
  transition: transform 0.2s, opacity 0.2s;
}

.nav__toggle-bar {
  top: 17px;
}

.nav__toggle-bar::before {
  top: -8px;
}

.nav__toggle-bar::after {
  top: 8px;
}

.nav__toggle-bar--open {
  background: transparent;
}

.nav__toggle-bar--open::before {
  transform: translateY(8px) rotate(45deg);
}

.nav__toggle-bar--open::after {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 860px) {
  .nav__toggle {
    display: block;
  }

  .nav__links {
    position: fixed;
    top: 61px;
    left: 0;
    right: 0;
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 24px 20px;
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.2s, opacity 0.2s;
  }

  .nav__links--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav__link {
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }

  .nav__cta {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
