<script setup>
import { reactive, ref } from 'vue'
import { gsap } from '../gsap.js'
import { matterTypes } from '../data/content.js'
import { useTextReveal } from '../composables/useTextReveal.js'

const heading = ref(null)
useTextReveal(heading)

const form = reactive({
  name: '',
  email: '',
  matter: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  matter: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)
const panel = ref(null)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  errors.name = form.name.trim() ? '' : 'Please share your name.'
  errors.email = !form.email.trim()
    ? 'Please share an email address.'
    : EMAIL_RE.test(form.email)
      ? ''
      : 'That email address doesn’t look right.'
  errors.matter = form.matter ? '' : 'Please select the nature of your matter.'
  errors.message = form.message.trim().length >= 10 ? '' : 'Please add a few more details (10+ characters).'
  return !errors.name && !errors.email && !errors.matter && !errors.message
}

function submit() {
  if (!validate()) return

  submitting.value = true
  window.setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 600)
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.matter = ''
  form.message = ''
  errors.name = errors.email = errors.matter = errors.message = ''
  submitted.value = false
  gsap.from(panel.value, { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' })
}
</script>

<template>
  <section id="contact" class="contact">
    <div>
      <div class="eyebrow">
        <span class="eyebrow__line"></span>
        <span class="eyebrow__label">Contact</span>
      </div>
      <h2 ref="heading" class="contact__heading">Request a consultation.</h2>
      <p class="contact__lede">
        Share a few details about your matter and Abhishek will respond personally, usually within
        one business day. All enquiries are treated in strict confidence.
      </p>
      <div class="contact__details">
        <div class="detail">
          <span class="detail__label">Email</span>
          <a href="mailto:contact@bhramlex.in" class="detail__value detail__value--link"
            >contact@bhramlex.in</a
          >
        </div>
        <div class="detail">
          <span class="detail__label">Phone</span>
          <a href="tel:+919584167347" class="detail__value detail__value--link">+91 95841 67347</a>
        </div>
        <div class="detail">
          <span class="detail__label">Chambers</span>
          <span class="detail__value"
            >B-14, Kasturba Nagar, Near Chetak Bridge,<br />Bhopal — 462023</span
          >
        </div>
        <div class="detail">
          <span class="detail__label">Hours</span>
          <span class="detail__value">Mon–Sat, 10:00–19:00 IST</span>
        </div>
      </div>
    </div>

    <div ref="panel" class="form-panel">
      <div v-if="submitted" class="success">
        <div class="success__check">✓</div>
        <h3 class="success__title">Thank you.</h3>
        <p class="success__text">Your enquiry has been noted. Abhishek will be in touch shortly.</p>
        <button type="button" class="success__reset" @click="resetForm">Send another enquiry</button>
      </div>

      <form v-else class="form" novalidate @submit.prevent="submit">
        <div class="field">
          <label class="field__label" for="name">Full name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Your name"
            class="field__input"
            :class="{ 'field__input--error': errors.name }"
          />
          <p v-if="errors.name" class="field__error">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label class="field__label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            class="field__input"
            :class="{ 'field__input--error': errors.email }"
          />
          <p v-if="errors.email" class="field__error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label class="field__label" for="matter">Nature of matter</label>
          <select
            id="matter"
            v-model="form.matter"
            class="field__input"
            :class="{ 'field__input--error': errors.matter }"
          >
            <option value="" disabled>Select an area</option>
            <option v-for="type in matterTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <p v-if="errors.matter" class="field__error">{{ errors.matter }}</p>
        </div>

        <div class="field">
          <label class="field__label" for="message">Brief description</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            placeholder="Tell us a little about your situation…"
            class="field__input field__input--area"
            :class="{ 'field__input--error': errors.message }"
          ></textarea>
          <p v-if="errors.message" class="field__error">{{ errors.message }}</p>
        </div>

        <button type="submit" class="submit" :disabled="submitting">
          {{ submitting ? 'Sending…' : 'Send enquiry' }}
        </button>
        <p class="disclaimer">Submitting this form does not create a lawyer–client relationship.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
}

.contact__heading {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 44px;
  line-height: 1.08;
  color: var(--ink);
  margin-bottom: 20px;
}

.contact__lede {
  font-size: 16px;
  line-height: 1.7;
  color: var(--body-text-soft);
  margin-bottom: 40px;
  max-width: 420px;
}

.contact__details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail {
  display: flex;
  gap: 16px;
  align-items: baseline;
}

.detail__label {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  width: 70px;
  flex-shrink: 0;
}

.detail__value {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.detail__value--link {
  color: var(--ink);
}

.detail__value--link:hover {
  color: var(--gold);
}

.form-panel {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field__label {
  display: block;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--faint);
  font-weight: 600;
  margin-bottom: 8px;
}

.field__input {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--ink-soft);
  background: var(--cream-input);
  transition: border-color 0.15s;
}

.field__input:focus {
  border-color: var(--ink);
  outline: none;
}

.field__input--area {
  resize: vertical;
}

.field__input--error {
  border-color: #b3564f;
}

.field__error {
  font-size: 12.5px;
  color: #a1443c;
  margin-top: 6px;
}

.submit {
  background: var(--ink);
  color: var(--cream);
  padding: 15px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 4px;
  transition: background 0.2s;
}

.submit:hover:not(:disabled) {
  background: var(--hover-ink);
}

.submit:disabled {
  opacity: 0.7;
  cursor: default;
}

.disclaimer {
  font-size: 12px;
  color: #9a9182;
  text-align: center;
  line-height: 1.5;
}

.success {
  min-height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.success__check {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 30px;
  margin-bottom: 20px;
}

.success__title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 10px;
}

.success__text {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
  max-width: 280px;
  margin-bottom: 22px;
}

.success__reset {
  background: none;
  border: 1px solid var(--border-strong);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  padding: 11px 20px;
  border-radius: 3px;
  transition: border-color 0.2s, color 0.2s;
}

.success__reset:hover {
  border-color: var(--ink);
  color: var(--gold);
}

@media (max-width: 860px) {
  .contact {
    grid-template-columns: 1fr;
    padding: 64px 24px;
    gap: 40px;
  }

  .contact__heading {
    font-size: 32px;
  }

  .form-panel {
    padding: 28px;
  }
}
</style>
