import React, { useEffect, useRef, useState } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const keys = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

      // Light background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);

      // Moving grid lines
      const spacing = 40;
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -player.x % spacing; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -player.y % spacing; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Player (centered)
      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 20, 0, Math.PI * 2);
      ctx.fill();

      // Game name
      ctx.font = '18px Arial';
      ctx.fillStyle = '#444';
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
