import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import parallax1 from '../assets/images/para1.png';
import parallax2 from '../assets/images/para2.png';
import parallax3 from '../assets/images/para3.png';
import arrow from '../assets/images/arrow-right.svg';
import { motion, useScroll, useTransform } from 'framer-motion';

const Parallax = () => {
    const navigate = useNavigate();

    const stacks = [
        {
            id: 1,
            title: "Dream career, starts here.",
            description: "Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam bibendum quam ultrices ultrices ac eu orci. Hac venenatis mi purus venenatis et vulputate vel aliquet.",
            buttonText: "Find your Course",
            image: parallax1,
            link: "/coursefinder"
        },
        {
            id: 2,
            title: "Your profile, AI powered.",
            description: "Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam bibendum quam ultrices ultrices ac eu orci. Hac venenatis mi purus venenatis et vulputate vel aliquet.",
            buttonText: "AI Profile Matcher",
            image: parallax2,
            link: "/profilematcher"
        },
        {
            id: 3,
            title: "Scholarships made easy.",
            description: "Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam bibendum quam ultrices ultrices ac eu orci. Hac venenatis mi purus venenatis et vulputate vel aliquet.",
            buttonText: "Get scholarships",
            image: parallax3,
            link: "/scholarship"
        },
        {
            id: 3,
            title: "Application Support ",
            description: "Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam bibendum quam ultrices ultrices ac eu orci. Hac venenatis mi purus venenatis et vulputate vel aliquet.",
            buttonText: "Apply for Application",
            image: parallax3,
            link: "/scholarship"
        }
    ];

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"]
    });
    const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

    return (
        <div className='mt-[3rem]'>
            {stacks.map((stack, index) => (
                <div key={stack.id} className='sticky mt-5' ref={container} style={{ top: `calc(5% + ${index * 25}px)` }}>
                    <div className='bg-white rounded-[18rem] max-md:rounded-[5rem] shadow-rad items-center border-[1px] border-[#001426] flex justify-between mx-auto'>
                        <div className='w-[60%] max-xl:w-[75%] max-lg:w-[70%] max-md:w-[80%] px-28 max-lg:pl-20 max-lg:pr-10 max-md:pl-8 max-md:pr-4 py-14 space-y-4'>
                            <p className='font-dela text-[40px] max-xl:text-[35px] max-lg:text-[30px] max-md:text-[24px]  max-md:leading-[2rem] leading-[2.8rem]'>{stack.title}</p>
                            <p className='font-urban text-[1rem] max-xl:text-[0.9rem] tracking-wide'>{stack.description}</p>
                            <button
                                onClick={() => navigate(stack.link)}
                                className='px-8 max-md:px-3 py-2 bg-[#2B7CD6] text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] items-center shadow-ip font-bold text-white transition-all cursor-pointer
                                active:border-b-[2px] active:brightness-90 active:translate-y-[2px] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] rounded-full border-[1px] border-[#0E1B2C] font-urban flex gap-3 max-md:gap-1'
                            >
                                {stack.buttonText}
                                <img src={arrow} alt='arrow' className='max-md:w-[1rem]' />
                            </button>
                        </div>
                        <motion.div className='overflow-hidden max-lg:w-[30%] max-md:w-[20%]'>
                            <img src={stack.image} alt='' className='h-[43vh] max-lg:h-[35vh] rounded-r-full' style={{ scale }} />
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Parallax;
