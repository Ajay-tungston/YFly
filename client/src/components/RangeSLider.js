import React from "react";
import { Range } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const RangeSlider = ({ amount, minAmount, maxAmount, handleAmountRange }) => {
  const safeMin = minAmount ?? (amount?.minAmount || 100);
  const safeMax = maxAmount ?? (amount?.maxAmount || 100000);

  const formatAmount = (value) => `₹${(value ?? 0).toLocaleString()}`;
  const handleChange = (newValues) => {
    handleAmountRange(newValues[0], newValues[1]); // Send raw numbers
  };

  return (
    <div className="px-8">
      <Range
        step={STEP}
        min={amount?.minAmount || 100} // DB min amount
        max={amount?.maxAmount || 100000} // DB max amount
        values={[safeMin, safeMax]} // User-selected values
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="w-full h-1 mt-5 bg-[#2b7cd6] rounded">
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-4 h-4 rounded-full bg-white ring-4 ring-[#2b7cd6] shadow-ip"
          />
        )}
      />
      <div className="flex justify-between mt-3 text-black font-bold text-[1rem]">
        <span>{formatAmount(safeMin)}</span>
        <span>{formatAmount(safeMax)}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
