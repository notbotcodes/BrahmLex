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
  const sections = ['about', 'practice', 'approach', 'testimonials', 'faq', 'consultation', 'contact']
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
        <span class="nav__logo-crop">
          <img src="/brahmlex-logo.png" alt="BrahmLex" class="nav__logo" />
        </span>
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
        <a href="#consultation" class="nav__cta" @click="closeMenu">Book Consultation</a>
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
  background: rgba(251, 250, 247, 0.94);
  backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 1px 0 rgba(8, 47, 115, 0.03);
  border-bottom: 1px solid var(--border);
}

.nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__brand {
  display: block;
  flex-shrink: 0;
}

.nav__logo-crop {
  position: relative;
  display: block;
  width: 180px;
  height: 74px;
  overflow: hidden;
}

.nav__logo {
  position: absolute;
  width: 262px;
  max-width: none;
  left: -42px;
  top: -55px;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 34px;
}

.nav__link {
  position: relative;
  color: var(--body-text);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

.nav__link:hover,
.nav__link--active {
  color: var(--gold);
}

.nav__link:hover::after,
.nav__link--active::after {
  transform: scaleX(1);
}

.nav__cta {
  background: var(--ink);
  color: var(--cream);
  padding: 11px 22px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
}

.nav__cta:hover {
  background: var(--hover-ink);
  color: var(--cream);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(8, 47, 115, 0.18);
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
  .nav__inner {
    padding: 8px 24px;
  }

  .nav__logo-crop {
    width: 146px;
    height: 60px;
  }

  .nav__logo {
    width: 213px;
    left: -34px;
    top: -45px;
  }

  .nav__toggle {
    display: block;
  }

  .nav__links {
    position: fixed;
    top: 76px;
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
