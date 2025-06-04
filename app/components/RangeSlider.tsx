'use client';
import { useState } from "react";

const RangeSlider = ({ minLimit = 0, maxLimit = 100 }) => {
  const [min, setMin] = useState(minLimit);
  const [max, setMax] = useState(maxLimit);

  // Handle range input changes
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), max - 1);
    setMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), min + 1);
    setMax(value);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Price Range</h2>

      {/* Range Inputs */}
      <div className="relative mb-4">
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={min}
          onChange={handleMinChange}
          className="range range-primary"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={max}
          onChange={handleMaxChange}
          className="range range-primary absolute top-0"
        />
      </div>

      {/* Input Fields */}
      <div className="flex items-center gap-4">
        <input
          type="number"
          className="input input-bordered w-24"
          value={min}
          min={minLimit}
          max={max - 1}
          onChange={handleMinChange}
        />
        <span className="text-xl">-</span>
        <input
          type="number"
          className="input input-bordered w-24"
          value={max}
          min={min + 1}
          max={maxLimit}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
