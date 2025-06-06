import React, { useEffect, useState } from "react";
import profile from "../assets/images/profile.svg";
import arrow from "../assets/images/downarrowblack.svg";
import add from "../assets/images/add.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/greytrash.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AddNewScholarship from "./AddNewScholarship";
import EditScholarshipModal from "./EditScholarshipModal";
import AddMultipleScholarship from "./AddMultipleScholarship";

const ScholarshipList = () => {
  const [addingNewScholarship, setAddingNewScholarship] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedScholarships, setSelectedScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const scholarshipsPerPage = 10;

  // Fetch scholarships from the backend
  const fetchScholarships = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/scholarships/get-all`
      );
      setScholarships(response.data.scholarships);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      toast.error("Failed to load scholarships");
    }
  };
  useEffect(() => {
    fetchScholarships();
  }, []);

  // Handle search
  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.scholarship_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle sorting
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (sortOrder === "asc") return fieldA > fieldB ? 1 : -1;
    return fieldA < fieldB ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedScholarships.length / scholarshipsPerPage);
  const paginatedScholarships = sortedScholarships.slice(
    (currentPage - 1) * scholarshipsPerPage,
    currentPage * scholarshipsPerPage
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/scholarships/delete/${id}`
        );
        setScholarships(
          scholarships.filter((scholarship) => scholarship._id !== id)
        );
        toast.success("Scholarship deleted successfully");
      } catch (error) {
        console.error("Error deleting scholarship:", error);
        toast.error("Failed to delete scholarship");
      }
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteSelected = async () => {
    if (selectedScholarships.length === 0) {
      toast.warning("No scholarships selected");
      return;
    }

    setIsDeleting(true);
    try {
      const deletePromises = selectedScholarships.map((id) =>
        axios.delete(
          `${process.env.REACT_APP_API_URL}/scholarships/delete/${id}`
        )
      );

      await Promise.all(deletePromises);

      setScholarships((prev) =>
        prev.filter(
          (scholarship) => !selectedScholarships.includes(scholarship._id)
        )
      );

      setSelectedScholarships([]);
      toggleModal();

      toast.success(
        `Deleted ${selectedScholarships.length} ${
          selectedScholarships.length > 1 ? "scholarships" : "scholarship"
        } successfully`
      );
    } catch (error) {
      console.error("Failed to delete scholarships:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete selected scholarships"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (addingNewScholarship) {
    return (
      <AddNewScholarship setAddingNewScholarship={setAddingNewScholarship} />
    );
  }

  return (
    <div className="px-10 py-10 h-[100vh]">
      {showCsvUpload && (
        <AddMultipleScholarship
          setShowCsvUpload={setShowCsvUpload}
          fetchScholarships={fetchScholarships}
        />
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

      <div>
        <div className="flex justify-between mb-5">
          <div className="font-urban font-bold text-[1.3rem]">Scholarships</div>
          <div className="flex flex-col items-end">
            <div className="flex gap-5">
            <button
              onClick={() => setAddingNewScholarship(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] px-5 py-2 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Add scholarships
            </button>
            <button
              onClick={() => setShowCsvUpload(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] py-2 px-4 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Upload Excel
            </button>
            </div>
            <button
              onClick={() =>
                selectedScholarships.length > 0
                  ? toggleModal()
                  : toast.warning("No scholarships selected")
              }
              className={`mt-3 font-urban flex items-center text-[0.9rem] px-5 py-2 rounded-[9px] ${
                selectedScholarships.length > 0
                  ? "bg-[#f71919] text-white hover:bg-[#700000]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedScholarships.length === 0}
            >
              <img src={trash} alt="delete" width={15} className="mr-1" />
              Delete Selected
            </button>
          </div>
        </div>

        <div className="flex text-[0.9rem] font-urban">
          <div>Sort by:</div>
          <button
            className="flex items-center ml-2 font-semibold"
            onClick={() => {
              setSortField("scholarship_name");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            Name
            <img src={arrow} alt="arrow" width={15} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-[0.9rem]">
        <div>
          <div className="font-urban flex bg-[#F9F9F9] py-3 px-3 text-[#30589F]">
            <div className="w-[10%] flex items-center">
              <input
                type="checkbox"
                checked={
                  selectedScholarships.length > 0 &&
                  selectedScholarships.length === paginatedScholarships.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedScholarships(
                      paginatedScholarships.map((sch) => sch._id)
                    );
                  } else {
                    setSelectedScholarships([]);
                  }
                }}
              />
            </div>
            <div className="w-[30%]">Scholarship</div>
            <div className="w-[30%]">Qualification</div>
            <div className="w-[30%]">Type</div>
            <div className="w-[10%]">Action</div>
          </div>
          <div className="border-[#BFBFBF] border-b-[1px]"></div>
        </div>

        {paginatedScholarships.length > 0 ? (
          paginatedScholarships.map((list) => (
            <div key={list._id}>
              <div className="font-urban flex py-3 px-3">
                <div className="w-[10%] flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedScholarships.includes(list._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedScholarships([
                          ...selectedScholarships,
                          list._id,
                        ]);
                      } else {
                        setSelectedScholarships(
                          selectedScholarships.filter((id) => id !== list._id)
                        );
                      }
                    }}
                  />
                </div>
                <div className="w-[30%]">{list.scholarship_name}</div>
                <div className="w-[30%]">{list.course_level}</div>
                <div className="w-[30%]">{list.types_of_scholarship}</div>
                <div className="w-[10%] flex">
                  <button
                    className="mr-4"
                    onClick={() => handleDelete(list._id)}
                    aria-label="Delete scholarship"
                  >
                    <img src={trash} width={20} alt="trash" />
                  </button>
                  <EditScholarshipModal id={list._id} />
                </div>
              </div>
              <div className="border-[#BFBFBF] border-b-[1px]"></div>
            </div>
          ))
        ) : (
          <div className="font-urban py-5 text-center text-gray-500">
            No scholarships found
          </div>
        )}

        <div className="flex justify-between items-center mt-5 font-urban">
          <span className="text-sm">
            Showing {(currentPage - 1) * scholarshipsPerPage + 1} to{" "}
            {Math.min(
              currentPage * scholarshipsPerPage,
              sortedScholarships.length
            )}{" "}
            of {sortedScholarships.length} entries
          </span>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded border ${
                currentPage === 1
                  ? "bg-white cursor-not-allowed text-gray-400 border-gray-300"
                  : "bg-[#30589F] text-white border-[#30589F]"
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded border ${
                currentPage === totalPages
                  ? "bg-white cursor-not-allowed text-gray-400 border-gray-300"
                  : "bg-[#30589F] text-white border-[#30589F]"
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

      {/* Delete Confirmation Modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-96">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              Delete {selectedScholarships.length} selected{" "}
              {selectedScholarships.length > 1 ? "scholarships" : "scholarship"}
              ?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSelected}
                className={`px-4 py-2 rounded-md text-white ${
                  isDeleting
                    ? "bg-[#f71f1f]"
                    : "bg-[#a32b2b] hover:bg-[#e74646ef]"
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="inline-block mr-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ScholarshipList;
