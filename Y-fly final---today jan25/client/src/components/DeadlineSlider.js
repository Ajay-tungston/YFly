import React, { useState } from 'react';
import { Range } from 'react-range';
import dayjs from 'dayjs';

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const DeadlineSlider = () => {
  const [values, setValues] = useState([100, 900]);

  const formatDate = (value) => {
    const startDate = dayjs('2024-02-01');
    const endDate = dayjs('2026-05-01');
    const totalDays = endDate.diff(startDate, 'day');
    const selectedDate = startDate.add((value / MAX) * totalDays, 'day');
    return selectedDate.format('MMM YYYY');
  };

  return (
    <div className='px-8'>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-1 mt-5 bg-[#2b7cd6] rounded"
          >
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
        <span>{formatDate(values[0])}</span>
        <span>{formatDate(values[1])}</span>
      </div>
    </div>
  );
};

export default DeadlineSlider;
