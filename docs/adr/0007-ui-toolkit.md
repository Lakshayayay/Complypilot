# 0007 UI toolkit: Tailwind CSS and shadcn/ui

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended) · **Task:** v1-FS-1

## Context
The app is built from the Figma file `complypilot` (design decision 2026-10-19): 38 components, variables for colour, spacing and corners, Anek Latin text, Phosphor Bold icons. The code must match the design, and stay easy to read and use with a keyboard or screen reader.

## Options
| Option | For | Against |
|---|---|---|
| **Tailwind CSS + shadcn/ui** | Components are copied into our code and restyled to match Figma exactly; built-in keyboard and screen-reader support (it uses Radix, a set of unstyled accessible parts) | We own the code, so updates are by hand |
| Full kit (MUI, Mantine) | Quick start | Matching our Figma means many overrides |
| Plain CSS by hand | Full control | Most work; accessibility is easy to get wrong |

## Decision
**Tailwind CSS v4 + shadcn/ui.** Setup follows [shadcn/ui for Next.js](https://ui.shadcn.com/docs/installation/next) (checked 2026-10-21: with Tailwind v4 the config field in `components.json` stays empty). Components live in `src/components/ui/`.
- **Tokens:** the Figma variables have CSS names (e.g. `--color-bg-page`, `--space-16`, `--radius-md`, `--shadow-md`). One token file holds them and feeds Tailwind's theme, so every colour is defined once. No typed-in hex codes in code.
- **Fonts:** Anek Latin through Next.js's font loader. **Icons:** Phosphor Bold, one weight (package name checked at the first screen).
- **From Figma to code:** per screen, Claude reads Figma's design data with the `figma-design-to-code` skill, builds from our components, then compares with a Figma screenshot. Figma's Code Connect (links Figma parts to code parts) is `UNVERIFIED` on the Education plan, so a mapping table in [tech.md](../versions/v1/build/tech.md#figma-to-code) does that job.

## Consequences
- Each Figma component gets a code twin with the same name (`StatusChip`, `status="late"`).
- Logo, app icon and favicon files are exported from Figma into `public/` in the first build task.
- Changing the look later is a token edit, as in Figma.
