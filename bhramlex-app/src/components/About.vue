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
  { label: 'Forums', value: 'Courts, tribunals<br>&amp; arbitral forums' },
]

const team = [
  {
    initials: 'AH',
    name: 'Advocate Himakshi',
    qualification: 'LL.M. Gold Medallist · Amity University, Noida',
    focus: 'Corporate Law · Consumer Law · Family Law',
    bio: 'Her practice focuses on corporate advisory, consumer disputes, and family law, combining careful legal research with a practical and client-sensitive approach.',
  },
  {
    initials: 'ST',
    name: 'Advocate Siddhi Tiwari',
    qualification: 'B.A. LL.B. Gold Medallist · Barkatullah University, Bhopal',
    focus: 'B.A. LL.B. · Academic Distinction',
    bio: 'A B.A. LL.B. gold medallist from Barkatullah University, Bhopal, she brings a strong academic foundation to the Brahmlex team.',
  },
]
</script>

<template>
  <section id="about" class="about">
    <div>
      <div class="eyebrow">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">About</span>
      </div>
      <h2 ref="heading" class="about__heading">Legal strategy grounded in clarity, preparation, and trust.</h2>
    </div>
    <div>
      <p class="about__p about__p--lead">
        Brahmlex is a Bhopal-based law firm founded by Advocate Abhishek Tiwari to provide
        attentive, independent legal representation. He remains personally involved at every
        stage—from the first consultation and case assessment to advocacy, negotiation, and
        resolution.
      </p>
      <p class="about__p">
        The practice combines disciplined courtroom preparation with practical, outcome-focused
        advice. Clients receive a candid view of their position, the available options, and the
        implications of each course of action before important decisions are made.
      </p>
      <div ref="grid" class="facts">
        <div v-for="fact in facts" :key="fact.label" class="fact">
          <div class="fact__label">{{ fact.label }}</div>
          <div class="fact__value" v-html="fact.value"></div>
        </div>
      </div>
    </div>

    <div class="team">
      <div class="team__intro">
        <div class="eyebrow">
          <span class="eyebrow__line"></span>
          <span class="eyebrow__label">Our Team</span>
        </div>
        <h3 class="team__heading">Thoughtful counsel, strengthened by a collaborative team.</h3>
        <p class="team__lede">
          Our advocates bring complementary academic backgrounds and areas of focus to each
          engagement, while maintaining the firm’s commitment to preparation, discretion, and
          clear communication.
        </p>
      </div>

      <div class="team__grid">
        <article v-for="member in team" :key="member.name" class="member">
          <div class="member__portrait" role="img" :aria-label="`Portrait placeholder for ${member.name}`">
            <span>{{ member.initials }}</span>
          </div>
          <div class="member__content">
            <p class="member__eyebrow">Advocate</p>
            <h4 class="member__name">{{ member.name }}</h4>
            <p class="member__qualification">{{ member.qualification }}</p>
            <p class="member__bio">{{ member.bio }}</p>
            <p class="member__focus">{{ member.focus }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 32px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  align-items: start;
}

.team {
  grid-column: 1 / -1;
  margin-top: 64px;
  padding-top: 72px;
  border-top: 1px solid var(--border);
}

.team__intro {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  column-gap: 64px;
  align-items: end;
  margin-bottom: 40px;
}

.team__intro .eyebrow {
  grid-column: 1 / -1;
}

.team__heading {
  font-family: var(--font-serif);
  font-size: 38px;
  line-height: 1.08;
  font-weight: 600;
  color: var(--ink);
}

.team__lede {
  max-width: 560px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--body-text-soft);
}

.team__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.member {
  display: grid;
  grid-template-columns: 168px 1fr;
  min-height: 270px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(212, 201, 186, 0.82);
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.member:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.member__portrait {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--cream);
  background:
    radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.16), transparent 30%),
    linear-gradient(155deg, var(--ink), var(--footer-bg));
  isolation: isolate;
}

.member__portrait::before,
.member__portrait::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(189, 114, 40, 0.55);
  border-radius: 50%;
  z-index: -1;
}

.member__portrait::before {
  width: 118px;
  height: 118px;
}

.member__portrait::after {
  width: 88px;
  height: 88px;
}

.member__portrait span {
  font-family: var(--font-serif);
  font-size: 42px;
  font-weight: 600;
  letter-spacing: 2px;
}

.member__content {
  padding: 30px;
}

.member__eyebrow,
.member__focus {
  font-size: 10px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--gold);
}

.member__name {
  margin: 6px 0 8px;
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 1.1;
  font-weight: 600;
  color: var(--ink);
}

.member__qualification {
  min-height: 42px;
  font-size: 13px;
  line-height: 1.55;
  font-weight: 600;
  color: var(--body-text);
}

.member__bio {
  margin: 16px 0 18px;
  font-size: 13.5px;
  line-height: 1.68;
  color: var(--muted);
}

.about__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 50px;
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
  color: var(--body-text);
  margin-bottom: 22px;
}

.facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  background: transparent;
  border: 0;
  margin-top: 26px;
}

.fact {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(212, 201, 186, 0.7);
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(8, 47, 115, 0.04);
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

  .team {
    margin-top: 32px;
    padding-top: 56px;
  }

  .team__intro,
  .team__grid {
    grid-template-columns: 1fr;
  }

  .team__intro {
    gap: 18px;
  }

  .member {
    grid-template-columns: 150px 1fr;
  }
}

@media (max-width: 480px) {
  .facts {
    grid-template-columns: 1fr;
  }

  .member {
    grid-template-columns: 1fr;
  }

  .member__portrait {
    min-height: 210px;
  }

  .member__qualification {
    min-height: auto;
  }
}
</style>
