import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import downarrow from "../assets/images/downarrowblack.svg";
import grid from "../assets/images/image/grid.svg";
import Footer from "../components/Footer";
import arrowright from "../assets/images/arrow-right.svg";
import search from "../assets/images/search.svg";
import coin from "../assets/images/coin.svg";
import ScholarshipLeftbar from "../components/ScholarshipLeftbar";
import Contactus from "../components/ContactUs";
import ResponsiveSearchBar2 from "../components/ResponsiveSearchBar2";
import axios from "axios";
import { format } from "date-fns";
import { debounce } from "lodash";
import PaginationBar from "../components/pagination/PaginationBar";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ScholarshipFinder = () => {
  const [scholarship, setScholarship] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [desiredCourse, setDesiredCourse] = useState([]);
  const [scholarshipTypes, setScholarshipTypes] = useState([]);
  const [areasOfStudy, setAreasOfStudy] = useState([]);
  const [intakeYears, setIntakeYears] = useState([]);
  const [specialRestrictions, setSpecialRestrictions] = useState([]);
  const [applicability, setApplicability] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
  const [citizenships, setCitizenships] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const naviagte = useNavigate();

  const [filters, setFilters] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedSort, setSelectedSort] = useState({
    label: "Sort by",
    value: "",
  });

  const [appliedSort, setAppliedSort] = useState({
    label: "Sort by",
    value: "",
  });
  const [aplliedConuntry, setAppliedCountry] = useState("");

  const handleFilterBtnClick = () => {
    setAppliedSort(selectedSort);
    setAppliedCountry(selectedCountry);
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/scholarships/get-filters`
        );
        setFilters(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilters();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const min = minAmount !== null ? Number(minAmount) : undefined;
      const max = maxAmount !== null ? Number(maxAmount) : undefined;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/scholarships/search`,
        {
          params: {
            search: query,
            page: currentPage,
            course_level: desiredCourse,
            types_of_scholarship: scholarshipTypes,
            area_of_study: areasOfStudy,
            intakeYear: intakeYears,
            specialRestrictions: specialRestrictions,
            scholarship_applicability: applicability,
            scholarship_deadline: selectedDateRange.join(","),
            student_citizenship: citizenships,
            minAmount: min,
            maxAmount: max,
            country: aplliedConuntry === "Country" ? "" : aplliedConuntry,
            sortBy: appliedSort.value,
          },
        }
      );
      setScholarship(response?.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    query,
    currentPage,
    desiredCourse,
    scholarshipTypes,
    areasOfStudy,
    intakeYears,
    specialRestrictions,
    applicability,
    selectedDateRange,
    citizenships,
    minAmount,
    maxAmount,
    // selectedCountry,
    // selectedSort,
    appliedSort,
    aplliedConuntry,
  ]);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchData();
    }, 300);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [fetchData]);

  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Deadline (Earliest First)", value: "deadline_asc" },
    { label: "Deadline (Latest First)", value: "deadline_desc" },
    { label: "Amount (Low to High)", value: "amount_asc" },
    { label: "Amount (High to Low)", value: "amount_desc" },
  ];

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleSelect = (type, value) => {
    if (type === "country") setSelectedCountry(value);
    if (type === "sort") setSelectedSort(value);
    setOpenDropdown(null); // Close dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="bg-[#0E1B2C] pb-10">
        {/* first section */}
        <div className="bg-white h-[75vh] max-xl:h-[65vh] max-md:h-[50vh] rounded-b-[300px] max-md:rounded-b-[80px] max-xl:rounded-b-[180px] relative">
          {/* <div className="flex justify-center"> */}
          <Navbar />
          {/* </div> */}

          <div className="flex justify-center">
            <button className="absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban">
              SCHOLARSHIP FINDER
            </button>
            <div className="absolute top-[13.5rem] max-md:top-[10rem] max-md:px-5 font-dela text-[5.4rem] text-center leading-[6.5rem] max-xl:text-[3.5rem] max-xl:leading-[4.8rem] max-md:text-[1.9rem] max-md:leading-[3rem]">
              Scholarships
              <br /> made easy.
            </div>
            <div className="absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-md:top-[20rem]">
              Don’t let finances stop your dream.
            </div>
          </div>
        </div>
        <ResponsiveSearchBar2
          filters={filters}
          setDesiredCourse={setDesiredCourse}
          setScholarshipTypes={setScholarshipTypes}
          setAreasOfStudy={setAreasOfStudy}
          setIntakeYears={setIntakeYears}
          setSpecialRestrictions={setSpecialRestrictions}
          setApplicability={setApplicability}
          setCitizenships={setCitizenships}
          sortOptions={sortOptions}
          setAppliedCountry={setAppliedCountry}
          setAppliedSort={setAppliedSort}
        />
        {/* second section */}
        <div
          ref={dropdownRef}
          className="flex items-center font-semibold bg-bluegradient w-10/12 my-10 mx-auto gap-x-3 px-10 rounded-full py-14 max-lg:hidden"
        >
          {/* Sort By Dropdown */}
          <div className="relative w-[25%] max-lg:w-[35%]">
            <button
              className="px-6 py-2 w-full flex justify-between bg-white text-black rounded-full border border-gray-300"
              onClick={() => toggleDropdown("sort")}
            >
              {selectedSort.label}
              <img
                src={downarrow}
                alt="down-arrow"
                width={20}
                className={`transition-transform ${
                  openDropdown === "sort" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "sort" && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelect("sort", option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Country Dropdown */}
          <div className="relative w-[25%] max-lg:w-[35%]">
            <button
              className="px-6 py-2 w-full flex justify-between bg-white text-black rounded-full border border-gray-300"
              onClick={() => toggleDropdown("country")}
            >
              {selectedCountry}
              <img
                src={downarrow}
                alt="down-arrow"
                width={20}
                className={`transition-transform ${
                  openDropdown === "country" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "country" && (
              <div className="absolute left-0 mt-2 w-full max-h-[300px] overflow-y-scroll bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {filters?.countries?.map((country) => (
                  <div
                    key={country}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelect("country", country)}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mx-2">
            <button
              className="bg-[#2B7CD6] px-6 py-2 text-white rounded-3xl"
              onClick={handleFilterBtnClick}
            >
              Done
            </button>
          </div>
        </div>

        {/* third section */}
        <div
          className=" bg-white bg-cover bg-center rounded-[200px] max-xl:rounded-[180px] max-md:rounded-[80px] pt-20 px-24 pb-32 mt-10 max-xl:px-14 max-lg:px-10 max-md:px-5"
          style={{ backgroundImage: `url(${grid})` }}
        >
          <div className="flex justify-between">
            {/* left-side */}
            <ScholarshipLeftbar
              filters={filters}
              desiredCourse={desiredCourse}
              setDesiredCourse={setDesiredCourse}
              scholarshipTypes={scholarshipTypes}
              setScholarshipTypes={setScholarshipTypes}
              areasOfStudy={areasOfStudy}
              setAreasOfStudy={setAreasOfStudy}
              intakeYears={intakeYears}
              setIntakeYears={setIntakeYears}
              specialRestrictions={specialRestrictions}
              setSpecialRestrictions={setSpecialRestrictions}
              applicability={applicability}
              setApplicability={setApplicability}
              setSelectedDateRange={setSelectedDateRange}
              citizenships={citizenships}
              setCitizenships={setCitizenships}
              minAmount={minAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
              setMinAmount={setMinAmount}
            />

            {/* right-side */}
            <div className="w-[73%] max-xl:w-[71%] max-lg:w-[100%]">
              {/* top section - seach bar */}
              <div className="flex justify-between max-md:flex-col max-md:gap-y-2">
                <div className="border-[1px] border-[#0E1B2C]  bg-white rounded-full flex  items-center gap-4 font-urban font-bold py-2 px-5 ">
                  <img src={coin} alt="coin" width={25} />
                  {scholarship?.pagination?.total != null ? (
                    <>
                      {scholarship.pagination.total === 0
                        ? "No"
                        : scholarship.pagination.total}{" "}
                      scholarship
                      {scholarship.pagination.total > 1 ? "s" : ""} found
                    </>
                  ) : (
                    "No data available"
                  )}
                </div>

                <div className=" relative  rounded-[40px]">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for scholarships"
                    className="pl-12 py-3 pr-4  border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none"
                  />
                  <div className="absolute inset-y-4 left-6">
                    <img src={search} width={18} alt="search" />
                  </div>
                </div>
              </div>

              {/* ....................................................................................................... */}
              {/* scholarships */}
              <div className=" flex flex-wrap justify-between">
                {/* card1 */}
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
                ) : scholarship?.data?.length ? (
                  scholarship?.data?.map((s) => (
                    <div
                      key={s.id}
                      className="border mt-10 border-black w-[49%]  max-md:w-[100%] rounded-[40px] p-8 max-xl:p-6  bg-white hover:shadow-lightshad "
                      onClick={() => naviagte(`/scholarshipoverview/${s._id}`)}
                    >
                      <div className="font-dela mb-3 text-[20px] max-xl:text-[16px]">
                        {s.scholarship_name}
                      </div>
                      <div className="font-urban max-xl:text-[15px]">
                        {s.overview.length > 100
                          ? `${s.overview.substring(0, 100)}...`
                          : s.overview}
                      </div>

                      <div className="border-t-[0.5px] border-[#bfc0c5] my-4 max-xl:my-3"></div>

                      <div className="flex justify-between">
                        <div>
                          <div className="text-[#898C9A] font-urban font-bold ">
                            Deadline
                          </div>
                          <div className="font-dela text-[15px] max-xl:text-[12px]">
                            {format(
                              new Date(s.scholarship_deadline),
                              "dd MMM yyyy"
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#898C9A] font-urban font-bold ">
                            Scholarship Type
                          </div>
                          <div className="font-dela text-[15px] max-xl:text-[12px]">
                            {s.types_of_scholarship}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[#898C9A] font-urban font-bold ">
                            Total cost
                          </div>
                          <div className="font-dela text-[15px] max-xl:text-[12px]">
                            ${s.scholarship_amount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex w-full h-64 justify-center items-center">
                    {" "}
                    <p className="text-lg">
                      No results found. Modify your filters to discover more
                      opportunities!{" "}
                    </p>
                  </div>
                )}
              </div>

              {/* ....................................................................................................... */}
            </div>
          </div>
          {scholarship?.data?.length > 0 && (
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>

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
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    </>
  );
};

export default ScholarshipFinder;
