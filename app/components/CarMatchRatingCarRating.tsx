'use client';

import { useEffect, useRef, useId } from "react";

type CarData = {
  make_name: string;
  model: string;
  year: string;
  engineType: string;
  image: string;
  starRating: number;
  co2Rating: number;
  coo: number;
  matchCount: number;
  savings: number;
  co2: number;
  rating: number;
}

type Props ={
  data: CarData;
}
const CarsRating = ({data}: Props) => {

  const uniqueId = useId();
  const cooArcRef = useRef<SVGPathElement>(null);
  const co2ArcRef = useRef<SVGPathElement>(null);

  const starRating = data.starRating !== undefined ? data.starRating : 0;

  useEffect(() => {
    const cooArc = cooArcRef.current;
    const co2Arc = co2ArcRef.current;

    const cooTargetPercent = 0.65;
    const co2TargetPercent = 0.35;

    const cooArcLength = Math.PI * 80;
    const co2ArcLength = Math.PI * 60;

    let progress = 0;
    const duration = 1000;
    const fps = 60;
    const steps = duration / (1000 / fps);

    function animateArcs() {
      const step = 1 / steps;
      function frame() {
        if (progress <= 1) {
          const cooLength = cooArcLength * (cooTargetPercent * progress);
          const co2Length = co2ArcLength * (co2TargetPercent * progress);

          if (cooArc) {
            cooArc.setAttribute("stroke-dasharray", `${cooLength} ${cooArcLength}`);
          }
          if (co2Arc) {
            co2Arc.setAttribute("stroke-dasharray", `${co2Length} ${co2ArcLength}`);
          }

          progress += step;
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    }

    animateArcs();
  }, []);

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const starSpacing = 35;
    const startX = 100 - ((totalStars - 1) * starSpacing) / 2;

    for (let i = 0; i < totalStars; i++) {
      const isFilled = i < starRating;
      const starX = startX + i * starSpacing;

      stars.push(
        <path
          key={i}
          d="M 0,-10 L 2.4,-3.1 9.8,-3.1 3.7,1.2 6.1,8.1 0,3.8 -6.1,8.1 -3.7,1.2 -9.8,-3.1 -2.4,-3.1 Z"
          transform={`translate(${starX}, 165) scale(1.2)`}
          fill={isFilled ? "#FFD700" : "#E0E0E0"}
          stroke="#444"
          strokeWidth="1"
        />
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center justify-center w-full h-full mt-4">
      <div className="rounded-2xl">
        <div className="">
          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            {/* Gradients and Shadow Filters */}
            <defs>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#FF0000" />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#81C784" />
                <stop offset="100%" stopColor="#388E3C" />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Base arcs */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#ddd" strokeWidth="30" />
            <path
              ref={cooArcRef}
              d="M 20 100 A 75 75 0 0 1 180 100"
              fill="none"
              stroke="url(#redGradient)"
              strokeWidth="30"
              strokeDasharray="0 251"
              filter="url(#shadow)"
            />
            <path d="M 50 100 A 45 45 0 0 1 150 100" fill="none" stroke="#ddd" strokeWidth="30" />
            <path
              ref={co2ArcRef}
              d="M 50 100 A 45 45 0 0 1 150 100"
              fill="none"
              stroke="url(#greenGradient)"
              strokeWidth="30"
              strokeDasharray="0 188"
              filter="url(#shadow)"
            />

            {/* Info panels */}
            <rect x="5" y="100" width="190" height="50" fill="#3D0B2B" rx="5" />
            <rect x="5" y="150" width="190" height="30" fill="#2196F3" rx="5" />

            {/* Top Text */}
            <text x="100" y="25" fontSize="13" fontWeight="500" textAnchor="middle" fill="#333">
              ${data.coo.toLocaleString()} p.a
            </text>
            <text x="100" y="55" fontSize="13" fontWeight="500" textAnchor="middle" fill="#333">
              {data.co2.toLocaleString()}kg
            </text>

            {/* Center text */}
            <text x="100" y="95" fontSize="22" textAnchor="middle" fill="#fff">
              {data.rating.toLocaleString()}
            </text>
            <text x="100" y="125" fontSize="22" fontWeight="bold" textAnchor="middle" fill="white">
              ${data.savings.toLocaleString()}
            </text>
            <text x="100" y="138" fontSize="12" textAnchor="middle" fill="white">
              my monthly savings
            </text>

            {/* Stars */}
            {renderStars()}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CarsRating;
