import React, { useEffect, useState } from "react";
import profile from "../assets/images/profile.svg";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const ServiceApplicationList = () => {
  const [applicatinData, setApplicationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the courses from the backend
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/application?page=${currentPage}&limit=${limit}`
      );
      setApplicationData(response?.data?.data);
      setTotalPages(response?.data?.pagination?.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className="px-10 py-10 h-[100vh]">
      <div className="flex justify-end">
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
          <div className="font-urban font-bold text-[1.3rem]">
            Service Applications
          </div>
        </div>
      </div>

      <div className="mt-8 text-[0.9rem]">
        {/* Header of list */}
        <div>
          <div className="font-urban flex bg-[#F9F9F9] py-3 px-3 text-[#30589F]">
            <div className="w-[5%] flex items-center">#</div>
            <div className="w-[15%]">Name</div>
            <div className="w-[25%]">Email</div>
            <div className="w-[30%]">Service</div>
            <div className="w-[15%]">Price</div>
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
        ) : applicatinData?.length > 0 ? (
          <>
            {applicatinData?.map((list, index) => (
              <div key={list._id}>
                <div className="font-urban flex py-3 px-3">
                  <div className="w-[5%] flex items-center">
                    {index + 1 + (currentPage - 1) * limit}
                  </div>
                  <div className="w-[15%]">
                    {list?.user?.first_name}{" "}
                    {list?.user?.last_name && list?.user?.last_name}
                  </div>
                  <div className="w-[25%] ">{list?.user?.email}</div>
                  <div className="w-[30%]">{list?.service?.service_name}</div>
                  <div className="w-[15%] ">{list?.service?.price}</div>
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

export default ServiceApplicationList;
