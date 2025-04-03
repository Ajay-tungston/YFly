
import React, { useEffect, useState } from 'react';
import profile from '../assets/images/profile.svg';
import arrow from '../assets/images/downarrowblack.svg';
import add from '../assets/images/add.svg';
import edit from '../assets/images/edit.svg';
import trash from '../assets/images/greytrash.svg';
import axios from 'axios';
import AddNewScholarship from './AddNewScholarship';
import EditScholarshipModal from './EditScholarshipModal'; // Import the Edit Modal

const ScholarshipList = () => {
  const [addingNewScholarship, setAddingNewScholarship] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedScholarships, setSelectedScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false)
  const scholarshipsPerPage = 10;

  // Fetch scholarships from the backend
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scholarships/get-all`);
        setScholarships(response.data.scholarships);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };
    fetchScholarships();
  }, []);

  // Handle search
  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.scholarship_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sorting
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (sortOrder === 'asc') return fieldA > fieldB ? 1 : -1;
    return fieldA < fieldB ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedScholarships.length / scholarshipsPerPage);
  const paginatedScholarships = sortedScholarships.slice(
    (currentPage - 1) * scholarshipsPerPage,
    currentPage * scholarshipsPerPage
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/scholarships/delete/${id}`);
        setScholarships(scholarships.filter((scholarship) => scholarship._id !== id));
      } catch (error) {
        console.error('Error deleting scholarship:', error);
      }
    }
  };

  if (addingNewScholarship) {
    return <AddNewScholarship setAddingNewScholarship={setAddingNewScholarship} />;
  }
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteSelected = async () => {
    toggleModal();
    try {
      await Promise.all(
        selectedScholarships.map((id) =>
          axios.delete(`${process.env.REACT_APP_API_URL}/scholarships/delete/${id}`)
        )
      );

      setScholarships((prev) =>
        prev.filter((cert) => !selectedScholarships.includes(cert._id))
      );
      setSelectedScholarships([]);
    } catch (error) {
      console.error('Failed to delete Scholarships', error);
    }
  };
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
          <div className="font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]">Hi, User</div>
          <img src={profile} alt="profile" width={35} />
        </div>
      </div>
      <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>

      <div>
        <div className="flex justify-between mb-5">
          <div className="font-urban font-bold text-[1.3rem]">Scholarships</div>
          <div className="flex flex-col items-end">
            <button
              onClick={() => setAddingNewScholarship(true)}
              className="font-urban flex items-center bg-[#30589F] text-white text-[0.9rem] px-5 py-2 rounded-[9px]"
            >
              <img src={add} alt="add" width={15} className="mr-1" />
              Add scholarships
            </button>

            <button
              onClick={handleDeleteSelected}
              className="bg-[#f71919] text-white px-5 py-1 rounded-md shadow-md hover:bg-[#700000] transition mt-3"
            >
              Delete
            </button>
          </div>

        </div>

        <div className="flex text-[0.9rem] font-urban">
          <div>Sort by:</div>
          <button
            className="flex items-center ml-2 font-semibold"
            onClick={() => {
              setSortField('scholarship_name');
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedScholarships(paginatedScholarships.map((sch) => sch._id));
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

        {paginatedScholarships.map((list) => (
          <div key={list._id}>
            <div className="font-urban flex py-3 px-3">
              <div className="w-[10%] flex items-center">
                <input
                  type="checkbox"
                  checked={selectedScholarships.includes(list._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedScholarships([...selectedScholarships, list._id]);
                    } else {
                      setSelectedScholarships(selectedScholarships.filter((id) => id !== list._id));
                    }
                  }}
                />
              </div>
              <div className="w-[30%]">{list.scholarship_name}</div>
              <div className="w-[30%]">{list.course_level}</div>
              <div className="w-[30%]">{list.types_of_scholarship}</div>
              <div className="w-[10%] flex">
                <button className="mr-4" onClick={() => handleDelete(list._id)}>
                  <img src={trash} width={20} alt="trash" />
                </button>
                {/* <button
                  onClick={() => {
                    setScholarshipToEdit(list); // Pass the selected scholarship
                    setIsEditing(true); // Open the modal
                  }}
                >
                  <img src={edit} width={20} alt="edit" />
                </button> */}
                <EditScholarshipModal id={list._id} />
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] bg-black"></div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-5 font-urban">
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded border-[#535353] ${currentPage === 1 ? 'bg-white cursor-not-allowed text-[#524f4f]' : 'bg-[#30589F] text-white '} `}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 border-[#30589F] rounded ${currentPage === totalPages ? 'bg-white cursor-not-allowed  text-[#30589F]' : 'bg-[#30589F] text-white'}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {modal && (
  <div className='fixed inset-0 flex items-end justify-center bg-gray-700 bg-opacity-50 z-50 pb-48'>
    <div className='bg-white px-10 py-6 rounded-lg shadow-lg w-96 text-center'>
      <p className='font-bold text-lg mb-4 text-gray-800'>
        Are you sure you want to delete the selected ?
      </p>
      <div className='flex justify-center gap-4 mt-4'>
        <button
          onClick={toggleModal}
          className='bg-gray-500 text-black px-5 py-2 rounded-md shadow-md hover:bg-gray-600 transition'>
          Cancel
        </button>
        <button
          onClick={handleDeleteSelected}
          className='bg-[#f71919] text-white px-5 py-2 rounded-md shadow-md hover:bg-[#700000] transition'>
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
};

export default ScholarshipList;
