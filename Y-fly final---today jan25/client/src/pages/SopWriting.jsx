import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import grid from "../assets/images/image/grid.svg";

import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const SopWriting = () => {
  const params = useParams();
  const [service, setService] = useState([]);
  const [userEmail , setUserEmail] = useState(localStorage.getItem("email"));

  console.log(service);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/get/${params?.id}`
        );
        setService(response?.data?.service);
      } catch (error) {
        console.error(error);
      }
    };
    fetchService();
  }, [params]);

  const handelApplay = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/service/applay`,
        {
          service_id: params?.id,
          user_email: userEmail
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // alert("Application submitted successfully")
      Swal.fire({
        title: "Application submitted successfully",
        icon: "success",
        draggable: true
      });
     
    } catch (error) {
      if(error?.response?.status===400){
        // alert("Application already submitted")
        Swal.fire({
          title: "Application already submitted",
          icon: "warning",
          draggable: true
        });
      }
      else{
        alert("something went wrong")
      }
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0E1B2C] pb-10">
      <div className="bg-white h-[82vh] max-xl:h-[70vh] rounded-b-[200px] max-lg:rounded-b-[120px] max-md:rounded-b-[80px] relative max-md:h-[50vh]">
        <div className="flex justify-center">
          <Navbar />
        </div>

        <div className="flex justify-center">
          <div className=" absolute top-[15rem] max-md:top-[9rem] text-center  tracking-wide leading-tight ">
            <p className="text-black font-dela  text-[5.4rem] max-xl:text-[3.8rem] max-md:text-[2rem] max-lg:text-[3rem] capitalize">
              {service?.service_name}
            </p>
            <p className="text-black py-4 font-pop font-bold  text-[2rem] max-md:text-[1.2rem] max-lg:text-[1.5rem]">
              ₹ {service?.price}
            </p>
          </div>
        </div>

        <div className="flex justify-center ">
          <button
            className="absolute px-10 top-[27rem] max-xl:top-[24rem] max-md:top-[15rem] max-lg:top-[23rem] py-2 max-md:py-1 bg-[#2B7CD6] text-[1.3rem] max-lg:text-[1rem] shadow-ip font-extrabold
                                      text-white transition-all cursor-pointer
                                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
                                        hover:border-b-[6px] rounded-full border-[1px] border-[#0E1B2C] 
                                        font-urban "
            onClick={handelApplay}
          >
            Apply
          </button>
        </div>
      </div>

      <div
        className=" bg-white bg-cover bg-center rounded-[200px] max-lg:rounded-[120px] max-md:rounded-[80px] pt-24 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
        style={{ backgroundImage: `url(${grid})` }}
      >
        <div className="text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]">
          Overview
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0  py-3">
          {service?.overview}
        </p>

        {/* BENEFITS */}
        <div className="text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]">
          Benefits
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0 py-3">
          The {service?.service_name} service will benefit you in several ways:
        </p>
        <ul className="text-black list-decimal text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3">
          {service?.benefits?.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        {/* procedure */}
        <div className="text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]">
          Procedure
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0 py-3">
          {service?.procedure}
        </p>

        {/* workflow */}
        <div className="text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]">
          Workflow
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0 py-3">
          {service?.workflow}
        </p>
      </div>
      <section className=" px-4 md:px-0">
        <div className="bg-[#5BC7F1] rounded-[80px] md:rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1637px] mx-auto h-auto md:h-[510px] -mt-[100px]">
          {/* Left Image */}
          <div className="flex-shrink-0 relative w-full h-[403px] md:w-[571px] md:h-[403px] mx-auto md:mx-0 rounded-[20px] overflow-hidden">
            <img
              src="/images/dummy.png" // Replace with your actual image path
              alt="Support Agent"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[#001f3f]">
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

            <button className="bg-white text-[#001f3f] border border-[#001f3f] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#001f3f] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0">
              Book a call →
            </button>
          </div>
        </div>
      </section>
      {/* ---------------------------footer------------------------------------ */}
      <Footer />
    </div>
  );
};

export default SopWriting;
