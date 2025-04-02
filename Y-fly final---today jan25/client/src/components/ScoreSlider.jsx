import React, { useEffect, useState } from "react";
import { Range } from "react-range";

const STEP = 1;

const ScoreSlider = ({ score, minScore, maxScore, handleScoreRange, testRequirement }) => {
  let safeMin = minScore ?? 1;
  let safeMax = maxScore ?? (Number(score) || 100);

  // Prevent min and max from being the same
  if (safeMin >= safeMax) {
    safeMax = safeMin + 1; // Ensure at least 1 difference
  }

  const formatAmount = (value) => `${(value ?? 0).toLocaleString()}`;

  const [values, setValues] = useState([safeMin, safeMax]);

  // Reset values when switching tests
  useEffect(() => {
    setValues([safeMin, safeMax]); 
  }, [testRequirement, safeMin, safeMax]);

  const handleChange = (newValues) => {
    const newMin = Math.max(safeMin, newValues[0]);
    const newMax = Math.min(safeMax, newValues[1]);

    if (newMin >= newMax) return; // Prevent setting equal values
    setValues([newMin, newMax]);
    handleScoreRange(newMin, newMax);
  };

  return (
    <div className="px-16">
      <Range
        step={STEP}
        min={safeMin}
        max={safeMax}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="w-full h-1 mt-5 bg-[#2b7cd6] rounded">
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-3 h-3 rounded-full bg-white ring-4 ring-[#2b7cd6] shadow-ip"
          />
        )}
      />
      <div className="flex justify-between mt-3 text-black font-bold font-urban text-[1rem] max-xl:text-[0.9rem]">
        <span>{formatAmount(values[0])}</span>
        <span>{formatAmount(values[1])}</span>
      </div>
    </div>
  );
};

export default ScoreSlider;
