<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import TrustStrip from './components/TrustStrip.vue'
import About from './components/About.vue'
import PracticeAreas from './components/PracticeAreas.vue'
import Approach from './components/Approach.vue'
import Testimonials from './components/Testimonials.vue'
import FAQ from './components/FAQ.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="page">
    <NavBar />
    <Hero />
    <TrustStrip />
    <About />
    <PracticeAreas />
    <Approach />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
  </div>
</template>

<style scoped>
.page {
  font-family: var(--font-sans);
  color: var(--ink-soft);
  background: var(--cream);
}
</style>
