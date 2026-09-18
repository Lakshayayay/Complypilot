# ADR-0001: Organise the project by version

**Status:** Accepted · 2026-09-18

## Context
Lakshay builds ComplyPilot alone and wants a production-style process. We could organise the docs by skill track (UX, full-stack, AI, testing) or by version.

## Decision
Versions are the top level. Each version (v1→v5) is a full product cycle with its own folder: plan, research, design, build, AI, test and review docs. Skill tracks are only tags on tasks. A few files cover all versions: PDP (vision), ROADMAP, STATUS, SYSTEM (how the product works today), ADRs and CHANGELOG.

## Why
- Real teams ship usable releases that every skill builds together. Scrum Guide 2020: "the Increment must be usable"; teams have "all the skills necessary". https://scrumguides.org/scrum-guide.html
- Building design and code together, a slice at a time, avoids parts that don't fit at the end (Shape Up). https://basecamp.com/shapeup/0.3-chapter-01
- Design docs drift from reality over time, so one living SYSTEM.md shows how things work now. https://www.industrialempathy.com/posts/design-docs-at-google/

## Consequences
- What to do next is always in the current version's README.
- Research and details for a version stay in its own folder.
- SYSTEM.md must be updated at every checkpoint, or it goes stale.
