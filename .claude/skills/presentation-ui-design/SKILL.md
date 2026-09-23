---
name: presentation-ui-design
description: Design system and conventions for this project's interactive React/Tailwind/Framer-Motion presentation decks (src/components/presentations/*.jsx), captured from the insurance-industry deck (Presentation5.jsx). Use whenever adding, editing, or restyling a slide, card, chart, or interactive element in any presentation file in this repo — even if the user just says "add a slide" or "make this look better" without naming the design system. Covers color roles, typography scale, card/motion patterns, and the slide-numbering discipline these decks rely on.
---

# Presentation UI Design (this repo's decks)

These decks are full-screen, single-page presentations (`fixed inset-0` overlay) built as one big component per deck, with a `slides` array driving a switch-like render. This skill captures the conventions that already exist across the deck so new slides feel native instead of bolted on — read it before touching a presentation file, and update it when you deliberately establish a new pattern.

## Why this exists

The deck evolved slide-by-slide over a long session of small, specific requests. Patterns that look arbitrary in isolation (why is loss always red, why do stat numbers use amber, why is everything capped at 1280px) are actually load-bearing conventions the user corrected into place. Breaking them without noticing makes new slides look inconsistent even when each one is individually fine.

## Color roles (not decoration — each color means something)

- **Red** (`red-300/400/500`) = problem, loss, "without VisuN AI", negative growth. Border `border-red-300/25-35`, bg `bg-red-500/8-15`, glow shadows use `rgba(239,68,68,...)`.
- **Emerald** (`emerald-300/400/500`) = solved, result, "with VisuN AI", positive growth, success/checkmarks. Same opacity conventions as red, glow `rgba(16,185,129,...)` or `rgba(52,211,153,...)`.
- **Cyan** (`cyan-300/400/500`) = brand neutral — VisuN AI itself, navigation, links, active/selected UI, solutions (in the drag-connect game). This is the "our product" color, distinct from red/emerald which describe *state*.
- **Amber** (`amber-200/300`) = headline stat numbers specifically (the big `text-2xl`+ figure in a card), regardless of whether the surrounding card is red or emerald-themed. Amber = "look at this number."
- **Slate-900/65 or slate-950** = card/panel background, always translucent, never opaque — this is what gives the deck its dark-glass look against the animated gradient background.
- Never introduce a new hue for a new concept without checking whether red/emerald/cyan/amber already covers it — they almost always do.

## Typography scale

Established after an explicit "everything looks zoomed" correction — these are the ceilings, don't drift back up:

- Slide header title (top of every standard slide): `text-[clamp(0.85rem,2.4vw,2.1rem)] font-black`
- Hero slide titles (cover, solution intro, closing — the big centered moments): `text-[clamp(1.2rem,3vw,2.4rem)]` to `text-[clamp(1.4rem,3.4vw,2.6rem)] font-black`
- Body copy inside cards: `text-xs` to `text-sm`, never `text-base`+ by default
- Big stat numbers: `text-2xl` to `text-3xl font-black tracking-tight`, amber
- Section/category labels: `text-[11px]` or `text-xs font-semibold uppercase tracking-[0.14em]`

Outer layout is capped at `max-w-[1280px]` (main grid) / `max-w-[1200px]` (header) — don't let a new slide's content exceed this or it'll feel disproportionately large next to the others.

## Card pattern

Standard card: `rounded-2xl` (or `rounded-[2rem]` for hero-scale cards) + translucent `bg-slate-900/65` + a themed translucent border (`border-red-300/25` etc.) + a matching-color drop shadow (`shadow-[0_18px_50px_rgba(...)]`). Entrance animation via `framer-motion`: `initial={{ opacity: 0, y: 16 }}`, `animate={{ opacity: 1, y: 0 }}`, staggered `delay: index * 0.08–0.1`.

**Company / case-study cards** (the recurring pattern across the loss and "how they solved it" slides): a real, non-watermarked photo as a true `aspect-square` block (not a squashed header strip — the user explicitly corrected this once), gradient overlay (`bg-gradient-to-t from-slate-950/95 via-{tone}-950/25 to-transparent`) with the name overlaid at the bottom, then a content section below with stat → description → small source citation link (`text-[10-11px] text-slate-500 hover:text-cyan-200`). Never use a letter-monogram or generic icon badge in place of a real photo unless explicitly told the company/name is fictional or unavailable — in that case, keep it text-only and say so, don't fabricate a logo.

**Flip cards** (click to reveal): `perspective:1200px` on the outer wrapper, an inner `[transform-style:preserve-3d]` div that rotates `rotateY` 0↔180, two `absolute inset-0 [backface-visibility:hidden]` faces, the back face pre-rotated `rotateY(180deg)`. Because the faces are `position: absolute`, the *outer* wrapper needs an explicit height (not `aspect-square`, which collapses to 0 when children are absolutely positioned) — size it to fit the taller face's content.

## Motion patterns

- **Entrance**: fade + rise, staggered by index — the default for any list of cards.
- **Floating/bobbing** (used for "this orbits/matters" elements): `animate={{ y: [0, -6, 0] }}` with `repeat: Infinity`, staggered delay so items don't bob in sync.
- **Radial/circular arrangements** (e.g., cards around a photo): compute positions with real trigonometry (`Math.cos`/`Math.sin` over evenly-spaced angles), not hand-picked percentages — hand-picked points drift off-center and the user will notice. Add a thin dashed SVG spoke line from center to each point so the "belongs to this" relationship reads immediately instead of relying on implied spacing.
- **Drag-and-connect interactions**: track refs per draggable/droppable element, compute anchor points via `getBoundingClientRect()` relative to a shared container ref, draw the connecting line as an animated SVG `path` (`pathLength` 0→1). Keep the small connector dot on the edge of each card that faces the *other* column, not the outward edge — this was corrected explicitly and is easy to get backwards.
- **Data viz** (donut rings, range bars): built as small reusable components (`DonutStat`, `RangeStat` in Presentation5.jsx) with a `size="sm"|"md"` prop rather than one-off inline SVG per use site — reuse them instead of re-deriving.

## Slide-numbering discipline

Every slide object has a `label: "Slide N"` field shown on-screen, and slides are frequently inserted, removed, merged, or reordered mid-conversation. **Whenever the slide array changes shape, renumber every `label` sequentially from 1** — grep for `label: "Slide` across the file and check the sequence before calling the edit done. A gap or duplicate number is an immediately visible bug on the live deck.

## Verification habit

After any edit to a presentation file: `npx eslint <file>` then `npm run build` (the build can take over the 2-minute default timeout on this machine — run it via `run_in_background: true` and wait for the completion notification rather than assuming a timeout means failure). Only report a change as done once both pass and the dev server responds `200` at the relevant route.

## Content integrity

These decks cite real companies, tools, and statistics. Don't invent numbers, logos, or sources:
- A specific figure attributed to a named real company needs a real, checkable source — search for one before including it, and say plainly if you can't find one rather than guessing.
- If a source itself anonymizes a company (e.g., "name changed to protect privacy"), keep that anonymization — don't invent or imply a real name.
- Never guess a direct image/logo URL for a trademarked brand. If the user hasn't supplied a real photo, use an honest placeholder (plain text, a generic themed stock photo, or a simple monogram) and say why.
- Keep narrative ordering strict: problem-only slides stay problem-only (no solution/fix language or tool names) until the deck actually reaches the solution — several corrections in this deck were specifically about solution language leaking too early.
