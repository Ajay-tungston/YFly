import React, { useState } from "react";

const CourseDetails = ({ course, universityIcon }) => {
  // State to manage the sidebar content
  const [sidebarContent, setSidebarContent] = useState("Welcome to the Course Details");

  // Function to handle click events and update the sidebar
  const handleSectionClick = (content) => {
    setSidebarContent(content);
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="relative text-[#1e40af] text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px] mb-8">
        Course Details
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 fixed left-0 top-0 h-screen bg-gray-200 p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4">Sidebar</h2>
          <div>{sidebarContent}</div>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 ml-auto pl-8">
          {/* Course Level Section */}
          <div
            className="mb-4 cursor-pointer"
            onClick={() => handleSectionClick("Course Level: Beginner/Intermediate/Advanced")}
          >
            <div className="flex items-center">
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
              </div>
            </div>
          </div>

          {/* Course Details Section */}
          <div
            className="relative bg-white rounded-[200px] overflow-hidden p-6 sm:p-12 cursor-pointer"
            onClick={() =>
              handleSectionClick(
                `Course Name: ${course.course_title}, Duration: ${course.course_duration}`
              )
            }
          >
            {/* Background Section */}
            <div className="w-full h-[2551px] bg-gray-100 absolute inset-0 rounded-[200px]"></div>

            {/* Course Name and Duration */}
            <div className="relative flex flex-col sm:flex-row justify-start gap-16 items-start sm:items-center text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist'] mb-12">
              <div>{course.course_title}</div>
              <div className="text-slate-900">
                <label>Course Duration: </label>
                {course.course_duration}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div
            className="mt-8 cursor-pointer"
            onClick={() => handleSectionClick("Additional Information about this course")}
          >
            <div className="text-lg font-bold text-[#1e40af]">
              Additional Information
            </div>
            <p className="text-gray-600">
              Click here to see additional details about the course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
