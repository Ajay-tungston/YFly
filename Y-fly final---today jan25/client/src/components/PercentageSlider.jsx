import React, { useState } from 'react'
import { Range } from 'react-range';

const STEP = 1;
const MIN = 0;
const MAX = 100;


const PercentageSlider = () => {
    const [values, setValues] = useState([45, 90]);

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
                        // className="w-5 h-5 bg-[#2b7cd6] rounded-full shadow-btn"
                        className="w-4 h-4 rounded-full bg-white ring-4 ring-[#2b7cd6] shadow-ip"
                    />
                )}
            />
            <div className="flex justify-between mt-3 text-black font-bold font-urban text-[1.2rem] max-xl:text-[0.9rem]">
                <span>{values[0]}%</span>
                <span>{values[1]}%</span>
            </div>
        </div>
    )
}

export default PercentageSlider