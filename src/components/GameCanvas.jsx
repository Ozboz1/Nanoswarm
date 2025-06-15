import React from 'react';

export default function GameCanvas({ username, userData }) {
  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      ✅ Game loaded for <strong>{username}</strong> | Level: {userData.level} | XP: {userData.xp}
    </div>
  );
}
