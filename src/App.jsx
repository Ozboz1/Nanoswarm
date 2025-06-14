import React from 'react';
import GameCanvas from './components/GameCanvas';

export default function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'sans-serif' }}>NanoSwarm.io</h1>
      <GameCanvas />
    </div>
  );
}