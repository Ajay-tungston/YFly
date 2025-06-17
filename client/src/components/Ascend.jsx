import React, { useState } from 'react'
import harvard from '../assets/images/image/harvard.svg'

const Ascend = () => {
    const [openModal, setOpenModal] = useState(false)
    const handleModal = () => { setOpenModal(!openModal) }
    return (
        <div className=' w-[49%] max-md:w-[100%] bg-[#FFF0D9] border-[#C9851E] border-[1px] rounded-[30px] hover:shadow-[#C9851E] hover:shadow-right-bottom px-5 pb-6'>
            <div className='flex justify-center pt-16 pb-5'>
                <img src={harvard} width={200} alt='harvard'/>
            </div>
            <div className='bg-[#FFE0B2] inline-block px-4 py-1 rounded-[20px] font-bold text-[#C9851E] text-[14px] font-urban'>
                Massachusetts, United States
            </div>
            <div className='font-dela text-[13px] mt-2'>
                Harvard University
            </div>
            <div className='border-t-[0.5px] border-[#bfc0c5] my-4'></div>

            <div className='flex justify-between'>
                <div>
                    <div className='text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]'>University type</div>
                    <div className='font-dela text-[13px] max-xl:text-[12px]'>Private</div>
                </div>

                <div >
                    <div className='text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center'>QS Rank</div>
                    <div className='flex font-urban max-xl:text-[12px]'>QS Rank: <div className=' font-bold'>#5</div></div>
                </div>

                <div className=' flex items-center'>
                    <button onClick={handleModal} className='bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]'>
                        View courses
                    </button>
                </div>
            </div>
            {/* {openModal && (
                <div className='bg-black h-[100vh] '></div>
            )} */}

        </div>
    )
}

export default Ascend