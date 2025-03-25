import React from "react";

const courses = [
  { name: "Business Analytics", image: "/images/course1.png" },
  { name: "MBA & MIM", image: "/images/course2.png" },
  { name: "Architecture and Construction Mgmt.", image: "/images/course3.png" },
  { name: "Fashion & Interior Design", image: "/images/course4.png" },
  { name: "Data Science", image: "/images/course5.png" },
  { name: "MBBS", image: "/images/course6.png" },
  { name: "Finance, International Business & Accounting", image: "/images/course7.png" },
  { name: "Computer Science", image: "/images/course8.png" },
];

const CourseCard = ({ course }) => (
  <div className="border-2 border-gray-300 rounded-xl shadow-md p-4 flex items-center space-x-4 w-64 h-24 bg-white">
    <img src={course.image} alt={course.name} className="w-12 h-12" />
    <h3 className="font-semibold text-sm text-gray-800">{course.name}</h3>
  </div>
);

const CoursesGrid = () => {
  return (
    <div className="p-6">
      {/* Desktop Grid (4 columns) */}
      <div className="hidden lg:grid grid-cols-4 gap-10 w-full max-w-5xl mx-auto">
        {/* Loop through the courses */}
        {courses.map((course, index) => (
          <div
            key={index}
            className={`${
              index < 4 ? "-ml-24" : "" // Apply negative margin-left to the first 4 cards on desktop
            }`}
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* Mobile (Small Screens) - Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto flex p-4">
        {/* Add a margin-left to the first 4 cards */}
        {courses.slice(0, 4).map((course, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ml-8"
            style={{ width: "250px", height: "100px" }}
          >
            <div>{course.image}</div>
            <p className="font-semibold text-gray-800">{course.name}</p>
          </div>
        ))}

        {/* Render the rest of the cards without margin */}
        {courses.slice(4).map((course, index) => (
          <div
            key={index + 4} // Unique key
            className="flex-shrink-0 flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            style={{ width: "250px", height: "100px" }}
          >
            <div>{course.image}</div>
            <p className="font-semibold text-gray-800">{course.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
