import React, { useEffect, useState } from "react";
import profile from "../assets/images/profile.svg";
import add from "../assets/images/add.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/greytrash.svg";
import axios from "axios";
import AddNewUniversity from "./AddNewUniversity";
import EditUniversity from "./EditUniversity";


const UniversityList = () => {
  const [addingNewUniversity, setAddingNewUniversity] = useState(false);
  const [university, setUniversity] = useState([]);
  // const [courseSearchQuery, setCourseSearchQuery] = useState("");
  // const [courseSortField, setCourseSortField] = useState("");
  // const [courseSortOrder, setCourseSortOrder] = useState("asc");
  const [selectedUniversity, setSelectedUniversity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [editOpen, setEditOpen] = useState("");
  const limit = 4;
  console.log(selectedUniversity);
  // Fetch the courses from the backend
  const fetchUniversities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/university/get?page=${currentPage}&limit=${limit}&search=${searchQuery}`
      );
      console.log(response.data);
      setUniversity(response.data || []);
      setTotalPages(response?.data?.pagination?.pages);
      // setSelectedUniversity([]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUniversities();
  }, [currentPage, searchQuery,editOpen]);


  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/university/delete/${id}`
        );
        console.log(response);
        fetchUniversities();
      } catch (error) {
        console.error("Error deleting course:", error);
        if (error?.response?.status == 409) {
          alert("This university has courses and cannot be deleted.");
        }
      }
    }
  };

  if (addingNewUniversity) {
    return <AddNewUniversity />;
  }
  if(editOpen){
    return <EditUniversity id={editOpen} setEditOpen={setEditOpen} />
  }

  return (
    <div className="px-10 py-10 h-[100vh]">
      <div className="flex justify-between">
        <input
          placeholder="Search"
          className="bg-[#F2F4F7] py-3 w-[30%] pl-5 border-none placeholder:font-urban text-[1rem] rounded-[4px] outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center">
          <div className="font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]">
            Hi, User
          </div>
          <img src={profile} alt="profile" width={35} />
        </div>
      </div>
      <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>

      {/* Course section */}
      <div>
        <div className="flex justify-between mb-5">
          <div className="font-urban font-bold text-[1.3rem]">Universities</div>
          <div className="">
            <button
              onClick={() => setAddingNewUniversity(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] py-2 px-4 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Add University
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#f71919] text-white px-5 py-1 rounded-md shadow-md hover:bg-[#700000] transition mt-3"
            >
              Delete
            </button>
          </div>
        </div>

        {/* <div className="flex text-[0.9rem] font-urban">
          <div>Sort by:</div>
          <button
            className="flex items-center ml-2 font-semibold"
            // onClick={() => {
            //   setCourseSortField('course_level');
            //   setCourseSortOrder(courseSortOrder === 'asc' ? 'desc' : 'asc');
            // }}
          >
            University
            <img src={arrow} alt="arrow" width={15} className="ml-1" />
          </button>
        </div> */}
      </div>

      <div className="mt-8 text-[0.9rem]">
        {/* Header of list */}
        <div>
          <div className="font-urban flex bg-[#F9F9F9] py-3 px-3 text-[#30589F]">
            <div className="w-[10%] flex items-center">
              #
              {/* <input
                type="checkbox"
                checked={selectedUniversity.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUniversity(university?.data?.map((i) => i._id));
                  } else {
                    setSelectedUniversity([]);
                  } 
                }}
              /> */}
            </div>
            <div className="w-[30%]">University</div>
            <div className="w-[30%]">University Ranking</div>
            <div className="w-[30%]">Country</div>
            <div className="w-[10%]">Action</div>
          </div>
          <div className="border-[#BFBFBF] border-b-[1px]"></div>
        </div>

        {/* List */}
        {/* {paginatedCourses.map((list) => ( */}
        {university?.data?.map((list, index) => (
          <div key={list._id}>
            <div className="font-urban flex py-3 px-3">
              <div className="w-[10%] flex items-center">
                {/* <input
                  type="checkbox"
                  checked={selectedUniversity.includes(list._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUniversity([...selectedUniversity, list._id]);
                    } else {
                      setSelectedUniversity(
                        selectedUniversity.filter((id) => id !== list._id)
                      );
                    }
                  }}
                /> */}
                {index + 1 + (currentPage - 1) * limit}
              </div>
              <div className="w-[30%]">{list.university_name}</div>
              <div className="w-[30%] ">{list?.university_ranking}</div>
              <div className="w-[30%]">{list.country}</div>
              <div className="w-[10%] flex">
                <button className="mr-4" onClick={() => handleDelete(list._id)}>
                  <img src={trash} width={20} alt="trash" />
                </button>
                <button className="mr-4" 
                onClick={() => setEditOpen(list?._id)}
                >
                  <img src={edit} width={18} alt="edit" />
                </button>
                {/* <EditCourse id={list._id} /> */}
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] bg-black"></div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5 font-urban">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded border-[#535353] ${
                currentPage === 1
                  ? "bg-white cursor-not-allowed text-[#524f4f]"
                  : "bg-[#30589F] text-white"
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 border-[#30589F] rounded ${
                currentPage === totalPages
                  ? "bg-white cursor-not-allowed text-[#30589F]"
                  : "bg-[#30589F] text-white"
              }`}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
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

export default UniversityList;
