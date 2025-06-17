import React, { useCallback, useEffect, useState } from "react";
import filter from "../assets/images/image/filter.svg";
import dropdown from "../assets/images/image/down.svg";
import bluesearch from "../assets/images/image/bluesearch.svg";
import "../assets/styles/styles.css";
import PercentageSlider from "../components/PercentageSlider";
import ScoreSlider from "../components/ScoreSlider";
import FeeBudgetSlider from "../components/FeeBudgetSlider";
import CourseDurationSlider from "../components/CourseDuration";
import { debounce } from "lodash";
import { a } from "@react-spring/web";

const CourseSearchbar = ({
  filters,
  courseLevel,
  setCourseLevel,
  country,
  setCountry,
  areasOfStudy,
  setAreasOfStudy,
  minAmount,
  maxAmount,
  setMaxAmount,
  setMinAmount,
  intake,
  setIntake,
  duration,
  setDuration,
  testRequirement,
  setTestRequirement,
  minScore,
  setMinScore,
  maxScore,
  setMaxScore,
  scholarship,
  setScholarship,minGpa, setMinGpa, maxGpa, setMaxGpa
}) => {
  useEffect(() => {
    setMinScore(null);
    setMaxScore(null);
  }, [testRequirement]);

  const [countrySearch, setCountrySearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [intakeSearch, setIntakeSearch] = useState("");
  const [scholarshipSearch, setScholarshipSearch] = useState("");
  const [durationSearch, setDurationSearch] = useState("");
  const [requirementSearch, setRequirementSearch] = useState("");

  // for desired course
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

  const debouncedSetAmount = useCallback(
    debounce((min, max) => {
      setMinAmount(min);
      setMaxAmount(max);
    }, 500), // 500ms debounce
    []
  );
  const debouncedSetScore = useCallback(
    debounce((min, max) => {
      setMinScore(min);
      setMaxScore(max);
    }, 500), // 500ms debounce
    []
  );
  return (
    <>
      <div className="w-[24%] font-urban h-fit bg-[#ffffff] rounded-[50px] border-[1px] border-black flex flex-col max-lg:hidden">
        {/* -------------------filter ------------------------*/}
        <div className="font-urban text-[1.2rem] text-black flex gap-3 items-center px-8 pt-7 pb-5 tracking-wide">
          <img src={filter} alt="filter" />
          Filters
        </div>

        <hr className="border-[1px] border-[#bfbfbf]" />

        {/* -----------------------------------course LEVEL--------------------------------------- */}
        <div className="flex flex-col ">
          <button
            className="flex justify-between items-center  py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8 "
            onClick={courseLevelDropdown}
          >
            Course Level{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isOneOpen ? "rotate-180" : ""}
            />
          </button>
          {isOneOpen && filters?.course_levels?.length > 0 && (
            <div className=" flex flex-col mb-6 ">
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
                      checked={courseLevel === i}
                      onChange={() =>
                        setCourseLevel((prev) => (prev === i ? "" : i))
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

              <div className="font-urban text-[18px] max-xl:text-[0.9rem] font-bold pl-8 py-4">
                Percentage scored
              </div>
              <PercentageSlider setMinGPA={setMinGpa} setMaxGPA={setMaxGpa}/>
            </div>
          )}

          <hr className="border-[1px] border-[#bfbfbf]" />
        </div>

        {/* ----------------------------------country-------------------------------------------*/}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8"
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
            <div className=" flex flex-col mb-6 ">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7">
                <input
                  type="text"
                  placeholder="Search"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              {/* chleckboxes */}
              <div className="flex flex-col mt-3 px-1 max-h-[300px] overflow-y-scroll">
                {filters?.country
                  ?.filter((i) =>
                    i.toLowerCase().includes(countrySearch.toLowerCase())
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
                          checked={country.includes(i)}
                          onChange={() =>
                            setCountry((prev) =>
                              prev.includes(i)
                                ? prev.filter((c) => c !== i)
                                : [...prev, i]
                            )
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
                        className="cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                      >
                        {i}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <hr className="border-[1px] border-[#bfbfbf]" />
        </div>

        {/* Area of study */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8 "
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
            <div className=" flex flex-col mb-6">
              {/* search bar */}
              <div className=" relative  rounded-[40px] mx-7 max-xl:mx-5">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={areaSearch}
                  onChange={(e) => setAreaSearch(e.target.value)}
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 h-[29.5vh]  overflow-y-auto w-[19vw]">
                {filters?.areas_of_study
                  ?.filter((i) =>
                    i.toLowerCase().includes(areaSearch.toLowerCase())
                  )
                  .map((i) => (
                    // {filters?.areas_of_study?.map((i) => (
                    <div
                      className="inline-flex items-center px-5 max-xl:px-3 mt-2"
                      key={i}
                    >
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
                          checked={areasOfStudy.includes(i)}
                          onChange={() =>
                            setAreasOfStudy((prev) =>
                              prev.includes(i)
                                ? prev.filter((c) => c !== i)
                                : [...prev, i]
                            )
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
          <hr className="border-[1px] border-[#bfbfbf]" />
        </div>

        {/* Intake year */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8"
            onClick={IntakeYearDropdown}
          >
            Intake
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isFourOpen ? "rotate-180" : ""}
            />
          </button>
          {isFourOpen &&filters?.intakes.length>0&& (
            <div className="flex flex-col mb-6">
              {/* Search Bar */}
              <div className="relative rounded-[40px] mx-7">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={intakeSearch}
                  onChange={(e) => setIntakeSearch(e.target.value)}
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col mt-3 px-1 max-h-[200px] overflow-y-scroll">
                {filters?.intakes
                  ?.filter((i) =>
                    `${i.month} ${i.year}`
                      .toLowerCase()
                      .includes(intakeSearch.toLowerCase())
                  )
                  .map((i, index) => (
                    <div key={index} className="inline-flex items-center px-5">
                      <label
                        data-ripple-dark="true"
                        htmlFor={`intake-${index}`}
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                      >
                        <input
                          id={`intake-${index}`}
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                  before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                  before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                          type="checkbox"
                          value={`${i.month} ${i.year}`}
                          checked={intake.some(
                            (item) =>
                              item.month === i.month && item.year === i.year
                          )}
                          onChange={() => {
                            setIntake((prev) => {
                              const exists = prev.some(
                                (item) =>
                                  item.month === i.month && item.year === i.year
                              );
                              return exists
                                ? prev.filter(
                                    (item) =>
                                      !(
                                        item.month === i.month &&
                                        item.year === i.year
                                      )
                                  ) // Remove if already selected
                                : [...prev, i]; // Add new selection
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
                        htmlFor={`intake-${index}`}
                        className="cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                      >
                        {i?.month} {i?.year}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <hr className="border-[1px] border-[#bfbfbf]" />
        </div>

        {/* Scholarship */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8"
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
            <div className="flex flex-col mb-6">
              <div className="relative rounded-[40px] mx-7">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={scholarshipSearch}
                  onChange={(e) => setScholarshipSearch(e.target.value)}
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              <div className="flex flex-col mt-3 px-1 max-h-[200px] overflow-y-scroll">
                {filters?.scholarships
                  ?.filter((i) =>
                    i.toLowerCase().includes(scholarshipSearch.toLowerCase())
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
                          checked={scholarship.includes(i)}
                          onChange={() =>
                            setScholarship((prev) =>
                              prev.includes(i)
                                ? prev.filter((c) => c !== i)
                                : [...prev, i]
                            )
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

          <hr className="border-[1px] border-[#bfbfbf] " />
        </div>

        {/* Tuition Fee Budget */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8"
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
                {/* tution fee range*/}
                <FeeBudgetSlider
                  minAmount={minAmount}
                  maxAmount={maxAmount}
                  amount={{
                    minAmount: filters?.min_tuition_fee,
                    maxAmount: filters?.max_tuition_fee,
                  }}
                  handleAmountRange={debouncedSetAmount}
                />
              </div>
            </div>
          )}

          <hr className="border-[1px] border-[#bfbfbf] " />
        </div>

        {/* Course Duration */}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8 "
            onClick={CourseDurationDropdown}
          >
            Course Duration
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
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={durationSearch}
                  onChange={(e) => setDurationSearch(e.target.value)}
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>

              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 max-h-[200px]  overflow-y-auto w-[19vw]">
                {filters?.course_durations
                  ?.filter((i) =>
                    i.toLowerCase().includes(durationSearch.toLocaleLowerCase())
                  )
                  .map((i) => (
                    <div
                      className="inline-flex items-center px-5 max-xl:px-3 mt-2"
                      key={i}
                    >
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
                          checked={duration.includes(i)}
                          onChange={() =>
                            setDuration((prev) =>
                              prev.includes(i)
                                ? prev.filter((c) => c !== i)
                                : [...prev, i]
                            )
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
          <hr className="border-[1px] border-[#bfbfbf]" />
        </div>

        {/* Test Requirements*/}
        <div className="flex flex-col">
          <button
            className="flex justify-between items-center py-4 font-bold text-black text-[1.1rem] max-xl:text-[1rem] px-8"
            onClick={EnglishExamDropdown}
          >
            Test Requirements{" "}
            <img
              src={dropdown}
              alt="dropdown"
              width={14}
              className={isNineOpen ? "rotate-180" : ""}
            />
          </button>

          {isNineOpen && filters?.test_requirements_max_scores?.length > 0 && (
            <div className=" flex flex-col mb-6 ">
              <div className=" relative  rounded-[40px] mx-7 max-xl:mx-5">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  value={requirementSearch}
                  onChange={(e) => setRequirementSearch(e.target.value)}
                />
                <div className="absolute inset-y-2 left-[1.5rem]">
                  <img src={bluesearch} width={18} alt="search" />
                </div>
              </div>
              {/* chleckboxes */}
              <div className="flex flex-col mt-5 px-0 max-h-[200px] overflow-y-auto w-[19vw]">
                {filters?.test_requirements_max_scores
                  ?.filter((i) =>
                    (i?._id || "").toLowerCase().includes((requirementSearch || "").toLowerCase())
                )
                  .map((i) => (
                    <>
                      <div
                        className="inline-flex items-center px-5 max-xl:px-3 mt-2"
                        key={i._id}
                      >
                        <label
                          data-ripple-dark="true"
                          htmlFor={i._id}
                          className="relative flex cursor-pointer items-center rounded-full p-3"
                        >
                          <input
                            id={i._id}
                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                            type="checkbox"
                            value={i._id}
                            checked={testRequirement === i._id}
                            onChange={() =>
                              setTestRequirement((prev) =>
                                prev === i._id ? "" : i._id
                              )
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
                          htmlFor={i._id}
                          className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]"
                        >
                          {i._id}
                        </label>
                      </div>
                      {testRequirement === i._id && (
                        <ScoreSlider
                          minScore={minScore}
                          maxScore={maxScore}
                          score={i?.max_overall_score}
                          handleScoreRange={debouncedSetScore}
                          testRequirement={testRequirement}
                        />
                      )}
                    </>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseSearchbar;
