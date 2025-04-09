import React, { useState } from "react";
import filter from "../assets/images/filter.svg";
import dropdown from "../assets/images/nav-dropdown.svg";
import RangeSlider from "./RangeSLider";
import bluesearch from "../assets/images/bluesearch.svg";
import "../assets/styles/styles.css";
import DeadlineSlider from "./DeadlineSlider";
const CourseSideBar = ({
  intake,
  setIntake,
  country,
  setCountry,
  courseLevel,
  setCourseLevel,
  areaOfStudy,
  setAreaOfStudy,
  disciplineSearch,
  setDisciplineSearch,
  courseDuration,
  setCourseDuration,
  backlogs,
  setBacklogs,
  tuitionFeeMin,
  setTuitionFeeMin,
  tuitionFeeMax,
  setTuitionFeeMax,
  scholarship,
  setScholarship,
  testRequirement,
  setTestRequirement,
  dbValues,
  tuitionFees,
  setTuitionFees,
}) => {
  // for desired course
  const [isOneOpen, setIsOneOpen] = useState(false);
  const desiredCountryDropdown = () => {
    setIsOneOpen(!isOneOpen);
  };

  //for scholarship type
  const [isTwoOpen, setIsTwoOpen] = useState(false);
  const intakeYearDropDown = () => {
    setIsTwoOpen(!isTwoOpen);
  };

  //Area of study
  const [isThreeOpen, setIsThreeOpen] = useState(false);
  const courselevelDropdown = () => {
    setIsThreeOpen(!isThreeOpen);
  };

  //scholarship amount
  const [isFourOpen, setIsFourOpen] = useState(false);
  const areaOfStudyDropdown = () => {
    setIsFourOpen(!isFourOpen);
  };

  const [isFiveOpen, setIsFiveOpen] = useState(false);
  const DisciplineSearch = () => {
    setIsFiveOpen(!isFiveOpen);
  };

  //special restrictions
  const [isSixOpen, setIsSixOpen] = useState(false);
  const courseDurationDropdown = () => {
    setIsSixOpen(!isSixOpen);
  };

  //scholarship applicability
  const [isSevenOpen, setIsSevenOpen] = useState(false);
  const backlogsDropdown = () => {
    setIsSevenOpen(!isSevenOpen);
  };

  //deadline
  const [isEightOpen, setIsEightOpen] = useState(false);
  const tuitionFeesDropdown = () => {
    setIsEightOpen(!isEightOpen);
  };

  //student citizenship
  const [isNineOpen, setIsNineOpen] = useState(false);
  const testRequirementDropdown = () => {
    setIsNineOpen(!isNineOpen);
  };

  return (
    <>
      <div className="w-[15%] max-xl:w-[27%] font-urban  bg-[#fff] rounded-[50px] border-[1px] max-h-[1000px] border-black flex flex-col max-lg:hidden overflow-y-auto">
        {/* filter */}
        <div className="font-urban text-[1.2rem] text-black flex gap-3 items-center px-8 pt-7 pb-5 tracking-wide">
          <img src={filter} alt="filter" />
          Filters
        </div>
        {/**********************************************************************************************************************************************************************************************************/}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/**********************************************************************************************************************************************************************************************************/}

        {/* desired course */}
        <div className="flex flex-col ">
          <button
            className="flex justify-between items-center  py-4 font-bold text-black text-[1.1rem] px-8 "
            onClick={desiredCountryDropdown}
          >
            Country{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isOneOpen ? "rotate-180" : ""}
            />
          </button>
          {isOneOpen && (
            <div className=" flex flex-col mb-6">
              {dbValues.countries.map((i) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor={i}
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    {" "}
                    <input
                      id={i}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={i}
                      onChange={(e) =>
                        setCountry((prv) => (prv === i ? "" : i))
                      }
                      checked={country === i}
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>

                  <label
                    htmlFor={i}
                    className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                  >
                    {i}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* scholarship type */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={intakeYearDropDown}
          >
            Intake{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isTwoOpen ? "rotate-180" : ""}
            />
          </button>
          {isTwoOpen && (
            <div className=" flex flex-col mb-6">
              {/* CHECHBOX-1 */}
              {dbValues.intakeYears.map((index) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor="checkbox1"
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id="checkbox1"
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={index}
                      onChange={(e) =>
                        setIntake((prv) => (prv === index ? "" : index))
                      }
                      checked={intake === index}
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>

                  <label
                    htmlFor={index}
                    className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                  >
                    {index}
                  </label>
                </div>
              ))}
              {/* CHECKBOX-2 */}
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* **************************************************************************************************************************************************************************************************** */}

        {/* Area of study */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={courselevelDropdown}
          >
            Course Level{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isThreeOpen ? "rotate-180" : ""}
            />
          </button>
          {isThreeOpen && (
            <div className=" flex flex-col mb-6">
              {dbValues.courseLevels.map((lvl) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor="checkbox1"
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id="checkbox1"
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={lvl}
                      onChange={(e) =>
                        setCourseLevel((prv) => (prv === lvl ? "" : lvl))
                      }
                      checked={courseLevel === lvl}
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>

                  <label
                    htmlFor="lvl"
                    className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                  >
                    {lvl}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* **************************************************************************************************************************************************************************************************** */}

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Intake year */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={areaOfStudyDropdown}
          >
            Area Of Study{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isFourOpen ? "rotate-180" : ""}
            />
          </button>
          {isFourOpen && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-5 px-1">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 pl-10 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              {/* chleckboxes */}
              <div className="flex flex-col mt-3 px-1">
                {/* CHECHBOX 1 */}
                {dbValues.areasOfStudy.map((aof) => (
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox1"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox1"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
                        value={aof}
                        onChange={(e) =>
                          setAreaOfStudy((prv) => (prv === aof ? "" : aof))
                        }
                        checked={areaOfStudy === aof}
                      />
                      <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          strokeWidth="1"
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>

                    <label
                      htmlFor="aof"
                      className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                    >
                      {aof}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}
        {/* Discipline Search*/}
        <div className="flex flex-col ">
          <button
            className="flex justify-between items-center  py-4 font-bold text-black text-[1.1rem] px-8 max-xl:px-4 max-xl:text-[1rem]"
            onClick={DisciplineSearch}
          >
            Discipline
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isFiveOpen ? "rotate-180" : ""}
            />
          </button>
          {isFiveOpen && (
            <div className="flex flex-col mb-4">
              <div>
                {/* search bar */}

                <div className=" relative  rounded-[40px] px-10 mt-2">
                  <input
                    type="text"
                    placeholder="Search"
                    value={disciplineSearch}
                    onChange={(e) => setDisciplineSearch(e.target.value)}
                    className="py-1 px-7 w-full border-[#bfbfbf] border rounded-[40px] placeholder:pl-3 placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  />
                  <div className="absolute inset-y-2 left-[3.7rem]">
                    <img src={bluesearch} width={18} alt="search" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Special Restrictions */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={courseDurationDropdown}
          >
            Course Duration{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isSixOpen ? "rotate-180" : ""}
            />
          </button>
          {isSixOpen && (
            <div className="flex flex-col mb-6">
              {/* CHECHBOX 1 */}
              {dbValues.courseDuration.map((dur) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor="checkbox1"
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id="checkbox1"
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={dur}
                      onChange={(e) =>
                        setCourseDuration((prv) => (prv === dur ? "" : dur))
                      }
                      checked={courseDuration === dur}
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>

                  <label
                    htmlFor="dur"
                    className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                  >
                    {dur}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Backlogs*/}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={backlogsDropdown}
          >
            Backlogs
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isSevenOpen ? "rotate-180" : ""}
            />
          </button>
          {isSevenOpen && (
            <div className="flex flex-col mb-6">
              <div className="flex flex-col mt-2 px-3 h-[11.5vh] overflow-y-auto">
                {(dbValues.backlogs || []).map((back, idx) => (
                  <div key={idx} className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor={`backlog-checkbox-${idx}`}
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id={`backlog-checkbox-${idx}`}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
                        value={back}
                        onChange={() =>
                          setBacklogs((prev) => (prev === back ? "" : back))
                        }
                        checked={backlogs === back}
                      />
                      <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          strokeWidth="1"
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <label
                      htmlFor={`backlog-checkbox-${idx}`}
                      className="cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                    >
                      {back}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Tuition fees */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={tuitionFeesDropdown}
          >
            Tuition Fees{" "}
            {tuitionFeeMin || tuitionFeeMax ? (
              <span>
                ({tuitionFeeMin ? tuitionFeeMin : 0} -{" "}
                {tuitionFeeMax ? tuitionFeeMax : "∞"})
              </span>
            ) : null}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isEightOpen ? "rotate-180" : ""}
            />
          </button>
          {isEightOpen && (
            <div className="flex flex-col mb-6">
              <div className="flex flex-col gap-2 mt-2 px-3">
                <label className="text-sm font-medium mb-1">Min Fee</label>
                <input
                  type="number"
                  placeholder="Min Fee"
                  value={tuitionFeeMin}
                  onChange={(e) => setTuitionFeeMin(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
                <label className="text-sm font-medium mt-2 mb-1">Max Fee</label>
                <input
                  type="number"
                  placeholder="Max Fee"
                  value={tuitionFeeMax}
                  onChange={(e) => setTuitionFeeMax(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTuitionFeeMin("");
                  setTuitionFeeMax("");
                  setIsEightOpen(false);
                }}
                className="mt-4 w-full text-center text-sm text-blue-500 hover:underline py-1"
              >
                Clear Range
              </button>
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Test requirements */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={testRequirementDropdown}
          >
            Test Requirements
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isNineOpen ? "rotate-180" : ""}
            />
          </button>
          {isNineOpen && (
            <div className="flex flex-col mb-6">
              <div className="flex flex-col mt-2 px-3  h-[11.5vh]  overflow-y-auto w-[18vw]">
                {/* CHECHBOX 1 */}
                {dbValues.testRequirements.map((tst) => (
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox1"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox1"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
                        value={tst}
                        onChange={(e) =>
                          setTestRequirement((prv) => (prv === tst ? "" : tst))
                        }
                        checked={testRequirement === tst}
                      />
                      <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          strokeWidth="1"
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>

                    <label
                      htmlFor="tst"
                      className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                    >
                      {tst}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        {/* <hr className='border-[1px] border-[#bfbfbf]'/> */}
        {/* ****************************************************************************************************************************************************************************************************  */}
      </div>
    </>
  );
};

export default CourseSideBar;
