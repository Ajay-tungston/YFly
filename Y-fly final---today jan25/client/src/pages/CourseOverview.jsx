import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import landing from "../assets/images/landing.png";
import grid from "../assets/images/image/grid.svg";
import universityIcon from "../assets/images/university.svg";
import IconTuition from "../assets/images/dollar-circle.png";
import coin from "../assets/images/coin.svg";
import { Buffer } from "buffer";
import { FaChevronDown } from "react-icons/fa"; // Import dropdown icon

const CourseOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/get/${id}`
        );
        const allCoursesRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/getall`
        );

        if (courseRes.data.success) {
          setCourse(courseRes.data.course);
        }
        // Update based on your response structure:
        if (allCoursesRes.data.data) {
          setAllCourses(allCoursesRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [id]);

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Can you work while studying in the USA?",
      answer: "Yes, international students can work up to 20 hours per week on campus during academic sessions.",
    },
    {
      question: "What are the English language proficiency tests in the USA?",
      answer: "Common tests include TOEFL, IELTS, and Duolingo English Test.",
    },
    {
      question: "What are other standardized tests in the USA?",
      answer: "Some common tests include SAT, ACT, GRE, GMAT, and LSAT depending on the program.",
    },
    {
      question: "What are the popular courses in the USA?",
      answer: "Popular fields include Engineering, Computer Science, Business, and Medicine.",
    },
    {
      question: "Are there any scholarships available in the USA?",
      answer: "Yes! Many universities and organizations offer merit-based and need-based scholarships.",
    },
  ];

  // Get similar courses based on discipline, excluding the current course
  const getSimilarCourses = () => {
    if (!course || !allCourses || allCourses.length === 0) return [];
    const normalizedDiscipline = course.discipline.trim().toLowerCase();
    const similar = allCourses
      .filter(
        (c) =>
          c._id !== course._id &&
          c.discipline &&
          c.discipline.trim().toLowerCase() === normalizedDiscipline
      )
      .slice(0, 3);

    return similar;
  };

  const similarCourses = getSimilarCourses();

  // Navigate to another course
  const handleCourseClick = (courseId) => {
    navigate(`/courseoverview/${courseId}`);
  };

  // Get recruiter logo (unchanged)
  const getRecruiterLogo = (recruiter) => {
    if (recruiter?.recruiters_logo?.data) {
      const bufferData =
        recruiter.recruiters_logo.data.data ||
        recruiter.recruiters_logo.data;
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(bufferData))
      );
      return `data:${recruiter.recruiters_logo.contentType};base64,${base64String}`;
    }
    return "/default-logo.png"; // fallback image if no logo is provided
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

  return (
    <div className="bg-[#0E1B2C] pb-10">
      <div
        className="h-[82vh] max-xl:h-[70vh] max-md:h-[50vh] rounded-b-[200px] max-lg:rounded-b-[120px] max-md:rounded-b-[80px] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${landing})` }}
      >
        <div className="flex flex-col items-center justify-center h-full text-white">
          {/* University name */}
          <h1 className="font-dela text-5xl max-md:text-3xl text-center mb-3 drop-shadow-md">
            {course.university_name?.university_name}
          </h1>

          {/* Course title */}
          <p className="font-urban text-xl max-md:text-lg font-semibold drop-shadow-md">
            {course.course_title}
          </p>

          {/* Ranking & Country */}
          <div className="mt-4 flex flex-col items-center space-y-2 max-md:text-sm drop-shadow-md">
            <span>
              <strong>Ranking:</strong> #
              {course.university_name?.university_ranking}
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

      <div className="bg-[#fff] bg-cover bg-center  rounded-[80px] md:rounded-[120px] h-[4700px] md:h-[4000px] lg:rounded-[200px] min-h-screen pt-16 pb-24 mt-10 px-4 sm:px-8 md:px-16 lg:px-24">
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
    <div className="w-full relative bg-white rounded-[80px] md:rounded-[120px] lg:rounded-[200px] overflow-hidden p-4 sm:p-6 md:p-12">
      {/* Background Section */}
      <div className="absolute inset-0 bg-gray-100 rounded-[inherit]"></div>

      {/* Course Name and Duration */}
      <div className="relative flex flex-col sm:flex-row justify-start gap-8 items-start sm:items-center text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist'] mb-8">
        <div>{course.course_title}</div>
        <div className="text-slate-900">
          <label>Course Duration: </label>
          {course.course_duration}
        </div>
      </div>

      {/* Intakes and Deadline Section */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intakes Box */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-4 sm:p-6 gap-4">
          <div className="p-3 bg-blue-800 rounded-lg flex items-center">
            {/* Icon placeholder */}
          </div>
          <div>
            <div className="text-zinc-400 text-lg sm:text-2xl font-bold font-['Urbanist'] mb-2">
              Intakes
            </div>
            <div className="text-[#1e40af] text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-6 sm:leading-9">
              {course.intakes.map((intake, index) => (
                <div key={index}>
                  {intake.month} {intake.year}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deadline Box */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-4 sm:p-6 gap-4">
          <div className="p-3 bg-blue-800 rounded-lg flex items-center">
            {/* Icon placeholder */}
          </div>
          <div>
            <div className="text-zinc-400 text-lg sm:text-2xl font-bold font-['Urbanist'] mb-2">
              Deadline
            </div>
            <div className="text-[#1e40af] text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-6 sm:leading-9">
              {new Date(course.application_deadline).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-6">
      {/* Overview Section */}
      <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
        Overview
      </div>
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl p-4 sm:p-8 text-black text-base sm:text-lg md:text-2xl font-normal font-['Urbanist'] leading-6 sm:leading-8 text-left">
        {course.overview}
      </div>
    </div>

    {/* Eligibility Requirements */}
    <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px] mt-8">
      Eligibility Requirements
    </div>
    <br />
    <div className="flex flex-col lg:flex-row gap-8 justify-center">
      {/* Requirements Card */}
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 flex flex-col gap-6">
        <div className="pb-6 border-b border-zinc-400">
          <div className="text-[#1e40af] text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
            Requirements
          </div>
        </div>
        {course.eligibilityRequirements.map((req, index) => (
          <div className="flex justify-between items-center" key={index}>
            <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
              {req.requirementType}
            </div>
            <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
              {req.gpaRange || req.backlogRange || req.workExperience || "N/A"}
            </div>
          </div>
        ))}
      </div>

      {/* Test Requirements Card */}
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 flex flex-col gap-6">
        <div className="pb-6 border-b border-zinc-400">
          <div className="text-[#1e40af] text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
            Test Requirements
          </div>
        </div>
        {course.testRequirements.map((test, index) => (
          <div className="flex justify-between items-center" key={index}>
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
    <br />

    {/* Application Requirements */}
    <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px] mt-8">
      Application Requirements
    </div>
    <br />
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-4 sm:p-6 md:p-12 flex flex-col gap-6">
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-[#1e40af] text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
            Requirements
          </div>
        </div>
        <div className="border-t border-zinc-400"></div>
      </div>
      {course.application_requirements.map((requirement, index) => (
        <div key={index} className="flex justify-between items-center w-full text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          <div className="text-slate-900">{requirement.requirement}</div>
          <div className="text-slate-900">{requirement.isRequired ? "Required" : "Optional"}</div>
        </div>
      ))}
    </div>

    {/* Career Outcomes */}
    <div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-4">
      <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
        Career Outcomes
      </div>
      <div className="text-[#1e40af] text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-6">
        Job Roles Guaranteed
      </div>
      <div className="p-4 sm:p-6 md:p-8 bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 flex flex-wrap justify-start gap-4">
        {course.job_roles.length > 0 ? (
          course.job_roles.map((role, index) => (
            <div key={index} className="px-4 py-2 bg-white rounded-[48px] outline outline-1 outline-slate-900 flex justify-center items-center gap-2">
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

    {/* Top Recruiters */}
    <div className="mt-8 bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-4 sm:p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-wrap justify-start gap-4">
        {course.top_recruiters && course.top_recruiters.length > 0 ? (
          course.top_recruiters.map((recruiter, index) => (
            <div key={recruiter._id || index} className="px-4 py-4 bg-white rounded-3xl shadow-md outline outline-1 outline-slate-900 flex flex-col justify-center items-center gap-4">
              <img
                src={getRecruiterLogo(recruiter)}
                alt={recruiter.recruiters_logo || "Recruiter Logo"}
                className="w-16 h-16 object-contain rounded-full border border-gray-300"
              />
              <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-normal font-['Urbanist'] leading-loose">
                {recruiter.recruiters_name || "Unknown Recruiter"}
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-900 text-lg sm:text-xl md:text-2xl">
            No recruiters available.
          </div>
        )}
      </div>
    </div>

    {/* Fees & Scholarships */}
    <div className="justify-start text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight mt-8">
      Fees & Scholarships
    </div>
    <br />
    <div className="px-4 sm:px-6 md:px-8 bg-white rounded-3xl outline outline-1 outline-slate-900 inline-flex justify-center items-center gap-3 py-4">
      <div className="flex justify-center items-center gap-4">
        {/* Icon Section */}
        <div className="p-2 bg-[#2563eb] rounded-lg flex justify-center items-center">
          <img src={IconTuition} alt="Tuition Fee Icon" className="w-10 h-10" />
        </div>
        {/* Tuition Fee Details */}
        <div className="inline-flex flex-col justify-center items-start">
          <div className="text-zinc-400 text-lg sm:text-xl font-bold font-['Urbanist'] leading-loose">
            Tuition fees
          </div>
          <div className="text-blue-800 text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
            {course.tution_fee ? `$${course.tution_fee}` : "N/A"}
          </div>
        </div>
      </div>
    </div>
    <br />
    <div className="px-4 sm:px-6">
      {/* Funding Options Section */}
      <div className="text-[#1e40af] text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 mt-8">
        Funding Options
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Scholarships */}
        <div className="px-4 py-4 bg-white rounded-3xl outline outline-1 outline-slate-900 flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="inline-flex flex-col justify-start items-start">
              <div className="text-[#1e40af] text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                {course.scholarship_applicable}
              </div>
            </div>
          </div>
        </div>
        {/* Department Funding */}
        <div className="px-4 py-4 bg-white rounded-3xl outline outline-1 outline-slate-900 flex justify-center items-center gap-3">
          <div className="text-[#1e40af] text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
            Funding Options
          </div>
        </div>
      </div>
      {/* Information Section */}
      <div className="mt-6 text-black text-lg sm:text-2xl font-normal font-['Urbanist'] leading-9">
        To apply, submit a complete application for admission within a few weeks of the priority deadline for best results.
      </div>
      {/* Scholarships Section */}
      <div className="text-[#2563eb] text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 mt-8">
        Scholarships
      </div>
      {/* Scholarship Details */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded-3xl shadow-md">
        <div className="text-black text-lg sm:text-2xl font-normal font-['Urbanist'] leading-9">
          {course.university_name?.university_name} offers a variety of scholarships to help pages
        </div>
      </div>
      {/* View Scholarships Button */}
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-3 bg-white rounded-[48px] outline outline-2 outline-blue-800 text-blue-800 text-lg sm:text-xl font-normal font-['Urbanist'] leading-loose">
          View Scholarships
        </button>
      </div>
    </div>

    <div className="px-4 sm:px-6">
      {/* FAQs Section Title */}
      <div className="text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight mt-8">
        FAQs
      </div>

      {/* FAQ List */}
      <div className="w-full mt-8 grid gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`px-6 py-4 rounded-3xl border border-slate-900 cursor-pointer transition-all duration-300 ${
              openIndex === index ? "bg-[#2a69df] text-white" : "bg-white text-slate-900"
            }`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {/* Question & Dropdown Icon */}
            <div className="flex justify-between items-center">
              <h3 className="flex-1 text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                {faq.question}
              </h3>
              <FaChevronDown
                className={`w-6 h-6 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Answer (Collapsible) */}
            <div
              className={`mt-3 text-sm sm:text-base overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      {/* Similar Courses Section */}
      <div className="justify-start text-[#2563eb] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight mt-8">
        Similar Courses
      </div>
    {/* Similar Courses Section */}
<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center w-full">
  {similarCourses.map((similarCourse) => (
    <div
      key={similarCourse._id}
      className="border border-black rounded-[38px] w-full max-w-[500px] md:h-full  h-auto shadow-md p-4 bg-[#fff] cursor-pointer"
      onClick={() => handleCourseClick(similarCourse._id)}
    >
      {/* University Logo and Name */}
      <div className="border py-6 border-black rounded-[30px] bg-white flex flex-col sm:flex-row sm:justify-center items-center">
        <div className="flex flex-col sm:flex-row w-full justify-evenly items-center gap-4">
          {similarCourse.university_name?.university_logo?.data ? (
            (() => {
              const { contentType, data } = similarCourse.university_name.university_logo;
              const logoData = data.data || data;
              const base64String = Buffer.from(logoData).toString("base64");
              const logoSrc = `data:${contentType};base64,${base64String}`;
              return (
                <img
                  src={logoSrc}
                  alt={similarCourse.university_name?.university_name || "Unknown University"}
                  className="w-16 sm:w-20 md:w-24 rounded"
                />
              );
            })()
          ) : (
            <img src="https://placehold.co/80x80" alt="Placeholder" className="w-16 sm:w-20 md:w-24 rounded" />
          )}

          <div className="text-base sm:text-xl md:text-2xl text-center">
            {similarCourse.university_name?.university_name || "Unknown University"}
          </div>
        </div>
      </div>

      {/* University Name Tag and QS Rank */}
      <div className="flex justify-between mt-4 items-center gap-2 flex-wrap">
        <div className="text-[#30589F] bg-[#E5F1FF] rounded-full font-urban text-sm px-3 py-1 text-center">
          {similarCourse.university_name?.university_name || "Unknown University"}
        </div>
        <div className="font-urban font-bold text-center text-sm">
          QS Rank:{" "}
          {similarCourse.university_name?.university_ranking
            ? `#${similarCourse.university_name.university_ranking}`
            : "N/A"}
        </div>
      </div>

      {/* Course Info */}
      <div className="mt-4 font-dela text-sm sm:text-base text-center">
        {similarCourse.course_level} in {similarCourse.discipline} - {similarCourse.area_of_study}
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      {/* Deadline and Total Cost */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <div className="text-gray-500 font-urban font-bold text-center text-sm">
            Deadline
          </div>
          <div className="font-dela text-sm sm:text-base text-center">
            {new Date(similarCourse.application_deadline).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-gray-500 font-urban font-bold text-center text-sm">
            Total cost
          </div>
          <div className="font-dela text-sm sm:text-base text-center">
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

      {/* Image and Call to Action */}
      
      <section>
      <div className="bg-[#5BC7F1] rounded-[50px] md:rounded-[500px] mt-48 flex flex-col md:flex-row items-center p-6 md:p-16 gap-6 md:gap-8 w-full max-w-[1737px] mx-auto h-auto md:h-[710px]  md:-mt-80">
  {/* Left Image */}
  <div className="flex-shrink-0 relative w-full max-w-[400px] md:max-w-[571px] h-[300px] md:h-[403px] mx-auto md:mx-0 rounded-[20px] overflow-hidden">
    <img
      src="/images/dummy.png"
      alt="Support Agent"
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  {/* Right Text */}
  <div className="flex flex-col space-y-4 max-w-xl w-full text-center md:text-left px-4 md:px-0">
    <h2 className="text-xl md:text-3xl font-bold text-[#001f3f]">
      Ready to take flight towards your dreams?
    </h2>
    <p
      className="text-[#001f3f] text-base leading-relaxed"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "400",
        lineHeight: "1.75",
      }}
    >
      Lorem ipsum dolor sit amet consectetur. Id donec facilisis duis
      placerat gravida aliquet at. Nisi urna quam massa pellentesque
      lectus odio sagittis. 
    </p>

    <button className="bg-white text-[#001f3f] border border-[#001f3f] px-6 py-3 rounded-full text-base hover:bg-[#001f3f] hover:text-white transition-all duration-300 shadow-lg w-auto mx-auto md:mx-0">
      Book a call →
    </button>
  </div>
</div>

      </section>
      <Footer />
    </div>
  );
};

export default CourseOverview;
