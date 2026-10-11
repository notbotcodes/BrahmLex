# BrahmLex website

Vue 3/Vite website with serverless endpoints for enquiries and paid online consultations.

## Local development

```sh
npm install
npm run dev
```

The static UI works under Vite. The `/api` serverless functions run when the project is served by Vercel (`vercel dev`) or deployed there.

## Required integrations

Copy `.env.example` to `.env.local` and provide:

- a Resend API key and verified sender domain for contact-form delivery;
- the public site URL and a long random booking secret;
- a Google OAuth refresh token for the calendar owner, created with the `https://www.googleapis.com/auth/calendar` scope.

The Google account must be allowed to create Google Meet conferences. Calendar invitations are sent automatically to the client's email when the event is created.
Set `CONTACT_TO_EMAIL=advocateabhishek96@gmail.com` to receive contact enquiries and payment-verification requests.

Place the UPI QR image at `public/payment-qr.png`, or change `VITE_PAYMENT_QR_URL`. A visitor submits the UPI/UTR reference after paying. The office email contains an approval link; click it only after confirming receipt in the bank or UPI app. Approval emails the visitor a secure booking link valid for 72 hours.

Set the same variables in the Vercel project's Environment Variables before deploying. Do not commit `.env.local` or any credentials.

## Booking rules

Appointments default to 45 minutes, Monday-Saturday, 10:00-19:00 IST, with 12 hours' minimum notice. These can be changed with the optional variables documented in `.env.example`.
