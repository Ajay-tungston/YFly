import React, { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import grid from "../assets/images/image/grid.svg";
import CourseSearchbar from "../components/CourseSearchbar";
import search from "../assets/images/image/search.svg";
import ascend from "../assets/images/image/ascend.svg";
import info from "../assets/images/image/info.svg";
import contender from "../assets/images/image/contender.svg";
import shieldtick from "../assets/images/image/shieldtick.svg";
import ascendorange from "../assets/images/image/ascendorange.svg";

import contenderblue from "../assets/images/image/contenderblue.svg";
import contendergreen from "../assets/images/image/contendergreen.svg";
import close from "../assets/images/image/close.svg";
import wallet from "../assets/images/image/wallet.svg";
import down from "../assets/images/image/down.svg";

import Footer from "../components/Footer";
import ResponsiveSearchBar from "../components/ResponsiveSearchBar";
import axios from "axios";
import { debounce } from "lodash";
import { Oval } from "react-loader-spinner";
import SuccessPopup from "../components/alertPopUp/SuccessPopup";

const Profilematcher = () => {
  const [userData, setUserData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [courseLevel, setCourseLevel] = useState("");
  const [country, setCountry] = useState([]);
  const [areasOfStudy, setAreasOfStudy] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [intake, setIntake] = useState([]);
  const [duration, setDuration] = useState([]);
  const [testRequirement, setTestRequirement] = useState("");
  const [minScore, setMinScore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scholarship, setScholarship] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minGpa, setMinGpa] = useState(null);
  const [maxGpa, setMaxGpa] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        if (email) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/profile/${email}`
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
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile-matcher/filters`
        );
        setFilters(response?.data?.filters);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilters();
  }, []);

  const fetchResults = useCallback(async () => {
    const min = minAmount !== null ? Number(minAmount) : undefined;
    const max = maxAmount !== null ? Number(maxAmount) : undefined;

    //for display the values
    const hasFilters =
      courseLevel ||
      country ||
      areasOfStudy ||
      minAmount !== null ||
      maxAmount !== null ||
      intake.month ||
      intake.year ||
      duration ||
      testRequirement ||
      minScore !== null ||
      maxScore !== null ||
      searchQuery ||
      scholarship;

    setIsFiltered(!!hasFilters);
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile-matcher/result`,
        {
          params: {
            university_name: searchQuery,
            course_level: courseLevel,
            country: Array.isArray(country) ? country : [country],
            area_of_study: Array.isArray(areasOfStudy)
              ? areasOfStudy
              : [areasOfStudy],
            max_tution_fee: max,
            min_tution_fee: min,
            intake_month: intake.map((i) => i.month),
            intake_year: intake.map((i) => i.year),
            course_duration: duration,
            test_requirement: testRequirement,
            min_score: minScore,
            max_score: maxScore,
            scholarship,
            minGPA: minGpa,
            maxGPA: maxGpa,
          },
        }
      );

      setUniversityData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    courseLevel,
    country,
    areasOfStudy,
    minAmount,
    maxAmount,
    intake,
    duration,
    searchQuery,
    testRequirement,
    minScore,
    maxScore,
    scholarship,
    minGpa,
    maxGpa,
  ]);

  useEffect(() => {
    const debouncedFetch = debounce(fetchResults, 300);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [fetchResults]);

  const [isAscendExpanded, setIsAscendExpanded] = useState(false);
  const [isContenderExpanded, setIsContenderExpanded] = useState(false);
  const [isFrontrunnerExpanded, setIsFrontrunnerExpanded] = useState(false);

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Get unique available years from course intakes
  let availableYears = selectedCourse?.intakes
    ? [...new Set(selectedCourse?.intakes?.map((intake) => intake.year))]
    : [];

  // Get months available for the selected year
  let availableMonths =
    selectedCourse?.intakes
      ?.filter((intake) => intake.year === selectedYear)
      ?.map((intake) => intake.month) || [];

  const toggleShowMore = (value) => {
    if (value === "ascend") setIsAscendExpanded(!isAscendExpanded);
    if (value === "contender") setIsContenderExpanded(!isContenderExpanded);
    if (value === "frontrunner")
      setIsFrontrunnerExpanded(!isFrontrunnerExpanded);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleModal = (univeristy) => {
    setOpenModal(!openModal);
    if (details) {
      setDetails(false);
    }
    if (univeristy) {
      setSelectedUniversity(univeristy);
    }
  };

  const [details, setDetails] = useState(false);
  const handleDetails = (course) => {
    setDetails(!details);
    if (openModal) {
      setOpenModal(false);
    }
    if (apply) {
      setApply(false);
    }
    if (course) {
      setSelectedCourse(course);
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
    setSelectedMonth(null);
    setSelectedYear(null);
  };
  const [yeardrop, setYeardrop] = useState(false);
  const handleYearDrop = () => {
    setYeardrop(!yeardrop);
  };

  const [monthdrop, setMonthdrop] = useState(false);
  const handleMonthDrop = () => {
    setMonthdrop(!monthdrop);
  };

  //file upload section
  const [documentsdrop, setDocumentsdrop] = useState(false);
  const [identitydoc, setIdentitydoc] = useState(false);
  const [educationdoc, setEducationdoc] = useState(false);
  const [workexpdoc, setWorkexpdoc] = useState(false);
  const [englishdoc, setEnglishdoc] = useState(false);
  const [extracurricularDoc, setExtracurricularDoc] = useState(false);
  const [recommendationDoc, setRecommendationDoc] = useState(false);
  const [otherDoc, setOtherDoc] = useState(false);

  // Refs for file inputs
  const passportFrontRef = useRef();
  const passportBackRef = useRef();
  const cvResumeRef = useRef();
  const educationDocsRef = useRef();
  const workExpDocsRef = useRef();
  const englishProfDocsRef = useRef();
  const extracurricularDocsRef = useRef();
  const recommendationDocsRef = useRef();
  const otherDocsRef = useRef();

  // State for uploaded files
  const [passportFront, setPassportFront] = useState(null);
  const [passportBack, setPassportBack] = useState(null);
  const [cvResume, setCvResume] = useState(null);
  const [educationalDocs, setEducationalDocs] = useState([]);
  const [workExpDocs, setWorkExpDocs] = useState([]);
  const [englishProfDocs, setEnglishProfDocs] = useState([]);
  const [extracurricularDocs, setExtracurricularDocs] = useState([]);
  const [recommendationDocs, setRecommendationDocs] = useState([]);
  const [otherDocs, setOtherDocs] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  // Handlers for dropdown toggles
  const handleDocuments = () => setDocumentsdrop(!documentsdrop);
  const handleIdentitynDoc = () => setIdentitydoc(!identitydoc);
  const handleEducationDoc = () => setEducationdoc(!educationdoc);
  const handleWorkExpDoc = () => setWorkexpdoc(!workexpdoc);
  const handleEnglishDoc = () => setEnglishdoc(!englishdoc);
  const handleExtracurricularDoc = () =>
    setExtracurricularDoc(!extracurricularDoc);
  const handleRecommendationDoc = () =>
    setRecommendationDoc(!recommendationDoc);
  const handleOtherDoc = () => setOtherDoc(!otherDoc);

  // Handlers for file uploads
  const handlePassportFrontChange = (e) => {
    if (e.target.files[0]) {
      setPassportFront(e.target.files[0]);
    }
  };

  const handlePassportBackChange = (e) => {
    if (e.target.files[0]) {
      setPassportBack(e.target.files[0]);
    }
  };

  const handleCvResumeChange = (e) => {
    if (e.target.files[0]) {
      setCvResume(e.target.files[0]);
    }
  };

  const handleEducationDocsChange = (e) => {
    setEducationalDocs([...educationalDocs, ...Array.from(e.target.files)]);
  };

  const handleWorkExpDocsChange = (e) => {
    setWorkExpDocs([...workExpDocs, ...Array.from(e.target.files)]);
  };

  const handleEnglishProfDocsChange = (e) => {
    setEnglishProfDocs([...englishProfDocs, ...Array.from(e.target.files)]);
  };

  const handleExtracurricularDocsChange = (e) => {
    setExtracurricularDocs([
      ...extracurricularDocs,
      ...Array.from(e.target.files),
    ]);
  };

  const handleRecommendationDocsChange = (e) => {
    setRecommendationDocs([
      ...recommendationDocs,
      ...Array.from(e.target.files),
    ]);
  };

  const handleOtherDocsChange = (e) => {
    setOtherDocs([...otherDocs, ...Array.from(e.target.files)]);
  };

  // Handlers for triggering file input clicks
  const handlePassportFront = () => passportFrontRef.current.click();
  const handlePassportBack = () => passportBackRef.current.click();
  const handleCvResume = () => cvResumeRef.current.click();
  const handleEducationClick = () => educationDocsRef.current.click();
  const handleWorkExpClick = () => workExpDocsRef.current.click();
  const handleEnglishProfClick = () => englishProfDocsRef.current.click();
  const handleExtracurricularClick = () =>
    extracurricularDocsRef.current.click();
  const handleRecommendationClick = () => recommendationDocsRef.current.click();
  const handleOtherClick = () => otherDocsRef.current.click();

  // Handler for removing files from multiple uploads
  const removeFile = (fileList, setFileList, index) => {
    const newFiles = [...fileList];
    newFiles.splice(index, 1);
    setFileList(newFiles);
  };

  // Submit handler
  const handleSubmit = async () => {
    // Validate required fields
    // if (
    //   !userData?._id ||
    //   !selectedCourse?._id ||
    //   !selectedYear ||
    //   !selectedMonth
    // ) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    setErrMsg("");

    // Single default limit for all multiple file categories
    const DEFAULT_FILE_LIMIT = 3; // Maximum 3 files per category

    // Track validation states
    let hasMissingFiles = false;
    let hasInvalidFiles = false;
    let hasExceededLimits = false;

    // Check single file fields (unchanged)
    if (!passportFront || !passportBack || !cvResume) {
      hasMissingFiles = true;
    } else if (
      passportFront.type !== "application/pdf" ||
      passportBack.type !== "application/pdf" ||
      cvResume.type !== "application/pdf"
    ) {
      hasInvalidFiles = true;
    }

    // Check multiple file fields with default limit
    const documentGroups = [
      { files: educationalDocs },
      { files: workExpDocs },
      { files: englishProfDocs },
      { files: extracurricularDocs },
      { files: recommendationDocs },
      { files: otherDocs },
    ];

    documentGroups.forEach(({ files }) => {
      if (files.length === 0) {
        hasMissingFiles = true;
      } else if (files.some((file) => file.type !== "application/pdf")) {
        hasInvalidFiles = true;
      } else if (files.length > DEFAULT_FILE_LIMIT) {
        hasExceededLimits = true;
      }
    });

    // Set appropriate error message
    if (hasExceededLimits) {
      setErrMsg(
        `Maximum ${DEFAULT_FILE_LIMIT} files allowed per document category.`
      );
      return;
    } else if (hasMissingFiles && hasInvalidFiles) {
      setErrMsg("All documents are required and must be in PDF format.");
    } else if (hasMissingFiles) {
      setErrMsg("All required documents must be uploaded.");
    } else if (hasInvalidFiles) {
      setErrMsg("Only PDF format is accepted for all documents.");
    }

    if (hasMissingFiles || hasInvalidFiles) {
      return;
    }

    const formData = new FormData();

    // Append user and course information
    formData.append("userId", userData._id);
    formData.append("courseId", selectedCourse._id);
    formData.append("intakeYear", selectedYear);
    formData.append("intakeMonth", selectedMonth);

    // Append identity documents (single files)
    if (passportFront) formData.append("passportFront", passportFront);
    if (passportBack) formData.append("passportBack", passportBack);
    if (cvResume) formData.append("cvResume", cvResume);

    // Append other documents (multiple files)
    educationalDocs.forEach((file) =>
      formData.append("educationalDocuments", file)
    );
    workExpDocs.forEach((file) =>
      formData.append("workExperienceDocuments", file)
    );
    englishProfDocs.forEach((file) =>
      formData.append("englishProficiencyDocuments", file)
    );
    extracurricularDocs.forEach((file) =>
      formData.append("extracurricularDocuments", file)
    );
    recommendationDocs.forEach((file) =>
      formData.append("recommendationDocuments", file)
    );
    otherDocs.forEach((file) => formData.append("otherDocuments", file));

    try {
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/application/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // For Axios, response data is in response.data
      setShowPopup(true);

      setOpenModal(false);
      setDetails(false);
      setApply(false);
      setDocumentsdrop(false);

      // Reset form state
      setPassportFront(null);
      setPassportBack(null);
      setCvResume(null);
      setEducationalDocs([]);
      setWorkExpDocs([]);
      setEnglishProfDocs([]);
      setExtracurricularDocs([]);
      setRecommendationDocs([]);
      setOtherDocs([]);
      setSelectedYear(null);
      setSelectedMonth(null);
      setDocumentsdrop(false);

      setErrMsg("");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application");
    }
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
  <div className="bg-bluegradient w-[90%] rounded-full py-6 px-6 flex flex-wrap justify-around gap-2">
    {/* Course Level */}
    <FilterPill >
      {courseLevel || "Course Level"}
    </FilterPill>

    {/* Country */}
    <FilterPill>
      {country?.length > 0 ? (
        country.length > 1 ? `${country[0]} +${country.length - 1}` : country[0]
      ) : (
        "Country"
      )}
    </FilterPill>

    {/* Area of Study */}
    <FilterPill >
      {areasOfStudy?.length > 0 ? (
        areasOfStudy.length > 1 ? `${areasOfStudy[0]} +${areasOfStudy.length - 1}` : areasOfStudy[0]
      ) : (
        "Area of Study"
      )}
    </FilterPill>

    {/* Intake */}
    <FilterPill >
      {intake?.length > 0 ? (
        intake.length > 1 ? (
          `${intake[0].month} ${intake[0].year} +${intake.length - 1}`
        ) : (
          `${intake[0].month} ${intake[0].year}`
        )
      ) : (
        "Intake"
      )}
    </FilterPill>

    {/* Scholarships */}
    <FilterPill>
      {scholarship?.length > 0 ? (
        scholarship.length > 1 ? `${scholarship[0]} +${scholarship.length - 1}` : scholarship[0]
      ) : (
        "Scholarships"
      )}
    </FilterPill>

    {/* Course Duration */}
    <FilterPill >
      {duration?.length > 0 ? (
        duration.length > 1 ? `${duration[0]} +${duration.length - 1}` : duration[0]
      ) : (
        "Course Duration"
      )}
    </FilterPill>

    {/* testRequirement */}
    <FilterPill >
      {testRequirement?.length > 0 ? (
        testRequirement.length > 1 ? `${testRequirement[0]} +${testRequirement.length - 1}` : testRequirement[0]
      ) : (
        "Test Requirement"
      )}
    </FilterPill>
  </div>
</div>

        <ResponsiveSearchBar
          filters={filters}
          setCourseLevel={setCourseLevel}
          setCountry={setCountry}
          setAreasOfStudy={setAreasOfStudy}
          setIntake={setIntake}
          setScholarship={setScholarship}
          setMaxAmount={setMaxAmount}
          setMinAmount={setMinAmount}
          setDuration={setDuration}
          setMinScore={setMinScore}
          setMaxScore={setMaxScore}
          setTestRequirement={setTestRequirement}
          setMinGpa={setMinGpa}
          setMaxGpa={setMaxGpa}
        />

        {/*--------------------------------- white grid section------------------------------------------ */}
        <div
          className=" bg-white bg-cover bg-center rounded-[200px] max-xl:rounded-[150px] max-md:rounded-[80px] pt-16 px-24 pb-32 mt-10 max-xl:px-12  max-lg:px-10 max-md:px-4"
          style={{ backgroundImage: `url(${grid})` }}
        >
          <div className="flex justify-between">
            <CourseSearchbar
              filters={filters}
              courseLevel={courseLevel}
              setCourseLevel={setCourseLevel}
              country={country}
              setCountry={setCountry}
              areasOfStudy={areasOfStudy}
              setAreasOfStudy={setAreasOfStudy}
              minAmount={minAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
              setMinAmount={setMinAmount}
              intake={intake}
              setIntake={setIntake}
              duration={duration}
              setDuration={setDuration}
              testRequirement={testRequirement}
              setTestRequirement={setTestRequirement}
              minScore={minScore}
              setMinScore={setMinScore}
              maxScore={maxScore}
              setMaxScore={setMaxScore}
              scholarship={scholarship}
              setScholarship={setScholarship}
              minGpa={minGpa}
              setMinGpa={setMinGpa}
              maxGpa={maxGpa}
              setMaxGpa={setMaxGpa}
            />

            <div className=" w-[72%] max-lg:w-[100%]">
              {/* ------------------search bar----------------------- */}
              <div className="flex justify-end">
                <div className=" relative">
                  <input
                    type="text"
                    placeholder="Search for scholarships"
                    className="pl-12 py-3 pr-4  border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban max-md:text-[0.8rem]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
              {isLoading ? (
                <div className="w-full h-[500px] flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <Oval
                      visible={true}
                      height="40"
                      width="40"
                      color="#2d87cc"
                      secondaryColor="#b0b0b0"
                      strokeWidth={3}
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                    <div className="mt-2 text-black px-3 py-1 rounded-md">
                      <p className="text-center">Loading...</p>
                    </div>
                  </div>
                </div>
              ) : (universityData?.data?.Ascend?.count ?? 0) <= 0 &&
                (universityData?.data?.Contender?.count ?? 0) <= 0 &&
                (universityData?.data?.Frontrunner?.count ?? 0) <= 0 ? (
                <div className="w-full h-[500px] flex justify-center items-center">
                  <p className=" flex flex-col justify-center items-center">
                    No universities found
                  </p>
                </div>
              ) : (
                <>
                  {/* ------------------------------- Ascend Universities------------------------ */}
                  {universityData?.data?.Ascend?.count > 0 && (
                    <div>
                      <div className="flex items-center mb-5">
                        <img
                          src={ascendorange}
                          width={40}
                          alt="ascend"
                          className="max-md:w-[1.2rem]"
                        />
                        <div className="font-urban ml-3 text-[25px] max-md:text-[18px] font-bold">
                          {universityData?.data?.Ascend?.count} Ascend
                          Universities
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between gap-y-6 max-md:flex-col max-md:gap-y-2">
                        {isAscendExpanded
                          ? universityData?.data?.Ascend?.universities?.map(
                              (i) => (
                                <div
                                  className=" w-[49%] max-md:w-[100%]  bg-[#FFF0D9] border-[#C9851E] border-[1px] rounded-[30px] hover:shadow-[#C9851E] hover:shadow-right-bottom px-5 pb-6"
                                  key={i._id}
                                >
                                  <div className="flex justify-center pt-16 pb-5">
                                    <img
                                      src={`data:${i?.university_logo?.contentType};base64,${i?.university_logo?.data}`}
                                      className="h-20 max-w-60"
                                      alt={i?.university_name}
                                    />
                                  </div>
                                  <div className="bg-[#FFE0B2] inline-block px-4 py-1 rounded-[20px] font-bold text-[#C9851E] text-[14px] font-urban">
                                    {i?.state},{i?.country}
                                  </div>
                                  <div className="font-dela text-[13px] mt-2">
                                    {i?.university_name}
                                  </div>

                                  <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                                  <div className="flex justify-between">
                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                        University type
                                      </div>
                                      <div className="font-dela text-[13px] max-xl:text-[12px]">
                                        {/* {i?.intakes[0].month} {i?.intakes[0].year} */}
                                        {i?.university_type}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                        QS Rank
                                      </div>
                                      <div className="flex font-urban max-xl:text-[12px]">
                                        QS Rank:{" "}
                                        <div className=" font-bold">
                                          #{i?.university_ranking}
                                        </div>
                                      </div>
                                    </div>

                                    <div className=" flex items-center">
                                      <button
                                        onClick={() => handleModal(i)}
                                        className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                      >
                                        View courses
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          : universityData?.data?.Ascend?.universities
                              ?.slice(0, 2)
                              ?.map((i) => (
                                <div
                                  className=" w-[49%] max-md:w-[100%]  bg-[#FFF0D9] border-[#C9851E] border-[1px] rounded-[30px] hover:shadow-[#C9851E] hover:shadow-right-bottom px-5 pb-6"
                                  key={i._id}
                                >
                                  <div className="flex justify-center pt-16 pb-5">
                                    <img
                                      src={`data:${i?.university_logo?.contentType};base64,${i?.university_logo?.data}`}
                                      className="h-20 max-w-60"
                                      alt={i?.university_name}
                                    />
                                  </div>
                                  <div className="bg-[#FFE0B2] inline-block px-4 py-1 rounded-[20px] font-bold text-[#C9851E] text-[14px] font-urban">
                                    {i?.state},{i?.country}
                                  </div>
                                  <div className="font-dela text-[13px] mt-2">
                                    {i?.university_name}
                                  </div>

                                  <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                                  <div className="flex justify-between">
                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                        University type
                                      </div>
                                      <div className="font-dela text-[13px] max-xl:text-[12px]">
                                        {i?.university_type}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                        QS Rank
                                      </div>
                                      <div className="flex font-urban max-xl:text-[12px]">
                                        QS Rank:{" "}
                                        <div className=" font-bold">
                                          #{i?.university_ranking}
                                        </div>
                                      </div>
                                    </div>

                                    <div className=" flex items-center">
                                      <button
                                        onClick={() => handleModal(i)}
                                        className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                      >
                                        View courses
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                      {universityData?.data?.Ascend?.count > 2 && (
                        <div className="flex justify-between my-12">
                          <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                          <button
                            className="text-[#30589F] font-urban font-bold"
                            onClick={() => toggleShowMore("ascend")}
                          >
                            View {isAscendExpanded ? "Less" : "More"}{" "}
                            Universities
                          </button>
                          <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* -------------------------------Contender Universities------------------------ */}
                  {universityData?.data?.Contender?.count > 0 && (
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

                      <div className="flex flex-wrap justify-between gap-y-6 max-md:flex-col max-md:gap-y-2">
                        {isContenderExpanded
                          ? universityData?.data?.Contender?.universities?.map(
                              (i) => (
                                <div
                                  className="w-[49%] max-md:w-[100%] bg-[#D9EBFF] border-[#2B7CD6] border-[1px] rounded-[30px] hover:shadow-[#2B7CD6] hover:shadow-right-bottom px-5 pb-6"
                                  key={i._id}
                                >
                                  <div className="flex justify-center pt-16 pb-5">
                                    <img
                                      src={`data:${i?.university_logo?.contentType};base64,${i?.university_logo?.data}`}
                                      className="h-20 max-w-60"
                                      alt={i?.university_name}
                                    />
                                  </div>
                                  <div className="bg-[#B2D7FF] inline-block px-4 py-1 rounded-[20px] font-bold text-[#2B7CD6] text-[14px] font-urban">
                                    {i?.state},{i?.country}
                                  </div>
                                  <div className="font-dela text-[13px] mt-2">
                                    {i?.university_name}
                                  </div>
                                  <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                                  <div className="flex justify-between">
                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                        University type
                                      </div>
                                      <div className="font-dela text-[13px] max-xl:text-[12px]">
                                        {i?.university_type}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                        QS Rank
                                      </div>
                                      <div className="flex font-urban max-xl:text-[12px]">
                                        QS Rank:{" "}
                                        <div className=" font-bold">
                                          #{i?.university_ranking}
                                        </div>
                                      </div>
                                    </div>

                                    <div className=" flex items-center">
                                      <button
                                        className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                        onClick={() => handleModal(i)}
                                      >
                                        View courses
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          : universityData?.data?.Contender?.universities
                              ?.slice(0, 2)
                              ?.map((i) => (
                                <div
                                  className="w-[49%] max-md:w-[100%] bg-[#D9EBFF] border-[#2B7CD6] border-[1px] rounded-[30px] hover:shadow-[#2B7CD6] hover:shadow-right-bottom px-5 pb-6"
                                  key={i._id}
                                >
                                  <div className="flex justify-center pt-16 pb-5">
                                    <img
                                      src={`data:${i?.university_logo?.contentType};base64,${i?.university_logo?.data}`}
                                      className="h-20 max-w-60"
                                      alt={i?.university_name}
                                    />
                                  </div>
                                  <div className="bg-[#B2D7FF] inline-block px-4 py-1 rounded-[20px] font-bold text-[#2B7CD6] text-[14px] font-urban">
                                    {i?.state},{i?.country}
                                  </div>
                                  <div className="font-dela text-[13px] mt-2">
                                    {i?.university_name}
                                  </div>
                                  <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                                  <div className="flex justify-between">
                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                        University type
                                      </div>
                                      <div className="font-dela text-[13px] max-xl:text-[12px]">
                                        {i?.university_type}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                        QS Rank
                                      </div>
                                      <div className="flex font-urban max-xl:text-[12px]">
                                        QS Rank:{" "}
                                        <div className=" font-bold">
                                          #{i?.university_ranking}
                                        </div>
                                      </div>
                                    </div>

                                    <div className=" flex items-center">
                                      <button
                                        className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                        onClick={() => handleModal(i)}
                                      >
                                        View courses
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                      {universityData?.data?.Contender?.count > 2 && (
                        <div className="flex justify-between my-12">
                          <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                          <button
                            className="text-[#30589F] font-urban font-bold"
                            onClick={() => toggleShowMore("contender")}
                          >
                            View {isContenderExpanded ? "Less" : "More"}{" "}
                            Universities
                          </button>
                          <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* -------------------------------Frontrunner Universities------------------------ */}
                  {universityData?.data?.Frontrunner?.count > 0 && (
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

                      <div className="flex flex-wrap gap-y-6 justify-between max-md:flex-col max-md:gap-y-2">
                        {isFrontrunnerExpanded
                          ? universityData?.data?.Frontrunner?.universities?.map(
                              (i) => (
                                <div
                                  className=" w-[49%] max-md:w-[100%] bg-[#D9FFF1] border-[#209F71] border-[1px] rounded-[30px] hover:shadow-[#209F71] hover:shadow-right-bottom px-5 pb-6"
                                  key={i._id}
                                >
                                  <div className="flex justify-center pt-16 pb-5">
                                    <img
                                      src={`data:${i?.university_logo?.contentType};base64,${i?.university_logo?.data}`}
                                      className="h-20 max-w-60"
                                      alt={i?.university_name}
                                    />
                                  </div>
                                  <div className="bg-[#B2FFE3] inline-block px-4 py-1 rounded-[20px] font-bold text-[#209F71] text-[14px] font-urban">
                                    {i?.state},{i?.country}
                                  </div>
                                  <div className="font-dela text-[13px] mt-2">
                                    {i?.university_name}
                                  </div>
                                  <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                                  <div className="flex justify-between">
                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                        University type
                                      </div>
                                      <div className="font-dela text-[13px] max-xl:text-[12px]">
                                        {i?.university_type}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                        QS Rank
                                      </div>
                                      <div className="flex font-urban max-xl:text-[12px]">
                                        QS Rank:{" "}
                                        <div className=" font-bold">
                                          #{i?.university_ranking}
                                        </div>
                                      </div>
                                    </div>

                                    <div className=" flex items-center">
                                      <button
                                        className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                        onClick={() => handleModal(i)}
                                      >
                                        View courses
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          : universityData?.data?.Frontrunner?.universities
                              ?.slice(0, 2)
                              ?.map((i) => (
                                <div
                                  className=" w-[49%] max-md:w-[100%] bg-[#D9FFF1] border-[#209F71] border-[1px] rounded-[30px] hover:shadow-[#209F71] hover:shadow-right-bottom px-5 pb-6"
                                  key={i._id}
                                >
                                  <div className="flex justify-center pt-16 pb-5">
                                    <img
                                      src={`data:${i?.university_logo?.contentType};base64,${i?.university_logo?.data}`}
                                      className="h-20 max-w-60"
                                      alt={i?.university_name}
                                    />
                                  </div>
                                  <div className="bg-[#B2FFE3] inline-block px-4 py-1 rounded-[20px] font-bold text-[#209F71] text-[14px] font-urban">
                                    {i?.state},{i?.country}
                                  </div>
                                  <div className="font-dela text-[13px] mt-2">
                                    {i?.university_name}
                                  </div>
                                  <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                                  <div className="flex justify-between">
                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px]">
                                        University type
                                      </div>
                                      <div className="font-dela text-[13px] max-xl:text-[12px]">
                                        {i?.university_type}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-[#898C9A] font-urban font-bold text-[13px] max-xl:text-[12px] flex justify-center">
                                        QS Rank
                                      </div>
                                      <div className="flex font-urban max-xl:text-[12px]">
                                        QS Rank:{" "}
                                        <div className=" font-bold">
                                          #{i?.university_ranking}
                                        </div>
                                      </div>
                                    </div>

                                    <div className=" flex items-center">
                                      <button
                                        className="bg-white px-4 max-xl:px-3 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] max-xl:text-[12px] font-urban border-[2px] rounded-[20px]"
                                        onClick={() => handleModal(i)}
                                      >
                                        View courses
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>

                      {universityData?.data?.Frontrunner?.count > 2 && (
                        <div className="flex justify-between mt-12">
                          <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                          <button
                            className="text-[#30589F] font-urban font-bold"
                            onClick={() => toggleShowMore("frontrunner")}
                          >
                            View {isFrontrunnerExpanded ? "Less" : "More"}{" "}
                            Universities
                          </button>
                          <div className="border-t-[0.5px] border-[#0E1B2C] my-4 w-[40%]"></div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
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

                  <div className="overflow-y-auto max-h-[30vh] ">
                    {selectedUniversity?.courses?.length > 0 &&
                      selectedUniversity?.courses?.map((i) => (
                        <div className="flex justify-between font-urban mb-3 mr-4">
                          <div>
                            {/* {i?.course_level} of {i?.discipline} in{" "}
                            {i?.area_of_study} */}
                            {i?.course_level === "MBA"
                              ? `MBA in ${i?.area_of_study}`
                              : `${i?.course_level} of ${i?.discipline} in ${i?.area_of_study}`}
                          </div>
                          <button
                            onClick={() => handleDetails(i)}
                            className="text-[#2B7CD6] text-[14px] font-semibold"
                          >
                            View Details
                          </button>
                        </div>
                      ))}
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
                      <img
                        src={`data:${selectedUniversity?.university_logo?.contentType};base64,${selectedUniversity?.university_logo?.data}`}
                        className="max-w-60 h-32"
                        alt="harward"
                      />
                    </div>
                    <div className="font-dela text-[13px]">
                      {/* {selectedCourse?.course_level} of{" "}
                      {selectedCourse?.discipline} in{" "}
                      {selectedCourse?.area_of_study} */}
                      {selectedCourse?.course_level === "MBA"
                        ? `MBA in ${selectedCourse?.area_of_study}`
                        : `${selectedCourse?.course_level} of ${selectedCourse?.discipline} in ${selectedCourse?.area_of_study}`}
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
                            ${selectedCourse?.tution_fee}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-[40%]">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">
                            Eligibility
                          </div>
                          {selectedCourse?.eligibilityRequirements?.some(
                            (i) => i.requirementType === "Min GPA"
                          ) ? (
                            selectedCourse?.eligibilityRequirements
                              ?.filter((i) => i.requirementType === "Min GPA")
                              ?.map((i) => (
                                <div
                                  className="font-dela text-[13px]"
                                  key={i.id || i?.minGPA}
                                >
                                  {i.minGPA}-10(Gpa)
                                </div>
                              ))
                          ) : (
                            <div className="font-dela text-[13px]">N/A</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-5 ">
                      <div className="flex w-[60%] ">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">Duration</div>
                          <div className="font-dela text-[13px]">
                            {selectedCourse?.course_duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-[40%]">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">Intake</div>
                          <div className="font-dela text-[13px]">
                            {selectedCourse?.intakes?.map((i, index) => (
                              <>
                                <span className="hidden md:flex">
                                  {i.month}-{i.year}
                                  {selectedCourse?.intakes?.length !== index
                                    ? ""
                                    : ","}
                                </span>
                                <span className="md:hidden">
                                  {i.month}-<br />
                                  {i.year}
                                  {selectedCourse?.intakes?.length !== index
                                    ? ""
                                    : ","}
                                </span>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-5 ">
                      <div className="flex">
                        <img src={wallet} alt="wallet" />
                        <div className="ml-3">
                          <div className="font-urban text-[14px]">
                            Requirement
                          </div>
                          {selectedCourse?.testRequirements?.map((i) => (
                            <div className="font-dela text-[13px]">
                              Overall score of {i?.overallScore}, for (
                              {i?.testRequirementName})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={() => handleModal()}
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
                          {availableYears.map((year) => (
                            <div
                              key={year}
                              className={`py-3 px-5 mt-2 font-dela border-black border-[1px] rounded-[15px] text-center cursor-pointer 
          ${
            selectedYear === year ? "bg-[#2B7CD6] text-white" : "text-[#2B7CD6]"
          }`}
                              onClick={() => {
                                setSelectedYear(year);
                                setSelectedMonth(null);
                              }}
                            >
                              {year}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedYear && (
                      <div className="py-4 px-5 border-black border-[1px] rounded-[30px] mt-3">
                        <div className="flex justify-between">
                          <div className="text-[#BFBFBF] font-urban">
                            Select intake month
                          </div>
                          <button onClick={handleMonthDrop}>
                            <img src={down} width={15} alt="down" />
                          </button>
                        </div>

                        {monthdrop && (
                          <div className="overflow-y-scroll max-h-[21vh]">
                            {availableMonths.map((month) => (
                              <div
                                key={month}
                                className={`py-3 px-5 mt-2 font-dela border-black border-[1px] rounded-[15px] text-center mr-4 cursor-pointer
              ${
                selectedMonth === month
                  ? "bg-[#2B7CD6] text-white"
                  : "text-[#2B7CD6]"
              }`}
                                onClick={() => setSelectedMonth(month)}
                              >
                                {month}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between ">
                    <button
                      onClick={() => handleDetails()}
                      className="bg-white px-4 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] font-urban border-[2px] rounded-[20px]"
                    >
                      Back to details
                    </button>
                    <button
                      onClick={handleDocuments}
                      // onClick={() => setShowPopup(true)}
                      disabled={!selectedYear || !selectedMonth}
                      className={`bg-[#2B7CD6] text-[14px] font-urban text-white flex items-center px-5 py-1 rounded-full shadow-right-bottom border-[1px] shadow-black border-black ${
                        !selectedYear || !selectedMonth
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <>
            {documentsdrop && (
              <div className="bg-black bg-opacity-50 msx-h-[80vh] overflow-y-scroll fixed inset-0">
                <div className="flex justify-around">
                  <div className="bg-white w-[40%] max-md:w-[95%] absolute top-[5%] rounded-[30px] p-8">
                    <div className="font-dela">Apply Now</div>
                    {errMsg && <p className="text-[#c81f1f] text-center">{errMsg}</p>}
                    <div className="my-5">
                      {/* Identity Documents */}
                      <div className="py-3 px-5 border-black border-[1px] rounded-[30px]">
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
                            {/* Passport Front */}
                            <div className="py-3 px-5 mt-2 text-[14px] flex justify-between text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px]">
                              Passport Front
                              <input
                                type="file"
                                className="hidden"
                                ref={passportFrontRef}
                                onChange={handlePassportFrontChange}
                                accept=".pdf"
                              />
                              <div>
                                <button
                                  onClick={handlePassportFront}
                                  className="border-none font-urban font-semibold text-[#2B7CD6]"
                                >
                                  Upload file
                                </button>
                                {passportFront && (
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {passportFront.name}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Passport Back */}
                            <div className="py-3 px-5 mt-2 text-[14px] flex justify-between text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px]">
                              Passport Back
                              <input
                                type="file"
                                className="hidden"
                                ref={passportBackRef}
                                onChange={handlePassportBackChange}
                                accept=".pdf"
                              />
                              <div>
                                <button
                                  onClick={handlePassportBack}
                                  className="border-none font-urban font-semibold text-[#2B7CD6]"
                                >
                                  Upload file
                                </button>
                                {passportBack && (
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {passportBack.name}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* CV/Resume */}
                            <div className="py-3 px-5 mt-2 text-[14px] flex justify-between text-[#2B7CD6] font-dela border-black border-[1px] rounded-[15px]">
                              CV/Resume
                              <input
                                type="file"
                                className="hidden"
                                ref={cvResumeRef}
                                onChange={handleCvResumeChange}
                                accept=".pdf"
                              />
                              <div>
                                <button
                                  onClick={handleCvResume}
                                  className="border-none font-urban font-semibold text-[#2B7CD6]"
                                >
                                  Upload file
                                </button>
                                {cvResume && (
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {cvResume.name}
                                  </p>
                                )}
                              </div>
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
                              ref={educationDocsRef}
                              onChange={handleEducationDocsChange}
                              accept=".pdf"
                              multiple
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={handleEducationClick}
                                className="py-2 border-none font-urban font-semibold text-[#2B7CD6]"
                              >
                                Upload files
                              </button>
                              {educationalDocs.map((file, index) => (
                                <div key={index} className="flex items-center">
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFile(
                                        educationalDocs,
                                        setEducationalDocs,
                                        index
                                      )
                                    }
                                    className="ml-2 text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
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
                          <button onClick={handleWorkExpDoc}>
                            <img src={down} width={15} alt="down" />
                          </button>
                        </div>
                        {workexpdoc && (
                          <div>
                            <input
                              type="file"
                              className="hidden"
                              ref={workExpDocsRef}
                              onChange={handleWorkExpDocsChange}
                              accept=".pdf"
                              multiple
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={handleWorkExpClick}
                                className="py-2 border-none font-urban font-semibold text-[#2B7CD6]"
                              >
                                Upload files
                              </button>
                              {workExpDocs.map((file, index) => (
                                <div key={index} className="flex items-center">
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFile(
                                        workExpDocs,
                                        setWorkExpDocs,
                                        index
                                      )
                                    }
                                    className="ml-2 text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* English Proficiency Documents */}
                      <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                        <div className="flex justify-between">
                          <div className="text-[#BFBFBF] font-urban">
                            English Proficiency Documents
                          </div>
                          <button onClick={handleEnglishDoc}>
                            <img src={down} width={15} alt="down" />
                          </button>
                        </div>
                        {englishdoc && (
                          <div>
                            <input
                              type="file"
                              className="hidden"
                              ref={englishProfDocsRef}
                              onChange={handleEnglishProfDocsChange}
                              accept=".pdf"
                              multiple
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={handleEnglishProfClick}
                                className="py-2 border-none font-urban font-semibold text-[#2B7CD6]"
                              >
                                Upload files
                              </button>
                              {englishProfDocs.map((file, index) => (
                                <div key={index} className="flex items-center">
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFile(
                                        englishProfDocs,
                                        setEnglishProfDocs,
                                        index
                                      )
                                    }
                                    className="ml-2 text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Extracurricular Documents */}
                      <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                        <div className="flex justify-between">
                          <div className="text-[#BFBFBF] font-urban">
                            Extracurricular Documents
                          </div>
                          <button onClick={handleExtracurricularDoc}>
                            <img src={down} width={15} alt="down" />
                          </button>
                        </div>
                        {extracurricularDoc && (
                          <div>
                            <input
                              type="file"
                              className="hidden"
                              ref={extracurricularDocsRef}
                              onChange={handleExtracurricularDocsChange}
                              accept=".pdf"
                              multiple
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={handleExtracurricularClick}
                                className="py-2 border-none font-urban font-semibold text-[#2B7CD6]"
                              >
                                Upload files
                              </button>
                              {extracurricularDocs.map((file, index) => (
                                <div key={index} className="flex items-center">
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFile(
                                        extracurricularDocs,
                                        setExtracurricularDocs,
                                        index
                                      )
                                    }
                                    className="ml-2 text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Recommendation Documents */}
                      <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                        <div className="flex justify-between">
                          <div className="text-[#BFBFBF] font-urban">
                            Recommendation Documents
                          </div>
                          <button onClick={handleRecommendationDoc}>
                            <img src={down} width={15} alt="down" />
                          </button>
                        </div>
                        {recommendationDoc && (
                          <div>
                            <input
                              type="file"
                              className="hidden"
                              ref={recommendationDocsRef}
                              onChange={handleRecommendationDocsChange}
                              accept=".pdf"
                              multiple
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={handleRecommendationClick}
                                className="py-2 border-none font-urban font-semibold text-[#2B7CD6]"
                              >
                                Upload files
                              </button>
                              {recommendationDocs.map((file, index) => (
                                <div key={index} className="flex items-center">
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFile(
                                        recommendationDocs,
                                        setRecommendationDocs,
                                        index
                                      )
                                    }
                                    className="ml-2 text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Other Documents */}
                      <div className="py-3 px-5 border-black border-[1px] rounded-[30px] mt-3">
                        <div className="flex justify-between">
                          <div className="text-[#BFBFBF] font-urban">
                            Other Documents
                          </div>
                          <button onClick={handleOtherDoc}>
                            <img src={down} width={15} alt="down" />
                          </button>
                        </div>
                        {otherDoc && (
                          <div>
                            <input
                              type="file"
                              className="hidden"
                              ref={otherDocsRef}
                              onChange={handleOtherDocsChange}
                              accept=".pdf"
                              multiple
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={handleOtherClick}
                                className="py-2 border-none font-urban font-semibold text-[#2B7CD6]"
                              >
                                Upload files
                              </button>
                              {otherDocs.map((file, index) => (
                                <div key={index} className="flex items-center">
                                  <p className="font-urban text-[13px] pt-1 text-[#2B7CD6]">
                                    {file.name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      removeFile(otherDocs, setOtherDocs, index)
                                    }
                                    className="ml-2 text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={handleDocuments}
                        className="bg-white px-4 py-2 border-[#0F62AF] text-[#0F62AF] text-[13px] font-urban border-[2px] rounded-[20px]"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-[#2B7CD6] text-[14px] font-urban text-white flex items-center px-5 py-1 rounded-full shadow-right-bottom border-[1px] shadow-black border-black"
                        // onClick={() => setShowPopup(true)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
          {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
        </div>

        {/* <Contactus /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Profilematcher;

const FilterPill = ({ children }) => (
  <div className={`
    flex items-center justify-center 
    px-4 py-2 rounded-full mb-2
    bg-white text-black
    whitespace-nowrap
    max-w-[200px] overflow-hidden text-ellipsis
  `}>
    {children}
  </div>
);