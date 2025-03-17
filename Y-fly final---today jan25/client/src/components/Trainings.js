

import React from 'react';
import training1 from '../assets/images/training1.svg';
import training2 from '../assets/images/training2.svg';
import training3 from '../assets/images/training3.svg';
import training4 from '../assets/images/training4.svg';
import training5 from '../assets/images/training5.svg';
import '../assets/styles/sliding.css'
const Trainings = () => {
  const items = [
    { id: 1, image: training1 },
    { id: 2, image: training2 },
    { id: 3, image: training3 },
    { id: 4, image: training4 },
    { id: 5, image: training5 }
  ];

  return (
    <div>
      <button className='px-8 ml-[7.5rem] max-xl:ml-[4rem] max-md:ml-0 mt-[7rem] max-md:mt-[5rem] mb-8 py-3 max-md:py-1 border-[2px] bg-white font-bold font-urban rounded-full tracking-wider max-lg:text-[1rem] text-[1.2rem]'>
        Our Trainings
      </button>
      <div className='overflow-hidden w-full border-black border-[1px] bg-white px-10 py-5 shadow-lightshad rounded-full'>
        <div className='marquee flex justify-around items-center'>
          {items.concat(items).map((item, index) => (
            <img key={index} src={item.image} alt={`training ${item.id}`} className='w-[9rem] max-xl:w-[7rem] max-lg:w-[6rem]' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainings;
