export default function MainMenu({ onStart, setUsername, soundOn, setSoundOn }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>NanoSwarm.io</h1>
      <input placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
      <br />
      <button onClick={() => setSoundOn(!soundOn)}>Sound: {soundOn ? "ON" : "OFF"}</button>
      <br />
      <button onClick={() => onStart(true)}>Start</button>
    </div>
  );
}