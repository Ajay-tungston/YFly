import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import grid from "../assets/images/image/grid.svg";

import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
const SopWriting = () => {
  const params = useParams();
  const [service, setService] = useState([]);
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
  }, []);

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
        {/* apply online */}
        <div className="font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 pb-2 pt-5 text-[#30589f] tracking-wide">
          Apply Online
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 ">
          Place the order using the link on this page.
        </p>
        <br />
        {/* submit your details */}
        <div className="font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide">
          Submit Your Details
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5">
          Submit your details via an online preferences form.
        </p>
        <br />
        {/* workflow */}
        <div className="font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide">
          Workflow
        </div>
        <p className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5">
          Order Creation & Timeline: The SOP order willl be created once you
          fill in the preferences and submit the form.
        </p>
        <br />
        {/* dirst draft delivery */}
        <div className="font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide">
          First Draft Delivery
        </div>
        <ul className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] list-disc font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3">
          <li>
            Once the order is recieved, we will prepare the first draft and send
            the Google Doc file link through email.
          </li>
          <li>
            There will be two rounds of review after the first draft is
            delivered.
          </li>
        </ul>

        <br />
        {/* student reviews and order completion */}
        <div className="font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide">
          Student Reviews and Order Completion
        </div>
        <ul className="text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] list-disc font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3">
          <li>
            In the first review, any major changes you request will be
            accomodated.
          </li>
          <li>In the second review, only minor changes will be made.</li>
          <li>
            Please leave comments in the Google Doc file for any chnages
            required.
          </li>
          <li>
            The order will be completed after we recieve confirmation that you
            are satisfied with the changes made during the Student Review phase.
          </li>
        </ul>
      </div>

      {/* ---------------------------footer------------------------------------ */}
      <Footer />
    </div>
  );
};

export default SopWriting;
