import React, { useEffect, useRef, useState } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 0, y: 0, vx: 0, vy: 0 });
  const keys = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
      const speed = 2.5;
      let vx = 0;
      let vy = 0;
      if (keys.current['w']) vy -= speed;
      if (keys.current['s']) vy += speed;
      if (keys.current['a']) vx -= speed;
      if (keys.current['d']) vx += speed;

      setPlayer((p) => ({ ...p, x: p.x + vx, y: p.y + vy, vx, vy }));
    };

    const draw = () => {
      const { width, height } = canvas;

      // --- draw dark background ---
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, width, height);

      // --- draw subtle dot grid (slither.io style) ---
      ctx.fillStyle = '#222';
      const spacing = 40;
      for (let x = -player.x % spacing; x < width; x += spacing) {
        for (let y = -player.y % spacing; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- draw player at center ---
      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [player]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '2px solid black', backgroundColor: '#000' }}
    />
  );
}
