'use client';

import { useEffect, useRef, useId } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CarsRatingProps {
  coo?: number;
  co2?: number;
  savings?: number;
  rating?: number;
  starRating?: number;
  blurred?: boolean;
}

const CarsRating = (props : CarsRatingProps) => {
  // Generate unique IDs for each component instance
  const uniqueId = useId();
  const cooArcId = `cooArc-${uniqueId}`;
  const co2ArcId = `co2Arc-${uniqueId}`;
  
  // Use refs instead of getElementById
  const cooArcRef = useRef<SVGPathElement>(null);
  const co2ArcRef = useRef<SVGPathElement>(null);

  // Default star rating to 0 if not provided
  const starRating = props.starRating !== undefined ? props.starRating : 0;

  useEffect(() => {
    // Use the refs to access the SVG elements
    const cooArc = cooArcRef.current;
    const co2Arc = co2ArcRef.current;

    // Use props to determine the target percentages
    // logic here to calculate these values based on the props
    const cooTargetPercent = 0.65;
    const co2TargetPercent = 0.35;

    const cooArcLength = Math.PI * 80;
    const co2ArcLength = Math.PI * 60;

    let progress = 0;
    const duration = 1000; // in ms
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

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const starSpacing = 35; // Spacing between stars
    const startX = 100 - ((totalStars - 1) * starSpacing) / 2; // Center the stars
    
    for (let i = 0; i < totalStars; i++) {
      const isFilled = i < starRating;
      const starX = startX + (i * starSpacing);
      
      // Using a 5-pointed star path
      stars.push(
        <path 
          key={i}
          d="M 0,-10 L 2.4,-3.1 9.8,-3.1 3.7,1.2 6.1,8.1 0,3.8 -6.1,8.1 -3.7,1.2 -9.8,-3.1 -2.4,-3.1 Z" 
          transform={`translate(${starX}, 165) scale(1.2)`}
          fill={isFilled ? "#FFD700" : "white"} 
          stroke="#888888"
          strokeWidth="1"
        />
      );
    }
    
    return stars;
  };

  return (
    
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Fixed size container to ensure consistent rendering */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
        <svg 
          viewBox="0 0 200 200" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Gray base for COO */}
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#ddd" strokeWidth="30" />

          {/* Red arc (COO) */}
          <path 
            ref={cooArcRef}
            id={cooArcId} 
            d="M 20 100 A 75 75 0 0 1 180 100" 
            fill="none" 
            stroke="red" 
            strokeWidth="30" 
            strokeDasharray="0 251" 
          />

          {/* Gray base for CO₂ */}
          <path d="M 50 100 A 45 45 0 0 1 150 100" fill="none" stroke="#ddd" strokeWidth="30" />

          {/* Green arc (CO₂) */}
          <path 
            ref={co2ArcRef}
            id={co2ArcId} 
            d="M 50 100 A 45 45 0 0 1 150 100" 
            fill="none" 
            stroke="green" 
            strokeWidth="30" 
            strokeDasharray="0 188" 
          />

          <rect x="5" y="100" width="190" height="50" fill="#2C041C" />
          <rect x="5" y="150" width="190" height="30" fill="lightblue" />

          {/* Top metrics */}
          <text x="100" y="25" fontSize="13" fontWeight='500' textAnchor="middle" fill="black">$ {props.coo} p.a</text>
          <text x="100" y="55" fontSize="13" fontWeight='500' textAnchor="middle" fill="black">{props.co2}kg</text>

          {/* Center info */}
          <text x="100" y="95" fontSize="22" textAnchor="middle" fill="black">{props.rating}</text>
          <text x="100" y="125" fontSize="22" fontWeight="bold" textAnchor="middle" fill="white">${props.savings}</text>
          <text x="100" y="138" fontSize="12" textAnchor="middle" fill="white">my monthly savings</text>
          
          {/* Star Rating */}
          {renderStars()}
          
        </svg>
      </div>
    </div>
  );
};

export default CarsRating;