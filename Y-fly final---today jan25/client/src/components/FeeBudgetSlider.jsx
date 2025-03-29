import React, { useState } from 'react'
import { Range } from 'react-range';

const STEP = 1;
const MIN = 0;
const MAX = 1000;


const FeeBudgetSlider = ({ amount, minAmount, maxAmount, handleAmountRange }) => {
    const safeMin = minAmount ?? (amount?.minAmount || 100);
    const safeMax = maxAmount ?? (amount?.maxAmount || 100000)
    const formatAmount = (value) => `₹${(value ?? 0).toLocaleString()}`;
    const handleChange = (newValues) => {
      handleAmountRange(newValues[0], newValues[1]); // Send raw numbers
    };
    // const [values, setValues] = useState([5, 50]);
    return (
        <div className='px-8'>
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
                        // className="w-5 h-5 bg-[#2b7cd6] rounded-full shadow-btn"
                        className="w-4 h-4 rounded-full bg-white ring-4 ring-[#2b7cd6] shadow-ip"
                    />
                )}
            />
            <div className="flex justify-between mt-3 text-black font-bold font-urban text-[1.2rem] max-xl:text-[0.9rem]">
            <span>{formatAmount(safeMin)}</span>
            <span>{formatAmount(safeMax)}</span>
            </div>
        </div>
    )
}

export default FeeBudgetSlider
