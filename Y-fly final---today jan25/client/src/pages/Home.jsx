import React from 'react';
import Navbar from '../components/Navbar';
import grid from '../assets/images/image/grid.svg'
import card1 from '../assets/images/card1.svg';
import card2 from '../assets/images/card2.svg';
import card3 from '../assets/images/card3.svg';
import jane from '../assets/images/jane.png'
import star from '../assets/images/star.svg'
import Parallaxxx from '../components/Parallaxxx';
import Footer from '../components/Footer';
import Trainings from '../components/Trainings';
import TopUniversity from '../components/TopUniversity';
import TopSchool from '../components/TopSchool';
import backvideo from '../assets/images/loop.mp4'
import InfoGraphic from '../components/Infographics';

const Home = () => {
  return (
  
      <div className="bg-[#0E1B2C] pb-10">
        
        {/* first-section */}
        <div className="relative">
          <div>
            <video src={backvideo} alt="video" autoPlay muted loop disablePictureInPicture className="w-full rounded-b-[300px] max-sm:rounded-b-[100px] md:rounded-b-[200px]"/>   
          </div>
          
          {/* <div className="flex justify-center"> */}
            
          {/* </div>   */}
          
          <div className="flex justify-center">
          <Navbar/>   

            <button class="cursor-pointer flex items-center overflow-hidden z-100 mt-24  group px-10 py-3 max-xl:py-2 max-lg:py-1 top-[12rem] max-xl:top-[9rem] max-lg:top-[7.5rem] max-md:hidden text-[2rem]  absolute font-urban text-white border-white border-[2px] font-semibold  rounded-full ">
              <span class="relative font-bold z-10 text-white group-hover:text-[#30589f]  text-xl max-xl:text-[1rem] duration-500">WELCOME TO YFLY</span>
            
            </button>
            <div className="text-white absolute text-[5.6rem] max-xl:text-[4.2rem] mt-10 max-xl:leading-[4.8rem] max-lg:text-[3.4rem] max-lg:leading-[3.5rem] max-md:text-[1.5rem] max-md:leading-[1.8rem] top-[38%] max-xl:top-[39%] max-lg:top-[42%] font-lato tracking-wide leading-[6rem] text-center">
              <p>Giving flight</p>
              <p>to your dreams.</p>
            </div> 
          </div>
        </div>


        {/* second section */}          
        <div className='flex max-md:flex-col justify-evenly  items-center bg-bluegradient 
        w-10/12 mt-20 mb-28 max-md:my-10 mx-auto rounded-full max-md:rounded-[60px] px-3 py-4'>

          <div className='flex flex-col py-6 '>
            <p className='font-lato text-[#5FD3FF] text-[45px] max-xl:text-[38px] max-lg:text-[30px] max-md:text-[25px] text-center'>2000+</p>
            <p className='font-urban text-white font-normal text-[20px] max-xl:text-[15px] max-lg:text-[13px]  text-center'>Students guided</p>
          </div>

          <div className="w-0 bg-[#61CAF2] h-28 border-l border-[#61CAF2] transform rotate-180 max-md:hidden"></div>
          <div className="w-0 bg-[#61CAF2] h-28 border-b border-[#61CAF2] transform rotate-180 max-md:h-0 max-md:w-28 md:hidden "></div>

          <div className='flex flex-col py-6 '>
            <p className='font-lato text-[#5FD3FF] text-[45px] max-xl:text-[38px] max-lg:text-[30px] max-md:text-[25px] text-center'>93.7%</p>
            <p className='font-urban text-white font-normal text-[20px]  max-xl:text-[15px] max-lg:text-[13px] text-center'>Success rate</p>
          </div>

          <div className="w-0 bg-[#61CAF2] h-28 border-l border-[#61CAF2] transform rotate-180 max-md:hidden"></div>
          <div className="w-0 bg-[#61CAF2] h-28 border-b border-[#61CAF2] transform rotate-180 max-md:h-0 max-md:w-28 md:hidden "></div>

          <div className='flex flex-col py-6 '>
            <p className='font-lato text-[#5FD3FF] text-[45px] max-xl:text-[38px] max-lg:text-[30px] max-md:text-[25px] text-center'>4.97</p>
            <p className='font-urban text-white font-normal text-[20px]  max-xl:text-[15px] max-lg:text-[13px] text-center'>Google rating</p>
          </div>
        </div>

        {/* third section */}
        
        <div  className=" bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-8 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
        style={{ backgroundImage: `url(${grid})` }}>


          <div>
          <Parallaxxx />  
          </div>
          

          {/* fourth section */}
          <div className='w-[90%] max-xl:w-full mx-auto mt-3 '>

            {/* cards */}
            <div>
            <button className='px-8 mt-[4rem] py-2 border-[2px] bg-white font-bold font-urban rounded-full tracking-wider text-[1.1rem]'>Our Services</button>
            <p className='font-lato text-black text-[35px] max-lg:text-[32px] max-md:text-[28px] py-2'>We pave your way into <br className='max-md:hidden'/> top tier institutions</p>

            {/* cards */}
            <div className='flex gap-14 mt-[2rem] max-xl:gap-6 shrink-0 max-md:overflow-x-scroll max-md:gap-x-3 w-full'>

            <div className="flex flex-nowrap gap-6 w-max">
                <div className='block min-w-[32%] max-md:min-w-[45%] pb-8 bg-[#91D7F2] hover:shadow-rad shadow-cards rounded-[55px]'>
                    <img src={card1} alt='card1' className='rounded-tr-[55px] pl-10' />
                    <p className='font-bold font-urban text-[1.5rem] px-8 max-lg:px-6 py-4'>Application & Admission</p>
                    <p className='font-normal font-urban text-[1.1rem] max-xl:text-[1rem] text-black px-8 max-lg:px-6'>Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam
                      bibendum quam ultrices ultrices ac eu orci. Hac venenatis
                        mi purus venenatis et vulputate vel aliquet.</p>
                  </div>

                  
                  <div className='block min-w-[32%] max-md:min-w-[45%] pb-8 bg-[#5692D6] hover:shadow-rad shadow-cards rounded-[55px]'>
                    <img src={card2} alt='card2' className='rounded-tr-[55px] pl-10'/>
                    <p className='font-bold font-urban text-[1.5rem] px-8 max-lg:px-6 py-4 text-white'>SOP/LOR Preparation</p>
                    <p className='font-normal font-urban text-[1.1rem] max-xl:text-[1rem] text-white px-8 max-lg:px-6' >Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam
                      bibendum quam ultrices ultrices ac eu orci. Hac venenatis
                        mi purus venenatis et vulputate vel aliquet.</p>
                  </div>

                  
                  <div className='block min-w-[32%] max-md:min-w-[45%] pb-8 bg-[#0F62AF] hover:shadow-rad shadow-cards rounded-[55px]'>
                    <img src={card3} alt='card3' className='w-96 px-8 mt-[2rem]'/>
                    <p className='font-bold font-urban text-[1.5rem] px-8 max-lg:px-6 py-4 text-white'>Test Preparation</p>
                    <p className='font-normal font-urban text-[1.1rem] max-xl:text-[1rem] text-white px-8 max-lg:px-6'>Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam
                      bibendum quam ultrices ultrices ac eu orci. Hac venenatis
                        mi purus venenatis et vulputate vel aliquet.</p>
                  </div>
                  <div className='block min-w-[32%] max-md:min-w-[45%] pb-8 bg-[#0F62AF] hover:shadow-rad shadow-cards rounded-[55px]'>
                    <img src={card3} alt='card3' className='w-96 px-8 mt-[2rem]'/>
                    <p className='font-bold font-urban text-[1.5rem] px-8 max-lg:px-6 py-4 text-white'>Test Preparation</p>
                    <p className='font-normal font-urban text-[1.1rem] max-xl:text-[1rem] text-white px-8 max-lg:px-6'>Lorem ipsum dolor sit amet consectetur. Cursus nibh aliquam
                      bibendum quam ultrices ultrices ac eu orci. Hac venenatis
                        mi purus venenatis et vulputate vel aliquet.</p>
                  </div>
              </div>
            </div>
            </div>


          </div>

          {/* fifth section */}
          
          <div className=' mx-auto'>
            
              <Trainings/>
              <TopUniversity/>
              <TopSchool/>

            {/* testimonials */}
            <button className='px-8 ml-[7.5rem] max-xl:ml-[4rem] max-md:ml-0 mt-[8rem] max-md:mt-[6rem] mb-12 py-3 max-md:py-1 border-[2px] bg-white font-bold font-urban rounded-full tracking-wider text-[1.2rem] max-lg:text-[1rem]'>Testimonials</button>
            <div className='flex justify-between  max-md:overflow-x-scroll max-md:gap-x-3'>

              <div className='w-[23%] min-w-[24%] max-md:min-w-[70%] flex flex-col border-black bg-white border-[1px] rounded-[40px] hover:shadow-lightshad p-7 max-xl:p-5 '>
                
                <div><img src={jane} alt='jane'/></div>
                <div className='text-[1.6rem] max-lg:text-[1.2rem] font-lato mt-[1rem]'>Jane Doe</div>
                <div className='font-urban font-normal text-[20px] max-lg:text-[17px] flex justify-between items-center mt-[0.7rem] mb-[0.7rem]'>
                  <p>Role</p>
                  <div className='flex items-center gap-2'><img src={star} alt='star'/>4.5</div>
                </div>
                <div className='font-urban max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Senectus sem laoreet enim adipiscing pellentesque. Suscipit sed adipiscing mi amet ut pulvinar.</div>

              </div>

              <div className='w-[23%] min-w-[24%] max-md:min-w-[70%]  flex flex-col border-black bg-white border-[1px] rounded-[40px] hover:shadow-rad p-7 max-xl:p-5'>
                
                <div><img src={jane} alt='jane'/></div>
                <div className='text-[1.6rem] max-lg:text-[1.2rem] font-lato mt-[1rem]'>Jane Doe</div>
                <div className='font-urban font-normal text-[20px] max-lg:text-[17px] flex justify-between items-center mt-[0.7rem] mb-[0.7rem]'>
                  <p>Role</p>
                  <div className='flex items-center gap-2'><img src={star} alt='star'/>4.5</div>
                </div>
                <div className='font-urban max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Senectus sem laoreet enim adipiscing pellentesque. Suscipit sed adipiscing mi amet ut pulvinar.</div>

              </div>

              <div className='w-[23%] min-w-[24%] max-md:min-w-[70%]  flex flex-col border-black bg-white border-[1px] rounded-[40px] hover:shadow-rad p-7 max-xl:p-5 '>
                
                <div><img src={jane} alt='jane'/></div>
                <div className='text-[1.6rem] max-lg:text-[1.2rem] font-lato mt-[1rem]'>Jane Doe</div>
                <div className='font-urban font-normal text-[20px] max-lg:text-[17px] flex justify-between items-center mt-[0.7rem] mb-[0.7rem]'>
                  <p>Role</p>
                  <div className='flex items-center gap-2'><img src={star} alt='star'/>4.5</div>
                </div>
                <div className='font-urban max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Senectus sem laoreet enim adipiscing pellentesque. Suscipit sed adipiscing mi amet ut pulvinar.</div>

              </div>

              <div className='w-[23%] min-w-[24%] max-md:min-w-[70%]  flex flex-col border-black bg-white border-[1px] rounded-[40px] hover:shadow-rad p-7 max-xl:p-5 '>
                
                <div><img src={jane} alt='jane'/></div>
                <div className='text-[1.6rem] max-lg:text-[1.2rem] font-lato mt-[1rem]'>Jane Doe</div>
                <div className='font-urban font-normal text-[20px] max-lg:text-[17px] flex justify-between items-center mt-[0.7rem] mb-[0.7rem]'>
                  <p>Role</p>
                  <div className='flex items-center gap-2'><img src={star} alt='star'/>4.5</div>
                </div>
                <div className='font-urban max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Senectus sem laoreet enim adipiscing pellentesque. Suscipit sed adipiscing mi amet ut pulvinar.</div>

              </div>

            </div>
          </div>
        
         <InfoGraphic/>
       
        </div>
        <section className="px-4 md:px-0">
        <div className="bg-[#5cc7f1] rounded-[80px] md:rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1637px] mx-auto h-auto -mt-32 md:-mt-[150px]">
          {/* Left Image */}
          <div className="flex-shrink-0 w-full h-[250px] md:w-[571px] md:h-[403px] rounded-[20px] overflow-hidden">
            <img
              src="/images/dummy.png"
              alt="Support Agent"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-lato text-[#001f3f]">
              Ready to flight your dreams?
            </h2>
            <p
              className="text-[#001f3f] text-sm md:text-base leading-relaxed"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "400",
                lineHeight: "1.75",
                marginBottom: "1.5rem",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Id donec facilisis duis
              placerat gravida aliquet at. Nisi urna quam massa pellentesque
              lectus odio sagittis. Tortor massa in rhoncus purus nunc
              scelerisque nullam. Consequat rhoncus nam ac enim leo. Feugiat
              eget urna varius eu nibh in sed est.
            </p>
            <button className="bg-[#2B7CD6] text-white border border-[#2B7CD6] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#2B7CD6] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0 shadow-[3px_3px_0px_0px_#001426]">
                            Book a call →
                        </button>
          </div>
        </div>
      </section>
        {/* footer section */}
        <Footer/>


      </div>

  );
}

export default Home;



// xl:mt-14max-sm:py-1 max-sm:px-5
// max-2xl:top-72 
// xl:top-56 
// lg:top-52 
// md:top-32 md:text-[16px] 
// max-sm:top-[65px] max-sm:text-sm 


// max-sm:text-[2rem] md:text-[50px] lg:text-[80px]
//  xl:text-[110px]max-sm:top-[48%] md:top-[50%] lg:top-[48%] xl:top-[39%]