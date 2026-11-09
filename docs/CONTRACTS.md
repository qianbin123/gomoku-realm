# Minimal interfaces and ownership

`src/game` owns all rule logic; `src/vr` or `src/components` owns rendering and input. No Three.js imports in game logic.

Preferred API (adapt only with explicit documented reason):

```ts
type Player = 'black' | 'white';
type Cell = Player | null;
type Position = { row: number; col: number }; // 0..14
type GameState = {
  board: Cell[][];
  currentPlayer: Player;
  winner: Player | null;
  draw: boolean;
  moveHistory: Position[];
};
function placeStone(state: GameState, position: Position): GameState;
function undoMove(state: GameState): GameState;
function resetGame(): GameState;
```

Invalid moves should leave state unchanged; no random side effects. Use clear state transition tests. Renderer maps board coordinates to mesh intersections. Input adapters call only state actions, not direct board mesh mutation.

Own files by task: Game Agent `src/game/**`, tests for those files; XR Agent `src/vr/**` or `src/components/**`; main agent owns configs, global app wiring, docs and integration. QA reviews or adds tests after merges; avoid simultaneous conflicting writes.
