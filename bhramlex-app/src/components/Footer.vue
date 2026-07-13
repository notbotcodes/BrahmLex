<script setup>
const year = 2026
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <div>
          <div class="footer__brand">
            <span class="footer__brand-name">Bhramlex</span>
            <span class="footer__brand-tag">Advocates</span>
          </div>
          <p class="footer__desc">
            The practice of Advocate Abhishek Tiwari. Considered legal counsel, delivered
            personally.
          </p>
        </div>

        <div class="footer__cols">
          <div class="footer__col">
            <div class="footer__col-title">Explore</div>
            <div class="footer__col-links">
              <a href="#about">About</a>
              <a href="#practice">Practice areas</a>
              <a href="#approach">Approach</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div class="footer__col">
            <div class="footer__col-title">Reach us</div>
            <div class="footer__col-links">
              <a href="mailto:contact@bhramlex.in">contact@bhramlex.in</a>
              <a href="tel:+919584167347">+91 95841 67347</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© {{ year }} Bhramlex Advocates. All rights reserved.</span>
        <span>Advocate Abhishek Tiwari · Enrolled with the Bar Council of India</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--footer-bg);
  color: var(--footer-text);
  border-top: 1px solid var(--footer-border);
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 32px 40px;
}

.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  gap: 32px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--footer-border);
}

.footer__brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 14px;
}

.footer__brand-name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 28px;
  color: var(--cream);
}

.footer__brand-tag {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
}

.footer__desc {
  font-size: 14px;
  line-height: 1.6;
  max-width: 320px;
  color: var(--footer-text-faint);
}

.footer__cols {
  display: flex;
  gap: 56px;
  flex-wrap: wrap;
}

.footer__col-title {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 14px;
}

.footer__col-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__col-links a {
  font-size: 14px;
  color: var(--footer-text-soft);
}

.footer__col-links a:hover {
  color: var(--cream);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 24px;
  font-size: 12px;
  color: var(--footer-copy);
}

@media (max-width: 860px) {
  .footer__inner {
    padding: 48px 24px 32px;
  }
}
</style>
