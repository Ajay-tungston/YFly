import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Contactus from "../components/ContactUs";
import Footer from "../components/Footer";
import grid from "../assets/images/image/grid.svg";
import download from "../assets/images/document_download.svg";
import university from "../assets/images/university.svg";
import merit from "../assets/images/merit.svg";
import fund from "../assets/images/fund.svg";
import deadline from "../assets/images/deadline.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
const ScholarshipOverview = () => {
  const [scholarshipData, setScholarshipData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/scholarships/get/${params.id}`
        );
        setScholarshipData(response?.data?.scholarship);
      } catch (error) {
        console.log(error);
        // setScholarshipData([])
      }
    };
    fetchData();
  }, []);

  const handleDownloadBrochure = () => {
    if (!scholarshipData?.brochure?.data) {
      alert("Brochure not available!");
      return;
    }

    // Convert Buffer data (array) into a Blob
    const byteArray = new Uint8Array(scholarshipData.brochure.data.data);
    const blob = new Blob([byteArray], {
      type: scholarshipData.brochure.contentType,
    });

    // Create a downloadable URL
    const url = URL.createObjectURL(blob);

    // Create a temporary link element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "brochure.pdf"; // Set download file name
    document.body.appendChild(a);
    a.click();

    // Cleanup: Remove the link and revoke URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0E1B2C] pb-10">
      {/* ----------------------------------1st section----------------------------- */}
      {scholarshipData?.length === 0 ? (
        <div className=" bg-white h-screen w-full flex justify-center items-center ">
          <p>
            No scholarship found!{" "}
            <Link to={navigate(-1)} className="text-[#144da8]">
              go back
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white h-[70vh] rounded-b-[200px] max-md:rounded-b-[80px] relative max-md:h-[55vh]">
            <div className="flex ">
              <Navbar />
            </div>

            <div className="flex justify-center">
              <button className="absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban">
                SCHOLARSHIP FINDER
              </button>
              <div className="absolute top-[13.5rem] max-md:top-[10rem] max-md:px-5 font-dela text-[5.4rem] text-center leading-[6.5rem] max-xl:text-[3.5rem] max-xl:leading-[4.8rem] max-md:text-[1.9rem] max-md:leading-[3rem]">
                {scholarshipData?.scholarship_name?.split(" ").length > 2 ? (
                  <>
                    {scholarshipData.scholarship_name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                    <br />
                    {scholarshipData.scholarship_name
                      .split(" ")
                      .slice(2)
                      .join(" ")}
                  </>
                ) : (
                  scholarshipData?.scholarship_name
                )}
              </div>

              <div className="absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-md:top-[20rem]">
                {scholarshipData?.area_of_study}
              </div>
            </div>
          </div>

          <div
            className=" bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-16 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
            style={{ backgroundImage: `url(${grid})` }}
          >
            <div className="flex justify-between items-center max-lg:mt-[2rem] max-md:mt-[1rem] max-md:flex-col max-md:items-start">
              <div className="text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem] max-md:mb-4 max-md:text-[1.1rem]">
                Scholarship Details
              </div>
              <button
                className="flex border-[2px] border-[#30589F] font-urban px-7 text-[#30589F] py-2 items-center max-md:text-[0.8rem] text-[#30589F rounded-[20px]"
                onClick={handleDownloadBrochure}
              >
                <img
                  src={download}
                  alt="download"
                  width={18}
                  className="mr-2"
                />
                Download Brochure
              </button>
            </div>

            <div className="font-urban font-bold mt-7 max-md:text-[0.8rem]">
              {scholarshipData?.scholarship_name}{" "}
              {scholarshipData?.area_of_study}
            </div>

            {/* Overview */}
            <div>
              <div className="text-[#2B7CD6] mb-5 font-dela text-[2rem] max-lg:text-[1.4rem] mt-12 max-md:text-[1.1rem]">
                Overview
              </div>

              <div className="flex flex-wrap">
                {/* Applicable university */}
                <div className="w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0">
                  <img
                    src={university}
                    alt=""
                    width={45}
                    className="mr-3 w-[2rem]"
                  />

                  <div>
                    <div className="text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]">
                      Course Level
                    </div>
                    <div className="font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]">
                      {scholarshipData?.course_level}
                    </div>
                  </div>
                </div>
                {/* Scholarship Type */}
                <div className="w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0">
                  <img
                    src={merit}
                    alt=""
                    width={45}
                    className="mr-3 w-[2rem]"
                  />

                  <div>
                    <div className="text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]">
                      Scholarship Type
                    </div>
                    <div className="font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]">
                      {scholarshipData?.types_of_scholarship}
                    </div>
                  </div>
                </div>
                {/* Scholarship Amount */}
                <div className="w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0">
                  <img src={fund} alt="" width={45} className="mr-3 w-[2rem]" />

                  <div>
                    <div className="text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]">
                      Scholarship Amount
                    </div>
                    <div className="font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]">
                      ${scholarshipData?.scholarship_amount}
                    </div>
                  </div>
                </div>
                {/* intake year */}
                {/* <div className="w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0">
              <img src={intake} alt="" width={45} className="mr-3 w-[2rem]" />

              <div>
                <div className="text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]">
                  Intake year
                </div>
                <div className="font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]">
                  Jan 2025
                </div>
              </div>
            </div> */}

                {/* Deadline */}
                <div className="w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom">
                  <img
                    src={deadline}
                    alt=""
                    width={45}
                    className="mr-3 w-[2rem]"
                  />

                  <div>
                    <div className="text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]">
                      Deadline
                    </div>
                    <div className="font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]">
                      {/* {scholarshipData?.scholarship_deadline} */}
                      {scholarshipData?.scholarship_deadline &&
                        format(
                          new Date(scholarshipData.scholarship_deadline),
                          "dd MMM yyyy"
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-urban mt-12 max-md:text-[0.8rem]">
                {scholarshipData?.overview}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <div className="text-[#2B7CD6] mb-5 font-dela text-[2rem] max-lg:text-[1.4rem] mt-12 max-md:text-[1.1rem]">
                Eligibility Criteria
              </div>
              <div className="font-urban mt-6 max-md:text-[0.8rem]">
                {scholarshipData?.eligibility_criteria}
              </div>
            </div>

            {/* Application Process */}
            <div className="mb-6">
              <div className="text-[#2B7CD6] mb-5 font-dela text-[2rem] max-lg:text-[1.4rem] max-md:text-[1.1rem] mt-12">
                Application Process
              </div>
              <div className="font-urban mt-6 max-md:text-[0.8rem]">
                {scholarshipData?.application_process}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Image and Call to Action */}
      <section>
        <div className="bg-[#5BC7F1] rounded-[20px] md:rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1637px] mx-auto h-auto md:h-[510px] -mt-[100px]">
          {/* Left Image */}
          <div className="flex-shrink-0 relative w-full h-[403px] md:w-[571px] md:h-[403px] mx-auto md:mx-0 rounded-[20px] overflow-hidden">
            <img
              src="/images/dummy.png" // Replace with your actual image path
              alt="Support Agent"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[#001f3f]">
              Ready to flight your dreams?
            </h2>
            <p
              className="text-[#001f3f] text-sm md:text-base leading-relaxed"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "400",
                lineHeight: "1.75",
                marginBottom: "1.5rem",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Id donec facilisis duis
              placerat gravida aliquet at. Nisi urna quam massa pellentesque
              lectus odio sagittis. Tortor massa in rhoncus purus nunc
              scelerisque nullam. Consequat rhoncus nam ac enim leo. Feugiat
              eget urna varius eu nibh in sed est.
            </p>

            <button className="bg-white text-[#001f3f] border border-[#001f3f] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#001f3f] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0">
              Book a call →
            </button>
          </div>
        </div>
      </section>

      {/* <Contactus /> */}
      <Footer />
    </div>
  );
};

export default ScholarshipOverview;
