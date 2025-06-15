import React, { useEffect, useRef } from 'react';
const CELL_NODES = [
  { x: 500, y: 400 },
  { x: -600, y: 800 },
  { x: 300, y: -1000 }
];
const swarmUnits = Array.from({ length: 10 }, (_, i) => ({ x: 0, y: 0, offset: i * 40 }));

export default function GameCanvas() {
  const canvasRef = useRef(null);
  const player = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const keys = useRef({});
  const virusSprite = new Image();
  virusSprite.src = '/assets/blue-virus.png';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const updateVelocity = () => {
      const speed = 3;
      let vx = 0, vy = 0;
      if (keys.current['w'] || keys.current['arrowup']) vy -= speed;
      if (keys.current['s'] || keys.current['arrowdown']) vy += speed;
      if (keys.current['a'] || keys.current['arrowleft']) vx -= speed;
      if (keys.current['d'] || keys.current['arrowright']) vx += speed;
      player.current.vx = vx;
      player.current.vy = vy;
    };

    const keyDown = e => { keys.current[e.key.toLowerCase()] = true; updateVelocity(); };
    const keyUp = e => { keys.current[e.key.toLowerCase()] = false; updateVelocity(); };
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    const loop = () => {
      const p = player.current;
      p.x += p.vx;
      p.y += p.vy;

      const { width, height } = canvas;
      ctx.fillStyle = '#fce0e0';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#ffb3b3';
      const spacing = 200;
      for (let i = -5; i <= 5; i++) {
        const offset = (i * spacing - p.y % spacing);
        ctx.beginPath();
        ctx.moveTo(0, offset);
        ctx.bezierCurveTo(width/3, offset+40, width*2/3, offset-40, width, offset);
        ctx.stroke();
      }

      for (let i = 0; i < 40; i++) {
        const cx = (i * 300 - p.x % 300) % width;
        const cy = (i * 180 + p.x % 180) % height;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 80, 80, 0.2)';
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'purple';
      CELL_NODES.forEach(node => {
        const screenX = width/2 + (node.x - p.x);
        const screenY = height/2 + (node.y - p.y);
        ctx.beginPath();
        ctx.arc(screenX, screenY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '12px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Mine', screenX - 12, screenY - 25);
      });

      swarmUnits.forEach((unit, i) => {
        const angle = i * 0.5;
        const offsetX = Math.cos(angle) * 50;
        const offsetY = Math.sin(angle) * 50;
        const ux = width/2 + offsetX;
        const uy = height/2 + offsetY;
        ctx.beginPath();
        ctx.fillStyle = '#0066cc';
        ctx.arc(ux, uy, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.drawImage(virusSprite, width/2 - 25, height/2 - 25, 50, 50);
      ctx.fillStyle = 'green';
      ctx.fillRect(width/2 - 25, height/2 - 40, 50, 6);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(width/2 - 25, height/2 - 40, 50, 6);

      ctx.font = '20px Arial';
      ctx.fillStyle = '#aa3333';
      ctx.textAlign = 'center';
      ctx.fillText('NanoSwarm.io', width / 2, 25);

      const mapRadius = 60;
      const mapX = 80;
      const mapY = 80;
      ctx.beginPath();
      ctx.arc(mapX, mapY, mapRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.arc(mapX, mapY, 5, 0, Math.PI * 2);
      ctx.fill();

      CELL_NODES.forEach(node => {
        const dx = node.x / 2000 * mapRadius;
        const dy = node.y / 2000 * mapRadius;
        ctx.beginPath();
        ctx.fillStyle = 'magenta';
        ctx.arc(mapX + dx, mapY + dy, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.font = '14px Arial';
      ctx.fillStyle = '#222';
      ctx.fillRect(width - 180, 20, 160, 160);
      ctx.fillStyle = '#fff';
      ctx.fillText('Leaderboard', width - 100, 40);
      for (let i = 0; i < 10; i++) {
        ctx.fillText(`#${i + 1} Player${i + 1} - ${1000 - i * 100} XP`, width - 170, 60 + i * 14);
      }

      requestAnimationFrame(loop);
    };
    virusSprite.onload = loop;

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
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
