import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import dropdown from "../assets/images/nav-dropdown.svg";
import axios from "axios";
import menu from "../assets/images/menu.svg";
import usa from "../assets/images/usa.svg";
import uk from "../assets/images/uk.svg";
import canada from "../assets/images/canada.svg";
import germany from "../assets/images/german.svg";
import newzealand from "../assets/images/newzealand.svg";
import australia from "../assets/images/australia.svg";
import ireland from "../assets/images/ireland.svg";
import course from "../assets/images/bluesearch.svg";
import scholarship from "../assets/images/teacher.svg";
import ai from "../assets/images/aiblink.svg";
import { useDispatch, useSelector } from "react-redux";
import Countries from "./Countries";
import { logout, token } from "../Redux/store";
import Australia from "../assets/images/countrybg/Australia.png";
import USA from "../assets/images/countrybg/USA.png";
import Ireland from "../assets/images/countrybg/Ireland.png";
import Canada from "../assets/images/countrybg/canada.png";
import Germany from "../assets/images/countrybg/Germany.png";
import UK from "../assets/images/countrybg/uk.png";
import NewZealand from "../assets/images/countrybg/Newzealand.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const hideLoginPaths = [
    "/experience",
    "/selectcourses",
    "/education",
    "/matters",
    "/degree",
    "/countries",
    "/academics",
    "/proficiency",
  ];

  const shouldShowButton = !hideLoginPaths.includes(location.pathname);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      const getToken = localStorage.getItem("authToken");
      if (getToken) {
        dispatch(token({ token: getToken })); // fix: token key must match action.payload.token
      }
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/");
  };
  // Dropdown states for desktop
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isMajorProductOpen, setIsMajorProductOpen] = useState(false);

  // Refs for dropdown containers and mobile menu container
  const destinationRef = useRef(null);
  const productRef = useRef(null);
  const mobileRef = useRef(null);

  // Handlers for toggling dropdowns
  const handleDestination = () => setIsDestinationOpen((prev) => !prev);
  const handleMajorProduct = () => setIsMajorProductOpen((prev) => !prev);

  // Click outside handler to close all dropdowns (desktop and mobile)
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       destinationRef.current &&
  //       !destinationRef.current.contains(event.target)
  //     ) {
  //       setIsDestinationOpen(false);
  //     }
  //     if (productRef.current && !productRef.current.contains(event.target)) {
  //       setIsMajorProductOpen(false);
  //     }
  //     if (mobileRef.current && !mobileRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was on an interactive element
      if (event.target.closest('button, a, [role="button"]')) {
        return; // Don't close menus if clicking interactive elements
      }

      // Normal outside click handling
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setIsDestinationOpen(false);
      }
      if (productRef.current && !productRef.current.contains(event.target)) {
        setIsMajorProductOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Use click instead of mousedown and proper event phase
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const serviceRef = useRef(null);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleService = () => setIsServiceOpen(!isServiceOpen);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/get-name`
        );
        setServices(res?.data?.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  // const services = [
  //   { title: "Document Translation", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Attestation Service", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Content Write Expert Consultation", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Profile Evaluation", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Scholarship Essay Writing", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "University Shortlisting", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Education Loan", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Detailed Personal Consultation", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "LinkedIn Portfolio", route: "/cvpreparation", icon: "/course1.png" },
  //   { title: "Project Quality Analysis", route: "/cvpreparation", icon: "/course1.png" }
  // ];
  return (
    <nav className="w-11/12 top-0 absolute max-sm:h-[4vh] tracking-wider mt-4 font-urban px-7 py-4 bg-white rounded-full flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="h-9 max-sm:h-5"
        />
      </div>

      <div className="hidden lg:flex space-x-8 text-black">
        {/* Study Destinations Dropdown */}
        <div ref={destinationRef}>
          <div
            className="flex gap-2 cursor-pointer"
            onClick={handleDestination}
          >
            Study Destinations
            <img
              src={dropdown}
              alt="dropdown"
              width={16}
              className={
                isDestinationOpen ? "rotate-180 transition-transform" : ""
              }
            />
          </div>
          {isDestinationOpen && (
            <div
              className="absolute pl-4 w-[28vw] py-5 z-10 space-y-2 rounded-[20px] shadow-lightshad bg-[#fff] mt-[1rem] border focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div>
                {/* First Row */}
                <div className="flex items-center gap-2 px-0 py-2">
                  {/* Card 1 */}
                  <div
                    onClick={() => navigate("/study-usa")}
                    className=" group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}

                    <img
                      src={USA}
                      alt="USA background"
                      className="absolute inset-0 w-full h-full object-cover  z-0"
                    />
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={usa}
                        alt="USA flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        USA
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div
                    onClick={() => navigate("/study-uk")}
                    className="group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}
                    <img
                      src={UK}
                      alt="UK background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Overlay - MOVED HERE (outside content div) */}
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={uk}
                        alt="UK flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        UK
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div
                    onClick={() => navigate("/study-canada")}
                    className="group  relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}
                    <img
                      src={Canada}
                      alt="Canada background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={canada}
                        alt="Canada flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        Canada
                      </p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div
                    onClick={() => navigate("/study-germany")}
                    className="group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}
                    <img
                      src={Germany}
                      alt="Germany background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={germany}
                        alt="Germany flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        Germany
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex items-center gap-2 px-0 py-0">
                  {/* Card 5 */}
                  <div
                    onClick={() => navigate("/study-australia")}
                    className="group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}
                    <img
                      src={Australia}
                      alt="Australia background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={australia}
                        alt="USA flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        Australia
                      </p>
                    </div>
                  </div>

                  {/* Card 6 */}
                  <div
                    onClick={() => navigate("/study-ireland")}
                    className=" group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}
                    <img
                      src={Ireland}
                      alt="Ireland background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={ireland}
                        alt="Ireland flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        Ireland
                      </p>
                    </div>
                  </div>

                  {/* Card 7 */}
                  <div
                    onClick={() => navigate("/study-new-zealand")}
                    className="group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150"
                  >
                    {/* Background */}
                    <img
                      src={NewZealand}
                      alt="NewZealand background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Overlay - MOVED HERE (same position as Australia card) */}
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      <img
                        src={newzealand}
                        alt="NewZealand flag"
                        className="w-[60px] h-auto rounded-[8px] mx-auto"
                      />
                      <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                        New Zealand
                      </p>
                    </div>
                  </div>

                  {/* Card 8 */}
                  <div className=" group relative w-[120px] h-[80px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    {/* Background */}
                    <img
                      src={USA}
                      alt="USA background"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                    {/* Content */}
                    {/* View More - Responsive for both md and lg */}
                    <div className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                      {/* Subtle background pattern (similar to country cards but more minimal) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 z-0 opacity-30"></div>

                      {/* Color overlay (matches your country cards) */}
                      <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <p className="text-[#fff] font-dela text-[0.7rem] md:text-[0.8rem] text-center">
                          View More
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Major Products Dropdown */}
        <div ref={productRef}>
          <div
            className="flex gap-2 cursor-pointer"
            onClick={handleMajorProduct}
          >
            Major Products
            <img
              src={dropdown}
              alt="dropdown"
              width={16}
              className={
                isMajorProductOpen ? "rotate-180 transition-transform" : ""
              }
            />
          </div>
          {isMajorProductOpen && (
            <div
              className="absolute left-[30%] z-50 px-2 py-2 rounded-[20px] shadow-lightshad bg-white mt-[1rem] border focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="grid grid-cols-6 gap-2">
                <button
                  onClick={() => navigate("/coursefinder")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Course Finder
                </button>

                <button
                  onClick={() => navigate("/scholarship")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={scholarship} alt="icons" />
                  Scholarship Finder
                </button>

                <button
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                  onClick={() => navigate("/profilematcher")}
                >
                  <img src={ai} alt="icons" />
                  AI Profile Matcher
                </button>

                <button
                  // onClick={() => navigate("/coursefinder")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Coming Soon
                </button>
                <button
                  // onClick={() => navigate("/coursefinder")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Coming Soon
                </button>
                <button
                  // onClick={() => navigate("/courseSoon")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Coming Soon
                </button>
                <button
                  // onClick={() => navigate("/courseSoon")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Coming Soon
                </button>
                <button
                  // onClick={() => navigate("/courseSoon")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Coming Soon
                </button>
                <button
                  // onClick={() => navigate("/courseSoon")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Coming Soon
                </button>
                <button
                  // onClick={() => navigate("/courseSoon")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Course Soon
                </button>
                <button
                  // onClick={() => navigate("/course Soon")}
                  className="flex items-center gap-2 px-3 justify-center w-[10vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Course Soon
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate("/services")}
        >
          Services
        </div> */}

        <div ref={serviceRef}>
          <div className="flex gap-2 cursor-pointer" onClick={handleService}>
            Services
            <img
              src={dropdown}
              alt="dropdown"
              width={16}
              className={isServiceOpen ? "rotate-180 transition-transform" : ""}
            />
          </div>

          {isServiceOpen && (
            <div
              className="absolute left-[18%] z-50 px-2 py-2 rounded-[20px] shadow-lightshad bg-white mt-[1rem] border focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="grid grid-cols-4 gap-4 max-w-[1000px]">
                {(showAll ? services : services.slice(0, 8)).map(
                  (service, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(`/services/${service?._id}`)}
                      className="flex items-center gap-2 px-4 justify-between w-[220px] h-[60px] rounded-[10px] border border-black text-[#2b7cd6] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 font-dela text-[0.8rem]"
                    >
                      {service?.service_name}
                      <img
                        src={service?.imageUrl}
                        alt="icon"
                        className="w-5 h-5 object-cover"
                      />
                    </button>
                  )
                )}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 text-[#2b7cd6] transition font-dela text-[1rem]"
                >
                  {showAll ? "View less" : "View more"}
                  <span>{showAll ? "▲" : "▼"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => navigate("/contactus")}
        >
          Contact Us
        </div>
      </div>

      <>
        {isAuthenticated ? (
          <>
            {location.pathname === "/myprofile" ? (
              <div
                className="hidden lg:inline-block py-2 px-6 bg-white text-[#30589f] border-[2px] border-[#30589f] rounded-full font-bold hover:bg-[#30589f] hover:text-white transition-all"
                onClick={handleLogout}
              >
                Logout
              </div>
            ) : (
              <button
                onClick={() => navigate("/myprofile")}
                className="hidden lg:inline-block py-2 px-6 bg-white text-[#30589f] border-[2px] border-[#30589f] rounded-full font-bold hover:bg-[#30589f] hover:text-white transition-all"
              >
                My Profile
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden lg:inline-block py-2 px-6 bg-white text-[#30589f] border-[2px] border-[#30589f] rounded-full font-bold hover:bg-[#30589f] hover:text-white transition-all"
          >
            Login
          </button>
        )}
      </>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden" ref={mobileRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={menu} alt="Menu" className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          ref={mobileRef}
          className="absolute z-50 bg-white top-[70px] left-0 w-full text-black flex flex-col items-center rounded-[80px] space-y-4 p-4 lg:hidden"
        >
          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={handleDestination}
          >
            Study Destinations
            <img
              src={dropdown}
              alt="dropdown"
              className={
                isDestinationOpen
                  ? "rotate-180 transition-transform w-4"
                  : "w-4"
              }
            />
          </div>
          {isDestinationOpen && (
            <div className="flex flex-col items-center px-4 py-4 bg-white border rounded-[20px] shadow-lightshad focus:outline-none space-y-3">
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 */}
                <div
                  onClick={() => navigate("/study-usa")}
                  onTouchEnd={() => navigate("/study-usa")}
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    // Add keyboard support
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-usa");
                    }
                  }}
                >
                  <img
                    src={USA}
                    alt="USA background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <img
                      src={usa}
                      alt="USA flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      USA
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  onClick={() => navigate("/study-uk")}
                  onTouchEnd={() => navigate("/study-uk")} // Added for better mobile touch support
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-uk");
                    }
                  }}
                >
                  {" "}
                  <img
                    src={UK}
                    alt="UK background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div
                    onClick={() => navigate("/study-uk")}
                    className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"
                  ></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <img
                      src={uk}
                      alt="UK flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      UK
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  onClick={() => navigate("/study-canada")}
                  onTouchEnd={() => navigate("/study-canada")} // Added for better mobile touch support
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-canada");
                    }
                  }}
                >
                  <img
                    src={Canada}
                    alt="Canada background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <img
                      src={canada}
                      alt="Canada flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      Canada
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div
                  onClick={() => navigate("/study-germany")}
                  onTouchEnd={() => navigate("/study-germany")} // Added for better mobile touch support
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-germany");
                    }
                  }}
                >
                  <img
                    src={Germany}
                    alt="Germany background"
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" // Added pointer-events-none
                  />
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5] pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <img
                      src={germany}
                      alt="Germany flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      Germany
                    </p>
                  </div>
                </div>

                {/* Card 5 */}
                <div
                  onClick={() => navigate("/study-new-zealand")}
                  onTouchEnd={() => navigate("/study-new-zealand")} // Added for better mobile touch support
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button" // Better accessibility
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-new-zealand");
                    }
                  }}
                >
                  <img
                    src={NewZealand}
                    alt="New Zealand background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <img
                      src={newzealand}
                      alt="NZ flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      New Zealand
                    </p>
                  </div>
                </div>

                {/* Card 6 */}
                <div
                  onClick={() => navigate("/study-australia")}
                  onTouchEnd={() => navigate("/study-australia")} // Added for better mobile touch support
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-australia");
                    }
                  }}
                >
                  <img
                    src={Australia}
                    alt="Australia background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <img
                      src={australia}
                      alt="Australia flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      Australia
                    </p>
                  </div>
                </div>

                {/* Card 7 */}
                <div
                  onClick={() => navigate("/study-ireland")}
                  onTouchEnd={() => navigate("/study-ireland")} // Added for better mobile touch support
                  className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 cursor-pointer select-none" // Added cursor-pointer and select-none
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate("/study-ireland");
                    }
                  }}
                >
                  <img
                    src={Ireland}
                    alt="Ireland background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <img
                      src={ireland}
                      alt="Ireland flag"
                      className="w-[45px] h-auto rounded-[8px] mx-auto"
                    />
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      Ireland
                    </p>
                  </div>
                </div>

                {/* View More */}
                <div className="group relative w-full h-[90px] border rounded-[15px] overflow-hidden hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <div className="absolute inset-0 bg-[#F137378C] group-hover:bg-[#6d94f780] transition-colors duration-150 z-[5]"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <p className="text-[#fff] font-dela text-[0.7rem] text-center mt-1">
                      View More
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={handleMajorProduct}
          >
            Major Products
            <img
              src={dropdown}
              alt="dropdown"
              className={
                isMajorProductOpen
                  ? "rotate-180 transition-transform w-4"
                  : "w-4"
              }
            />
          </div>
          {isMajorProductOpen && (
            <div className="flex  flex-col items-center px-4 py-2 space-y-2 bg-white border rounded-[20px] shadow-lightshad focus:outline-none">
              <button
                onClick={() => navigate("/coursefinder")}
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
              >
                <img src={course} alt="icons" />
                Course Finder
              </button>

              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/scholarship")}
              >
                <img src={scholarship} alt="icons" />
                Scholarship Finder
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
            </div>
          )}

          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={() => navigate("/services")}
          >
            Services
          </div>
          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={() => navigate("/contactus")}
          >
            Contact Us
          </div>
         <>
          {isAuthenticated ? (
            <>
            {location.pathname === "/myprofile" ? (
              <div
                className="inline-block py-2 px-6 bg-white text-[#30589f] border-[2px] border-[#30589f] rounded-full font-bold hover:bg-[#30589f] hover:text-white transition-all"
                onClick={handleLogout}
              >
                Logout
              </div>
            ) : (
              <button
                className="inline-block py-2 px-8 text-[#30589f] border-[2px] border-[#30589f] font-urban font-bold overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-bluegradient before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                onClick={() => navigate("/myprofile")}
              >
                My Profile
              </button>
            )}
            </>
          ) : (
            <button
              className="inline-block py-2 px-8 text-[#30589f] border-[2px] border-[#30589f] font-urban font-bold overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-bluegradient before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          </>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
