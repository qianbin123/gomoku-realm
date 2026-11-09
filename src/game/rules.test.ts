import { describe, expect, it } from 'vitest';
import { BOARD_SIZE, placeStone, resetGame, undoMove, type Cell, type GameState, type Position } from './rules';

function play(moves: Position[]): GameState {
  return moves.reduce(placeStone, resetGame());
}

describe('Gomoku rules', () => {
  it('starts empty and alternates turns on valid moves', () => {
    const start = resetGame();
    expect(start.board).toHaveLength(15);
    expect(start.board.every((line) => line.length === 15 && line.every((cell) => cell === null))).toBe(true);
    const first = placeStone(start, { row: 7, col: 7 });
    expect(first.board[7][7]).toBe('black');
    expect(first.currentPlayer).toBe('white');
    expect(start.board[7][7]).toBeNull();
    const second = placeStone(first, { row: 8, col: 8 });
    expect(second.board[8][8]).toBe('white');
    expect(second.currentPlayer).toBe('black');
  });

  it('ignores occupied and out-of-range moves', () => {
    const state = play([{ row: 0, col: 0 }]);
    expect(placeStone(state, { row: 0, col: 0 })).toBe(state);
    expect(placeStone(state, { row: -1, col: 0 })).toBe(state);
    expect(placeStone(state, { row: 15, col: 0 })).toBe(state);
    expect(placeStone(state, { row: 1.5, col: 0 })).toBe(state);
  });

  it.each([
    ['horizontal', [0, 1], [14, 10]],
    ['vertical', [1, 0], [10, 14]],
    ['diagonal down', [1, 1], [10, 10]],
    ['diagonal up', [-1, 1], [4, 10]],
  ] as const)('detects %s edge five and freezes play', (_, [dr, dc], [row, col]) => {
    const moves: Position[] = [];
    for (let i = 0; i < 5; i++) {
      moves.push({ row: row + i * dr, col: col + i * dc });
      if (i < 4) moves.push({ row: 7, col: i });
    }
    const state = play(moves);
    expect(state.winner).toBe('black');
    expect(placeStone(state, { row: 6, col: 6 })).toBe(state);
  });

  it('undoes a winning move and resets the board', () => {
    const state = play([0, 1, 2, 3, 4].flatMap((col) => col < 4 ? [{ row: 0, col }, { row: 7, col }] : [{ row: 0, col }]));
    const undone = undoMove(state);
    expect(undone.winner).toBeNull();
    expect(undone.currentPlayer).toBe('black');
    expect(undone.board[0][4]).toBeNull();
    expect(undoMove(resetGame())).toEqual(resetGame());
    expect(resetGame().moveHistory).toHaveLength(0);
  });

  it('detects a full-board draw and rejects further moves', () => {
    const tile = ['00111', '00101', '00011', '11010'];
    const board: Cell[][] = Array.from({ length: BOARD_SIZE }, (_, row) => Array.from({ length: BOARD_SIZE }, (_, col) => tile[row % 4][col % 5] === '0' ? 'black' : 'white'));
    board[14][14] = null;
    const state: GameState = { board, currentPlayer: 'white', winner: null, draw: false, moveHistory: Array.from({ length: 224 }, (_, i) => ({ row: Math.floor(i / 15), col: i % 15 })) };
    const result = placeStone(state, { row: 14, col: 14 });
    expect(result.draw).toBe(true);
    expect(result.winner).toBeNull();
    expect(placeStone(result, { row: 0, col: 0 })).toBe(result);
    expect(undoMove(result).draw).toBe(false);
  });
});
