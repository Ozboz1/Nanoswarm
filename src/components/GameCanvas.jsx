import React, { useEffect, useRef, useState } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const keys = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Make canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Input
    const handleKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
      const speed = 3;
      let vx = 0, vy = 0;
      if (keys.current['w']) vy -= speed;
      if (keys.current['s']) vy += speed;
      if (keys.current['a']) vx -= speed;
      if (keys.current['d']) vx += speed;
      setPlayer((p) => ({ x: p.x + vx, y: p.y + vy }));
    };

    const draw = () => {
      const { width, height } = canvas;

      // Background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);

      // Motion dot grid
      ctx.fillStyle = '#2a2a2a';
      const spacing = 40;
      for (let x = -player.x % spacing; x < width; x += spacing) {
        for (let y = -player.y % spacing; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Player in center
      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
      ctx.fill();

      // Game title
      ctx.font = '20px Arial';
      ctx.fillStyle = '#ccc';
      ctx.textAlign = 'center';
      ctx.fillText('NanoSwarm.io', width / 2, 30);
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [player]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  );
}
