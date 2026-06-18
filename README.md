# SHAPE Discovery

A no-account, browser-only SHAPE assessment built with Next.js. Visitors move through Spiritual Gifts, Heart, Abilities, Personality, Experiences and Availability, then receive an instant personalised summary.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to a different Vercel account

This app has no database, API keys or environment variables.

1. Put this folder in a GitHub repository owned by (or shared with) the target account.
2. Sign in to the desired Vercel account.
3. Choose **Add New → Project**, import the repository and keep the detected Next.js defaults.
4. Select **Deploy**.

Alternatively, from this folder run `npx vercel login`, confirm the desired account/team with `npx vercel whoami`, then run `npx vercel --prod`. Do not copy a `.vercel` folder between accounts; link the project again in the target account.

## Reuse and customise

- Assessment wording and option lists: `src/data/assessment.ts`
- Personalised result patterns: `src/lib/results.ts`
- Experience and flow UI: `src/components/shape-assessment.tsx`
- Brand colours and visual styling: `src/app/globals.css`

Progress is stored only in the guest's browser using `localStorage`. Nothing is uploaded.
