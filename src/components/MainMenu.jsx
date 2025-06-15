export default function MainMenu({ onStart, setUsername, soundOn, setSoundOn }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1 style={{ color: 'white' }}>NanoSwarm.io</h1>
      <input
        placeholder='Enter Username'
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <br />
      <button onClick={() => setSoundOn(!soundOn)} style={{ margin: '10px' }}>
        Sound: {soundOn ? 'ON' : 'OFF'}
      </button>
      <br />
      <button onClick={() => onStart(true)} style={{ padding: '10px 20px', fontSize: '18px' }}>
        ▶️ Start Game
      </button>
    </div>
  );
}
