import React, { useState } from 'react';
import { Range } from 'react-range';
import dayjs from 'dayjs';

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const DeadlineSlider = ({handleRangeChange}) => {
  const startDate = dayjs(); 
  const endDate = startDate.add(2, "year"); 
  const totalDays = endDate.diff(startDate, "day");

  const [values, setValues] = useState([0,MAX]);

  const formatDate = (value, forBackend = false) => {
    const selectedDate = startDate.add((value / MAX) * totalDays, "day");
    return forBackend ? selectedDate.format("YYYY-MM-DD") : selectedDate.format("MMM YYYY");
  };

  const handleChange = (newValues) => {
    setValues(newValues);
    handleRangeChange([formatDate(newValues[0], true), formatDate(newValues[1], true)]); 
  };

  return (
    <div className="px-8">
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="w-full h-1 mt-5 bg-[#2b7cd6] rounded">
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="w-4 h-4 rounded-full bg-white ring-4 ring-[#2b7cd6] shadow-ip" />
        )}
      />
      <div className="flex justify-between mt-3 text-black font-bold text-[1rem]">
        <span>{formatDate(values[0])}</span>
        <span>{formatDate(values[1])}</span>
      </div>
    </div>
  );
};

export default DeadlineSlider;
