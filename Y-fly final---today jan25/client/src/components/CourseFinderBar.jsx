import React, { useRef, useEffect, useState } from "react";
import { ChevronDown, Search, Plus, Minus } from "lucide-react";

const CourseDropdown = ({
  // Top bar states
  searchTerm,
  setSearchTerm,
  country,
  setCountry,
  courseTitle,
  setCourseTitle,
  intake,
  setIntake,

  // Advanced fields to keep:
  courseLevel,
  setCourseLevel,
  areaOfStudy,
  setAreaOfStudy,
  backlogs,
  setBacklogs,
  universityRanking,
  setUniversityRanking,
  universityName,
  setUniversityName,
  testRequirement,
  setTestRequirement,
  disciplineSearch,
  setDisciplineSearch,
  // Database values
  dbValues, // Expected keys: intakeYears, countries, courseTitle, courseLevels, areasOfStudy, eligibilityRequirements, universityRankings, universityNames, testRequirements
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const cardRef = useRef(null);

  // Close any open dropdown when clicking outside the card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Helper to update state and close dropdown
  const handleSelect = (setter, value) => {
    setter(value);
    setOpenDropdown(null);
  };

  return (
    <div className="w-full flex justify-center px-12 py-12">
      <div className="w-full max-w-[1200px] mt-2">
        {/* Gradient Card */}
        <div
          ref={cardRef}
          className="relative bg-gradient-to-r from-[#002140] to-[#1055aa] rounded-[50px] px-6 py-6 text-white transition-all duration-300 overflow-visible"
        >
          {/* TOP BAR: Search, Intake, Country, Course Title */}
          <div className="flex flex-wrap items-center justify-between gap-4">
  {/* Search Box */}
  <div className="w-full lg:w-1/2">
    <div className="relative flex items-center bg-white text-gray-700 rounded-full px-4 py-2">
      <Search className="w-5 h-5 text-black mr-2" />
      <input
        type="text"
        placeholder="Search for courses & universities"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-transparent outline-none text-black border-0"
      />
    </div>
  </div>

  {/* Dropdown for Intake */}
  <div className="relative w-full sm:w-auto">
    <button
      onClick={() => toggleDropdown("intakes")}
      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 w-full sm:w-auto"
    >
      Intake {intake && `(${intake})`}
      <ChevronDown className="w-4 h-4" />
    </button>
    {openDropdown === "intakes" && (
      <div
        className="absolute top-full left-0 mt-1 w-full sm:w-48 bg-white text-black shadow-lg rounded-lg z-50 border border-gray-300"
        onClick={() => setOpenDropdown(null)}
      >
        {dbValues.intakeYears &&
          dbValues.intakeYears.map((opt, idx) => (
            <label
              key={idx}
              className="relative flex cursor-pointer items-center rounded-full p-3"
            >
              <input
                type="checkbox"
                onChange={() => handleSelect(setIntake, opt)}
                checked={intake === opt}
                className="peer relative h-4 w-4 appearance-none rounded-md border border-blue transition-all"
              />
              <span className="px-2">{opt}</span>
            </label>
          ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIntake("");
            setOpenDropdown(null);
          }}
          className="w-full text-center text-sm text-blue-500 hover:underline py-1"
        >
          Clear
        </button>
      </div>
    )}
  </div>

  {/* Dropdown for Country */}
  <div className="relative w-full sm:w-auto">
    <button
      onClick={() => toggleDropdown("country")}
      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 w-full sm:w-auto"
    >
      Country {country && `(${country})`}
      <ChevronDown className="w-4 h-4" />
    </button>
    {openDropdown === "country" && (
      <div
        className="absolute top-full left-0 mt-1 w-full sm:w-48 bg-white text-black shadow-lg rounded-lg z-50"
        onClick={() => setOpenDropdown(null)}
      >
        {dbValues.countries &&
          dbValues.countries.map((ctry, idx) => (
            <label
              key={idx}
              className="relative flex cursor-pointer items-center rounded-full p-3"
            >
              <input
                type="checkbox"
                onChange={() => handleSelect(setCountry, ctry)}
                checked={country === ctry}
                className="peer relative h-4 w-4 appearance-none rounded-md border border-blue transition-all"
              />
              <span className="px-2">{ctry}</span>
            </label>
          ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCountry("");
            setOpenDropdown(null);
          }}
          className="w-full text-center text-sm text-blue-500 hover:underline py-1"
        >
          Clear
        </button>
      </div>
    )}
  </div>

  {/* Dropdown for Course Title */}
  <div className="relative w-full sm:w-auto">
    <button
      onClick={() => toggleDropdown("courseTitle")}
      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 w-full sm:w-auto"
    >
      Course Title {courseTitle && `(${courseTitle})`}
      <ChevronDown className="w-4 h-4" />
    </button>
    {openDropdown === "courseTitle" && (
      <div
        className="absolute top-full left-0 mt-1 w-full sm:w-48 bg-white text-black shadow-lg rounded-lg z-50"
        onClick={() => setOpenDropdown(null)}
      >
        {dbValues.courseTitle &&
          dbValues.courseTitle.map((title, idx) => (
            <label
              key={idx}
              className="relative flex cursor-pointer items-center rounded-full p-3"
            >
              <input
                type="checkbox"
                onChange={() => handleSelect(setCourseTitle, title)}
                checked={courseTitle === title}
                className="peer relative h-4 w-4 appearance-none rounded-md border border-blue transition-all"
              />
              <span className="px-2">{title}</span>
            </label>
          ))}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCourseTitle("");
            setOpenDropdown(null);
          }}
          className="w-full text-center text-sm text-blue-500 hover:underline py-1"
        >
          Clear
        </button>
      </div>
    )}
  </div>
</div>



          {/* Basic Filters Done Button */}
          {!showAdvanced && (
            <div className="mt-4 text-right">
              <button className="bg-[#2563eb] text-white font-semibold px-6 py-2 rounded-full hover:opacity-90">
                Done
              </button>
            </div>
          )}

          {/* ADVANCED FILTERS SECTION */}
          {showAdvanced && (
            <>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* COLUMN 1: Course Level, Area of Study, Discipline */}
                <div className="space-y-4">
                  {/* Course Level */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("courseLevel")}
                      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 w-full hover:opacity-90"
                    >
                      Course Level {courseLevel && `(${courseLevel})`}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === "courseLevel" && (
                      <div
                        className="absolute top-full left-0 mt-1 w-full bg-white text-black shadow-lg rounded-lg z-10"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {dbValues.courseLevels &&
                          dbValues.courseLevels.map((lvl, idx) => (
                            <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                            <input
                                id="checkbox2"
                                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                    before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                type="checkbox"
                                onChange={() => handleSelect(setCourseLevel, lvl)}
                                checked={courseLevel === lvl}
                            />
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                </svg>
                                </span><span className="px-2">{lvl}</span> 
                        </label>
                          ))}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCourseLevel("");
                            setOpenDropdown(null);
                          }}
                          className="w-full text-center text-sm text-blue-500 hover:underline py-1"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Area of Study */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("areaOfStudy")}
                      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 w-full hover:opacity-90"
                    >
                      Area of Study {areaOfStudy && `(${areaOfStudy})`}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === "areaOfStudy" && (
                      <div
                        className="absolute top-full left-0 mt-1 w-full bg-white text-black shadow-lg rounded-lg z-10"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {dbValues.areasOfStudy &&
                          dbValues.areasOfStudy.map((study, idx) => (
                            <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                            <input
                                id="checkbox2"
                                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                    before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                type="checkbox"
                                onChange={() => handleSelect(setAreaOfStudy, study)}
                                checked={areaOfStudy === study}
                            />
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                </svg>
                                </span><span className="px-2">{study}</span> 
                        </label>
                          ))}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAreaOfStudy("");
                            setOpenDropdown(null);
                          }}
                          className="w-full text-center text-sm text-blue-500 hover:underline py-1"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Discipline */}
                  <div className="bg-white rounded-lg shadow-md p-4 text-black">
                    <label className="block text-sm text-black mb-2">
                      Discipline Area
                    </label>
                    <input
                      type="text"
                      placeholder="Search"
                      value={disciplineSearch}
                      onChange={(e) => setDisciplineSearch(e.target.value)}
                      className="w-full px-4 py-2 border border-black rounded-full text-blue outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* COLUMN 2: Backlogs, University Ranking */}
                <div className="space-y-4">
                  {/* Backlogs */}
                  <div className="bg-white text-black p-4 rounded-3xl">
                    <h3 className="text-lg font-semibold mb-2">Backlogs</h3>
                    <div className="space-y-2">
                      {dbValues.eligibilityRequirements &&
                        dbValues.eligibilityRequirements.map((back, idx) => (
                          <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                          <input
                              id="checkbox2"
                              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                  before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                  before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                              type="checkbox"
                              onChange={() => handleSelect(setBacklogs, back)}
                              checked={backlogs ===back}
                          />
                          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                  <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                              </svg>
                              </span><span className="px-2">{back}</span> 
                      </label>
                        ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBacklogs("");
                        setOpenDropdown(null);
                      }}
                      className="mt-4 w-full text-center text-sm text-blue-500 hover:underline"
                    >
                      Clear Selection
                    </button>
                  </div>

                  {/* University Ranking */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown("universityRanking")}
                      className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 w-full hover:opacity-90"
                    >
                      Ranking {universityRanking && `(${universityRanking})`}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === "universityRanking" && (
                      <div
                        className="absolute top-full left-0 mt-1 w-full bg-white text-black shadow-lg rounded-lg z-10"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {dbValues.universityRankings &&
                          dbValues.universityRankings.map((rank, idx) => (
                            <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                            <input
                                id="checkbox2"
                                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                                    before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                type="checkbox"
                                onChange={() =>
                                  handleSelect(setUniversityRanking, rank)
                                }
                                checked={universityRanking === rank.toString()}
                              />
                          
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                </svg>
                                </span><span className="px-2">{rank}</span> 
                        </label>
                          ))}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUniversityRanking("");
                            setOpenDropdown(null);
                          }}
                          className="w-full text-center text-sm text-blue-500 hover:underline py-1"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* COLUMN 3: University (Radio Buttons, not dropdown) */}
                <div className="bg-white text-black p-4 rounded-3xl shadow-md space-y-2">
                  <h3 className="text-lg font-semibold">University</h3>
                  {dbValues.universityNames &&
                    dbValues.universityNames.map((uni, idx) => (
                      <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                      <input
                          id="checkbox2"
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                              before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                              before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                          type="checkbox"
                          onChange={() => handleSelect(setUniversityName, uni)}
                          checked={universityName ===uni}
                      />
                      <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                              <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                          </svg>
                           </span><span className="px-2">{uni}</span> 
                  </label>
                    ))}
                  <button
                    onClick={() => setUniversityName("")}
                    className="mt-4 w-full text-center text-sm text-blue-500 hover:underline"
                  >
                    Clear Selection
                  </button>
                </div>

                {/* COLUMN 4: Test Requirements (Radio Buttons, not dropdown) */}
                <div className="bg-white text-black p-4 rounded-3xl shadow-md space-y-2">
                  <h3 className="text-lg font-semibold">Test Requirements</h3>
                  {dbValues.testRequirements &&
                    dbValues.testRequirements.map((test, idx) => (
                      <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                      <input
                          id="checkbox2"
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4 
                              before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                              before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                          type="checkbox"
                          onChange={() => handleSelect(setTestRequirement, test)}
                          checked={testRequirement ===test}
                      />
                      <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                              <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                          </svg>
                          </span><span className="px-2">{test}</span> 
                  </label>
                    ))}
                  <button
                    onClick={() => setTestRequirement("")}
                    className="mt-4 w-full text-center text-sm text-[#0d0e0f] hover:underline"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              <div className="mt-4 text-right">
                <button className="bg-[#2563eb] text-white font-semibold px-6 py-2 rounded-full hover:opacity-90">
                  Done
                </button>
              </div>
            </>
          )}

          {/* TOGGLE ADVANCED SECTION */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="bg-white text-black font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90"
            >
              {showAdvanced ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {showAdvanced ? "Hide advanced" : "Show advanced search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDropdown;
