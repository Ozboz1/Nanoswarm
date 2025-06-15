export default function GameCanvas({ username }) {
  return (
    <div style={{ color: 'white', fontSize: '24px', padding: '2rem' }}>
      ✅ Game loaded for: <strong>{username}</strong>
    </div>
  );
}