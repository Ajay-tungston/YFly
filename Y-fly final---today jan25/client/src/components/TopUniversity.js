

import React from 'react'
import uni1 from '../assets/images/universities/yale.png'
import uni2 from '../assets/images/universities/ubc.png'
import uni3 from '../assets/images/universities/toronto.png'
import uni4 from '../assets/images/universities/sydney.png'
import uni5 from '../assets/images/universities/stanford.png'
import uni6 from '../assets/images/universities/princeton.png'
import uni7 from '../assets/images/universities/oxford.png'
import uni8 from '../assets/images/universities/munich.png'
import '../assets/styles/sliding.css'

const TopUniversity = () => {
  const items = [
    { id: 1, image: uni1 },
    { id: 2, image: uni2 },
    { id: 3, image: uni3 },
    { id: 4, image: uni4 },
    { id: 5, image: uni5 },
    { id: 6, image: uni6 },
    { id: 7, image: uni7 },
    { id: 8, image: uni8 },
  ];

  return (
    <div>
      <button className='px-8 mx-auto block max-xl:ml-[4rem] max-md:ml-0 mt-[6rem] max-md:mt-[4rem] mb-8 py-3 max-md:py-1 border-[2px] bg-white font-bold font-urban rounded-full tracking-wider max-lg:text-[1rem] text-[1.2rem]'>
        Featured Universities
      </button>
      <div className='overflow-hidden rounded-full w-full border-black border-[1px] bg-white px-10 py-5 shadow-lightshad'>
        <div className='marqueetwo flex justify-around items-center'>
          {items.concat(items).map((item, index) => (
            <img key={index} src={item.image} alt={`uni ${item.id}`} className='w-[4rem] max-xl:w-[3rem] max-lg:w-[2.5rem]' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUniversity;
