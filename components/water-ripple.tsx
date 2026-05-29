"use client";

import { useEffect, useRef } from "react";

export function WaterSurface() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const scale = 3;
    let width = 1;
    let height = 1;
    let current = new Float32Array(1);
    let previous = new Float32Array(1);
    let image = ctx.createImageData(1, 1);
    let quietFrames = 0;
    let pointerActive = false;
    let lastX = 0;
    let lastY = 0;
    let lastDropTime = 0;

    const resize = () => {
      width = Math.max(1, Math.floor(window.innerWidth / scale));
      height = Math.max(1, Math.floor(window.innerHeight / scale));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      current = new Float32Array(width * height);
      previous = new Float32Array(width * height);
      image = ctx.createImageData(width, height);
      quietFrames = 0;
    };

    const drop = (clientX: number, clientY: number, radius = 42, strength = 760) => {
      const cx = Math.floor(clientX / scale);
      const cy = Math.floor(clientY / scale);
      const r = Math.max(4, Math.floor(radius / scale));

      for (let yy = -r; yy <= r; yy += 1) {
        for (let xx = -r; xx <= r; xx += 1) {
          const x = cx + xx;
          const y = cy + yy;
          if (x <= 1 || x >= width - 1 || y <= 1 || y >= height - 1) continue;
          const dist = Math.sqrt(xx * xx + yy * yy);
          if (dist <= r) {
            previous[y * width + x] += Math.cos((dist / r) * Math.PI * 0.5) * strength;
          }
        }
      }

      quietFrames = 0;
      if (!runningRef.current) {
        runningRef.current = true;
        frameRef.current = window.requestAnimationFrame(render);
      }
    };

    const render = () => {
      const data = image.data;
      let energy = 0;

      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const index = y * width + x;
          const value =
            ((previous[index - 1] + previous[index + 1] + previous[index - width] + previous[index + width]) / 2 -
              current[index]) *
            0.974;

          current[index] = value;
          energy += Math.abs(value);

          const isDark = document.documentElement.classList.contains("dark");
          const shade = Math.max(-62, Math.min(62, value * 0.046));
          const offset = index * 4;
          const light = Math.max(0, shade);
          const dark = Math.max(0, -shade);
          const strength = Math.abs(shade);

          if (isDark) {
            data[offset] = 54 + light * 1.2;
            data[offset + 1] = 150 + light;
            data[offset + 2] = 210 + light * 1.1;
            data[offset + 3] = Math.max(0, Math.min(96, strength * 2.15));
          } else {
            data[offset] = 36 + light * 0.65 - dark * 0.35;
            data[offset + 1] = 78 + light * 0.75 - dark * 0.25;
            data[offset + 2] = 118 + light * 0.95;
            data[offset + 3] = Math.max(0, Math.min(88, strength * 2.05));
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(image, 0, 0);
      [current, previous] = [previous, current];

      if (energy < width * height * 0.015) {
        quietFrames += 1;
      }

      if (quietFrames > 18) {
        runningRef.current = false;
        ctx.clearRect(0, 0, width, height);
        return;
      }

      frameRef.current = window.requestAnimationFrame(render);
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerActive = true;
      lastX = event.clientX;
      lastY = event.clientY;
      lastDropTime = performance.now();
      drop(event.clientX, event.clientY, 40, 680);
      window.setTimeout(() => drop(event.clientX + 10, event.clientY + 8, 22, 190), 80);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = pointerActive ? 16 : 28;
      const minDelay = pointerActive ? 26 : 44;

      if (distance > minDistance && now - lastDropTime > minDelay) {
        drop(event.clientX, event.clientY, pointerActive ? 24 : 18, pointerActive ? 270 : 150);
        lastX = event.clientX;
        lastY = event.clientY;
        lastDropTime = now;
      }
    };

    const handlePointerUp = () => {
      pointerActive = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ mixBlendMode: "normal", opacity: 0.82 }}
      aria-hidden="true"
    />
  );
}
