export const BOARD_SIZE = 15;
export type Player = 'black' | 'white';
export type Cell = Player | null;
export type Position = { row: number; col: number };
export type GameState = {
  board: Cell[][];
  currentPlayer: Player;
  winner: Player | null;
  draw: boolean;
  moveHistory: Position[];
};

const directions = [[1, 0], [0, 1], [1, 1], [1, -1]] as const;

export function resetGame(): GameState {
  return {
    board: Array.from({ length: BOARD_SIZE }, () => Array<Cell>(BOARD_SIZE).fill(null)),
    currentPlayer: 'black',
    winner: null,
    draw: false,
    moveHistory: [],
  };
}

function isInside(row: number, col: number): boolean {
  return Number.isInteger(row) && Number.isInteger(col) && row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function hasFive(board: Cell[][], { row, col }: Position, player: Player): boolean {
  return directions.some(([dr, dc]) => {
    let count = 1;
    for (const sign of [-1, 1]) {
      let r = row + sign * dr;
      let c = col + sign * dc;
      while (isInside(r, c) && board[r][c] === player) {
        count++;
        r += sign * dr;
        c += sign * dc;
      }
    }
    return count >= 5;
  });
}

export function placeStone(state: GameState, position: Position): GameState {
  const { row, col } = position;
  if (!isInside(row, col) || state.board[row][col] !== null || state.winner || state.draw) return state;

  const board = state.board.map((line, index) => index === row ? line.map((cell, column) => column === col ? state.currentPlayer : cell) : line);
  const moveHistory = [...state.moveHistory, { row, col }];
  const winner = hasFive(board, position, state.currentPlayer) ? state.currentPlayer : null;
  return {
    board,
    currentPlayer: state.currentPlayer === 'black' ? 'white' : 'black',
    winner,
    draw: !winner && moveHistory.length === BOARD_SIZE * BOARD_SIZE,
    moveHistory,
  };
}

export function undoMove(state: GameState): GameState {
  if (state.moveHistory.length === 0) return state;
  const moveHistory = state.moveHistory.slice(0, -1);
  const { row, col } = state.moveHistory[state.moveHistory.length - 1];
  const board = state.board.map((line, index) => index === row ? line.map((cell, column) => column === col ? null : cell) : line);
  return {
    board,
    currentPlayer: state.currentPlayer === 'black' ? 'white' : 'black',
    winner: null,
    draw: false,
    moveHistory,
  };
}
