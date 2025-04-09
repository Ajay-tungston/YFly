import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import grid from "../assets/images/image/grid.svg";
import hat from "../assets/images/image/hat.svg";
import search from "../assets/images/image/search.svg";
import Contactus from "../components/ContactUs";
import Footer from "../components/Footer";
import axios from "axios";
import CourseFinderBar from "../components/CourseFinderBar";
import CourseSideBar from "../components/CourseSideBar";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/pagination/PaginationBar";


// Function to transform courses array into an object of distinct values for filters
const transformCoursesToDropdownOptions = (courses) => {
  const intakeYears = Array.from(
    new Set(
      courses.flatMap((course) => course.intakes.map((intake) => intake.year))
    )
  );
  const countries = Array.from(new Set(courses.map((course) => course.country)));
  const courseTitles = Array.from(new Set(courses.map((course) => course.course_title)));
  const courseLevels = Array.from(new Set(courses.map((course) => course.course_level)));
  const areasOfStudy = Array.from(new Set(courses.map((course) => course.area_of_study)));
  const courseDurations = Array.from(new Set(courses.map((course) => course.course_duration)));
  const universityNames = Array.from(new Set(courses.map((course) => course.university_name.university_name)));
  const tuitionFees = Array.from(new Set(courses.map((course) => course.tution_fee)));
  
  const testRequirements = Array.from(new Set(courses.flatMap((course) =>
        course.testRequirements.map((test) => test.testRequirementName)
      )
    )
  );
  const backlogs = Array.from(
    new Set(
      courses.flatMap((course) =>
        course.eligibilityRequirements.map((req) => req.backlogRange).filter(Boolean)
      )
    )
  );

  return {
    intakeYears,
    countries,
    courseTitle: courseTitles, // matching the key expected in the dropdown component
    courseLevels,
    areasOfStudy,
    universityNames,
    testRequirements,
    courseDuration:courseDurations,
    backlogs,
    tuitionFees
  };
};

// Helper to convert a Buffer object (with nested array) to a base64 string
function convertBufferObjectToBase64(bufferObj) {
  if (bufferObj && Array.isArray(bufferObj)) {
    const uint8Arr = new Uint8Array(bufferObj);
    let binary = "";
    for (let i = 0; i < uint8Arr.length; i++) {
      binary += String.fromCharCode(uint8Arr[i]);
    }
    return window.btoa(binary);
  }
  return "";
}

const Coursefinder = () => {
  // State variables for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [disciplineSearch, setDisciplineSearch] = useState("");
  const [country, setCountry] = useState("");
  const [intake, setIntake] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [tuitionFeeMin, setTuitionFeeMin] = useState("");
  const [tuitionFeeMax, setTuitionFeeMax] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [testRequirement, setTestRequirement] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [universityRanking, setUniversityRanking] = useState("");
  const [dbValues, setDbValues] = useState({});
  const [courses, setCourses] = useState([]);
  const [tuitionFees, setTuitionFees] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Added sort state
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  // useEffect to fetch courses based on all filters
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const query =
          `?search=${searchTerm}` +
          `&page=${currentPage}` +
          `&country=${country}` +
          `&disciplineSearch=${disciplineSearch}` +
          `&intakeYear=${intake}` +
          `&course_title=${courseTitle}` +
          `&area_of_study=${areaOfStudy}` +
          `&min_tuition_fee=${tuitionFeeMin}` +
          `&max_tuition_fee=${tuitionFeeMax}` +
          `&scholarship_applicable=${scholarship}` +
          `&course_duration=${courseDuration}` +
          `&backlog=${backlogs}` +
          `&course_level=${courseLevel}` +
          `&testRequirementName=${testRequirement}` +
          `&university_name=${universityName}` +
          `&sort=${sort}`;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/filters${query}`
        );
        setCourses(response.data.results);
        setTotalPages(response?.data?.pagination?.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchSearch();
  }, [
    searchTerm,
    currentPage,
    disciplineSearch,
    country,
    intake,
    courseTitle,
    areaOfStudy,
    scholarship,
    courseDuration,
    backlogs,
    courseLevel,
    testRequirement,
    universityName,
    tuitionFeeMin,
    tuitionFeeMax,
    sort,
  ]);

  // useEffect to fetch all courses (or any other db values if needed) and transform for dropdowns
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/getall`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const transformedOptions = transformCoursesToDropdownOptions(
            data.data
          );
          setDbValues(transformedOptions);
          // console.log("Database Values (transformed):", transformedOptions);
        }
      })
      .catch((error) =>
        console.error("Error fetching database values:", error)
      );
  }, []);

  return (
    <div className="bg-[#0E1B2C] pb-10">
      {/* -------------------------Header Section-------------------------- */}
      <div className="bg-white h-[72vh] rounded-b-[200px] max-md:rounded-b-[80px] relative max-md:h-[60vh]">
        <Navbar />
        <div className="flex justify-center">
          <button className="absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban">
            COURSE FINDER
          </button>
          <div className="absolute top-[13.5rem] font-lato text-[5.4rem] leading-[6.5rem] max-xl:text-[4rem] max-xl:leading-[4.8rem] max-md:text-[2rem] max-md:leading-[3rem]">
            Discover your
            <br /> dream career.
          </div>
          <div className="absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-md:top-[21.5rem]">
            Unlock Your Future with the Perfect Course
          </div>
        </div>
      </div>

      <CourseFinderBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        country={country}
        setCountry={setCountry}
        courseTitle={courseTitle}
        setCourseTitle={setCourseTitle}
        intake={intake}
        setIntake={setIntake}
        areaOfStudy={areaOfStudy}
        setAreaOfStudy={setAreaOfStudy}
        scholarship={scholarship}
        setScholarship={setScholarship}
        courseDuration={courseDuration}
        setCourseDuration={setCourseDuration}
        backlogs={backlogs}
        setBacklogs={setBacklogs}
        tuitionFeeMin={tuitionFeeMin}
        setTuitionFeeMin={setTuitionFeeMin}
        tuitionFeeMax={tuitionFeeMax}
        setTuitionFeeMax={setTuitionFeeMax}
        courseLevel={courseLevel}
        setCourseLevel={setCourseLevel}
        testRequirement={testRequirement}
        setTestRequirement={setTestRequirement}
        universityName={universityName}
        setUniversityName={setUniversityName}
        universityRanking={universityRanking}
        setUniversityRanking={setUniversityRanking}
        dbValues={dbValues}
        disciplineSearch={disciplineSearch}
        setDisciplineSearch={setDisciplineSearch}
        setDbValues={setDbValues}
      />

      {/* -------------------------Courses Listing Section-------------------------- */}
      <div
        className="bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-16 max-md:pt-8 px-24 pb-[600px] mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
        style={{ backgroundImage: `url(${grid})` }}
      >
        <div className="px-2">
          <div className="flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:mt-10">
            {/* Courses Found Section */}
            <div className="border-[1px] border-[#0E1B2C] ml-80 rounded-full flex justify-center items-center w-[18%] py-2 max-xl:w-[24%] max-lg:w-[30%] max-md:w-[70%] max-lg:py-1 max-md:mb-3">
              <img src={hat} alt="hat" width={25} />
              {courses?.length > 0 && (
                <div className="font-urban font-bold ml-2">
                  {courses?.length} courses found
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative w-[40%] max-md:w-full">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search for Courses"
                className="pl-12 py-3 pr-4 max-md:pr-6 border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban w-[65%] max-lg:py-2 max-lg:pr-0"
              />
              <div className="absolute inset-y-4 max-lg:inset-y-3 left-6">
                <img src={search} width={18} alt="search" />
              </div>
            </div>
          </div>

          {/* -------------------------Sort Dropdown -------------------------- */}
          <div className="flex justify-end mt-8">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-[40px] p-2"
            >
              <option value="">Sort By</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="deadline_asc">Deadline (Earliest First)</option>
              <option value="deadline_desc">Deadline (Latest First)</option>
              <option value="tuition_asc">Tuition (Low to High)</option>
              <option value="tuition_desc">Tuition (High to Low)</option>
            </select>
          </div>

          {/* -------------------------Courses Cards Display-------------------------- */}
          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar */}
            <CourseSideBar
              dbValues={dbValues}
              intake={intake}
              setIntake={setIntake}
              country={country}
              setCountry={setCountry}
              courseLevel={courseLevel}
              setCourseLevel={setCourseLevel}
              areaOfStudy={areaOfStudy}
              setAreaOfStudy={setAreaOfStudy}
              disciplineSearch={disciplineSearch}
              setDisciplineSearch={setDisciplineSearch}
              courseDuration={courseDuration}
              setCourseDuration={setCourseDuration}
              backlogs={backlogs}
              tuitionFees={tuitionFees}
              setTuitionFees={setTuitionFees}
              setBacklogs={setBacklogs}
              tuitionFeeMin={tuitionFeeMin}
              setTuitionFeeMin={setTuitionFeeMin}
              tuitionFeeMax={tuitionFeeMax}
              setTuitionFeeMax={setTuitionFeeMax}
              scholarship={scholarship}
              setScholarship={setScholarship}
              testRequirement={testRequirement}
              setTestRequirement={setTestRequirement}
            />

            {/* Courses Section */}
            <div className="w-full md:w-3/4 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
              {courses?.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course._id}
                    className="border-[1px] border-black rounded-[38px] shadow-right-bottom p-6 bg-[#fff]  md:h-[400px] max-md:w-full"
                    onClick={() => navigate(`/courseoverview/${course._id}`)}
                  >
                    {/* University Logo and Name */}
                    <div className="border-[1px] py-10 border-black rounded-[30px] bg-[#fff] h-[150px] flex flex-col sm:flex-row sm:justify-center items-center">
                      <div className="flex flex-col sm:flex-row w-full justify-between align-items-center ">
                        {course.university_name?.university_logo?.data?.data ? (
                          (() => {
                            const { contentType, data } =
                              course.university_name.university_logo;
                            // data.data is the actual array of numbers
                            const base64String = convertBufferObjectToBase64(
                              data.data
                            );
                            const logoSrc = `data:${contentType};base64,${base64String}`;
                            // console.log("Logo src:", logoSrc); // Debug log
                            return (
                              <img
                                src={logoSrc}
                                alt={
                                  course.university_name?.university_name ||
                                  "University Logo"
                                }
                                className="w-[80px] max-sm:w-[60px] max-md:w-[100px]"
                              />
                            );
                          })()
                        ) : (
                          <img
                            src="/images/placeholder.png"
                            alt="No Logo Available"
                            className="w-[80px] max-sm:w-[60px] max-md:w-[100px]"
                          />
                        )}

                        <div className="text-xl sm:text-2xl lg:text-4xl text-center">
                          {course.university_name?.university_name}
                        </div>
                      </div>
                    </div>

                    {/* University Name Tag and QS Rank */}
                    <div className="flex justify-between mt-6 items-center gap-2 max-sm:flex-col">
                      <div className="text-[#30589F] bg-[#E5F1FF] rounded-full font-urban text-[13px] px-3 py-1 text-center">
                        {course.university_name?.university_name}
                      </div>
                      <div className="font-urban font-bold max-xl:text-[12px] text-center">
                        QS Rank: {course.university_ranking}
                      </div>
                    </div>

                    {/* Additional Course Details */}
                    <div className="mt-4 font-lato text-[15px] max-sm:text-[13px] text-center">
                      {course.course_level} in {course.discipline} -{" "}
                      {course.area_of_study}
                    </div>

                    <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

                    <div className="flex justify-between items-center gap-4 max-sm:flex-col">
                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-center max-sm:text-[14px]">
                          Deadline
                        </div>
                        <div className="font-lato text-[15px] max-sm:text-[13px] text-center">
                          {new Date(
                            course.application_deadline
                          ).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#898C9A] font-urban font-bold text-center max-sm:text-[14px]">
                          Total cost
                        </div>
                        <div className="font-lato text-[15px] max-sm:text-[13px] text-center">
                          ${course.tution_fee}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Course Found.....</p>
              )}
            </div>
          </div>
          {courses?.length > 0 && (
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      {/* -------------------------Call To Action Section-------------------------- */}
      <section className="px-4 md:px-0">
        <div className="bg-[#5cc7f1] rounded-[80px] md:rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1637px] mx-auto h-auto -mt-32 md:-mt-[150px]">
          {/* Left Image */}
          <div className="flex-shrink-0 w-full h-[250px] md:w-[571px] md:h-[403px] rounded-[20px] overflow-hidden">
            <img
              src="/images/dummy.png"
              alt="Support Agent"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-lato text-[#001f3f]">
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
            <button className="bg-[#2B7CD6] text-white border border-[#2B7CD6] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#2B7CD6] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0 shadow-[3px_3px_0px_0px_#001426]">
                            Book a call →
                        </button>
          </div>
        </div>
      </section>



   
      <Footer />
    </div>
  );
};

export default Coursefinder;
