# PrepMate

A real-time technical interview platform that connects interviewees with interviewers for live mock interviews, video calls, and structured feedback.

**Live demo:** https://prepmate-wine-beta.vercel.app

## Overview

PrepMate lets interviewees book live mock interview sessions with interviewers across multiple domains (Frontend, Backend, Fullstack, DSA, System Design, Behavioral, DevOps, Mobile), conduct the session over real-time video, and receive structured feedback afterward. Interviewers manage their availability and get paid out through a credit-based system.

## Features

- **Role-based accounts** — users onboard as either an Interviewee or an Interviewer
- **Live video interviews** — real-time video calls powered by Stream
- **Booking & availability** — interviewers set availability slots; interviewees book sessions
- **Structured feedback** — interviewers rate sessions (Poor / Average / Good / Excellent) with written feedback
- **AI-generated interview questions** — powered by Google Gemini
- **Credit & payout system** — credit purchases, booking deductions/earnings, and interviewer payouts
- **Dashboard** — track upcoming appointments, past sessions, and earnings
- **Authentication** — secure sign-up/sign-in via Clerk
- **Email notifications** — transactional emails via Resend
- **Bot & abuse protection** — powered by Arcjet

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Auth:** Clerk
- **Database:** PostgreSQL + Prisma ORM
- **Real-time video/chat:** Stream (Video & Chat SDKs)
- **AI:** Google Generative AI (Gemini)
- **Email:** Resend + React Email
- **Styling/UI:** Tailwind CSS, Radix UI, shadcn/ui
- **Security:** Arcjet
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database

### Installation

```bash
git clone https://github.com/bhavikkathiriya/Real-Time-Interview-Platform.git
cd Real-Time-Interview-Platform
npm install
```

### Environment Variables

Create a `.env` file in the root with:

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ARCJET_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
RESEND_API_KEY=
ADMIN_PAYOUT_PASSWORD=
NEXT_PUBLIC_APP_URL=
```

### Database Setup

```bash
npx prisma migrate deploy
```

### Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  (auth)/          # Sign-in / sign-up
  (main)/
    dashboard/     # User dashboard
    explore/       # Browse interviewers
    interviewers/  # Interviewer profiles
    call/          # Live video call rooms
    appointments/  # Booking management
    payout/        # Interviewer payouts
    onboarding/    # Role selection & profile setup
  api/webhooks/    # Stream webhooks
actions/           # Server actions (bookings, calls, payouts, etc.)
prisma/            # Database schema & migrations
components/        # UI components
```

## Roadmap

- [ ] Add more interview categories
- [ ] Interviewer ratings/reviews page
- [ ] In-app messaging beyond call sessions

## License

MIT
