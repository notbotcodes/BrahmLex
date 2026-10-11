<script setup>
const year = 2026
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <div>
          <a href="#top" class="footer__brand" aria-label="BrahmLex — back to top">
            <span class="footer__logo-crop">
              <img src="/brahmlex-logo.png" alt="BrahmLex" class="footer__logo" />
            </span>
          </a>
          <p class="footer__desc">
            Independent legal counsel across Bhopal, Jabalpur, Raisen, Berasia, and Sehore—before
            courts, tribunals, and arbitral forums.
          </p>
        </div>

        <div class="footer__cols">
          <div class="footer__col">
            <div class="footer__col-title">Explore</div>
            <div class="footer__col-links">
              <a href="#about">About</a>
              <a href="#practice">Practice areas</a>
              <a href="#approach">Approach</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div class="footer__col">
            <div class="footer__col-title">Reach us</div>
            <div class="footer__col-links">
              <a href="mailto:contact@Brahmlex.in">contact@Brahmlex.in</a>
              <a href="tel:+919584167347">+91 95841 67347</a>
            </div>
          </div>
          <div class="footer__col">
            <div class="footer__col-title">Chambers</div>
            <p class="footer__address">
              B-14, Kasturba Nagar,<br />Near Chetak Bridge,<br />Bhopal — 462023, Madhya Pradesh
            </p>
             <p class="footer__address">
              357-358 Lawyers' chambers,behind district and session court Arera hills
            </p>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© {{ year }} Brahmlex Advocates. All rights reserved.</span>
        <span>Advocate Abhishek Tiwari, Bhopal · Enrolled with the Bar Council of India</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background:
    radial-gradient(circle at 12% 0%, rgba(189, 114, 40, 0.13), transparent 24rem),
    var(--footer-bg);
  color: var(--footer-text);
  border-top: 1px solid var(--footer-border);
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 32px 40px;
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
  display: inline-block;
  margin-bottom: 14px;
}

.footer__logo-crop {
  position: relative;
  display: block;
  width: 246px;
  height: 100px;
  overflow: hidden;
  background: #fff;
  border-radius: 2px;
}

.footer__logo {
  position: absolute;
  width: 350px;
  max-width: none;
  left: -54px;
  top: -72px;
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

.footer__address {
  font-size: 14px;
  line-height: 1.6;
  color: var(--footer-text-soft);
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
