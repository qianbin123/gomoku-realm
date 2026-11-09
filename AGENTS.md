# Gomoku Realm — Codex repository instructions

## Product and scope
- Product: Gomoku Realm (五子棋·棋境), a seated VR Gomoku game for Meta Quest.
- Current milestone: MVP v0.1 only. Desktop mouse play + Quest 2 immersive VR controller play.
- Do not implement AI, multiplayer, payments, accounts, elaborate art, Blender scenes, skins, sound packs, or store packaging in v0.1.

## Stack
- Vite, React, TypeScript, Three.js, React Three Fiber, @react-three/xr, Zustand, Vitest.
- Before installing, verify compatible versions and current supported API usage. Review Meta's React WebXR sample and latest package docs.
- Game rules must be pure TypeScript without React or Three.js dependencies.
- Avoid a backend, physics engine, or premature abstractions.

## Workflow and token discipline
- Read this file, docs/STATUS.md and only the active task file at session start. Consult docs/PROJECT.md or docs/CONTRACTS.md when needed.
- Don't scan the whole repository unless necessary. Read only relevant source paths and minimal surrounding context.
- Main agent owns integration. Delegate only genuinely independent, substantial subtasks; do not spawn agents for simple changes or merely to read files.
- Work sequentially by default. If delegating, specify file ownership, inputs, acceptance tests and concise return format. Avoid concurrent edits to same files.
- Do not invent a pass on Quest hardware. Hardware steps are HUMAN_TEST_REQUIRED until user confirms.
- Make minimal scoped changes, run relevant tests, typecheck, build. Record blockers precisely.
- End each task with <=200 words in docs/handoffs/TASK-XXX.md: changed files, checks run/results, risks, next task. Update docs/STATUS.md. Do not paste verbose logs into handoff.
- Never expose secrets or commit signing keys, credentials, unlicensed assets or source maps to production.

## Core UX
- 15x15 intersections, alternating black and white, 5-or-more wins in any of four directions, no forbidden moves (freestyle).
- Click/tap or controller trigger to place one stone. No occupied positions. Distinct hover preview; no double trigger.
- Winner freezes moves; include reset and undo. Desktop-only UI must not be required in VR.
- Comfortable seated viewpoint, accessible in-headset actions, no forced locomotion.

## Project quality gates
- npm run test, npm run typecheck, npm run build succeed where configured.
- Desktop playable flow automated or manually evidenced.
- Quest 2 tests require HTTPS secure context, enter immersive-vr, ray hover/trigger/place, reset/undo, frame rate and comfort checks.
- Keep deployment notes for future WebXR PWA Horizon Store distribution, but do not build APK in v0.1.
