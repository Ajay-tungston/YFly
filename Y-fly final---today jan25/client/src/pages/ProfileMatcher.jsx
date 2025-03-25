import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import grid from "../assets/images/image/grid.svg";
import CourseSearchbar from "../components/CourseSearchbar";
import search from "../assets/images/image/search.svg";
import ascend from "../assets/images/image/ascend.svg";
import info from "../assets/images/image/info.svg";
import contender from "../assets/images/image/contender.svg";
import shieldtick from "../assets/images/image/shieldtick.svg";
import ascendorange from "../assets/images/image/ascendorange.svg";
import harvard from "../assets/images/image/harvard.svg";
import princeton from "../assets/images/image/princeton.svg";
import contenderblue from "../assets/images/image/contenderblue.svg";
import contendergreen from "../assets/images/image/contendergreen.svg";
import close from "../assets/images/image/close.svg";
import wallet from "../assets/images/image/wallet.svg";
import Contactus from "../components/ContactUs";
import down from "../assets/images/image/down.svg";

import Footer from "../components/Footer";
import Ascend from "../components/Ascend";
import ResponsiveSearchBar from "../components/ResponsiveSearchBar";
import axios from "axios";
const Profilematcher = () => {
  const [userData, setUserData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  console.log(userData);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        if (email) {
          const response = await axios.get(
            `http://localhost:5000/user/profile/${email}`
          );
          setUserData(response?.data?.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/courses/get-profileMatcher"
        );
        console.log("result = ", response.data);
        setUniversityData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, []);

  const [isAscendExpanded, setIsAscendExpanded] = useState(false);

  const toggleShowMore = () => {
    setIsAscendExpanded(!isAscendExpanded);
  };

  // const ascendVisibleCards = isAscendExpanded ? cards : cards.slice(0, 2);

  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
    if (details) {
      setDetails(false);
    }
  };

  const [details, setDetails] = useState(false);
  const handleDetails = () => {
    setDetails(!details);
    if (openModal) {
      setOpenModal(false);
    }
    if (apply) {
      setApply(false);
    }
  };

  const [apply, setApply] = useState(false);
  const handleApply = () => {
    setApply(!apply);
    if (details) {
      setDetails(false);
    }
    if (documentsdrop) {
      setDocumentsdrop(false);
    }
  };

  const [yeardrop, setYeardrop] = useState(false);
  const handleYearDrop = () => {
    setYeardrop(!yeardrop);
  };

  const [monthdrop, setMonthdrop] = useState(false);
  const handleMonthDrop = () => {
    setMonthdrop(!monthdrop);
  };

  const [documentsdrop, setDocumentsdrop] = useState(false);
  const handleDocuments = () => {
    setDocumentsdrop(!documentsdrop);
    if (apply) {
      setApply(false);
    }
  };

  const [identitydoc, setIdentityDoc] = useState(false);
  const handleIdentitynDoc = () => {
    setIdentityDoc(!identitydoc);
  };

  const [educationdoc, setEducationDoc] = useState(false);
  const handleEducationDoc = () => {
    setEducationDoc(!educationdoc);
  };

  //Education Documents
  const [fileName, setFileName] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  //passport front
  const [passportFront, setPassportFront] = useState("");
  const handlePassportFrontChange = (event) => {
    const pf = event.target.files[0];
    if (pf) {
      setPassportFront(pf.name);
    }
  };
  const passportFrontRef = useRef(null);

  const handlePassportFront = () => {
    passportFrontRef.current.click();
  };

  return (
    <div>
      <div className="bg-[#0E1B2C] pb-10">
        {/* ----------------------------------1st section----------------------------- */}
        <div className="bg-white h-[70vh] rounded-b-[200px] max-md:rounded-b-[80px] relative">
          <Navbar />

          <div className="flex justify-center">
            <button className="absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban">
              AI PROFILE MATCHER
            </button>
            <div className="absolute text-center top-[13.5rem] font-dela text-[5.4rem] leading-[6.5rem] max-xl:text-[4rem] max-xl:leading-[4.8rem] max-lg:text-[3.2rem] max-lg:leading-[3.5rem]  max-md:text-[1.8rem] max-md:leading-[3rem]">
              Your personalised
              <br /> course search.
            </div>
            <div className="absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-lg:top-[22rem] max-md:top-[20rem]">
              Your pathway to find the perfect course
            </div>
          </div>
        </div>

        {/*---------------------------------- second section--------------------- */}
        <div className="flex justify-center mt-10 max-lg:hidden">
          {userData && (
            <div className="bg-bluegradient w-[90%] rounded-full py-12 px-20 flex flex-wrap justify-between">
              <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                <div className="">{userData?.degree}</div>
              </button>

              <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                <div className="">
                  {userData?.countries && userData?.countries[0]}
                </div>
              </button>

              <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                <div className="">Computer Science & IT</div>
              </button>

              <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                <div className="">Aug - Nov 2024</div>
              </button>

              <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                <div className="">₹30L</div>
              </button>
              {userData?.work_experience?.has_experience && (
                <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                  <div className="">
                    {userData?.work_experience?.months_of_experience} months
                  </div>
                </button>
              )}

              <button className="flex items-center justify-center px-8 py-3 bg-white rounded-full mb-2">
                <div className="">
                  {userData?.proficiency_exam?.exam_name} Exam{" "}
                  {userData?.proficiency_exam?.score &&
                    `Score ${userData?.proficiency_exam?.score}`}
                </div>
              </button>
            </div>
          )}
        </div>

        <ResponsiveSearchBar />

        {/*--------------------------------- white grid section------------------------------------------ */}
        <div
          className=" bg-white bg-cover bg-center rounded-[200px] max-xl:rounded-[150px] max-md:rounded-[80px] pt-16 px-24 pb-32 mt-10 max-xl:px-12  max-lg:px-10 max-md:px-4"
          style={{ backgroundImage: `url(${grid})` }}
        >
          <div className="flex justify-between">
            <CourseSearchbar />

            <div className=" w-[72%] max-lg:w-[100%]">
              {/* ------------------search bar----------------------- */}
              <div className="flex justify-end">
                <div className=" relative">
                  <input
                    type="text"
                    placeholder="Search for scholarships"
                    className="pl-12 py-3 pr-4  border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban max-md:text-[0.8rem]"
                  />
                  <div className="absolute inset-y-4 left-6">
                    <img src={search} width={18} alt="search" />
                  </div>
                </div>
              </div>

              {/* -----------------------3 color div section----------------------------------------------- */}
              <div className="flex justify-between mt-12 mb-16">
                <div className="w-[30%]  max-xl:w-[32%] bg-[#C9851E] px-10 max-xl:px-5 max-lg:px-7 max-md:px-3 py-4 max-md:py-2 rounded-[50px] flex justify-between  border-black border-[1px]">
                  <div className="flex">
                    <img
                      src={ascend}
                      alt="ascend"
                      width={40}
                      className="max-xl:w-[2rem] max-md:w-[0.5rem]"
                    />

                    <div className=" text-white font-urban ml-4 max-lg:ml-2 ">
                      <div className=" text-[22px] max-xl:text-[18px] max-md:text-[15px] font-bold  -mb-1">
                        {universityData?.data?.Ascend?.count}
                      </div>
                      <div className=" text-[17px] max-xl:text-[15px] max-md:text-[12px] font-semibold">
                        Ascend
                      </div>
                    </div>
                  </div>

                  <img
                    src={info}
                    alt="info"
                    width={25}
                    className=" max-md:w-[0.5rem]"
                  />
                </div>

                <div className="w-[30%] max-xl:w-[32%] bg-[#2B7CD6] px-10 max-xl:px-5 max-lg:px-7 max-md:px-3 py-4 max-md:py-2 rounded-[50px] flex justify-between border-black border-[1px]">
                  <div className="flex">
                    <img
                      src={contender}
                      alt="contender"
                      width={40}
                      className="max-xl:w-[2rem] max-md:w-[0.5rem]"
                    />

                    <div className=" text-white font-urban ml-4 max-lg:ml-2 max-md:ml-1">
                      <div className=" text-[22px] max-xl:text-[18px] max-md:text-[15px] font-bold  -mb-1">
                        {universityData?.data?.Contender?.count}
                      </div>
                      <div className=" text-[17px] max-xl:text-[15px] max-md:text-[12px] font-semibold">
                        Contender
                      </div>
                    </div>
                  </div>

                  <img
                    src={info}
                    alt="info"
                    width={25}
                    className="max-md:w-[0.5rem]"
                  />
                </div>

                <div className="w-[30%] max-xl:w-[32%] bg-[#209F71] px-10 max-xl:px-5 max-lg:px-7 max-md:px-3 py-4 max-md:py-2 rounded-[50px] flex justify-between  border-black border-[1px]">
                  <div className="flex">
                    <img
                      src={shieldtick}
                      alt="shieldtick"
                      width={40}
                      className="max-xl:w-[2rem] max-md:w-[0.5rem]"
                    />

                    <div className=" text-white font-urban ml-4 max-lg:ml-2 max-md:ml-1">
                      <div className=" text-[22px] max-xl:text-[18px] max-md:text-[15px] font-bold  -mb-1">
                        {universityData?.data?.Frontrunner?.count}
                      </div>
                      <div className=" text-[17px] max-xl:text-[15px] max-md:text-[12px] font-semibold">
                        Frontrunner
                      </div>
                    </div>
                  </div>

                  <img
                    src={info}
                    alt="info"
                    width={25}
                    className="max-md:w-[0.5rem]"
                  />
                </div>
              </div>
              {/* ------------------------------- Ascend Universities------------------------ */}
              <div>
                <div className="flex items-center mb-5">
                  <img
                    src={ascendorange}
                    width={40}
                    alt="ascend"
                    className="max-md:w-[1.2rem]"
                  />
                  <div className="font-urban ml-3 text-[25px] max-md:text-[18px] font-bold">
                    {universityData?.data?.Ascend?.count} Ascend Universities
                  </div>
                </div>
                {/* ------------------------------harvard university------------------------------------ */}
                <div className="flex flex-wrap justify-between gap-4 max-md:flex-col max-md:gap-y-2">
                  {/* <Ascend /> */}
                  {/*----------------------------------- princeton university----------------------------- */}
                  {isAscendExpanded
                    ? universityData?.data?.Ascend?.universities?.map((i) => (
                        <div className=" w-[49%] max-md:w-[100%]  bg-[#FFF0D9] border-[#C9851E] border-[1px] rounded-[30px] hover:shadow-[#C9851E] hover:shadow-right-bottom px-5 pb-6">
                          <div className="flex justify-center pt-16 pb-5">
                            <img
                              src={`data:${i.university_logo?.contentType};base64,${i.university_logo?.data}`}
                              className="h-20 max-w-40"
                              alt={i?.university_name}
                            />
                          </div>
                          <div className="bg-[#FFE0B2] inline-block px-4 py-1 rounded-[20px] font-bold text-[#C9851E] text-[14px] font-urban">
                            {i?.location}
                          </div>
                          <div className="font-dela text-[13px] mt-2">
                            {i?.university_name}
                          </div>

                          <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                          <div className="flex justify-between">
                            <div>
                              <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                Intake Schedule
                              </div>
                              <div className="font-dela text-[13px] max-xl:text-[12px]">
                                {i?.intakes[0].month} {i?.intakes[0].year}
                              </div>
                            </div>

                            <div>
                              <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                QS Rank
                              </div>
                              <div className="flex font-urban max-xl:text-[12px]">
                                QS Rank:{" "}
                                <div className=" font-bold">#{i?.qs_rank}</div>
                              </div>
                            </div>

                            <div className=" flex items-center">
                              <button
                                onClick={handleModal}
                                className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                              >
                                View courses
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    : universityData?.data?.Ascend?.universities
                        ?.slice(0, 2)
                        ?.map((i) => (
                          <div className=" w-[49%] max-md:w-[100%]  bg-[#FFF0D9] border-[#C9851E] border-[1px] rounded-[30px] hover:shadow-[#C9851E] hover:shadow-right-bottom px-5 pb-6">
                            <div className="flex justify-center pt-16 pb-5">
                              <img
                                src={`data:${i.university_logo?.contentType};base64,${i.university_logo?.data}`}
                                // width={200}
                                // height={128}
                                className="h-20 max-w-40"
                                alt={i.university_name}
                              />
                            </div>
                            <div className="bg-[#FFE0B2] inline-block px-4 py-1 rounded-[20px] font-bold text-[#C9851E] text-[14px] font-urban">
                              {i?.location}
                            </div>
                            <div className="font-dela text-[13px] mt-2">
                              {i?.university_name}
                            </div>

                            <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                            <div className="flex justify-between">
                              <div>
                                <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                  Intake Schedule
                                </div>
                                <div className="font-dela text-[13px] max-xl:text-[12px]">
                                  {i?.intakes[0].month} {i?.intakes[0].year}
                                </div>
                              </div>

                              <div>
                                <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                  QS Rank
                                </div>
                                <div className="flex font-urban max-xl:text-[12px]">
                                  QS Rank:{" "}
                                  <div className=" font-bold">
                                    #{i?.qs_rank}
                                  </div>
                                </div>
                              </div>

                              <div className=" flex items-center">
                                <button
                                  onClick={handleModal}
                                  className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                >
                                  View courses
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                </div>

                <div className="flex justify-between my-12">
                  <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                  <button
                    className="text-[#30589F] font-urban font-bold"
                    onClick={toggleShowMore}
                  >
                    View {isAscendExpanded ? "Less" : "More"} Universities
                  </button>
                  <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                </div>
              </div>

              {/* -------------------------------Contender Universities------------------------ */}
              <div>
                <div className="flex items-center mb-5">
                  <img
                    src={contenderblue}
                    width={40}
                    alt="contender"
                    className="max-md:w-[1.2rem]"
                  />
                  <div className="font-urban ml-3 text-[25px] max-md:text-[18px] font-bold">
                    {universityData?.data?.Contender?.count} Contender
                    Universities
                  </div>
                </div>
                {/* ------------------------------harvard university------------------------------------ */}
                <div className="flex justify-between max-md:flex-col max-md:gap-y-2">
                  <div className=" w-[49%] max-md:w-[100%] bg-[#D9EBFF] border-[#2B7CD6] border-[1px] rounded-[30px] hover:shadow-[#2B7CD6] hover:shadow-right-bottom px-5 pb-6">
                    <div className="flex justify-center pt-16 pb-5">
                      <img src={harvard} width={200} alt="harward" />
                    </div>
                    <div className="bg-[#B2D7FF] inline-block px-4 py-1 rounded-[20px] font-bold text-[#2B7CD6] text-[14px] font-urban">
                      Massachusetts, United States
                    </div>
                    <div className="font-dela text-[13px] mt-2">
                      Harvard University
                    </div>
                    <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                    <div className="flex justify-between">
                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                          University type
                        </div>
                        <div className="font-dela text-[13px] max-xl:text-[12px]">
                          Private
                        </div>
                      </div>

                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                          QS Rank
                        </div>
                        <div className="flex font-urban max-xl:text-[12px]">
                          QS Rank: <div className=" font-bold">#5</div>
                        </div>
                      </div>

                      <div className=" flex items-center">
                        <button className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]">
                          View courses
                        </button>
                      </div>
                    </div>
                  </div>

                  {/*----------------------------------- princeton university----------------------------- */}
                  <div className=" w-[49%] max-md:w-[100%] bg-[#D9EBFF] border-[#2B7CD6] border-[1px] rounded-[30px] hover:shadow-[#2B7CD6] hover:shadow-right-bottom px-5 pb-6">
                    <div className="flex justify-center pt-16 pb-5">
                      <img src={princeton} width={200} alt="princeton" />
                    </div>
                    <div className="bg-[#B2D7FF] inline-block px-4 py-1 rounded-[20px] font-bold text-[#2B7CD6] text-[14px] font-urban">
                      New Jersey, USA
                    </div>
                    <div className="font-dela text-[13px] mt-2">
                      Princeton University
                    </div>

                    <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                    <div className="flex justify-between">
                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                          University type
                        </div>
                        <div className="font-dela text-[13px] max-xl:text-[12px]">
                          Private
                        </div>
                      </div>

                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                          QS Rank
                        </div>
                        <div className="flex font-urban max-xl:text-[12px]">
                          QS Rank: <div className=" font-bold">#5</div>
                        </div>
                      </div>

                      <div className=" flex items-center">
                        <button className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]">
                          View courses
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between my-12">
                  <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                  <button className="text-[#30589F] font-urban font-bold">
                    View More Universities
                  </button>
                  <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                </div>
              </div>

              {/* -------------------------------Frontrunner Universities------------------------ */}
              <div>
                <div className="flex items-center mb-5">
                  <img
                    src={contendergreen}
                    width={40}
                    alt="contender"
                    className="max-md:w-[1.2rem]"
                  />
                  <div className="font-urban ml-3 text-[25px] max-md:text-[18px] font-bold">
                    {universityData?.data?.Frontrunner?.count} Frontrunner
                    Universities
                  </div>
                </div>
                {/* ------------------------------harvard university------------------------------------ */}
                <div className="flex justify-between max-md:flex-col max-md:gap-y-2">
                  <div className=" w-[49%] max-md:w-[100%] bg-[#D9FFF1] border-[#209F71] border-[1px] rounded-[30px] hover:shadow-[#209F71] hover:shadow-right-bottom px-5 pb-6">
                    <div className="flex justify-center pt-16 pb-5">
                      <img src={harvard} width={200} alt="harward" />
                    </div>
                    <div className="bg-[#B2FFE3] inline-block px-4 py-1 rounded-[20px] font-bold text-[#209F71] text-[14px] font-urban">
                      Massachusetts, United States
                    </div>
                    <div className="font-dela text-[13px] mt-2">
                      Harvard University
                    </div>
                    <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                    <div className="flex justify-between">
                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                          University type
                        </div>
                        <div className="font-dela text-[13px] max-xl:text-[12px]">
                          Private
                        </div>
                      </div>

                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                          QS Rank
                        </div>
                        <div className="flex font-urban max-xl:text-[12px]">
                          QS Rank: <div className=" font-bold">#5</div>
                        </div>
                      </div>

                      <div className=" flex items-center">
                        <button className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]">
                          View courses
                        </button>
                      </div>
                    </div>
                  </div>

                  {/*----------------------------------- princeton university----------------------------- */}
                  <div className=" w-[49%] max-md:w-[100%] bg-[#D9FFF1] border-[#209F71] border-[1px] rounded-[30px] hover:shadow-[#209F71] hover:shadow-right-bottom px-5 pb-6">
                    <div className="flex justify-center pt-16 pb-5">
                      <img src={princeton} width={200} alt="princeton" />
                    </div>
                    <div className="bg-[#B2FFE3] inline-block px-4 py-1 rounded-[20px] font-bold text-[#209F71] text-[14px] font-urban">
                      New Jersey, USA
                    </div>
                    <div className="font-dela text-[13px] mt-2">
                      Princeton University
                    </div>

                    <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                    <div className="flex justify-between">
                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                          University type
                        </div>
                        <div className="font-dela text-[13px] max-xl:text-[12px]">
                          Private
                        </div>
                      </div>

                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                          QS Rank
                        </div>
                        <div className="flex font-urban max-xl:text-[12px]">
                          QS Rank: <div className=" font-bold">#5</div>
                        </div>
                      </div>

                      <div className=" flex items-center">
                        <button className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]">
                          View courses
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-12">
                  <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                  <button className="text-[#30589F] font-urban font-bold">
                    View More Universities
                  </button>
                  <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                </div>
              </div>
            </div>
          </div>
          {/* <Contactus /> */}
          {openModal && (
            <div className="bg-black bg-opacity-50 h-[100vh] fixed inset-0 ">
              {/* first modal */}
              <div className=" flex justify-around">
                <div className="bg-white w-[40%] max-md:w-[95%] absolute top-[30%] rounded-[30px] p-8">
                  <div className="flex justify-between items-center mb-5">
                    <div className="font-dela  text-[18px]">
                      Recommended courses
                    </div>
                    <button onClick={handleModal}>
                      <img src={close} width={20} alt="close" />
                    </button>
                  </div>

                  <div className="overflow-y-auto h-[30vh] ">
                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelor of Arts in Biomedical Engineering</div>
                      <button
                        onClick={handleDetails}
                        className="text-[#2B7CD6] text-[14px] font-semibold"
                      >
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelors in Mathematics</div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>
                        Bachelors in Molecular and Cellular Biology (MCB)
                      </div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelors of Arts in Computer Science</div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelor of Science in Electrical Engineering</div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelor of Science in Engineering Sciences</div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelor of Science in Mechanical Engineering</div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>

                    <div className="flex justify-between font-urban mb-3 mr-4">
                      <div>Bachelors in Philosophy</div>
                      <button className="text-[#2B7CD6] text-[14px] font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {details && (
            <div className="bg-black bg-opacity-50 h-[100vh] fixed inset-0 ">
              <div className=" flex justify-around">
                <div className="bg-white w-[40%] max-md:w-[95%] absolute top-[20%] rounded-[30px] p-8">
                  <div className="border-black border-[1px] p-5 rounded-[20px]">
                    <div className="flex justify-center pt-4 pb-7">
                      <img src={harvard} width={250} alt="harward" />
                    </div>
                    <div className="font-dela text-[13px]">
                      Bachelor of Science in Engineering Sciences
                    </div>
                  </div>

                  <div>
                    <div className="py-5 font-dela text-[18px]">
                      Course Details
                    </div>

                    <div className="flex ">
                      <div className="flex w-[60%]">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">
                            Tuition Fee
                          </div>
                          <div className="font-dela text-[13px]">
                            USD 49,653/year
                          </div>
                        </div>
                      </div>

                      <div className="flex w-[40%]">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">
                            Eligibility
                          </div>
                          <div className="font-dela text-[13px]">Min. 80%</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-5 ">
                      <div className="flex w-[60%] ">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">Duration</div>
                          <div className="font-dela text-[13px]">48 Months</div>
                        </div>
                      </div>

                      <div className="flex w-[40%]">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">Duration</div>
                          <div className="font-dela text-[13px]">48 Months</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-5 ">
                      <div className="flex">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">
                            English Proficiency Requirement
                          </div>
                          <div className="font-dela text-[13px]">
                            Overall score of 7, with min. 7 in each band (IELTS)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={handleModal}
                        className="bg-white px-4 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] font-urban border-[2px] rounded-[20px]"
                      >
                        Back to results
                      </button>
                      <button
                        onClick={handleApply}
                        className=" bg-[#2B7CD6] text-[14px] font-urban text-white flex items-center px-5 py-1 rounded-full shadow-right-bottom border-[1px] shadow-black border-black"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {apply && (
            <div className="bg-black bg-opacity-50 h-[100vh] fixed inset-0 ">
              <div className=" flex justify-around">
                <div className="bg-white w-[40%] max-md:w-[95%] absolute top-[20%] rounded-[30px] p-8">
                  <div className="font-dela">Apply Now</div>

                  <div className="my-5">
                    {/* intake year */}
                    <div className="py-4 px-5 border-black border-[1px] rounded-[30px] ">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Select intake year
                        </div>
                        <button onClick={handleYearDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>

                      {yeardrop && (
                        <div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center">
                            2024
                          </div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center">
                            2025
                          </div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center">
                            2026
                          </div>
                        </div>
                      )}
                    </div>

                    {/* intake month */}
                    <div className="py-4 px-5 border-black border-[1px] rounded-[30px] mt-3 ">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Select intake month
                        </div>
                        <button onClick={handleMonthDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>

                      {monthdrop && (
                        <div className="overflow-y-auto h-[21vh]">
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center mr-4">
                            January
                          </div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center mr-4">
                            February
                          </div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center mr-4">
                            March
                          </div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center mr-4">
                            April
                          </div>
                          <div className="py-3 px-5 mt-2 text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] text-center mr-4">
                            May
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between ">
                    <button
                      onClick={handleDetails}
                      className="bg-white px-4 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] font-urban border-[2px] rounded-[20px]"
                    >
                      Back to details
                    </button>
                    <button
                      onClick={handleDocuments}
                      className=" bg-[#2B7CD6] text-[14px] font-urban text-white flex items-center px-5 py-1 rounded-full shadow-right-bottom border-[1px] shadow-black border-black"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {documentsdrop && (
            <div className="bg-black bg-opacity-50 h-[100vh] fixed inset-0 ">
              <div className=" flex justify-around">
                <div className="bg-white w-[40%] max-md:w-[95%] absolute top-[5%] rounded-[30px] p-8">
                  <div className="font-dela">Apply Now</div>

                  <div className="my-5">
                    {/* Identity Documents */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] ">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Identity Documents
                        </div>
                        <button onClick={handleIdentitynDoc}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>

                      {identitydoc && (
                        <div>
                          {/* passport front */}
                          <div className="py-3 px-5 mt-2 text-[14px] flex justify-between text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] ">
                            Passport Front
                            <input
                              type="file"
                              className="hidden"
                              ref={passportFrontRef}
                              onChange={handlePassportFrontChange}
                            />
                            <div className="">
                              <button
                                onClick={handlePassportFront}
                                className=" border-none font-urban font-semibold text-[#2B7CD6] border"
                              >
                                Upload file
                              </button>
                              {passportFront && (
                                <p className=" font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                  {passportFront}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="py-3 px-5 mt-2 flex justify-between text-[14px] text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] ">
                            Passport Back
                            <button className=" border-none font-urban font-semibold text-[#2B7CD6] border">
                              Upload file
                            </button>
                          </div>
                          <div className="py-3 px-5 mt-2 flex justify-between text-[14px] text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px] ">
                            CV/Resume
                            <button className=" border-none font-urban font-semibold text-[#2B7CD6] border">
                              Upload file
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Education Documents */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Education Documents
                        </div>
                        <button onClick={handleEducationDoc}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>
                      {educationdoc && (
                        <div>
                          <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                          <div className="flex ">
                            <button
                              onClick={handleClick}
                              className="py-2 border-none font-urban font-semibold text-[#2B7CD6] border"
                            >
                              Upload file
                            </button>
                            {fileName && (
                              <p className="mt-2 ml-5 font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                {fileName}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Work Experience Documents */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Work Experience Documents
                        </div>
                        <button onClick={handleYearDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>
                    </div>

                    {/* English Proficiency Documents */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          English Proficiency Documents
                        </div>
                        <button onClick={handleYearDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>
                    </div>
                    {/* Extra Curricular Document */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Extra Curricular Document
                        </div>
                        <button onClick={handleYearDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>
                    </div>
                    {/*Recommendation Documents */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Recommendation Documents
                        </div>
                        <button onClick={handleYearDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>
                    </div>
                    {/*Other Documents */}
                    <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                      <div className="flex justify-between">
                        <div className="text-[#BFBFBF] font-urban">
                          Other Documents
                        </div>
                        <button onClick={handleYearDrop}>
                          <img src={down} width={15} alt="down" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between ">
                    <button
                      onClick={handleApply}
                      className="bg-white px-4 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] font-urban border-[2px] rounded-[20px]"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleDocuments}
                      className=" bg-[#2B7CD6] text-[14px] font-urban text-white flex items-center px-5 py-1 rounded-full shadow-right-bottom border-[1px] shadow-black border-black"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Contactus />
        <Footer />
      </div>
    </div>
  );
};

export default Profilematcher;
