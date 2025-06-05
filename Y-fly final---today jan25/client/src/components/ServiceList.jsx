import React, { useEffect, useState } from "react";
import profile from "../assets/images/profile.svg";
import add from "../assets/images/add.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/greytrash.svg";
import axios from "axios";
import AddNewService from "./AddNewService";
import EditService from "./EditService";
import { Oval } from "react-loader-spinner";
import AddMultipleServices from "./AddMultipleServices";

const ServiceList = () => {
  const [addingNewService, setAddingNewService] = useState(false);
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [editOpen, setEditOpen] = useState("");
  const limit = 10;
  // Fetch the courses from the backend
  const fetchService = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/get-all?page=${currentPage}&limit=${limit}&search=${searchQuery}`
      );
      setService(response.data || []);
      setTotalPages(response?.data?.pagination?.pages);
      // setSelectedUniversity([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchService();
  }, [currentPage, searchQuery, editOpen]);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/service/delete/${id}`
        );
        fetchService();
      } catch (error) {
        console.error("Error deleting course:", error);
        if (error?.response?.status == 409) {
          alert("This Service has courses and cannot be deleted.");
        }
      }
    }
  };

  if (addingNewService) {
    return (
      <AddNewService
        setAddingService={setAddingNewService}
        setEditOpen={setEditOpen}
        fetchService={fetchService}
      />
    );
  }

  if (editOpen) {
    return <EditService id={editOpen} setEditOpen={setEditOpen} fetchService={fetchService}/>;
  }

  return (
    <div className="px-10 py-10 h-[100vh]">
      {showCsvUpload && (
        <AddMultipleServices setShowCsvUpload={setShowCsvUpload} fetchService={fetchService} />
      )}

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
          <div className="font-urban font-bold text-[1.3rem]">Services</div>
          <div className=" flex gap-5">
            <button
              onClick={() => setAddingNewService(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] py-2 px-4 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Add Service
            </button>
            {/* <button
              onClick={handleDelete}
              className="bg-[#f71919] text-white px-5 py-1 rounded-md shadow-md hover:bg-[#700000] transition mt-3"
            >
              Delete
            </button> */}
            <button
              onClick={() => setShowCsvUpload(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] py-2 px-4 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Upload CSV
            </button>
          </div>
        </div>
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
            <div className="w-[30%]">Service</div>
            <div className="w-[30%]">Amount</div>
          </div>
          <div className="border-[#BFBFBF] border-b-[1px]"></div>
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
        ) : service?.data?.length > 0 ? (
          <>
            {service?.data?.map((list, index) => (
              <div key={list._id}>
                <div className="font-urban flex py-3 px-3">
                  <div className="w-[10%] flex items-center">
                    {index + 1 + (currentPage - 1) * limit}
                  </div>
                  <div className="w-[30%]">{list.service_name}</div>
                  <div className="w-[30%] ">{list?.price}</div>
                  <div className="w-[10%] flex">
                    <button
                      className="mr-4"
                      onClick={() => handleDelete(list._id)}
                    >
                      <img src={trash} width={20} alt="trash" />
                    </button>
                    <button
                      className="mr-4"
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
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
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
          </>
        ) : (
          <p className="text-center pt-16">No data found</p>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
