import React, { useEffect, useState } from "react";
import profile from "../assets/images/profile.svg";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const EnquiryList = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the courses from the backend
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/application/get-all?page=${currentPage}&limit=${limit}`
      );
      setEnquiryData(response?.data);
      setTotalPages(response?.data?.pagination?.pages);
      // setSelectedUniversity([]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Function to handle view button click
  const handleView = async (application, status) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
    if (status) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/application/status/${application?._id}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        fetchData();
      }
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

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
          <div className="font-urban font-bold text-[1.3rem]">Enquiries</div>
        </div>
      </div>

      <div className="mt-8 text-[0.9rem]">
        {/* Header of list */}
        <div>
          <div className="font-urban flex bg-[#F9F9F9] py-3 px-3 text-[#30589F]">
            <div className="w-[5%] flex items-center">#</div>
            <div className="w-[15%]">Name</div>
            <div className="w-[20%]">Email</div>
            <div className="w-[30%]">Course</div>
            <div className="w-[20%]">University</div>
            <div className="w-[10%]">Action</div>
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
        ) : enquiryData?.data?.length > 0 ? (
          <>
            {enquiryData?.data?.map((list, index) => (
              <div key={list._id}>
                <div className="font-urban flex py-3 px-3">
                  <div className="w-[5%] flex items-center">
                    {index + 1 + (currentPage - 1) * limit}
                  </div>
                  <div className="w-[15%]">
                    {list?.user?.first_name}{" "}
                    {list?.user?.last_name && list?.user?.last_name}
                  </div>
                  <div className="w-[20%] ">{list?.user?.email}</div>
                  <div className="w-[30%]">
                    {list?.course?.course_level}{" "}
                    {list?.course?.course_level !== "MBA"
                      ? `of ${list?.course?.discipline} `
                      : "in"}{" "}
                    {list?.course?.area_of_study}
                  </div>
                  <div className="w-[20%] ">
                    {list?.course?.university_name?.university_name}
                  </div>
                  <div className="w-[10%] flex">
                    {list?.isOpened ? (
                      <button
                        className="mr-4 border border-[#30589F] text-[#30589F] rounded-lg py-1 px-2 active:bg-[#30589F] active:text-white"
                        onClick={() => handleView(list, false)}
                      >
                        viewed
                      </button>
                    ) : (
                      <button
                        className="mr-4 border border-[#30589F] text-[#30589F] rounded-lg py-1 px-2 active:bg-[#30589F] active:text-white"
                        onClick={() => handleView(list, true)}
                      >
                        view
                      </button>
                    )}
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
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#30589F]">
                Application Documents
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Applicant Info */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Applicant Information</h4>
              <div className="space-y-2 pl-2">
                <p className="flex gap-4">
                  <span className="font-semibold w-24">Name:</span>
                  <span>
                    {selectedApplication?.user?.first_name}{" "}
                    {selectedApplication?.user?.last_name &&
                      selectedApplication?.user?.last_name}
                  </span>
                </p>
                <p className="flex gap-4">
                  <span className="font-semibold w-24">Email:</span>
                  <span>{selectedApplication?.user?.email}</span>
                </p>
                <p className="flex gap-4">
                  <span className="font-semibold w-24">Intake:</span>
                  <span>
                    {selectedApplication?.intake?.month}-
                    {selectedApplication?.intake?.year}
                  </span>
                </p>
              </div>
            </div>

            {/* Documents Sections */}
            <div className="space-y-6">
              {/* Identity Documents */}
              {selectedApplication.documents?.identityDocuments && (
                <div>
                  <h4 className="font-semibold mb-2">Identity Documents</h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.identityDocuments
                      .passportFront && (
                      <DocumentItem
                        label="Passport Front"
                        url={
                          selectedApplication.documents.identityDocuments
                            .passportFront
                        }
                      />
                    )}
                    {selectedApplication.documents.identityDocuments
                      .passportBack && (
                      <DocumentItem
                        label="Passport Back"
                        url={
                          selectedApplication.documents.identityDocuments
                            .passportBack
                        }
                      />
                    )}
                    {selectedApplication.documents.identityDocuments
                      .cvResume && (
                      <DocumentItem
                        label="CV/Resume"
                        url={
                          selectedApplication.documents.identityDocuments
                            .cvResume
                        }
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Educational Documents */}
              {selectedApplication.documents?.educationalDocuments?.length >
                0 && (
                <div>
                  <h4 className="font-semibold mb-2">Educational Documents</h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.educationalDocuments.map(
                      (doc, i) => (
                        <DocumentItem
                          key={i}
                          label={`Document ${i + 1}`}
                          url={doc}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedApplication.documents?.workExperienceDocuments?.length >
                0 && (
                <div>
                  <h4 className="font-semibold mb-2">
                    Work Experience Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.workExperienceDocuments.map(
                      (doc, i) => (
                        <DocumentItem
                          key={i}
                          label={`Document ${i + 1}`}
                          url={doc}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedApplication.documents?.englishProficiencyDocuments
                ?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">
                    English Proficiency Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.englishProficiencyDocuments.map(
                      (doc, i) => (
                        <DocumentItem
                          key={i}
                          label={`Document ${i + 1}`}
                          url={doc}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
              {selectedApplication.documents?.extracurricularDocuments?.length >
                0 && (
                <div>
                  <h4 className="font-semibold mb-2">
                    Extracurricular Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.extracurricularDocuments.map(
                      (doc, i) => (
                        <DocumentItem
                          key={i}
                          label={`Document ${i + 1}`}
                          url={doc}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedApplication.documents?.recommendationDocuments?.length >
                0 && (
                <div>
                  <h4 className="font-semibold mb-2">
                    Recommendation Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.recommendationDocuments.map(
                      (doc, i) => (
                        <DocumentItem
                          key={i}
                          label={`Document ${i + 1}`}
                          url={doc}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedApplication.documents?.otherDocuments?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Other Documents</h4>
                  <div className="space-y-2">
                    {selectedApplication.documents.otherDocuments.map(
                      (doc, i) => (
                        <DocumentItem
                          key={i}
                          label={`Document ${i + 1}`}
                          url={doc}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryList;

const DocumentItem = ({ label, url }) => {
  const getFileName = (url) => {
    return url.split("/").pop();
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
      <span>{label}</span>
      <a
        href={url}
        target="_blank"
        download={getFileName(url)}
        className="text-[#30589F] hover:underline flex items-center"
      >
        Download
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </a>
    </div>
  );
};
