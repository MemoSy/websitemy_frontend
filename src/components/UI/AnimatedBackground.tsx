import React, { useEffect, useRef } from 'react';
import { throttle } from '../../utils/performance';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
  }>>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#00d4ff', '#6366f1', '#10b981', '#f59e0b'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // تحديث الموقع
        particle.x += particle.vx;
        particle.y += particle.vy;

        // تأثير الماوس المحسن
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const force = (80 - distance) / 80;
          particle.vx += (dx / distance) * force * 0.005;
          particle.vy += (dy / distance) * force * 0.005;
        }

        // تقليل السرعة
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        // الحدود مع تأثير الارتداد
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // رسم الجسيم
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // رسم الخطوط بين الجسيمات القريبة (محسن)
        particlesRef.current.slice(index + 1, index + 5).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 60) {
            ctx.save();
            ctx.globalAlpha = (60 - distance) / 60 * 0.05;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const throttledMouseMove = throttle((e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }, 16); // 60fps

    const throttledResize = throttle(() => {
      resizeCanvas();
      initParticles();
    }, 250);

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', throttledResize);
    window.addEventListener('mousemove', throttledMouseMove);

    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('mousemove', throttledMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;