"use client";
import { useEffect, useRef } from 'react';

interface NetworkDiffusionProps {
  variant?: 'full' | 'panel';
  className?: string;
}

export default function NetworkDiffusion({ variant = 'full', className = '' }: NetworkDiffusionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const computeSize = () => {
      if (variant === 'panel') {
        const rect = container.getBoundingClientRect();
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        return { w: rect.width * dpr, h: rect.height * dpr };
      }

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      return { w: window.innerWidth * dpr, h: window.innerHeight * dpr };
    };

    let { w: width, h: height } = computeSize();

    ctx.scale(dpr, dpr);

    const center = {
      x: width / (2 * dpr),
      y: height / (2 * dpr),
      radius: 6
    };

    const particles = Array.from({ length: variant === 'panel' ? 80 : 120 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: variant === 'panel'
        ? Math.random() * (Math.min(width / dpr, height / dpr) * 0.55) + 30
        : Math.random() * (Math.min(width / dpr, height / dpr) / 2 - 20) + 20,
      speed: Math.random() * 0.0016 + 0.0008,
      phase: Math.random() * Math.PI * 2,
    }));

    let tick = 0;
    let frame = 0;
    let animationId: number;
    const draw = () => {
      if (!ctx) return;
      frame++;
      if (variant === 'panel' && frame % 2 === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width / dpr, height / dpr);

      const pulse = Math.sin(tick * 0.05) * 2 + 8;
      const gradient = ctx.createRadialGradient(
        center.x,
        center.y,
        0,
        center.x,
        center.y,
        variant === 'panel' ? Math.min(width / dpr, height / dpr) * 0.65 : 320
      );
      // gradient.addColorStop(0, 'rgba(170,0,255,0.55)');
      // gradient.addColorStop(0.4, 'rgba(110,0,180,0.25)');
      // gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        center.x,
        center.y,
        (variant === 'panel' ? Math.min(width / dpr, height / dpr) * 0.7 : 250) + pulse * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      particles.forEach((p) => {
        p.angle += p.speed;
        const x = center.x + Math.cos(p.angle + Math.sin(tick * 0.01 + p.phase)) * p.distance;
        const y = center.y + Math.sin(p.angle + Math.cos(tick * 0.01 + p.phase)) * p.distance;

        const alpha = Math.max(0, 1 - p.distance / (Math.min(width / dpr, height / dpr) / 2));
        if (alpha < 0.07) return; // отсечь почти невидимые дальние линии
        ctx.strokeStyle = `rgba(170,0,255,${alpha * 0.5})`;
        ctx.lineWidth = variant === 'panel' ? 2.1 : 2;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(230,200,255,${0.9 * alpha})`;
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(255,255,255,0.9)';
      ctx.shadowBlur = 14;
      ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      tick++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      ({ w: width, h: height } = computeSize());
      center.x = width / (2 * dpr);
      center.y = height / (2 * dpr);
      ctx.scale(dpr, dpr); 
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <div ref={containerRef} className={variant === 'full' ? `relative w-full h-screen overflow-hidden ${className}` : `relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {variant === 'full' && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r animate-pulse">
            Diffuzio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Распространение идей от одного модератора к сотням сотрудников — и дальше, по всей сети.
          </p>
        </div>
      )}
    </div>
  );
}
