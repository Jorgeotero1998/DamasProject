import React, { useState, useEffect } from 'react';

const App = () => {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [count, setCount] = useState({ w: 12, n: 12 });

  const update = (data) => {
    setBoard(data.board);
    setSuggestion(data.suggestion);
    setGameStatus(data.status);
    setCount(data.count);
  };

  useEffect(() => {
    fetch('http://localhost:8000/game/state').then(r => r.json()).then(update);
    
    const style = document.createElement('style');
    style.innerHTML = " @keyframes pulse { 0% { box-shadow: 0 0 0px #00d2ff; } 50% { box-shadow: 0 0 20px #00d2ff; } 100% { box-shadow: 0 0 0px #00d2ff; } } ";
    document.head.appendChild(style);
  }, []);

  const handleClick = async (r, c) => {
    if (selected) {
      const res = await fetch('http://localhost:8000/game/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: selected, end: [r, c] })
      });
      const data = await res.json();
      update(data);
      setSelected(null);
    } else if (board[r][c] === 1) {
      setSelected([r, c]);
    }
  };

  if (board.length === 0) return null;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        
        <div style={{ padding: '15px', background: '#3d2b1f', borderRadius: '8px', boxShadow: '0 50px 100px rgba(0,0,0,0.5)', border: '8px solid #2a1a0f' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 80px)', position: 'relative' }}>
            {board.map((row, rIdx) => row.map((cell, cIdx) => (
              <div key={rIdx+'-'+cIdx} onClick={() => handleClick(rIdx, cIdx)} style={{
                width: '80px', height: '80px',
                background: (rIdx + cIdx) % 2 !== 0 ? 'linear-gradient(45deg, #7a5030, #966b4a)' : 'linear-gradient(45deg, #d9c5b2, #f2e2d2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative'
              }}>
                {cIdx === 0 && <span style={{position:'absolute', left:3, top:2, fontSize:'10px', opacity:0.5, color:'#000'}}>{8-rIdx}</span>}
                {rIdx === 7 && <span style={{position:'absolute', right:3, bottom:2, fontSize:'10px', opacity:0.5, color:'#000'}}>{String.fromCharCode(97+cIdx)}</span>}
                {selected && selected[0] === rIdx && selected[1] === cIdx && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 210, 255, 0.4)', animation: 'pulse 1.5s infinite' }} />}
              </div>
            )))}

            {board.map((row, rIdx) => row.map((cell, cIdx) => cell !== 0 && (
              <div key={'p'+rIdx+cIdx+cell} style={{
                position: 'absolute', width: '80px', height: '80px', top: rIdx*80, left: cIdx*80,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)', pointerEvents: 'none'
              }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: cell === 1 
                    ? 'radial-gradient(circle at 30% 30%, #ffffff 0%, #d1d1d1 50%, #888 100%)' 
                    : 'radial-gradient(circle at 30% 30%, #444 0%, #111 50%, #000 100%)',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.7), inset 0 -4px 6px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }} />
              </div>
            )))}
          </div>
        </div>

        <div style={{ width: '280px', color: '#f2e2d2' }}>
          <h2 style={{ fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.6 }}>CHESSMASTER PRO</h2>
          <div style={{ margin: '20px 0', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>Blancas: <b>{count.w}</b></span>
                <span>Negras: <b>{count.n}</b></span>
             </div>
             {gameStatus && <div style={{ color: '#ff4b2b', fontWeight: 'bold', textAlign: 'center' }}>{gameStatus}</div>}
          </div>
          <div style={{ padding: '15px', borderLeft: '3px solid #00d2ff', background: 'rgba(0,210,255,0.05)' }}>
            <div style={{ fontSize: '10px', color: '#00d2ff' }}>SUGERENCIA</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{suggestion}</div>
          </div>
          <button onClick={() => fetch('http://localhost:8000/game/reset', {method:'POST'}).then(r => r.json()).then(update)} style={{
            marginTop: '30px', width: '100%', padding: '12px', background: '#d9c5b2', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
          }}>NUEVA PARTIDA</button>
        </div>
      </div>
    </div>
  );
};

export default App;
