import { Board3D } from './components/Board3D';
import { useGameStore } from './game/store';
import './style.css';

const playerName = { black: '黑棋', white: '白棋' } as const;

export default function App() {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const draw = useGameStore((state) => state.draw);
  const moves = useGameStore((state) => state.moveHistory.length);
  const undo = useGameStore((state) => state.undo);
  const reset = useGameStore((state) => state.reset);
  const message = winner ? `${playerName[winner]}获胜` : draw ? '平局' : `轮到${playerName[currentPlayer]}`;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">五</span><div><strong>棋境</strong><small>GOMOKU REALM</small></div></div>
        <span className="edition">桌面试玩 · 15 路棋盘</span>
      </header>
      <section className="play-layout">
        <div className="board-panel">
          <div className="board-header"><span>对弈棋盘</span><span>第 {moves + 1} 手</span></div>
          <Board3D />
          <div className="board-caption">移动鼠标预览落点 · 点击交叉点落子</div>
        </div>
        <aside className="side-panel">
          <div className="overline">CURRENT MATCH</div>
          <h1>落子之间，<br />胜负已定。</h1>
          <div className="status-card" role="status" aria-live="polite">
            <div className="status-label">对局状态</div>
            <div className="status-main"><span className={`turn-stone ${winner ?? currentPlayer}`} />{message}</div>
            <div className="status-detail">{winner || draw ? '本局已结束，可悔棋或重新开始。' : '率先连成五子的一方获胜。'}</div>
          </div>
          <div className="players"><div><span className="mini-stone black" />黑棋 <small>先手</small></div><div><span className="mini-stone white" />白棋 <small>后手</small></div></div>
          <div className="actions"><button onClick={undo} disabled={moves === 0}>悔棋</button><button className="primary" onClick={reset}>重新开始</button></div>
          <p className="rules-note">自由五子棋 · 横、竖、斜任一方向连成五子或以上即获胜。</p>
        </aside>
      </section>
    </main>
  );
}
