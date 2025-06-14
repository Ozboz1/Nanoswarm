import React, { useEffect, useRef, useState } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 400, y: 300, vx: 0, vy: 0 });
  const keys = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleKeyDown = (e) => (keys.current[e.key] = true);
    const handleKeyUp = (e) => (keys.current[e.key] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
      const speed = 2;
      let vx = 0;
      let vy = 0;
      if (keys.current['w']) vy -= speed;
      if (keys.current['s']) vy += speed;
      if (keys.current['a']) vx -= speed;
      if (keys.current['d']) vx += speed;
      setPlayer((p) => ({ ...p, x: p.x + vx, y: p.y + vy, vx, vy }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.arc(player.x, player.y, 20, 0, Math.PI * 2);
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

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '2px solid black' }} />;
}
