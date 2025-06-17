import React, { useEffect, useRef, useState } from "react";
import downarrow from "../assets/images/downarrowblack.svg";
import dropdown from "../assets/images/image/down.svg";
import bluesearch from "../assets/images/image/bluesearch.svg";
import RangeSlider from "./RangeSLider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const ResponsiveSearchBar2 = ({
  filters,
  setDesiredCourse,
  setScholarshipTypes,
  setAreasOfStudy,
  setIntakeYears,
  setSpecialRestrictions,
  setApplicability,
  setCitizenships,
  sortOptions,
  setAppliedCountry,
  setAppliedSort,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [tempValues, setTempValues] = useState({
    sortBy: { label: "", value: "" },
    country: "",
    courseLevel: "",
    scholarshipType: "",
    areaOfStudy: "",
    intakeYear: "",
    specialRestrictions: "",
    applicability: "",
    citizenship: "",
  });

  const habdleButtonClick = () => {
    //sortBy and country have an another state in the parent for data fetching
    setAppliedCountry(tempValues.country);
    setAppliedSort(tempValues.sortBy);
    setDesiredCourse(tempValues.courseLevel);
    setScholarshipTypes(tempValues.scholarshipType);
    setAreasOfStudy(tempValues.areaOfStudy);
    setIntakeYears(tempValues.intakeYear);
    setSpecialRestrictions(tempValues.specialRestrictions);
    setApplicability(tempValues.applicability);
    setCitizenships(tempValues.citizenship);
  };
  return (
    <div
      ref={dropdownRef}
      className="lg:hidden w-96 max-w-96 min-w-96 px-5 py-6 bg-gradient-to-b from-blue-800 via-sky-950 to-blue-800 rounded-3xl inline-flex justify-center items-center gap-2.5 flex-wrap content-center "
    >
      <div className="flex-1 flex justify-end items-center gap-2.5 flex-wrap content-center">
        {/* sortby */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("sortBy")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Sort By
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {openDropdown === "sortBy" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {sortOptions.map((i) => (
                <label
                  key={i.value}
                  htmlFor={i.value}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i.value}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i.value}
                    checked={tempValues.sortBy.value === i.value}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        sortBy: prev.sortBy === i ? "" : i,
                      }))
                    }
                  />
                  {i.label}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* country */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("country")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Country
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.countries?.length>0&&
          openDropdown === "country" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.countries?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.country === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        country: prev.country === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* course level */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("courseLevel")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Course Level
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.courses?.length>0&&openDropdown === "courseLevel" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.courses?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.courseLevel === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        courseLevel: prev.courseLevel === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* <div className="flex-1 min-w-40 px-5 py-2 bg-white rounded-3xl outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center">
          <div className="justify-center text-slate-900 text-sm font-normal font-['Urbanist'] leading-tight">
            S
          </div>
          <div className="w-3.5 h-3.5 flex">
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div> */}

        {/* scholarship Type */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("scholerShipType")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Scholarship Type
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.scholarshipTypes?.length>0&&openDropdown === "scholerShipType" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.scholarshipTypes?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.scholarshipType === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        scholarshipType: prev.scholarshipType === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* area of study */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("areaOfStudy")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Area of Study
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.areasOfStudy?.length>0&&openDropdown === "areaOfStudy" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.areasOfStudy?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.areaOfStudy === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        areaOfStudy: prev.areaOfStudy === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* intake Year */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("intakeYears")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Intake Year
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.intakeYears?.length>0&&openDropdown === "intakeYears" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.intakeYears?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.intakeYear === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        intakeYear: prev.intakeYear === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* special restrictions */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("specialRestrictions")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Special
              <br />
              Restrictions
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.specialRestrictions?.length>0&&openDropdown === "specialRestrictions" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.specialRestrictions?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.specialRestrictions === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        specialRestrictions:
                          prev.specialRestrictions === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* scholarship applicability */}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("applicability")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Scholarship
              <br />
              Applicabillity
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.applicability?.length>0&&openDropdown === "applicability" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.applicability?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.applicability === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        applicability: prev.applicability === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* studen citizenship*/}
        <div className="relative flex-1 min-w-40">
          <button
            onClick={() => toggleDropdown("citizenships")}
            className="w-full px-5 py-2 bg-white rounded-3xl shadow-md outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center"
          >
            <span className="text-slate-900 text-sm font-normal font-[Urbanist] leading-tight">
              Student
              <br />
              Citizenship
            </span>
            <FontAwesomeIcon icon={faAngleDown} className="w-3.5 h-3.5" />
          </button>
          {filters?.citizenships?.length>0&&openDropdown === "citizenships" && (
            <div className="absolute left-0 w-full mt-1 bg-white rounded-md shadow-md p-1 z-10 max-h-[250px] overflow-y-scroll">
              {filters?.citizenships?.map((i) => (
                <label
                  key={i}
                  htmlFor={i}
                  className="flex items-center p-2 cursor-pointer text-sm"
                >
                  <input
                    id={i}
                    className="mr-1 before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute 				 
                                   before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0 
                                   before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                    type="checkbox"
                    value={i}
                    checked={tempValues.citizenship === i}
                    onChange={() =>
                      setTempValues((prev) => ({
                        ...prev,
                        citizenship: prev.citizenship === i ? "" : i,
                      }))
                    }
                  />
                  {i}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* <div className="flex-1 min-w-40 px-5 py-2 bg-white rounded-3xl outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center">
          <div className="justify-center text-slate-900 text-sm font-normal font-['Urbanist']">
            Scholarship
            <br />
            Applicability
          </div>
          <div className="w-3.5 h-3.5 flex">
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <div className="flex-1 min-w-40 px-5 py-2 bg-white rounded-3xl outline outline-[0.58px] outline-offset-[-0.58px] outline-slate-900 flex justify-between items-center">
          <div className="justify-center text-slate-900 text-sm font-normal font-['Urbanist']">
            Student
            <br />
            citizenship
          </div>
          <div className="w-3.5 h-3.5 flex">
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div> */}
        <div className="w-20 px-5 py-2 bg-blue-600 rounded-3xl outline outline-1 outline-slate-900 flex justify-between items-center bg-[#2B7CD6]">
          <button
            className="justify-center  text-white text-sm font-normal font-['Urbanist'] leading-tight"
            onClick={habdleButtonClick}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSearchBar2;
