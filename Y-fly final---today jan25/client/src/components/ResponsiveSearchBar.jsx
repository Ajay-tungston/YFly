import React, { useEffect, useState } from "react";
import dropdown from "../assets/images/image/down.svg";
import PercentageSlider from "./PercentageSlider";
import bluesearch from "../assets/images/image/bluesearch.svg";
import FeeBudgetSlider from "./FeeBudgetSlider";
import CourseDurationSlider from "./CourseDuration";
import ScoreSlider from "./ScoreSlider";

const ResponsiveSearchBar = ({
  filters,
  setCourseLevel,
  setCountry,
  setAreasOfStudy,
  setIntake,
  setScholarship,
  setMaxAmount,
  setMinAmount,
  setDuration,
  setMinScore,
  setMaxScore,
  setTestRequirement
}) => {
  const [tempValues, setTempValues] = useState({
    courseLevel: "",
    country: [],
    areaOfStudy: [],
    intakes: [],
    scholarships: [],
    maxAmount: null,
    minAmount: null,
    duration: "",
    requirements: "",
    minScore: null,
    maxScore: null,
  });

  const [search, setSearch] = useState({
    country: "",
    areaSearch: "",
    intakeSearch: "",
    scholarshipSearch: "",
    durationSearch: "",
    requiremntSearch: "",
  });
  useEffect(() => {
    setTempValues((prev) => ({
      ...prev,
      minScore: null,
      maxScore: null,
    }));
   }, [tempValues.requirements]);

  const handleClick = () => {
    setCourseLevel(tempValues.courseLevel);
    setCountry(tempValues.country);
    setAreasOfStudy(tempValues.areaOfStudy);
    setIntake(tempValues.intakes);
    setScholarship(tempValues.scholarships);
    setMinAmount(tempValues.minAmount);
    setMaxAmount(tempValues.maxAmount);
    setDuration(tempValues.duration);
    setMinScore(tempValues.minScore);
    setMaxScore(tempValues.maxScore);
    setTestRequirement(tempValues.requirements);
  };

  const handleFeeChange = (min, max) => {
    setTempValues((prev) => ({
      ...prev,
      minAmount: min,
      maxAmount: max,
    }));
  };
  const handleScoreChange = (min, max) => {
    setTempValues((prev) => ({
      ...prev,
      minScore: min,
      maxScore: max,
    }));
  };

  // COURSE LEVEL
  const [isOneOpen, setIsOneOpen] = useState(false);
  const courseLevelDropdown = () => {
    setIsOneOpen(!isOneOpen);
  };

  //country
  const [isTwoOpen, setIsTwoOpen] = useState(false);
  const countryDropdown = () => {
    setIsTwoOpen(!isTwoOpen);
  };
  //Area of study
  const [isThreeOpen, setIsThreeOpen] = useState(false);
  const AreaStudyDropdown = () => {
    setIsThreeOpen(!isThreeOpen);
  };

  //intake year
  const [isFourOpen, setIsFourOpen] = useState(false);
  const IntakeYearDropdown = () => {
    setIsFourOpen(!isFourOpen);
  };

  //special restrictions
  const [isSixOpen, setIsSixOpen] = useState(false);
  const SpecialRestrictionDropdown = () => {
    setIsSixOpen(!isSixOpen);
  };

  //Tuition Fee Budget
  const [isSevenOpen, setIsSevenOpen] = useState(false);
  const FeeBudgetDropdown = () => {
    setIsSevenOpen(!isSevenOpen);
  };

  //Course Duration
  const [isEightOpen, setIsEightOpen] = useState(false);
  const CourseDurationDropdown = () => {
    setIsEightOpen(!isEightOpen);
  };

  //English Proficiency Exam
  const [isNineOpen, setIsNineOpen] = useState(false);
  const EnglishExamDropdown = () => {
    setIsNineOpen(!isNineOpen);
  };

  //Academic Exam
  const [isTenOpen, setIsTenOpen] = useState(false);
  const AcademicExamDropdown = () => {
    setIsTenOpen(!isTenOpen);
  };
  return (
    <div className="flex justify-center mt-10 lg:hidden">
      <div className="bg-bluegradient w-[90%] rounded-[50px] py-8 px-12 max-md:px-4 flex gap-y-3 max-md:gap-y-2 flex-wrap items-start justify-between">
        {/* ------------course level-------------------  */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between items-center py-4 max-md:py-3 gap-x-4 max-md:gap-x-2 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={courseLevelDropdown}
          >
            Course Level
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isOneOpen ? "rotate-180" : ""}
            />
          </button>
          {isOneOpen && filters?.course_levels?.length > 0 && (
            <div className=" flex flex-col mb-6 h-[15vh]  overflow-y-auto w-[19vw] max-lg:w-full">
              {filters?.course_levels?.map((i) => (
                <div className="inline-flex items-center px-5" key={i}>
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
                      checked={tempValues.courseLevel === i}
                      onChange={() => {
                        setTempValues((prev) => ({
                          ...prev,
                          courseLevel: prev.courseLevel === i ? "" : i,
                        }));
                      }}
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
              <div className="font-urban text-[18px] max-xl:text-[0.9rem] font-bold pl-8 py-4">
                Percentage scored
              </div>
              <PercentageSlider />
            </div>
          )}
        </div>
        {/* ------------------------Country----------------------------- */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-5"
            onClick={countryDropdown}
          >
            Country
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isTwoOpen ? "rotate-180" : ""}
            />
          </button>
          {isTwoOpen && filters?.country?.length > 0 && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={search.country}
                  onChange={(e) =>
                    setSearch({ ...search, country: e.target.value })
                  }
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              {/* chleckboxes */}
              <div className="flex flex-col mt-3 h-[10vh]  overflow-y-auto  max-lg:w-full px-1">
                {filters?.country
                  ?.filter((i) =>
                    i.toLowerCase().includes(search.country.toLowerCase())
                  )
                  .map((i) => (
                    <div className="inline-flex items-center px-5" key={i}>
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
                          checked={tempValues.country.includes(i)}
                          onChange={() =>
                            setTempValues((prev) => ({
                              ...prev,
                              country: prev.country.includes(i)
                                ? prev.country.filter((c) => c !== i)
                                : [...prev.country, i],
                            }))
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
        {/* =----------------------Area of study----------------------- */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={AreaStudyDropdown}
          >
            Area of study{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isThreeOpen ? "rotate-180" : ""}
            />
          </button>
          {isThreeOpen && filters?.areas_of_study?.length > 0 && (
            <div className=" flex flex-col mb-6" >
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7 max-xl:mx-5">
                <input
                  type="text"
                  placeholder="Search"
                  value={search.areaSearch}
                  onChange={(e) =>
                    setSearch({ ...search, areaSearch: e.target.value })
                  }
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 h-[10vh]  overflow-y-auto w-[19vw] max-lg:w-full">
                {filters?.areas_of_study
                  ?.filter((i) =>
                    i.toLowerCase().includes(search.areaSearch.toLowerCase())
                  )
                  .map((i) => (
                    <div className="inline-flex items-center px-5 max-xl:px-3 mt-2" key={i}>
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
                          checked={tempValues.areaOfStudy?.includes(i)}
                          onChange={() =>
                            setTempValues((prev) => ({
                              ...prev,
                              areaOfStudy: prev.areaOfStudy?.includes(i)
                                ? prev.areaOfStudy.filter((c) => c !== i)
                                : [...prev.areaOfStudy, i],
                            }))
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
        {/* Intake year */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={IntakeYearDropdown}
          >
            Intake year{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isFourOpen ? "rotate-180" : ""}
            />
          </button>
          {isFourOpen && filters?.intakes.length > 0 && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={search.intakeSearch}
                  onChange={(e) =>
                    setSearch({ ...search, intakeSearch: e.target.value })
                  }
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              {/* chleckboxes */}
              <div className="flex flex-col h-[10vh]  overflow-y-auto max-lg:w-full mt-3 px-1">
                {filters?.intakes
                  ?.filter((i) =>
                    `${i.month} ${i.year}`
                      .toLowerCase()
                      .includes(search.intakeSearch.toLowerCase())
                  )
                  .map((i, index) => (
                    <div className="inline-flex items-center px-5" key={index}>
                      <label
                        data-ripple-dark="true"
                        htmlFor={index}
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                      >
                        <input
                          id={index}
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                          type="checkbox"
                          value={`${i.month} ${i.year}`}
                          checked={tempValues.intakes.some(
                            (item) =>
                              item.month === i.month && item.year === i.year
                          )}
                          onChange={() => {
                            setTempValues((prev) => {
                              const exists = prev.intakes.some(
                                (item) =>
                                  item.month === i.month && item.year === i.year
                              );

                              return {
                                ...prev,
                                intakes: exists
                                  ? prev.intakes.filter(
                                      (item) =>
                                        !(
                                          item.month === i.month &&
                                          item.year === i.year
                                        )
                                    ) // Remove if already selected
                                  : [...prev.intakes, i], // Add new selection
                              };
                            });
                          }}
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
                        {i?.month} {i?.year}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* Scholarship */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={SpecialRestrictionDropdown}
          >
            Scholarship{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isSixOpen ? "rotate-180" : ""}
            />
          </button>
          {isSixOpen && filters?.scholarships?.length > 0 && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7 max-xl:mx-5">
                <input
                  type="text"
                  placeholder="Search"
                  value={search.scholarshipSearch}
                  onChange={(e) =>
                    setSearch({ ...search, scholarshipSearch: e.target.value })
                  }
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 h-[10vh]  overflow-y-auto w-[19vw] max-lg:w-full">
                {filters?.scholarships
                  ?.filter((i) =>
                    i
                      .toLowerCase()
                      .includes(search.scholarshipSearch.toLowerCase())
                  )
                  .map((i) => (
                    <div className="inline-flex items-center px-5 max-xl:px-3 mt-2" key={i}>
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
                          checked={tempValues.scholarships?.includes(i)}
                          onChange={() =>
                            setTempValues((prev) => ({
                              ...prev,
                              scholarships: prev.scholarships?.includes(i)
                                ? prev.scholarships.filter((c) => c !== i)
                                : [...prev.scholarships, i],
                            }))
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

        {/* Tuition Fee Budget */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={FeeBudgetDropdown}
          >
            Tuition Fee Budget{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isSevenOpen ? "rotate-180" : ""}
            />
          </button>
          {isSevenOpen && (
            <div className="flex flex-col mb-6">
              <div className="my-4">
                {/* tution fee range */}
                <FeeBudgetSlider
                  minAmount={tempValues.minAmount}
                  maxAmount={tempValues.maxAmount}
                  amount={{
                    minAmount: filters?.min_tuition_fee,
                    maxAmount: filters?.max_tuition_fee,
                  }}
                  handleAmountRange={handleFeeChange}
                />
              </div>
            </div>
          )}
        </div>

        {/* Course Duration */}
        <div className="flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4 max-md:gap-x-2  items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={CourseDurationDropdown}
          >
            Course Duration{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isEightOpen ? "rotate-180" : ""}
            />
          </button>
          {isEightOpen && filters?.course_durations?.length > 0 && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7 max-xl:mx-5">
                <input
                  type="text"
                  placeholder="Search"
                  value={search.durationSearch}
                  onChange={(e) =>
                    setSearch({ ...search, durationSearch: e.target.value })
                  }
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 h-[10vh]  overflow-y-auto w-[19vw] max-lg:w-full">
                {filters?.course_durations
                  ?.filter((i) =>
                    i
                      .toLowerCase()
                      .includes(search.durationSearch.toLocaleLowerCase())
                  )
                  .map((i) => (
                    <div className="inline-flex items-center px-5 max-xl:px-3 mt-2" key={i}>
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
                          checked={tempValues.duration?.includes(i)}
                          onChange={() =>
                            setTempValues((prev) => ({
                              ...prev,
                              duration: prev.duration?.includes(i)
                                ? prev.duration.filter((c) => c !== i)
                                : [...prev.duration, i],
                            }))
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
        {/* Test Requiremnt*/}
        <div className="flex flex-col w-[70%] max-md:w-[100%] rounded-[30px] bg-white">
          <button
            className="flex justify-between gap-x-4  items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4"
            onClick={EnglishExamDropdown}
          >
            Test Requirements
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isNineOpen ? "rotate-180" : ""}
            />
          </button>
          {isNineOpen && filters?.test_requirements_max_scores?.length > 0 && (
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7 max-xl:mx-5">
                <input
                  type="text"
                  placeholder="Search"
                  value={search.requiremntSearch}
                  onChange={(e) =>
                    setSearch({ ...search, requiremntSearch: e.target.value })
                  }
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 h-[12vh]  overflow-y-auto w-[19vw] max-lg:w-full">
                {filters?.test_requirements_max_scores
                  ?.filter((i) =>
                    (i?._id || "")
                      .toLowerCase()
                      .includes((search.requiremntSearch || "").toLowerCase())
                  )
                  .map((i, index) => (
                    <>
                      <div className="inline-flex items-center px-5 max-xl:px-3 mt-2" key={`test-${index}`}>
                        <label
                          data-ripple-dark="true"
                          htmlFor={`test-${index}`}
                          className="relative flex cursor-pointer items-center rounded-full p-3"
                        >
                          <input
                            id={`test-${index}`}
                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                 before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                 before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                            type="checkbox"
                            value={i._id}
                            checked={tempValues.requirements === i._id}
                            onChange={() => {
                              setTempValues((prev) => ({
                                ...prev,
                                requirements: prev.requirements === i._id ? "" : i._id,
                              }));
                            }}
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
                          htmlFor={`test-${index}`}
                          className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                        >
                          {i._id}
                        </label>
                      </div>

                      {tempValues.requirements === i._id && (
                        <ScoreSlider
                          minScore={tempValues.minScore}
                          maxScore={tempValues.maxScore}
                          score={i?.max_overall_score}
                          handleScoreRange={handleScoreChange}
                          testRequirement={tempValues.requirements}
                        />
                      )}
                    </>
                  ))}
              </div>
            </div>
          )}
        </div>
        <button
          className="bg-[#2B7CD6] w-[26%] max-md:w-[100%] px-8 max-md:px-2 py-3 rounded-full font-urban text-white"
          onClick={handleClick}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ResponsiveSearchBar;
