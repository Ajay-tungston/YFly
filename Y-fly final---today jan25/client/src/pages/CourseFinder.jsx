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
// Removed harvard import since we no longer use it

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
  const[tuitionFees,setTuitionFees]=useState("");



  const navigate=useNavigate()
  // useEffect to fetch courses based on all filters


  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const query =
          `?searchTerm=${searchTerm}` +
          `&country=${country}` +
          `&disciplineSearch=${disciplineSearch}` +
          `&intake=${intake}` +
          `&course_title=${courseTitle}` +
          `&area_of_study=${areaOfStudy}` +
          `&tution_fee=${tuitionFees}`+
          `&scholarship_applicable=${scholarship}` +
          `&course_duration=${courseDuration}` +
          `&backlogs=${backlogs}` +

          `&course_level=${courseLevel}` +
          `&disciplinesearch=${disciplineSearch}` +
          `&testRequirementName=${testRequirement}` +
          `&university_name=${universityName}` +
          `&university_ranking=${universityRanking}`;
        const response = await axios.get(
          `http://localhost:5000/courses/filtersearch${query}`
        );
        setCourses(response.data.results);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchSearch();
  }, [
    searchTerm,
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
    universityRanking,
    tuitionFees,
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/courses/getValues")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDbValues(data.data);
          console.log("Database Values:", data.data);
        }
      })
      .catch((error) =>
        console.error("Error fetching database values:", error)
      );
  }, []);
  console.log("form par",disciplineSearch);

  return (
    <div className="bg-[#0E1B2C] pb-10">
      {/* -------------------------Header Section-------------------------- */}
      <div className="bg-white h-[72vh] rounded-b-[200px] max-md:rounded-b-[80px] relative max-md:h-[60vh]">
        <Navbar />
        <div className="flex justify-center">
          <button className="absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban">
            COURSE FINDER
          </button>
          <div className="absolute top-[13.5rem] font-dela text-[5.4rem] leading-[6.5rem] max-xl:text-[4rem] max-xl:leading-[4.8rem] max-md:text-[2rem] max-md:leading-[3rem]">
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
          <div className="flex justify-between max-md:flex-col max-md:mt-10">
            <div className="border-[1px] border-[#0E1B2C] rounded-full flex justify-center items-center w-[18%] py-2 max-xl:w-[24%] max-lg:w-[30%] max-md:w-[70%] max-lg:py-1 max-md:mb-3">
              <img src={hat} alt="hat" width={25} />
              {courses?.length > 0 && (
                <div className="font-urban font-bold justify-center">
                  {courses?.length} courses found
                </div>
              )}
            </div>

            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search for Courses"
                className="pl-12 py-3 pr-4 max-md:pr-6 border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban max-lg:py-2 max-lg:pr-0"
              />
              <div className="absolute inset-y-4 max-lg:inset-y-3 left-6">
                <img src={search} width={18} alt="search" />
              </div>
            </div>
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
        className="border-[1px] border-black rounded-[38px] shadow-right-bottom p-6 bg-[#fff] h-[400px] max-md:w-full"
        onClick={() => navigate(`/courseoverview/${course._id}`)}
      >
        {/* University Logo and Name */}
        <div className="border-[1px] py-10 border-black rounded-[30px] bg-white flex flex-col sm:flex-row sm:justify-center items-center">
          <div className="flex flex-col sm:flex-row w-full justify-evenly items-center gap-4">
            {course.university_logo && course.university_logo.data ? (
              <img
                src={`data:${course.university_logo.contentType};base64,${course.university_logo.data}`}
                alt={course.university_name}
                className="w-[80px] max-sm:w-[60px] max-md:w-[100px]"
              />
            ) : null}
            <div className="text-xl sm:text-2xl lg:text-4xl text-center">
              {course.university_name}
            </div>
          </div>
        </div>

        {/* University Name Tag and QS Rank */}
        <div className="flex justify-between mt-6 items-center gap-2 max-sm:flex-col">
          <div className="text-[#30589F] bg-[#E5F1FF] rounded-full font-urban text-[13px] px-3 py-1 text-center">
            {course.university_name}
          </div>
          <div className="font-urban font-bold max-xl:text-[12px] text-center">
            QS Rank: {course.university_ranking}
          </div>
        </div>

        {/* Course Info */}
        <div className="mt-4 font-dela text-[15px] max-sm:text-[13px] text-center">
          {course.course_level} in {course.discipline} - {course.area_of_study}
        </div>

        <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>

        {/* Deadline and Total Cost */}
        <div className="flex justify-between items-center gap-4 max-sm:flex-col">
          <div>
            <div className="text-[#898C9A] font-urban font-bold text-center max-sm:text-[14px]">
              Deadline
            </div>
            <div className="font-dela text-[15px] max-sm:text-[13px] text-center">
              {new Date(course.application_deadline).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-[#898C9A] font-urban font-bold text-center max-sm:text-[14px]">
              Total cost
            </div>
            <div className="font-dela text-[15px] max-sm:text-[13px] text-center">
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
        </div>
      </div>

      {/* -------------------------Call To Action Section-------------------------- */}
      <div className="bg-[#5BC7F1] rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1737px] mx-auto h-auto md:h-[710px] -mt-40 md:-mt-80">
        {/* Left Image */}
        <div className="flex-shrink-0 relative w-full h-[403px] md:w-[571px] md:h-[403px] mx-auto md:mx-0 rounded-[20px] overflow-hidden">
          <img
            src="/images/dummy.png" // replace with your actual image path
            alt="Support Agent"
            className="w-full h-full object-cover" // Makes the image take the full size of the container
          />
        </div>

        {/* Right Text */}
        <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#001f3f]">
            Ready to flight your dreams?
          </h2>
          <p
            className="text-[#001f3f] text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "'Roboto', sans-serif", // Apply a specific font if desired
              fontWeight: "400", // Adjust weight if needed
              lineHeight: "1.75", // Adjust line height for better spacing
              marginBottom: "1.5rem", // Add space at the bottom
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Id donec facilisis duis
            placerat gravida aliquet at. Nisi urna quam massa pellentesque
            lectus odio sagittis. Tortor massa in rhoncus purus nunc scelerisque
            nullam. Consequat rhoncus nam ac enim leo. Feugiat eget urna varius
            eu nibh in sed est.
          </p>

          <button className="bg-white text-[#001f3f] border border-[#001f3f] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#001f3f] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0">
            Book a call →
          </button>
        </div>
      </div>

      <Contactus />
      <Footer />
    </div>
  );
};

export default Coursefinder;
