import React, { useCallback, useEffect, useState } from "react";
import filter from "../assets/images/filter.svg";
import dropdown from "../assets/images/nav-dropdown.svg";
import RangeSlider from "./RangeSLider";
import bluesearch from "../assets/images/bluesearch.svg";
import "../assets/styles/styles.css";
import DeadlineSlider from "./DeadlineSlider";
import { debounce } from "lodash";
const ScholarshipLeftbar = ({
  filters,
  desiredCourse,
  setDesiredCourse,
  scholarshipTypes,
  setScholarshipTypes,
  areasOfStudy,
  setAreasOfStudy,
  intakeYears,
  setIntakeYears,
  specialRestrictions,
  setSpecialRestrictions,
  applicability,
  setApplicability,
  setSelectedDateRange,
  citizenships,
  setCitizenships,
}) => {
  const [intakeSearchQuery, setIntakeSearchQuery] = useState("");
  const [filteredIntakeYears, setFilteredIntakeYears] = useState();

  const debouncedFilter = useCallback(
    debounce((query) => {
      setFilteredIntakeYears(
        query
          ? filters?.intakeYears?.filter((i) =>
              i.toString().toLowerCase().includes(query.toLowerCase())
            )
          : filters?.intakeYears || []
      );
    }, 300),
    [filters?.intakeYears]
  );

  useEffect(() => {
    debouncedFilter(intakeSearchQuery);
    return () => debouncedFilter.cancel();
  }, [intakeSearchQuery, debouncedFilter]);

  // for desired course
  const [isOneOpen, setIsOneOpen] = useState(false);
  const desiredCourseDropdown = () => {
    setIsOneOpen(!isOneOpen);
  };

  //   const handleTypeChange = (e) => {
  //     const { value, checked } = e.target;
  //     if (checked) {
  //         setDesiredCourse((prev) => [...prev, value]);
  //     } else {
  //         setDesiredCourse((prev) => prev.filter((item) => item !== value));
  //     }
  //   };

  //for scholarship type
  const [isTwoOpen, setIsTwoOpen] = useState(false);
  const scholarshipTypeDropdown = () => {
    setIsTwoOpen(!isTwoOpen);
  };

  //Area of study
  const [isThreeOpen, setIsThreeOpen] = useState(false);
  const AreaDropdown = () => {
    setIsThreeOpen(!isThreeOpen);
  };

  //scholarship amount
  const [isFourOpen, setIsFourOpen] = useState(false);
  const ScholarAmountDropdown = () => {
    setIsFourOpen(!isFourOpen);
  };

  //intake year
  const [isFiveOpen, setIsFiveOpen] = useState(false);
  const IntakeYearDropdown = () => {
    setIsFiveOpen(!isFiveOpen);
  };

  //special restrictions
  const [isSixOpen, setIsSixOpen] = useState(false);
  const SpecialRestrictionDropdown = () => {
    setIsSixOpen(!isSixOpen);
  };

  //scholarship applicability
  const [isSevenOpen, setIsSevenOpen] = useState(false);
  const ScholarshipApplicabilityDropdown = () => {
    setIsSevenOpen(!isSevenOpen);
  };

  //deadline
  const [isEightOpen, setIsEightOpen] = useState(false);
  const DeadlineDropdown = () => {
    setIsEightOpen(!isEightOpen);
  };

  //student citizenship
  const [isNineOpen, setIsNineOpen] = useState(false);
  const CitizenshipDropdown = () => {
    setIsNineOpen(!isNineOpen);
  };

  const debouncedSetDateRange = useCallback(
    debounce((range) => {
      setSelectedDateRange(range);
    }, 500), // 500ms debounce
    []
  );

  return (
    <>
      <div className="w-[25%] max-xl:w-[27%] font-urban  bg-[#ffffff] rounded-[50px] border-[1px] border-black flex flex-col max-lg:hidden">
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
            onClick={desiredCourseDropdown}
          >
            Desired Course{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isOneOpen ? "rotate-180" : ""}
            />
          </button>
          {isOneOpen && (
            <div className=" flex flex-col mb-6">
              {/* CHECHBOX1 */}
              {filters?.courses?.map((i) => (
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
                      checked={desiredCourse === i}
                      onChange={() =>
                        setDesiredCourse((prev) => (prev === i ? "" : i))
                      }
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
            onClick={scholarshipTypeDropdown}
          >
            Scholarship Type{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isTwoOpen ? "rotate-180" : ""}
            />
          </button>
          {isTwoOpen && (
            <div className=" flex flex-col mb-6">
              {filters?.scholarshipTypes?.map((i) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor={i}
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id={i}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={i}
                      checked={scholarshipTypes === i}
                      onChange={() =>
                        setScholarshipTypes((prev) => (prev === i ? "" : i))
                      }
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
        {/* **************************************************************************************************************************************************************************************************** */}

        {/* Area of study */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={AreaDropdown}
          >
            Area of Study{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isThreeOpen ? "rotate-180" : ""}
            />
          </button>
          {isThreeOpen && (
            <div className=" flex flex-col mb-6">
              {filters?.areasOfStudy?.map((i) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor={i}
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id={i}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={i}
                      checked={areasOfStudy === i}
                      onChange={() =>
                        setAreasOfStudy((prev) => (prev === i ? "" : i))
                      }
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
        {/* **************************************************************************************************************************************************************************************************** */}

        {/* Scholarship amount */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={ScholarAmountDropdown}
          >
            Scholarship Amount{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isFourOpen ? "rotate-180" : ""}
            />
          </button>
          {isFourOpen && (
            <div className=" flex flex-col mb-6">
              <RangeSlider />
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Intake year */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={IntakeYearDropdown}
          >
            Intake year{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isFiveOpen ? "rotate-180" : ""}
            />
          </button>
          {isFiveOpen && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-5 px-1">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 pl-10 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={intakeSearchQuery}
                  onChange={(e) => setIntakeSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              {/* chleckboxes */}
              {/* <div className="flex flex-col mt-2 px-3  h-[7.5vh]  overflow-y-auto w-full "> */}

              <div className="flex flex-col mt-3 px-1 max-h-[200px]  overflow-y-auto">
                {filteredIntakeYears?.length > 0 ? (
                  filteredIntakeYears.map((i) => (
                    <div className="inline-flex items-center px-5">
                      <label
                        data-ripple-dark="true"
                        htmlFor={i}
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                      >
                        <input
                          id={i}
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                          type="checkbox"
                          value={i}
                          checked={intakeYears === i}
                          onChange={() =>
                            setIntakeYears((prev) => (prev === i ? "" : i))
                          }
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
                  ))
                ) : (
                  <p>no result</p>
                )}
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
            onClick={SpecialRestrictionDropdown}
          >
            Special Restrictions{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isSixOpen ? "rotate-180" : ""}
            />
          </button>
          {isSixOpen && (
            <div className="flex flex-col mb-6 max-h-[200px]  overflow-y-auto">
              {filters?.specialRestrictions?.map((i) => (
                <div className="inline-flex items-center px-5">
                  <label
                    data-ripple-dark="true"
                    htmlFor={i}
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id={i}
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                      type="checkbox"
                      value={i}
                      checked={specialRestrictions === i}
                      onChange={() =>
                        setSpecialRestrictions((prev) => (prev === i ? "" : i))
                      }
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

        {/* Scholarship Applicability*/}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8 max-xl:px-4 max-xl:text-[1rem]"
            onClick={ScholarshipApplicabilityDropdown}
          >
            Scholarship Applicability
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isSevenOpen ? "rotate-180" : ""}
            />
          </button>
          {isSevenOpen && (
            <div className="flex flex-col mb-4">
              <div>
                {filters?.applicability?.map((i) => (
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor={i}
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id={i}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
                        value={i}
                        checked={applicability === i}
                        onChange={() =>
                          setApplicability((prev) => (prev === i ? "" : i))
                        }
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
              <div>
                {/* search bar */}
                <div className=" relative  rounded-[40px] px-10 mt-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="py-1 px-7 w-full border-[#bfbfbf] border rounded-[40px] placeholder:pl-3 placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  />
                  <div className="absolute inset-y-2 left-[3.7rem]">
                    <img src={bluesearch} width={18} alt="search" />
                  </div>
                </div>
                <div className="flex flex-col mt-2 px-3  h-[7.5vh]  overflow-y-auto w-full ">
                  {/* CHECHBOX 1 */}
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
                      htmlFor="checkbox1"
                      className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                    >
                      University of Houston
                    </label>
                  </div>

                  {/* CHECKBOX 2 */}
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox2"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox2"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
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
                      htmlFor="checkbox2"
                      className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] "
                    >
                      California State University
                    </label>
                  </div>

                  {/* CHECKBOX 3*/}
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox2"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox2"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
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
                      htmlFor="checkbox2"
                      className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] "
                    >
                      Harward University
                    </label>
                  </div>

                  {/* CHECKBOX 4 */}
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox2"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox2"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
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
                      htmlFor="checkbox2"
                      className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] "
                    >
                      Columbia University
                    </label>
                  </div>

                  {/* CHECKBOX 5 */}
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox2"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox2"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
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
                      htmlFor="checkbox2"
                      className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] "
                    >
                      Yale University
                    </label>
                  </div>

                  {/* CHECKBOX 6 */}
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor="checkbox2"
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id="checkbox2"
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
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
                      htmlFor="checkbox2"
                      className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] "
                    >
                      Cornell University
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Deadline*/}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={DeadlineDropdown}
          >
            Deadline
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isEightOpen ? "rotate-180" : ""}
            />
          </button>
          {isEightOpen && (
            <div className="flex flex-col mb-6">
              <DeadlineSlider handleRangeChange={debouncedSetDateRange} />
            </div>
          )}
        </div>

        {/* ****************************************************************************************************************************************************************************************************  */}
        <hr className="border-[1px] border-[#bfbfbf]" />
        {/* ****************************************************************************************************************************************************************************************************  */}

        {/* Student Citizenship*/}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] px-8"
            onClick={CitizenshipDropdown}
          >
            Student Citizenship
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
                {filters?.citizenships?.map((i) => (
                  <div className="inline-flex items-center px-5">
                    <label
                      data-ripple-dark="true"
                      htmlFor={i}
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                    >
                      <input
                        id={i}
                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                        type="checkbox"
                        value={i}
                        checked={citizenships === i}
                        onChange={() =>
                          setCitizenships((prev) => (prev === i ? "" : i))
                        }
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

export default ScholarshipLeftbar;
