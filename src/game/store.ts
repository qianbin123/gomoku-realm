import { create } from 'zustand';
import { placeStone, resetGame, undoMove, type GameState, type Position } from './rules';

type GameStore = GameState & {
  place: (position: Position) => void;
  undo: () => void;
  reset: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  ...resetGame(),
  place: (position) => set((state) => placeStone(state, position)),
  undo: () => set((state) => undoMove(state)),
  reset: () => set(resetGame()),
}));
