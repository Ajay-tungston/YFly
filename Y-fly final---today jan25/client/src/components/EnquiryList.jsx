import React from 'react'
import profile from '../assets/images/profile.svg'
import arrow from '../assets/images/downarrowblack.svg'
import trash from '../assets/images/trash.svg'
import sort from '../assets/images/sort.svg'
import greytrash from '../assets/images/greytrash.svg'

const EnquiryList = () => {
  const enquiry=[{
    student:"Ashley",
    course:"Computer Science",
    country:"Germany",
    phone:"9876543210",
  },
  {
    student:"Bastin",
    course:"Computer Science",
    country:"Germany",
    phone:"9876543210",
  },
  {
    student:"Catherine",
    course:"Computer Science",
    country:"Germany",
    phone:"9876543210",
  },]
  return (
    <div className='px-10 py-10 h-screen'>
         <div className='flex justify-between'>
            <input
            placeholder='Search'
            className='bg-[#F2F4F7] py-3 w-[30%] pl-5 border-none placeholder:font-urban text-[1rem] rounded-[4px] outline-none'
            
            />
            <div className='flex items-center'>
                <div className='font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]'>Hi, User</div>
                <img src={profile} alt='profile' width={35} />
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

        {/* enquiries section */}
        <div>
          <div className='font-urban font-bold text-[1.3rem] mb-5'>Enquiries</div>

          <div className='flex justify-between items-center font-urban'>

            <div className='flex text-[0.9rem]'>
              <div>Sort by:</div>
              <button className='flex items-center ml-2 font-semibold'>
                Course
                <img src={arrow} alt='arrow' width={15} className='ml-1' />
              </button>
            </div>

            <div className='flex font-semibold text-[0.9rem]'>
              <button className='flex items-center px-5 py-1 border-[#898C9A] border-[1px] rounded-[9px] text-[#30589F] mr-4'>
                <img src={sort} alt='sort' width={16} className='mr-1' />
                Filter
              </button>
              <button className='flex items-center bg-[#FF161F] px-5 py-1 rounded-[9px] text-white'>
                <img src={trash} alt='trash' width={16} className='mr-1' />
                Delete
              </button>
            </div>

          </div>


        </div>

        <div className='mt-8 text-[0.9rem]'>
          {/* header of list */}
          <div>
            <div className='font-urban flex bg-[#F9F9F9] py-3 px-3'>
              <div className='w-[40%] flex items-center '>
                <input type='checkbox' 
                  disabled
                  className='form-checkbox h-4 w-4 text-blue-600 mr-2 bg-gray-100 border-gray-300 rounded focus:none focus:ring-blue-500 focus:ring-opacity-75'
                />
                Name
              </div>
              <div className='w-[26%]'>Course</div>
              <div className='w-[22%]'>Country</div>
              <div className='w-[22%]'>Number</div>
              <div className='w-[10%]'>Action</div>
            </div>
            <div className='border-[#BFBFBF] border-b-[1px]'></div>
          </div>

           {/* -----list--- */}
           {enquiry.map((list)=>(
            <div>
            <div className='font-urban flex py-3 px-3'>
              <div className='w-[40%] flex items-center '>
                <input type='checkbox' 
                  className='form-checkbox h-4 w-4 text-blue-600 mr-2 bg-gray-100 border-gray-300 rounded focus:none focus:ring-blue-500 focus:ring-opacity-75'
                />
                {list.student}
              </div>
              <div className='w-[26%]'>{list.course}</div>
              <div className='w-[22%]'>{list.country}</div>
              <div className='w-[22%]'>{list.phone}</div>
              <div className='w-[10%]'>
              <button>
                <img src={greytrash} alt='trash'/>
              </button>
              </div>
            </div>
            <div className='border-[#BFBFBF] flex border-b-[1px] bg-black'></div>
         </div>
           ))}
           

        </div>
       
        
    </div>
  )
}

export default EnquiryList