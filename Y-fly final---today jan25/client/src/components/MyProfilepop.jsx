import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { format } from "date-fns";

export default function MyProfilepop({ data, setShowAppliesCourse }) {
  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center z-50 px-2 sm:px-4">
      {/* Semi-transparent background overlay */}
      <div className="absolute inset-0 bg-[#878484] opacity-50 z-0" />

      {/* Modal content container */}
      <div className="relative z-10 bg-white w-full sm:w-[60vw] rounded-xl flex flex-col items-center">
        {/* Fixed top close button */}
        <div className="w-full p-4 flex justify-end  sticky top-0 bg-white z-10">
          <button
            onClick={() => setShowAppliesCourse(false)}
            className="border border-gray-400 rounded-full w-[30px] h-[30px] flex items-center justify-center bg-white cursor-pointer"
          >
            <HiOutlineX size={18} color="#2d87cc" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="w-full max-h-[80vh] overflow-y-auto px-4 py-4 flex flex-col items-center gap-4">
          {data?.length > 0 ? (
            data.map((i, index) => (
              <div
                key={index}
                className="w-full max-w-4xl flex flex-col sm:flex-row items-start sm:items-center bg-[#F1F1F1] border shadow-[4px_4px_0px_0px_rgb(0,0,0)] rounded-[20px] p-4 gap-4"
              >
                <img
                  src={`data:${i?.course?.university_name?.university_logo?.contentType};base64,${i?.course?.university_name?.university_logo?.data}`}
                  alt="University Logo"
                  className="w-16 h-16 rounded-full object-contain border"
                />
                <div className="flex flex-col">
                  <h2 className="font-urbanist font-bold text-[20px] sm:text-[24px]">
                    {i?.course?.course_level === "MBA"
                      ? `${i?.course?.course_level} in ${i?.course?.area_of_study}`
                      : `${i?.course?.course_level} of ${i?.course?.discipline} in ${i?.course?.area_of_study}`}
                  </h2>
                  <p className="text-black">
                    {i?.course?.university_name?.university_name}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#6B7280] mt-1">
                    <div>
                      <p className="font-medium">Applied date</p>
                      <p className="text-black">
                        {format(new Date(i?.createdAt), "dd-MM-yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Intake year</p>
                      <p className="text-black">
                        {i?.intake?.month} {i?.intake?.year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center  my-10">
              Looks like you haven’t applied to any courses yet. <br />
              <span className="font-semibold">
                Browse courses and take the first step!
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
