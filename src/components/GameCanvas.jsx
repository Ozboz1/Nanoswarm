import React, { useEffect, useRef } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const player = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const keys = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fullscreen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Controls
    const setVelocity = () => {
      const speed = 3;
      let vx = 0, vy = 0;
      if (keys.current['w'] || keys.current['arrowup']) vy -= speed;
      if (keys.current['s'] || keys.current['arrowdown']) vy += speed;
      if (keys.current['a'] || keys.current['arrowleft']) vx -= speed;
      if (keys.current['d'] || keys.current['arrowright']) vx += speed;
      player.current.vx = vx;
      player.current.vy = vy;
    };

    const handleKeyDown = (e) => {
      keys.current[e.key.toLowerCase()] = true;
      setVelocity();
    };
    const handleKeyUp = (e) => {
      keys.current[e.key.toLowerCase()] = false;
      setVelocity();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
    const loop = () => {
      const { width, height } = canvas;
      const p = player.current;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);

      // Grid
      const spacing = 40;
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;
      for (let x = -p.x % spacing; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -p.y % spacing; y < height; y += spacing) {
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

      // Title
      ctx.font = '18px Arial';
      ctx.fillStyle = '#444';
      ctx.textAlign = 'center';
      ctx.fillText('NanoSwarm.io', width / 2, 30);

      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
