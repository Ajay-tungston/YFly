
import React, { useEffect, useState } from 'react';
import profile from '../assets/images/profile.svg';
import arrow from '../assets/images/downarrowblack.svg';
import add from '../assets/images/add.svg';
import edit from '../assets/images/edit.svg';
import trash from '../assets/images/greytrash.svg';
import axios from 'axios';
import AddNewCourse from './AddNewCourse';
import EditCourse from './EditCourse'; // Import the Edit Modal
import AddMultipleCourse from './AddMultipleCourse';

const CourseList = () => {
  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [courseSortField, setCourseSortField] = useState('');
  const [courseSortOrder, setCourseSortOrder] = useState('asc');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [showCsvUpload, setShowCsvUpload] = useState(false);
  
  const coursesPerPage = 10;

  // Fetch the courses from the backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/get-all`);
     
      setCourses(response.data.courses || []); // Use fallback to avoid errors
    } catch (error) {
      console.error('Error in fetching courses:', error);
    }
  };
  useEffect(() => {
  
    fetchCourses();
  }, []);

  // Handle search
  const filteredCourses = courses.filter((course) =>
    course.course_level?.toLowerCase().includes(courseSearchQuery.toLowerCase())
  );

  // Handle sorting
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!courseSortField) return 0;
    const fieldA = a[courseSortField];
    const fieldB = b[courseSortField];
    if (courseSortOrder === 'asc') return fieldA > fieldB ? 1 : -1;
    return fieldA < fieldB ? 1 : -1;  });

  // Pagination
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/courses/delete/${id}`);
        setCourses(courses.filter((course) => course._id !== id));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (addingNewCourse) {
    return <AddNewCourse setAddingNewCourse={setAddingNewCourse} />;
  }

  return (
    <div className="px-10 py-10 h-[100vh]">
       {showCsvUpload && (
        <AddMultipleCourse setShowCsvUpload={setShowCsvUpload} fetchCourses={fetchCourses} />
      )}
      <div className="flex justify-between">
        <input
          placeholder="Search"
          className="bg-[#F2F4F7] py-3 w-[30%] pl-5 border-none placeholder:font-urban text-[1rem] rounded-[4px] outline-none"
          value={courseSearchQuery}
          onChange={(e) => setCourseSearchQuery(e.target.value)}
        />
        <div className="flex items-center">
          <div className="font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]">Hi, User</div>
          <img src={profile} alt="profile" width={35} />
        </div>
      </div>
      <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>

      {/* Course section */}
      <div>
        <div className="flex justify-between mb-5">
          <div className="font-urban font-bold text-[1.3rem]">Courses</div>
          <div className='flex gap-5'>
          <button
            onClick={() => setAddingNewCourse(true)}
            className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] px-4 rounded-[9px]"
          >
            <img src={add} alt="add" width={15} className="mr-1" />
            Add course
          </button>
          <button
              onClick={() => setShowCsvUpload(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] py-2 px-4 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Upload Excel
            </button>
            </div>
        </div>

        <div className="flex text-[0.9rem] font-urban">
          <div>Sort by:</div>
          <button
            className="flex items-center ml-2 font-semibold"
            onClick={() => {
              setCourseSortField('course_level');
              setCourseSortOrder(courseSortOrder === 'asc' ? 'desc' : 'asc');
            }}
          >
            Course
            <img src={arrow} alt="arrow" width={15} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-[0.9rem]">
        {/* Header of list */}
        <div>
          <div className="font-urban flex bg-[#F9F9F9] py-3 px-3 text-[#30589F]">
            <div className="w-[10%] flex items-center">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCourses(paginatedCourses.map((course) => course._id));
                  } else {
                    setSelectedCourses([]);
                  }
                }}
              />
            </div>
            <div className="w-[30%]">Course</div>
            <div className="w-[30%]">University</div>
            <div className="w-[30%]">Country</div>
            <div className="w-[10%]">Action</div>
          </div>
          <div className="border-[#BFBFBF] border-b-[1px]"></div>
        </div>

        {/* List */}
        {paginatedCourses.map((list) => (
          <div key={list._id}>
            <div className="font-urban flex py-3 px-3">
              <div className="w-[10%] flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(list._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCourses([...selectedCourses, list._id]);
                    } else {
                      setSelectedCourses(selectedCourses.filter((id) => id !== list._id));
                    }
                  }}
                />
              </div>
              <div className="w-[30%]">{list.course_level}</div>
              <div className="w-[30%]">{list?.university_name?.university_name}</div>
              <div className="w-[30%]">{list.country}</div>
              <div className="w-[10%] flex">
                <button className="mr-4" onClick={() => handleDelete(list._id)}>
                  <img src={trash} width={20} alt="trash" />
                </button>
                <EditCourse id={list._id} />
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] bg-black"></div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5 font-urban">
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded border-[#535353] ${currentPage === 1 ? 'bg-white cursor-not-allowed text-[#524f4f]' : 'bg-[#30589F] text-white'}`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 border-[#30589F] rounded ${currentPage === totalPages ? 'bg-white cursor-not-allowed text-[#30589F]' : 'bg-[#30589F] text-white'}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
  