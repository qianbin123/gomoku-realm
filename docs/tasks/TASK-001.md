# TASK-001 — Desktop first

Owner: main agent, optional Game subagent if implementation is sufficiently separable.

1. Verify active docs and version compatibility of Vite, React, R3F, Three and @react-three/xr.
2. Scaffold TypeScript React project with reliable npm scripts (`dev`, `test`, `typecheck`, `build`).
3. Pure rule engine under src/game with 15x15 immutable game state and tests for valid/invalid moves, four win directions, undo, reset, draw and frozen winner state.
4. Desktop 3D board with correct 15x15 intersections, visually distinct stones and clickable hover target; active player and win UI; reset and undo.
5. Build a functional 2D desktop fallback interface only if needed for desktop debugging. Keep architecture simple.
6. Run tests, typecheck and build; fix failures. Do not claim VR compatibility yet.

Done when: real desktop playable match and tests/build pass. Log concise handoff and status; stop before TASK-002.
