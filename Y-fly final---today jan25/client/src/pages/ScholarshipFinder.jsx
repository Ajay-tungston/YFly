import React, { useCallback, useEffect, useState } from "react";
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

const ScholarshipFinder = () => {
  // const scholarships=[{
  //     id:1,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },
  // {
  //     id:2,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },
  // {
  //     id:3,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },
  // {
  //     id:4,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },
  // {
  //     id:5,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },
  // {
  //     id:6,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },{
  //     id:7,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // },
  // {
  //     id:8,
  //     scholarship:"Graduate Incentive Award MS Applied Economics",
  //     description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
  //     deadline:"05 Dec 2024",
  //     totalCost:71977
  // }]

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

  const [filters, setFilters] = useState([]);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/scholarships/get-filters"
        );
        console.log(response);
        setFilters(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilters();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/scholarships/get`,
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
          },
        }
      );
      console.log(response.data);
      setScholarship(response.data);
      setTotalPages(response.data?.pagination?.totalPages);
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
        />
        {/* second section */}
        <div className="flex items-center font-semibold bg-bluegradient w-10/12 my-10 mx-auto gap-x-3 px-10 rounded-full py-14 max-lg:hidden">
          <button className="px-6 py-2 w-[25%] max-lg:w-[35%] flex justify-between bg-white text-black rounded-full">
            Sort by
            <img src={downarrow} alt="down-arrow" width={20} />
          </button>
          <button className="px-6 py-2 w-[25%] max-lg:w-[35%] flex justify-between bg-white text-black rounded-full">
            Country
            <img src={downarrow} alt="down-arrow" width={20} />
          </button>
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
            />

            {/* right-side */}
            <div className="w-[73%] max-xl:w-[71%] max-lg:w-[100%]">
              {/* top section - seach bar */}
              <div className="flex justify-between max-md:flex-col max-md:gap-y-2">
                <div className="border-[1px] border-[#0E1B2C]  bg-white rounded-full flex  items-center gap-4 font-urban font-bold py-2 px-5 ">
                  <img src={coin} alt="coin" width={25} />
                  {scholarship?.pagination?.total} scholarship
                  {scholarship?.pagination?.total !== 1 ? "s" : ""} found
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
                    <div className="border mt-10 border-black w-[49%]  max-md:w-[100%] rounded-[40px] p-8 max-xl:p-6  bg-white hover:shadow-lightshad">
                      <div className="font-dela mb-3 text-[20px] max-xl:text-[16px]">
                        {s.scholarship_name}
                      </div>
                      <div className="font-urban max-xl:text-[15px]">
                        {s.overview}
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
                    <p> empty search result... </p>
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

          {/* pagination buttons */}
          {/* <div className='px-[40rem] font-urban text-[1.2rem] space-x-7 mt-[1rem] mb-[4rem] inline'>
                            <button className='rounded-full border px-5 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>1</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>2</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>3</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>4</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>5</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>6</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>7</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>8</button>
                        </div> */}
        </div>
        <Contactus />
        {/* FOOTER SECTION */}
        <Footer />
      </div>
    </>
  );
};

export default ScholarshipFinder;

// {/* pagination buttons */}
// <div className='font-urban text-[1.2rem] flex'>
// <button className='rounded-full border px-4 py-2'>1</button>
// <button className='rounded-full border px-4 py-2'>2</button>
// <button className='rounded-full border px-4 py-2'>3</button>
// <button className='rounded-full border px-4 py-2'>4</button>
// <button className='rounded-full border px-4 py-2'>5</button>

// </div>
