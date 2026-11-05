const COLOR = '247, 123, 7';

const random = (min, max) => min + Math.random() * (max - min);

function createParticle(width, height) {
  return {
    x: random(0, width),
    y: random(0, height),
    radius: random(0.5, 2.3),
    speed: random(0.05, 0.3),
    phase: random(0, Math.PI * 2)
  };
}

/**
 * Draws slowly rising orange particles on a canvas.
 * Returns a function that stops the animation and removes listeners.
 */
export function startParticles(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  const particles = Array.from({ length: width < 700 ? 40 : 80 }, () =>
    createParticle(width, height)
  );

  function move(p, time) {
    p.y -= p.speed;
    p.x += Math.sin(time / 3000 + p.phase) * 0.15;
    if (p.y < -5) {
      p.y = height + 5;
      p.x = random(0, width);
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      if (!reduceMotion) move(p, time);
      const alpha = 0.35 + 0.45 * Math.abs(Math.sin(time / 1800 + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${alpha})`;
      ctx.shadowColor = `rgb(${COLOR})`;
      ctx.shadowBlur = p.radius * 5;
      ctx.fill();
    }
    if (!reduceMotion) frame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  frame = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
  };
}
