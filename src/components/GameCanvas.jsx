import React, { useRef, useEffect } from "react";

export default function GameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(400, 300, 25, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "2px solid #000", marginTop: "20px" }}
    />
  );
}
