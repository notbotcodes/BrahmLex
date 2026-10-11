<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { matterTypes } from '../data/content.js'

const token = new URLSearchParams(window.location.search).get('booking') || ''
const qrUrl = import.meta.env.VITE_PAYMENT_QR_URL || '/payment-qr.png'
const slots = ref([])
const loading = ref(false)
const error = ref('')
const submitted = ref(false)
const confirmation = ref(null)
const selectedStart = ref('')
const details = reactive({ name: '', email: '', phone: '', matter: '', paymentReference: '' })

const groupedSlots = computed(() => {
  const groups = new Map()
  for (const slot of slots.value) {
    const day = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(slot.start))
    if (!groups.has(day)) groups.set(day, [])
    groups.get(day).push(slot)
  }
  return [...groups.entries()].map(([day, times]) => ({ day, times }))
})

const displayTime = (iso) => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(iso))

async function loadSlots() {
  loading.value = true
  try {
    const response = await fetch('/api/booking/slots')
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Could not load available times.')
    slots.value = result.slots || []
  } catch (err) { error.value = err.message } finally { loading.value = false }
}

async function submitPayment() {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/api/booking/payment-request', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(details),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Could not submit payment details.')
    submitted.value = true
  } catch (err) { error.value = err.message } finally { loading.value = false }
}

async function confirmSlot() {
  const slot = slots.value.find((item) => item.start === selectedStart.value)
  if (!slot) return
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/api/booking/confirm', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, start: slot.start, end: slot.end }),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Could not book this time.')
    confirmation.value = result
  } catch (err) { error.value = err.message } finally { loading.value = false }
}

onMounted(() => { if (token) loadSlots() })
</script>

<template>
  <section id="consultation" class="consultation">
    <div class="consultation__intro">
      <div class="eyebrow"><span class="eyebrow__line"></span><span class="eyebrow__label">Online consultation</span></div>
      <h2>{{ token ? 'Choose your consultation time.' : 'Pay securely by UPI.' }}</h2>
      <p v-if="token">Select a live opening from the calendar. Your Google Meet invitation will be emailed immediately after booking.</p>
      <p v-else>Scan the QR code, complete payment, and submit your UPI transaction reference. After verification, you will receive a secure link to choose a time.</p>
      <div class="consultation__facts">
        <span>45-minute video consultation</span><span>Manual payment verification</span><span>Google Meet invitation by email</span>
      </div>
    </div>

    <div class="booking-card">
      <div v-if="confirmation" class="booking-success">
        <div class="booking-success__icon">✓</div><h3>Your consultation is booked.</h3>
        <p>A calendar invitation has been sent to <strong>{{ confirmation.email }}</strong>.</p>
        <a :href="confirmation.meetLink" target="_blank" rel="noopener">Open Google Meet</a>
      </div>
      <div v-else-if="submitted" class="booking-success">
        <div class="booking-success__icon">✓</div><h3>Payment details received.</h3>
        <p>After the office verifies your payment, your private slot-booking link will be emailed to you.</p>
      </div>
      <template v-else-if="token">
        <h3>Available appointments</h3>
        <p v-if="loading && !slots.length" class="booking-note">Checking the calendar…</p>
        <div v-else class="slot-list">
          <div v-for="group in groupedSlots" :key="group.day" class="slot-day"><span>{{ group.day }}</span><div>
            <button v-for="slot in group.times" :key="slot.start" type="button" class="slot" :class="{ 'slot--selected': selectedStart === slot.start }" @click="selectedStart = slot.start">{{ displayTime(slot.start) }}</button>
          </div></div>
        </div>
        <button class="booking-submit" :disabled="loading || !selectedStart" @click="confirmSlot">{{ loading ? 'Booking…' : 'Confirm appointment' }}</button>
        <p v-if="error" class="booking-error" role="alert">{{ error }}</p>
      </template>
      <template v-else>
        <h3>Pay consultation fee</h3>
        <img class="payment-qr" :src="qrUrl" alt="UPI payment QR code" />
        <p class="booking-note">After paying, enter the transaction/UTR number shown in your UPI app.</p>
        <form class="booking-form" @submit.prevent="submitPayment">
          <input v-model="details.name" required autocomplete="name" placeholder="Full name" />
          <input v-model="details.email" required type="email" autocomplete="email" placeholder="Email address" />
          <input v-model="details.phone" required type="tel" autocomplete="tel" placeholder="Phone number" />
          <select v-model="details.matter" required><option value="" disabled>Nature of matter</option><option v-for="matter in matterTypes" :key="matter">{{ matter }}</option></select>
          <input v-model="details.paymentReference" class="wide" required minlength="6" placeholder="UPI transaction / UTR number" />
          <button class="booking-submit" :disabled="loading">{{ loading ? 'Submitting…' : 'I have paid — submit for verification' }}</button>
          <p v-if="error" class="booking-error" role="alert">{{ error }}</p>
        </form>
      </template>
    </div>
  </section>
</template>

<style scoped>
.consultation{padding:110px max(32px,calc((100vw - 1200px)/2));background:var(--footer-bg);color:var(--cream);display:grid;grid-template-columns:.85fr 1.15fr;gap:70px}.consultation__intro h2{font-family:var(--font-serif);font-size:46px;line-height:1.08;margin-bottom:20px}.consultation__intro>p{color:var(--footer-text);line-height:1.75;max-width:450px}.consultation__facts{display:grid;gap:12px;margin-top:32px;color:var(--footer-text-soft);font-size:14px}.consultation__facts span:before{content:'✓';color:var(--gold);margin-right:10px}.booking-card{background:var(--cream);color:var(--ink-soft);padding:38px;border-radius:14px;box-shadow:var(--shadow-lg)}.booking-card h3{font-family:var(--font-serif);color:var(--ink);font-size:28px;margin-bottom:18px}.payment-qr{display:block;width:min(240px,70vw);aspect-ratio:1;object-fit:contain;margin:0 auto 16px;background:white;border:1px solid var(--border);border-radius:10px}.booking-form{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:22px}.booking-form input,.booking-form select{width:100%;padding:13px;border:1px solid var(--border-strong);border-radius:7px;background:white;color:var(--ink-soft)}.wide,.booking-submit,.booking-error{grid-column:1/-1}.booking-submit{width:100%;border:0;border-radius:999px;background:var(--gold);color:white;padding:14px;font-weight:700;margin-top:16px}.booking-submit:disabled{opacity:.55;cursor:not-allowed}.booking-note{color:var(--muted);font-size:13px;line-height:1.5;text-align:center}.booking-error{color:#a1443c;text-align:center;font-size:13px;margin-top:10px}.slot-list{max-height:340px;overflow:auto}.slot-day{display:grid;grid-template-columns:95px 1fr;gap:14px;padding:14px 0;border-top:1px solid var(--border)}.slot-day>span{font-weight:700;font-size:13px;color:var(--ink);padding-top:9px}.slot-day>div{display:flex;flex-wrap:wrap;gap:8px}.slot{border:1px solid var(--border-strong);background:white;color:var(--ink);border-radius:999px;padding:8px 13px}.slot:hover,.slot--selected{background:var(--ink);border-color:var(--ink);color:white}.booking-success{min-height:350px;display:grid;place-content:center;text-align:center;justify-items:center}.booking-success__icon{width:58px;height:58px;display:grid;place-items:center;border-radius:50%;background:var(--ink);color:var(--gold);font-size:28px;margin-bottom:18px}.booking-success p{color:var(--muted);margin:0 0 22px}.booking-success a{background:var(--ink);color:white;border-radius:999px;padding:12px 22px}@media(max-width:860px){.consultation{grid-template-columns:1fr;padding:72px 24px;gap:40px}.consultation__intro h2{font-size:34px}.booking-card{padding:24px}}@media(max-width:560px){.booking-form{grid-template-columns:1fr}.slot-day{grid-template-columns:1fr}}
</style>
