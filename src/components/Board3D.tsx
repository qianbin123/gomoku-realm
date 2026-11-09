import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { BOARD_SIZE, type Cell, type Position } from '../game/rules';
import { useGameStore } from '../game/store';

const SPACING = 0.55;
const HALF = (BOARD_SIZE - 1) * SPACING / 2;
const BOARD_WIDTH = (BOARD_SIZE - 1) * SPACING + 0.85;
const intersections: Position[] = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => ({ row: Math.floor(index / BOARD_SIZE), col: index % BOARD_SIZE }));
const lines = Array.from({ length: BOARD_SIZE }, (_, index) => index * SPACING - HALF);
const stars = [3, 7, 11].flatMap((row) => [3, 7, 11].map((col) => ({ row, col })));

function point({ row, col }: Position): [number, number, number] {
  return [col * SPACING - HALF, 0, row * SPACING - HALF];
}

function Stone({ position, player, ghost = false }: { position: Position; player: Exclude<Cell, null>; ghost?: boolean }) {
  const [x, , z] = point(position);
  return (
    <mesh position={[x, ghost ? 0.105 : 0.115, z]} castShadow={!ghost} raycast={ghost ? () => null : undefined}>
      <sphereGeometry args={[0.205, 20, 14]} />
      <meshStandardMaterial color={player === 'black' ? '#171d1b' : '#f3eee2'} roughness={0.28} metalness={0.06} transparent={ghost} opacity={ghost ? 0.48 : 1} depthWrite={!ghost} />
    </mesh>
  );
}

function BoardScene() {
  const board = useGameStore((state) => state.board);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const draw = useGameStore((state) => state.draw);
  const place = useGameStore((state) => state.place);
  const [hover, setHover] = useState<Position | null>(null);
  const playable = !winner && !draw;

  return (
    <>
      <color attach="background" args={['#191e1c']} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 9, 5]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} />
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[BOARD_WIDTH, 0.36, BOARD_WIDTH]} />
        <meshStandardMaterial color="#bd8950" roughness={0.78} />
      </mesh>
      <mesh position={[0, -0.008, 0]} receiveShadow>
        <boxGeometry args={[BOARD_WIDTH - 0.12, 0.045, BOARD_WIDTH - 0.12]} />
        <meshStandardMaterial color="#d9ae72" roughness={0.84} />
      </mesh>
      {lines.map((coordinate, index) => (
        <group key={index}>
          <mesh position={[coordinate, 0.022, 0]}>
            <boxGeometry args={[0.015, 0.004, (BOARD_SIZE - 1) * SPACING]} />
            <meshBasicMaterial color="#624930" />
          </mesh>
          <mesh position={[0, 0.022, coordinate]}>
            <boxGeometry args={[(BOARD_SIZE - 1) * SPACING, 0.004, 0.015]} />
            <meshBasicMaterial color="#624930" />
          </mesh>
        </group>
      ))}
      {stars.map((position) => {
        const [x, , z] = point(position);
        return <mesh key={`${position.row}-${position.col}`} position={[x, 0.028, z]}><sphereGeometry args={[0.045, 10, 8]} /><meshBasicMaterial color="#58432f" /></mesh>;
      })}
      {board.flatMap((line, row) => line.map((player, col) => player ? <Stone key={`${row}-${col}`} position={{ row, col }} player={player} /> : null))}
      {hover && playable && !board[hover.row][hover.col] ? <Stone position={hover} player={currentPlayer} ghost /> : null}
      {intersections.map((position) => {
        const [x, , z] = point(position);
        return (
          <mesh
            key={`${position.row}-${position.col}`}
            position={[x, 0.045, z]}
            onPointerOver={(event) => { event.stopPropagation(); setHover(position); }}
            onPointerOut={() => setHover((previous) => previous?.row === position.row && previous.col === position.col ? null : previous)}
            onClick={(event) => { event.stopPropagation(); place(position); }}
          >
            <boxGeometry args={[SPACING * 0.95, 0.025, SPACING * 0.95]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        );
      })}
    </>
  );
}

export function Board3D() {
  return (
    <div className="board-canvas" aria-label="十五路三维五子棋棋盘">
      <Canvas shadows camera={{ position: [0, 8.7, 9.2], fov: 43 }} dpr={[1, 1.75]}>
        <BoardScene />
      </Canvas>
    </div>
  );
}
