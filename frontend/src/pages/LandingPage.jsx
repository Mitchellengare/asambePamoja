import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const trailBackRef = useRef(null);
  const trailFrontRef = useRef(null);
  const planeBackRef = useRef(null);
  const planeFrontRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvasBack = trailBackRef.current;
    const canvasFront = trailFrontRef.current;
    const planeBack = planeBackRef.current;
    const planeFront = planeFrontRef.current;

    if (!canvasBack || !canvasFront || !planeBack || !planeFront) return;

    const ctxBack = canvasBack.getContext("2d");
    const ctxFront = canvasFront.getContext("2d");

    const W = 300;
    const H = 300;
    const cx = W / 2;
    const cy = H / 2;
    const rx = 140;
    const ry = 55;
    const tilt = (-35 * Math.PI) / 180;
    const duration = 2800;
    const startAngle = (135 * Math.PI) / 180;

    let startTime = null;
    let animationFrameId = null;
    const trailBack = [];
    const trailFront = [];

    const getPos = (angle) => {
      const ex = rx * Math.cos(angle);
      const ey = ry * Math.sin(angle);
      return {
        x: cx + ex * Math.cos(tilt) - ey * Math.sin(tilt),
        y: cy + ex * Math.sin(tilt) + ey * Math.cos(tilt),
        ey,
      };
    };

    const getTangent = (angle) => {
      const dex = -rx * Math.sin(angle);
      const dey = ry * Math.cos(angle);
      const dx = dex * Math.cos(tilt) - dey * Math.sin(tilt);
      const dy = dex * Math.sin(tilt) + dey * Math.cos(tilt);
      return Math.atan2(dy, dx);
    };

    const drawTrail = (ctx, trail) => {
      ctx.clearRect(0, 0, W, H);

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        const alpha = Math.max(0, 1 - trail[i].age / 90);

        if (alpha <= 0) {
          trail.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(29,158,117,${alpha * 0.8})`;
        ctx.fill();
      }
    };

    const setPlane = (el, pos, tangent) => {
      el.style.left = `${pos.x - 16}px`;
      el.style.top = `${pos.y - 16}px`;
      el.style.transform = `rotate(${tangent + Math.PI / 2}rad)`;
    };

    const animate = (ts) => {
      if (!startTime) startTime = ts;

      const progress = Math.min((ts - startTime) / duration, 1);
      const angle = startAngle + progress * Math.PI * 2;
      const pos = getPos(angle);
      const tangent = getTangent(angle);

      const frontness = (pos.ey + ry) / (2 * ry);
      const frontOpacity = Math.max(0, Math.min(1, (frontness - 0.3) / 0.3));
      const backOpacity = Math.max(0, Math.min(1, (0.7 - frontness) / 0.3));

      setPlane(planeFront, pos, tangent);
      setPlane(planeBack, pos, tangent);

      planeFront.style.opacity = String(frontOpacity);
      planeBack.style.opacity = String(backOpacity);

      if (pos.ey > 0) {
        trailFront.push({ x: pos.x, y: pos.y, age: 0 });
        trailBack.forEach((p) => {
          p.age += 5;
        });
      } else {
        trailBack.push({ x: pos.x, y: pos.y, age: 0 });
        trailFront.forEach((p) => {
          p.age += 5;
        });
      }

      drawTrail(ctxBack, trailBack);
      drawTrail(ctxFront, trailFront);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        planeFront.style.opacity = "0";
        planeBack.style.opacity = "0";
        ctxBack.clearRect(0, 0, W, H);
        ctxFront.clearRect(0, 0, W, H);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);
  useEffect(() => {
  const timer = setTimeout(() => {
    navigate("/explore");
  }, 7000); // 10 seconds

  return () => clearTimeout(timer);
}, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 100%;
          height: 100%;
          background: #f5fdf9;
        }

        .stage {
          width: 100vw;
          height: 100vh;
          background: #f5fdf9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: #E1F5EE;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          z-index: 0;
        }

        .scene {
          position: relative;
          width: 300px;
          height: 300px;
          margin-bottom: 2.5rem;
          z-index: 1;
        }

        .orbit-ring {
          position: absolute;
          width: 280px;
          height: 110px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-35deg);
          border-radius: 50%;
          border: 1.5px dashed #9FE1CB;
          z-index: 1;
        }

        .globe-img {
          position: absolute;
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 3;
        }

        .trail-back,
        .trail-front {
          position: absolute;
          top: 0;
          left: 0;
          width: 300px;
          height: 300px;
          pointer-events: none;
        }

        .trail-back {
          z-index: 2;
        }

        .trail-front {
          z-index: 4;
        }

        .plane-back,
        .plane-front {
          position: absolute;
          width: 32px;
          height: 32px;
          transform-origin: center center;
          opacity: 0;
          transition: opacity 0.12s ease;
        }

        .plane-back {
          z-index: 2;
        }

        .plane-front {
          z-index: 6;
        }

        .title-wrap {
          opacity: 0;
          z-index: 1;
          white-space: nowrap;
          animation: titleIn 0.8s 3.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes titleIn {
          0% {
            opacity: 0;
            transform: scale(0.75);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .t-a,
        .t-p {
          font-family: 'Playfair Display', serif;
          font-size: 56px;
          font-weight: 700;
        }

        .t-a {
          color: #085041;
        }

        .t-p {
          color: #1D9E75;
        }

        .tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #0F6E56;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0;
          margin-top: 10px;
          z-index: 1;
          animation: fadeUp 0.6s 3.9s ease forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="stage">
        <div className="bg-glow" />
        <div className="scene">
          <div className="orbit-ring" />

          <canvas
            ref={trailBackRef}
            className="trail-back"
            width="300"
            height="300"
          />

          <svg
            ref={planeBackRef}
            className="plane-back"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="16,1 30,28 16,22 2,28" fill="#085041" />
            <polygon points="16,1 22,28 16,22" fill="#1D9E75" />
            <polygon points="8,20 2,28 16,22" fill="#9FE1CB" />
          </svg>

          <img
            className="globe-img"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Rotating_globe.gif"
            alt="globe"
          />

          <canvas
            ref={trailFrontRef}
            className="trail-front"
            width="300"
            height="300"
          />

          <svg
            ref={planeFrontRef}
            className="plane-front"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="16,1 30,28 16,22 2,28" fill="#085041" />
            <polygon points="16,1 22,28 16,22" fill="#1D9E75" />
            <polygon points="8,20 2,28 16,22" fill="#9FE1CB" />
          </svg>
        </div>

        <div className="title-wrap">
          <span className="t-a">asambe</span>
          <span className="t-p">Pamoja</span>
        </div>

        <div className="tagline">travel together</div>
      </div>
    </>
  );
};

export default LandingPage;
