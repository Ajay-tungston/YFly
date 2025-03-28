import React from "react";
import Navbar from "../components/Navbar";
import landing from "../assets/images/landing.png";
import grid from "../assets/images/image/grid.svg";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import universityIcon from "../assets/images/university.svg";
import Footer from "../components/Footer";
import IconTuition from "../assets/images/dollar-circle.png";
const CourseOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch current course and all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch the specific course by ID
        const courseRes = await axios.get(
          `http://localhost:5000/courses/get/${id}`
        );
        const allCoursesRes = await axios.get(
          `http://localhost:5000/courses/get-all`
        );

        if (courseRes.data.success) {
          setCourse(courseRes.data.course);
        }
        if (allCoursesRes.data.success) {
          setAllCourses(allCoursesRes.data.courses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  // Filter similar courses
  const getSimilarCourses = () => {
    if (!course || allCourses.length === 0) return [];

    return allCourses
      .filter(
        (c) => c.category === course.course_title && c._id !== course._id // Same category, but not the current course
      )
      .slice(0, 3); // Limit to 5 courses
  };

  // Navigate to another course
  const handleCourseClick = (courseId) => {
    navigate(`/courseoverview/${courseId}`);
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Course not found.</p>
      </div>
    );
  }
  const getRecruiterLogo = (recruiter) => {
    if (
      recruiter.recruiters_logo &&
      recruiter.recruiters_logo.data &&
      recruiter.recruiters_logo.contentType
    ) {
      // Ensure that the stored data is a base64 encoded string.
      // If your backend sends raw Buffer data, convert it on the backend using .toString('base64')
      return `data:${recruiter.recruiters_logo.contentType};base64,${recruiter.recruiters_logo.data}`;
    }
    console.log(recruiter)
    return "https://via.placeholder.com/80"; // Fallback image URL
  };
  const similarCourses = getSimilarCourses();
  return (
    <div className="bg-[#0E1B2C] pb-10">
      <div
        className="h-[82vh] max-xl:h-[70vh] max-md:h-[50vh] rounded-b-[200px] max-lg:rounded-b-[120px] max-md:rounded-b-[80px] relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${landing})`,
        }}
      >
        {" "}
        <div className="flex flex-col items-center justify-center h-full text-white">
          {/* University name */}
          <h1 className="font-dela text-5xl max-md:text-3xl text-center mb-3 drop-shadow-md">
            {course.university_name}
          </h1>

          {/* Course title */}
          <p className="font-urban text-xl max-md:text-lg font-semibold drop-shadow-md">
            {course.course_title}
          </p>

          {/* Ranking & Country */}
          <div className="mt-4 flex flex-col items-center space-y-2 max-md:text-sm drop-shadow-md">
            <span>
              <strong>Ranking:</strong> #{course.university_ranking}
            </span>
            <span>
              <strong>Country:</strong> {course.country}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <Navbar />
        </div>
      </div>

      <div className=" bg-white bg-cover bg-center rounded-[200px] max-lg:rounded-[120px] max-md:rounded-[80px] pt-24 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5">
        {/* Course Details Title */}
        <div className="relative text-[#1e40af] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px] mb-8">
          Course Details
        </div>

        {/* Course Level */}

        <img
          src={universityIcon}
          alt="University Icon"
          width={45}
          className="mr-3 w-8"
        />
        <div>
          <div className="text-gray-500 text-sm font-bold font-urban">
            Course Level
          </div>

          <div>
            <div className="w-full relative bg-white rounded-[200px] overflow-hidden p-6 sm:p-12">
              {/* Background Section */}
              <div className="w-full h-[2551px] bg-gray-100 absolute inset-0 rounded-[200px]"></div>

              {/* Course Name and Duration */}
              <div className="relative flex flex-col sm:flex-row justify-start gap-16 items-start sm:items-center gap-4 text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist'] mb-12">
                <div> {course.course_title}</div>
                <div className="text-slate-900     ">
                  <label>Course Duration: </label>
                  {course.course_duration}
                </div>
              </div>

              {/* Intakes and Deadline Section */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Intakes Box */}
                <div className="flex flex-col sm:flex-row items-center bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-6 gap-4">
                  <div className="p-3 bg-blue-800 rounded-lg flex items-center">
                    {/* Placeholder for icon or graphic */}
                  </div>
                  <div>
                    <div className="text-zinc-400 text-lg font-bold font-['Urbanist'] mb-2">
                      Intakes
                    </div>
                    <div className="text-[#1e40af] text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-6 sm:leading-9">
                      {course.intakes.map((intake) => (
                        <div key={intake._id}>
                          {intake.month} {intake.year}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deadline Box */}
                <div className="flex flex-col sm:flex-row items-center bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-6 gap-4">
                  <div className="p-3 bg-blue-800 rounded-lg flex items-center">
                    {/* Placeholder for icon or graphic */}
                  </div>
                  <div>
                    <div className="text-zinc-400 text-lg font-bold font-['Urbanist'] mb-2">
                      Deadline
                    </div>
                    <div className="text-[#1e40af] text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-6 sm:leading-9">
                      {new Date(
                        course.application_deadline
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-6">
              {/* Title Section */}
              <div className="text-[#2563eb] text-2xl  sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
                Overview
              </div>

              {/* Content Section */}
              <div className="w-full max-w-5xl mx-auto ml-0 bg-white rounded-xl p-4 sm:p-8 text-black text-base sm:text-lg md:text-2xl font-normal font-['Urbanist'] leading-6 sm:leading-8 text-left">
                {course.overview}
              </div>
            </div>

            <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
              Eligibility Requirements
            </div>
            <br></br>
            {/* Cards Section */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center">
              {/* Requirements Card */}
              <div className="w-full max-w-md p-6 sm:p-12 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-col gap-6">
                {/* Header */}
                <div className="pb-6 border-b border-zinc-400">
                  <div className="text-[#1e40af] text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
                    Requirements
                  </div>
                </div>
                {/* Content */}
                {course.eligibilityRequirements.map((req, index) => (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
                      {req.requirementType}
                    </div>
                    <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
                      {req.gpaRange ||
                        req.backlogRange ||
                        req.workExperience ||
                        "N/A"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Test Requirements Card */}
              <div className="w-full max-w-md p-6 sm:p-12 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-col gap-6">
                {/* Header */}
                <div className="pb-6 border-b border-zinc-400">
                  <div className="text-[#1e40af] text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
                    Test Requirements
                  </div>
                </div>
                {/* Content */}
                {course.testRequirements.map((test, index) => (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
                      {test.testRequirementName}
                    </div>
                    <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
                      {test.overallScore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <br></br>
            <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
              Application Requirements
            </div>
            <br></br>
            {/* Card Section */}
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 p-6 sm:p-12 flex flex-col gap-6">
              {/* Header */}
              <div className="w-full flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="text-[#1e40af] text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
                    Requirements
                  </div>
                </div>
                <div className="border-t border-zinc-400"></div>
              </div>

              {/* Requirement Items */}
              {course.application_requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']"
                >
                  <div className="text-slate-900">
                    {requirement.requirement}
                  </div>
                  <div className="text-slate-900">
                    {requirement.isRequired ? "Required" : "Optional"}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-4">
              {/* Section Title */}
              <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
                Career Outcomes
              </div>
              <div className="text-[#1e40af] text-base sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-6 sm:leading-10">
                Job Roles Guaranteed
              </div>

              {/* Job Roles Display */}
              <div className="p-8 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-wrap justify-start gap-6">
                {course.job_roles.length > 0 ? (
                  course.job_roles.map((role, index) => (
                    <div
                      key={index}
                      className="px-8 py-3.5 bg-white rounded-[48px] outline outline-1 outline-slate-900 flex justify-center items-center gap-3"
                    >
                      <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-normal font-['Urbanist'] leading-loose">
                        {role}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-normal font-['Urbanist'] leading-loose">
                    No job roles available.
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 p-8 flex flex-col gap-8">
          <div className="flex flex-wrap justify-start gap-6">
            {course.top_recruiters && course.top_recruiters.length > 0 ? (
              course.top_recruiters.map((recruiter, index) => (
                <div
                  key={recruiter._id || index}
                  className="px-8 py-6 bg-white rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-col justify-center items-center gap-4"
                >
                  <img
                    src={getRecruiterLogo(recruiter)}
                    alt={recruiter.recruiters_logo || "Recruiter Logo"}
                    className="w-20 h-20 object-contain rounded-full border border-gray-300"
                  />
                  <div className="text-slate-900 text-2xl font-normal font-['Urbanist'] leading-loose">
                    {recruiter.recruiters_name || "Unknown Recruiter"}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-900 text-lg">
                No recruiters available.
              </div>
            )}
          </div>
        </div>

            <div className="justify-start text-[#2563eb] text-4xl sm:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight sm:leading-[62.40px] mt-12">
              Fees & Scholarships
            </div>
            <br></br>

            <div className="px-8 py-6 bg-white rounded-3xl outline outline-1 outline-slate-900 inline-flex justify-center items-center gap-3">
              <div className="flex justify-center items-center gap-6">
                {/* Icon Section */}
                <div className="p-1.5 bg-[#2563eb] rounded-lg flex justify-center items-center">
                  <img
                    src={IconTuition}
                    alt="Tuition Fee Icon"
                    className="w-12 h-12"
                  />
                </div>
                {/* Tuition Fee Details */}
                <div className="inline-flex flex-col justify-center items-start">
                  <div className="justify-center text-zinc-400 text-xl font-bold font-['Urbanist'] leading-loose">
                    Tuition fees
                  </div>
                  <div className="justify-center text-blue-800 text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                    {course.tution_fee ? `$${course.tution_fee}` : "N/A"}
                    {/* Dynamically renders tuition_fee */}
                  </div>
                </div>
              </div>
            </div>

            <br></br>
            <div className="px-4 sm:px-8">
              {/* Funding Options Section */}
              <div className="text-[#1e40af] text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 sm:leading-10 mt-12">
                Funding Options
              </div>

              {/* Funding Options Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Scholarships */}
                <div className="px-8 py-6 bg-white rounded-3xl outline outline-1 outline-slate-900 flex justify-center items-center gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="inline-flex flex-col justify-start items-start">
                      <div className="justify-center text-[#1e40af] text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                        {course.scholarship_applicable}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Funding */}
                <div className="px-8 py-6 bg-white rounded-3xl outline outline-1 outline-slate-900 flex justify-center items-center gap-3">
                  <div className="text-[#1e40af] text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                    Funding Options
                  </div>
                </div>
              </div>

              {/* Information Section */}
              <div className="mt-6 text-black text-2xl font-normal font-['Urbanist'] leading-9">
                To apply, submit a complete application for admission within a
                few weeks of the priority deadline for best results.
              </div>

              {/* Scholarships Section */}
              <div className="text-[#2563eb] text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 sm:leading-10 mt-12">
                Scholarships
              </div>

              {/* Scholarship Details */}
              <div className="mt-6 bg-white p-6 rounded-3xl shadow-md">
                <div className="text-black text-2xl font-normal font-['Urbanist'] leading-9">
                  {course.university_name} offers a variety of scholarships to
                  help pages
                </div>
              </div>

              {/* View Scholarships Button */}
              <div className="mt-6 flex justify-center">
                <button className="px-6 py-3 bg-white rounded-[48px] outline outline-2 outline-blue-800 text-blue-800 text-xl font-normal font-['Urbanist'] leading-loose">
                  View Scholarships
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-8">
              {/* FAQs Section */}
              <div className="justify-start text-[#2563eb] text-4xl sm:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight sm:leading-[62.40px] mt-12">
                FAQs
              </div>
              <div className="w-full mt-8 grid gap-6">
                {/* FAQ Items */}
                {[
                  "Can you work while studying in USA?",
                  "What are the English language proficiency in USA?",
                  "What are other standardized tests in USA?",
                  "What are the popular courses in USA?",
                  "Are there any scholarships available in USA?",
                ].map((faq, index) => (
                  <div
                    key={index}
                    className={`h-32 px-6 py-8 rounded-3xl outline outline-1 outline-slate-900 flex items-center gap-2.5 overflow-hidden ${
                      index === 0
                        ? "bg-black text-white"
                        : "bg-white text-slate-900"
                    }`}
                  >
                    <div className="flex-1 text-justify text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                      {faq}
                    </div>
                    <div className="w-10 h-10 relative flex justify-center items-center">
                      <div className="w-5 h-2.5 outline outline-[3.17px] outline-sky-700" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Similar Courses Section */}
              <div className="justify-start text-blue-600 text-4xl sm:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight sm:leading-[62.40px] mt-12">
                Similar Courses
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {similarCourses.map((similarCourse) => (
                <div
                key={similarCourse._id}
                className="border-[1px] border-black rounded-[38px] shadow-right-bottom p-6 bg-white h-[400px] max-md:w-full cursor-pointer"
                onClick={() => handleCourseClick(similarCourse._id)}
              >
                {/* University Logo and Name */}
                <div className="border-[1px] py-10 border-black rounded-[30px] bg-white flex flex-col sm:flex-row sm:justify-center items-center">
                  <div className="flex flex-col sm:flex-row w-full justify-evenly items-center gap-4">
                    {similarCourse.university_logo && similarCourse.university_logo.data ? (
                      <img
                        src={`data:${similarCourse.university_logo.contentType};base64,${similarCourse.university_logo.data}`}
                        alt={similarCourse.university_name}
                        className="w-[80px] max-sm:w-[60px] max-md:w-[100px]"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/80x80"
                        alt="Placeholder"
                        className="w-[80px] max-sm:w-[60px] max-md:w-[100px]"
                      />
                    )}
                    <div className="text-xl sm:text-2xl lg:text-4xl text-center">
                      {similarCourse.university_name || "Unknown University"}
                    </div>
                  </div>
                </div>
              
                {/* University Name Tag and QS Rank */}
                <div className="flex justify-between mt-6 items-center gap-2 max-sm:flex-col">
                  <div className="text-[#30589F] bg-[#E5F1FF] rounded-full font-urban text-[13px] px-3 py-1 text-center">
                    {similarCourse.university_name || "Unknown University"}
                  </div>
                  <div className="font-urban font-bold max-xl:text-[12px] text-center">
                    QS Rank:{" "}
                    {similarCourse.university_ranking
                      ? `#${similarCourse.university_ranking}`
                      : "N/A"}
                  </div>
                </div>
              
                {/* Course Info */}
                <div className="mt-4 font-dela text-[15px] max-sm:text-[13px] text-center">
                  {similarCourse.course_level} in {similarCourse.discipline} -{" "}
                  {similarCourse.area_of_study}
                </div>
              
                <div className="border-t-[0.5px] border-[#bfc0c5] my-4"></div>
              
                {/* Deadline and Total Cost */}
                <div className="flex justify-between items-center gap-4 max-sm:flex-col">
                  <div>
                    <div className="text-[#898C9A] font-urban font-bold text-center max-sm:text-[14px]">
                      Deadline
                    </div>
                    <div className="font-dela text-[15px] max-sm:text-[13px] text-center">
                      {new Date(similarCourse.application_deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#898C9A] font-urban font-bold text-center max-sm:text-[14px]">
                      Total cost
                    </div>
                    <div className="font-dela text-[15px] max-sm:text-[13px] text-center">
                      ${similarCourse.tution_fee || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image and Call to Action */}
      <section></section>

      <Footer />
    </div>
  );
};

export default CourseOverview;
