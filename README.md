# Quick Commerce — Onboarding Prototype

A static, mobile-only HTML/CSS/JS prototype of the login and sign-up
flow for Quick Commerce, built from the reference screens under
`../Login/` and `../ SignUp/`.

Vanilla everything — no framework, no build step, no runtime
dependencies beyond Google Fonts (optional).

## Run locally

```bash
cd app
python3 -m http.server 8080
```

Open [http://localhost:8080/](http://localhost:8080/).

Jump to any screen directly with the hash: `/#login-otp`,
`/#signup-aadhar`, `/#signup-pay`, `/#home`, etc.

## Deploy to GitHub Pages

1. Push the contents of this `app/` directory to a repo (either as the
   repo root or under `/docs/`).
2. In **Settings → Pages**, pick the `main` branch and either `/ (root)`
   or `/docs` to match where you placed the files.
3. Open `https://<user>.github.io/<repo>/`.

The repo already includes:

- `.nojekyll` so Pages serves the files verbatim.
- `404.html` as a byte-for-byte copy of `index.html` so a deep-link
  refresh (`/#signup-aadhar`) still boots the app on sub-paths.
- All paths relative — no leading `/`, no root-absolute imports, no
  `process.env`, no Node APIs.
- Filenames consistently lowercase and matched case-for-case by every
  import.
- `<script type="module">` with explicit `.js` extensions.

## Flows built

### Login (phone-only path)

| Hash                 | Screen                                                      |
| -------------------- | ----------------------------------------------------------- |
| `#login-phone`       | Logo pill, phone number entry, "Send OTP", sign-up link     |
| `#login-otp`         | 4-digit OTP with countdown and resend                       |
| `#home`              | Placeholder "Home" page with log-out                        |

### Sign up (full onboarding)

| Hash                 | Screen                                                      |
| -------------------- | ----------------------------------------------------------- |
| `#signup-info`       | First / last name, email, phone                             |
| `#signup-email-otp`  | Verify email with 4-digit OTP                               |
| `#signup-phone-otp`  | Verify phone with 4-digit OTP                               |
| `#signup-aadhar`     | Aadhaar number + Front/Back upload tabs                     |
| `#signup-pan`        | PAN number + single-side upload                             |
| `#signup-dl`         | Driving licence number + Front/Back upload tabs             |
| `#signup-pay`        | Pay ₹699 platform fee                                       |
| ↑ success modal      | "Congratulations" overlay → auto-redirect to `#home`        |

Any 4-digit OTP is accepted. Any phone number of 10 digits is accepted.
Document uploads are simulated — tapping the dashed card drops in a
pre-made illustration and marks the side complete; the button advances
only when all required sides are attached.

### What's intentionally stubbed

- Google sign-in (visible on the Login 3 reference) is **not wired**;
  the current path uses the fuller signup form directly.
- Home is a placeholder — the brief covered onboarding only.
- Platform-fee payment never calls a real gateway.

## File layout

```
app/
├── index.html
├── 404.html                     byte-for-byte copy of index.html
├── .nojekyll                    empty file (Pages serves /_… paths)
├── README.md
├── css/
│   ├── reset.css                reset + prefers-reduced-motion guard
│   ├── variables.css            tokens — color, type, spacing, motion
│   ├── base.css                 body, phone frame, status bar, viewport
│   ├── components.css           every reusable UI piece
│   ├── screens.css              per-screen layout composed from components
│   └── animations.css           route transitions + keyframes
├── js/
│   ├── icons.js                 inline SVG icon map (incl. ID illustrations)
│   ├── data.js                  dummy constants and defaults
│   ├── store.js                 localStorage adapter + in-memory fallback
│   ├── components.js            DOM builders (buttons, OTP, upload card, …)
│   ├── router.js                screen stack + forward/back transitions
│   ├── screens.js               each route as a factory → DOM node
│   └── app.js                   entry point: builds the phone frame + boots
└── assets/                      empty — see "Assets handoff"
```

## Design tokens

Every value lives in `css/variables.css`. Screens never hard-code a
color, radius, duration, or spacing — swap the token values to re-skin
the whole app.

- **Color** — ink ramp (`--ink → --ink-faint`), surfaces, lines, accent
  (near-black primary button), danger (red timer / errors), success
  (toast). Dark counterparts live under
  `.phone[data-theme="dark"]` on the phone root; add
  `data-theme="dark"` to the `.phone` element to flip the whole app
  without touching screens.
- **Radii** — `--r-xs 8` through `--r-xl 28` plus `--r-pill 999` (used
  by the primary button and inputs).
- **Spacing** — 4-pt base, `--s-1 … --s-8` (4 / 8 / 12 / 16 / 20 / 24 /
  32 / 40).
- **Type** — `Mulish` from Google Fonts (optional); system sans
  fallback.
- **Motion** — `--dur-fast 140ms`, `--dur-base 220ms`, `--dur-slow
  360ms`; `--ease-std` is `cubic-bezier(0.2, 0.8, 0.2, 1)`.

## Interactions

- **Screen transitions** — slide-in-right forward, slide-in-left back,
  220ms, `--ease-std`.
- **Primary button** — scales to 0.97 on `:active`.
- **OTP cells** — auto-advance, Backspace steps back, pop animation on
  fill, pasting a 4-digit code fills all cells; `aria-label` names each
  digit.
- **Countdown** — live 0:30 timer; the resend row swaps to a clickable
  "Resend" link when it hits zero.
- **Toast** — slides up at the bottom, auto-dismisses after 2.5 s,
  announced via `aria-live`.
- **Congrats modal** — overlay with 40%-black backdrop, animated check
  stroke, auto-dismisses to `#home` after 1.8 s.
- **`prefers-reduced-motion: reduce`** collapses every animation.

## Accessibility

- Semantic `<main>`, `<header>`, `<section>` landmarks per screen.
- `aria-label` on icon-only controls; `aria-current` and
  `aria-selected` on tabs; `role="dialog"` + `aria-modal` on the
  congrats overlay; `role="group"` on the OTP cluster.
- 44 × 44 CSS px minimum touch targets.
- `aria-live="polite"` region for toasts and timers.
- Focus-visible outlines on every interactive element.
- Keyboard: ArrowLeft / ArrowRight step between OTP cells; Enter
  activates the primary button; Escape dismisses dismissible overlays.

## Storage

User data persists via `localStorage` under the key `qc_proto_v1`.
When storage is disabled (private browsing, blocked, or quota) the
`store.js` module silently falls back to an in-memory object — the UX
does not degrade.

To reset the demo state, open DevTools and run `localStorage.clear()`
in the console, or hit **Log out** on the Home screen.

## Assets handoff

The prototype ships asset-free — every icon and ID illustration is
inline SVG shipped in `js/icons.js`. If real brand imagery arrives
later, drop it under `assets/` and reference it relatively:

| Where in the UI       | Suggested path                 | Format     | Target size |
| --------------------- | ------------------------------ | ---------- | ----------- |
| App logo (`Logo` pill)| `assets/logo.svg`              | SVG        | 128 × 128   |
| Favicon               | `favicon.svg`                  | SVG        | 512 × 512   |
| iOS touch icon        | `apple-touch-icon.png`         | PNG        | 180 × 180   |
| Aadhaar sample        | `assets/samples/aadhar.jpg`    | JPG / WebP | 800 × 480   |
| PAN sample            | `assets/samples/pan.jpg`       | JPG / WebP | 800 × 480   |
| DL sample             | `assets/samples/dl.jpg`        | JPG / WebP | 800 × 480   |

To swap the inline Aadhaar illustration for a real sample image, change
the `aadhar-front` entry in `js/icons.js` to an `<svg><image href="assets/samples/aadhar.jpg"/></svg>` wrapper, or render an `<img>` directly from
`js/components.js:uploadCard`.
