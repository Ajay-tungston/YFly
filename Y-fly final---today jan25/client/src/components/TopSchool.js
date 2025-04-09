import React from 'react';
import b1 from '../assets/images/b1.svg'
import b2 from '../assets/images/b2.svg'
import b3 from '../assets/images/b3.svg'
import b4 from '../assets/images/b4.svg'
import '../assets/styles/sliding.css'
const TopSchool = () => {
  const items = [
    { id: 1, image: b1 },
    { id: 2, image: b2 },
    { id: 3, image: b3 },
    { id: 4, image: b4 },
  ];

  return (
    <div>
      <button className='px-8 mx-auto block max-xl:ml-[4rem] max-md:ml-0 mt-[6rem] max-md:mt-[4rem] mb-8 py-3 max-md:py-1 border-[2px] bg-white font-bold font-urban rounded-full tracking-wider text-[1.2rem] max-lg:text-[1rem]'>
        Top B Schools 
      </button>
      <div className='overflow-hidden w-full border-black border-[1px] bg-white px-10 py-5 shadow-lightshad rounded-full'>
        <div className='marqueethree flex justify-around items-center'>
          {items.concat(items).map((item, index) => (
            <img key={index} src={item.image} alt={`bschool ${item.id}`} className='w-[9rem] max-xl:w-[7rem] max-lg:w-[6rem]' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSchool;