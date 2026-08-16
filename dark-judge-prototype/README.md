# Dark Judge — Can You Spot the Trick? (Prototype)

Interactive prototype for the course project *Dark Judge*, built for the **25 July – 13 August 2026 → 14 August 2026 "Create/Turn in prototype"** milestone (see `Group_Dark_Judge_Proposal.docx`).

This prototype implements the core game loop described in the proposal:

1. **Simulated Scenarios** — realistic mock web pages (checkout, flash sale, subscription cancellation).
2. **Spot the Trick** — click on any UI element you believe is a dark pattern.
3. **Immediate Feedback** — a modal names the dark pattern, its taxonomy category, and the psychological mechanism it exploits.
4. **Ethical Redesign Challenge** — after finding every pattern in a scenario, choose the most ethical redesign from a set of options.
5. **Ethics Score Dashboard** — aggregates your performance across scenarios into three scores: **Transparency**, **User Autonomy**, and **Fairness**.

## Scenarios included

| Scenario | Dark patterns |
|---|---|
| The "Free Shipping" Checkout | Sneak into Basket, Hidden Costs / Drip Pricing, Bait and Switch, Visual Interference |
| The Flash Sale That Never Ends | Fake Urgency, False Scarcity, Fake Social Proof, Confirmshaming |
| Canceling "StreamPlus Premium" | Roach Motel, Confirmshaming, Forced Continuity, Obstruction |

## Tech stack

Matches the proposal's stated frontend stack:

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** — dev server & build tool
- **Tailwind CSS** — styling, incl. the "visual camouflage" realistic e-commerce look
- **Pinia** — the `useEthicsStore` tracks hotspot detection, redesign choices, and computes the three Ethics Dashboard scores
- **Vue Router** — client-side navigation between Home / Scenario Select / Scenario / Dashboard

This is a **frontend-only prototype** — no backend yet. The proposal's Node.js/Express API and Supabase persistence layer are planned for the next milestone ("Create platform", 15 August – 10 September 2026), where server-side scoring and progress persistence will be added exactly as described in the Security section of the proposal (preventing client-side score manipulation).

## Running it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
```

Output goes to `dist/`.

## Project structure

```
src/
  data/scenarios.js       — all scenario + dark-pattern content (single source of truth)
  store/ethics.js         — Pinia store: hotspot tracking + score calculation
  components/
    Hotspot.vue            — clickable "trick" wrapper used inside scenario mocks
    FeedbackModal.vue       — explains a spotted dark pattern
    RedesignChallenge.vue   — end-of-scenario ethical redesign quiz
    ScoreBar.vue            — dashboard score bar
    NavBar.vue
    mocks/
      CheckoutMock.vue
      FlashSaleMock.vue
      CancellationMock.vue
  views/
    Home.vue
    ScenarioSelect.vue
    Scenario.vue            — wires a mock component to the store + modal + redesign
    Dashboard.vue
```

## Next steps toward the full platform

- Wire up the Node.js/Express backend to validate hotspot/redesign submissions server-side.
- Persist user progress in Supabase (per the Privacy section: session data only, no unnecessary PII).
- Add the remaining dark pattern types mentioned in the proposal as additional scenarios.
- Add authentication/session handling ahead of the "Create platform" milestone.
