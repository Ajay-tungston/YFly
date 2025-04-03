import down from "../assets/images/down.svg";
import trashclose from "../assets/images/trashclose.svg";
import React, { useEffect, useState } from "react";
import profile from "../assets/images/profile.svg";
import arrow from "../assets/images/downarrowblack.svg";
import add from "../assets/images/add.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/greytrash.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = (props, setEditingCourse) => {
  //modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  //editing course
  const [editCourse, setEditCourse] = useState({
    course_level: "",
    discipline: "",
    area_of_study: "",
    country: "",
    // university_ranking: "",
    university_name: "",
    // university_logo: "",
    course_duration: "",
    application_deadline: "",
    overview: "",
    intakes: [{ month: "", year: "" }],
    testRequirements: [
      { testRequirementName: "Requirement 1", overallScore: "" },
    ],
    eligibilityRequirements: [
      {
        requirementType: "",
        // gpaRange: "",
        minGPA: "",
        backlogRange: "",
        workExperience: "",
        entranceExam: "",
      },
    ],
    application_requirements: [{ requirement: "", isRequired: false }],
    job_roles: [{ jobrole: "" }],
    top_recruiters: [{ recruiters_name: "", logo: null }],
    scholarship_applicable: [{ scholarship: "" }],
    tution_fee: "",
    funding_options: [{ fundingOption: "" }],
  });

  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/university/get-all`
        );
        setUniversities(response?.data?.university);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUniversities();
  }, []);

  //close the form and return to the sch0larship list
  const handleCancel = () => {
    setModal(false);
  };

  //fetch data
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/get/${props.id}`
        );
        const data = response.data.course;
        setEditCourse({
          course_level: data.course_level || "",
          discipline: data.discipline || "",
          area_of_study: data.area_of_study || "",
          country: data.country || "",
        //   university_ranking: data.university_ranking || "",
          university_name: data?.university_name?.university_name || "",
        //   university_logo: data.university_logo || "",
          course_duration: data.course_duration || "",
          application_deadline: data.application_deadline || "",
          overview: data.overview || "",
          intakes: data.intakes || [{ month: "", year: "" }],
          testRequirements: data.testRequirements || [
            { testRequirementName: "Requirement 1", overallScore: "" },
          ],
          eligibilityRequirements: data.eligibilityRequirements || [
            {
              requirementType: "",
              // gpaRange: "",
              minGPA: "",
              backlogRange: "",
              workExperience: "",
              entranceExam: "",
            },
          ],
          application_requirements: data.application_requirements || [
            { requirement: "", isRequired: false },
          ],
          job_roles: data.job_roles || [{ jobrole: "" }],
          top_recruiters: data.top_recruiters || [
            { recruiters_name: "", logo: null },
          ],
          scholarship_applicable: data.scholarship_applicable || [
            { scholarship: "" },
          ],
          tution_fee: data.tution_fee || "",
          funding_options: data.funding_options || [{ fundingOption: "" }],
        });
      } catch (error) {
        console.error("Error fetching scholarship data:", error);
        console.error(
          "Error updating course:",
          error.response?.data || error.message
        );
      }
    };
    if (props.id) {
      getCourseData();
    }
  }, [props.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Object.keys(editCourse).forEach((key) => {
    //     if (key === "university_logo" && editCourse.university_logo) {
    //         formData.append(key, editCourse.university_logo);
    //     } else if (
    //         key === "job_roles" ||
    //         key === "scholarship_applicable" ||
    //         key === "funding_options"
    //     ) {
    //         // Convert objects to strings
    //         const stringArray = editCourse[key].map((item) =>
    //             key === "job_roles"
    //                 ? item.jobrole
    //                 : key === "scholarship_applicable"
    //                     ? item.scholarship
    //                     : item.fundingOption
    //         );
    //         formData.append(key, JSON.stringify(stringArray));
    //     } else if (Array.isArray(editCourse[key])) {
    //         formData.append(key, JSON.stringify(editCourse[key]));
    //     } else {
    //         formData.append(key, editCourse[key]);
    //     }
    // });
    Object.keys(editCourse).forEach((key) => {
      if (Array.isArray(editCourse[key])) {
        formData.append(key, JSON.stringify(editCourse[key]));
      } else {
        formData.append(key, editCourse[key]);
      }
    });

    try {
      console.log("Payload:", editCourse);
      console.log("FormData:", formData);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/courses/edit/${props.id}`,
        formData
      );
      toast.success("course updated successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      window.location.reload();
      if (props.setEditingCourse) {
        props.setEditingCourse(false);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  //courselevel
  const [isOpenCourseLevel, setIsOpenCourseLevel] = useState(false);
  const handleCourseLevel = (option) => {
    setEditCourse((prevData) => ({ ...prevData, course_level: option }));
    setIsOpenCourseLevel(false);
    if(option==="MBA"){
      handleDiscipline("")
    }
  };

  // Discipline
  const [isOpenDiscipline, setIsOpenDiscipline] = useState(false);
  const handleDiscipline = (option) => {
    setEditCourse((prevData) => ({ ...prevData, discipline: option }));
    setIsOpenDiscipline(false);
  };

  // Area of Study
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const handleAreaOfStudyChange = (e) => {
    const value = e.target.value;
    setEditCourse((prevData) => ({ ...prevData, area_of_study: value }));
  };

  // Country Selection Handler
  const handleCountry = (option) => {
    setEditCourse((prevData) => ({ ...prevData, country: option }));
    setIsOpenCountry(false);
  };

  // University Ranking Input Handler
  const handleUniversityRankingChange = (e) => {
    setEditCourse((prevData) => ({
      ...prevData,
      university_ranking: e.target.value,
    }));
  };

  // University Name Input Handler
  const handleUniversityNameChange = (e) => {
    setEditCourse((prevData) => ({
      ...prevData,
      university_name: e.target.value,
    }));
  };

  // University Logo File Handler
  // const handleUniversityFileChange = (e) => {
  //     if (e.target.files[0]) {
  //         setEditCourse((prevData) => ({
  //             ...prevData,
  //             university_logo: e.target.files[0], // Store file directly
  //         }));
  //     }
  // };
  const handleUniversityFileChange = (e) => {
    if (e.target.files[0]) {
      setEditCourse((prevData) => ({
        ...prevData,
        university_logo: e.target.files[0], // Store file directly
      }));
    }
  };

  // State for toggling course duration dropdown
  const [isOpenCourseDuration, setIsOpenCourseDuration] = useState(false);
  const handleCourseDuration = (option) => {
    setEditCourse((prevData) => ({
      ...prevData,
      course_duration: option, // Update course_duration in editCourse
    }));
    setIsOpenCourseDuration(false); // Close the dropdown after selection
  };

  // Handler for application deadline input
  const handleApplicationDeadlineChange = (e) => {
    setEditCourse((prevData) => ({
      ...prevData,
      application_deadline: e.target.value, // Update application_deadline in editCourse
    }));
  };

  // Handlers for managing intakes
  const handleIntakeChange = (index, field, value) => {
    const updatedIntakes = [...editCourse.intakes];
    updatedIntakes[index][field] = value; // Update specific field in intake
    setEditCourse((prevData) => ({
      ...prevData,
      intakes: updatedIntakes, // Update intakes array in state
    }));
  };

  const handleAddIntake = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      intakes: [...prevData.intakes, { month: "", year: "" }], // Add a new empty intake
    }));
  };

  const handleRemoveIntake = (index) => {
    const updatedIntakes = editCourse.intakes.filter((_, i) => i !== index); // Remove intake at index
    setEditCourse((prevData) => ({
      ...prevData,
      intakes: updatedIntakes, // Update state with remaining intakes
    }));
  };

  // Test Requirements
  const handleTestRequirementChange = (index, field, value) => {
    const updatedTestRequirements = [...editCourse.testRequirements];
    console.log(updatedTestRequirements);

    // Ensure the index exists in the array before updating
    if (index >= 0 && index < updatedTestRequirements.length) {
      updatedTestRequirements[index][field] = value;

      // Validate "testRequirementName" field
      if (field === "testRequirementName" && !value.trim()) {
        toast.error("Please fill in all Test Requirement Names.", {
          position: "top-center",
          autoClose: 2000,
          style: { backgroundColor: "#D22B2B", color: "white" },
        });
        return;
      }

      // Update the state with the modified test requirements
      setEditCourse((prevData) => ({
        ...prevData,
        testRequirements: updatedTestRequirements,
      }));
    } else {
      console.error("Invalid index for test requirements:", index);
    }
  };

  const handleAddTestRequirement = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      testRequirements: [
        ...prevData.testRequirements,
        { testRequirementName: "Requirement 1", overallScore: "" }, // Default values
      ],
    }));
  };

  const handleRemoveTestRequirement = (index) => {
    const updatedTestRequirements = editCourse.testRequirements.filter(
      (_, i) => i !== index
    );
    setEditCourse((prevData) => ({
      ...prevData,
      testRequirements: updatedTestRequirements,
    }));
  };

  // Eligibility Requirements
  const handleEligibilityInputChange = (index, field, value) => {
    const updatedEligibilityRequirements = [
      ...editCourse.eligibilityRequirements,
    ];
    updatedEligibilityRequirements[index][field] = value;

    setEditCourse((prevData) => ({
      ...prevData,
      eligibilityRequirements: updatedEligibilityRequirements,
    }));
  };

  const handleEligibilityAddRequirement = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      eligibilityRequirements: [
        ...prevData.eligibilityRequirements,
        {
          requirementType: "",
          // gpaRange: "",
          minGPA: "",
          backlogRange: "",
          workExperience: "",
          entranceExam: "",
        },
      ],
    }));
  };

  const handleEligibilityRemoveRequirement = (index) => {
    const updatedEligibilityRequirements =
      editCourse.eligibilityRequirements.filter((_, i) => i !== index);
    setEditCourse((prevData) => ({
      ...prevData,
      eligibilityRequirements: updatedEligibilityRequirements,
    }));
  };

  // Application Requirements
  const handleApplicationInputChange = (index, field, value) => {
    const updatedApplicationRequirements = [
      ...editCourse.application_requirements,
    ];
    updatedApplicationRequirements[index][field] = value;
    setEditCourse((prevData) => ({
      ...prevData,
      application_requirements: updatedApplicationRequirements,
    }));
  };

  const handleApplicationAddRequirement = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      application_requirements: [
        ...prevData.application_requirements,
        { requirement: "", isRequired: false },
      ],
    }));
  };

  const handleApplicationRemoveRequirement = (index) => {
    const updatedApplicationRequirements =
      editCourse.application_requirements.filter((_, i) => i !== index);
    setEditCourse((prevData) => ({
      ...prevData,
      application_requirements: updatedApplicationRequirements,
    }));
  };

  // Job Roles Guaranteed
  const handleJobRoleChange = (index, value) => {
    const updatedRoles = [...editCourse.job_roles];
    updatedRoles[index].jobrole = value;
    setEditCourse((prevData) => ({
      ...prevData,
      job_roles: updatedRoles,
    }));
  };

  const handleAddJobRole = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      job_roles: [...prevData.job_roles, { jobrole: "" }],
    }));
  };

  const handleRemoveJobRole = (index) => {
    const updatedJobRoles = editCourse.job_roles.filter((_, i) => i !== index);
    setEditCourse((prevData) => ({
      ...prevData,
      job_roles: updatedJobRoles,
    }));
  };

  // Top Recruiters Logo
  const handleTopRecruitersInputChange = (index, field, value) => {
    const updatedRecruiters = [...editCourse.top_recruiters];
    updatedRecruiters[index][field] = value;
    setEditCourse((prevData) => ({
      ...prevData,
      top_recruiters: updatedRecruiters,
    }));
  };

  const handleTopRecruitersFileChange = (index, e) => {
    if (e.target.files[0]) {
      const updatedRecruiters = [...editCourse.top_recruiters];
      updatedRecruiters[index].logo = e.target.files[0];
      setEditCourse((prevData) => ({
        ...prevData,
        top_recruiters: updatedRecruiters,
      }));
    }
  };

  const handleAddTopRecruiters = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      top_recruiters: [
        ...prevData.top_recruiters,
        { recruiters_name: "", logo: null },
      ],
    }));
  };

  const handleRemoveTopRecruiters = (index) => {
    const updatedRecruiters = editCourse.top_recruiters.filter(
      (_, i) => i !== index
    );
    setEditCourse((prevData) => ({
      ...prevData,
      top_recruiters: updatedRecruiters,
    }));
  };

  const handleScholarshipChange = (index, value) => {
    const updatedScholarships = [...editCourse.scholarship_applicable];
    updatedScholarships[index].scholarship = value;
    setEditCourse((prevData) => ({
      ...prevData,
      scholarship_applicable: updatedScholarships,
    }));
  };

  const handleAddScholarship = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      scholarship_applicable: [
        ...prevData.scholarship_applicable,
        { scholarship: "" },
      ],
    }));
  };

  const handleRemoveScholarship = (index) => {
    const updatedScholarships = editCourse.scholarship_applicable.filter(
      (_, i) => i !== index
    );
    setEditCourse((prevData) => ({
      ...prevData,
      scholarship_applicable: updatedScholarships,
    }));
  };

  const handleTuitionFeeChange = (value) => {
    setEditCourse((prevData) => ({
      ...prevData,
      tution_fee: value,
    }));
  };

  const handleFundingOptionChange = (index, value) => {
    const updatedFundingOptions = [...editCourse.funding_options];
    updatedFundingOptions[index].fundingOption = value;
    setEditCourse((prevData) => ({
      ...prevData,
      funding_options: updatedFundingOptions,
    }));
  };

  const handleAddFundingOption = () => {
    setEditCourse((prevData) => ({
      ...prevData,
      funding_options: [...prevData.funding_options, { fundingOption: "" }],
    }));
  };

  const handleRemoveFundingOption = (index) => {
    const updatedFundingOptions = editCourse.funding_options.filter(
      (_, i) => i !== index
    );
    setEditCourse((prevData) => ({
      ...prevData,
      funding_options: updatedFundingOptions,
    }));
  };

  return (
    <div>
      <button onClick={toggleModal} className="pt-2">
        <img src={edit} width={18} alt="edit" />
      </button>

      {/* edit modal */}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-[gray] opacity-50 "></div>
          {/* edit form */}

          <form
            className="px-10 py-10  w-[94%] max-w-[90%] bg-white z-50 max-h-screen overflow-y-auto"
            onSubmit={handleSubmit}
          >
            <ToastContainer />
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* edit course top section */}
            <div className="flex justify-between items-center font-urban">
              <div>
                <div className="text-[#0E1B2C] font-bold">Edit course</div>
                <div className="text-[#898C9A] text-[0.8rem]">
                  Upload course details here.
                </div>
              </div>
              <div className="flex text-[0.8rem] font-bold">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border-[#BFBFBF] border-[1px] mr-3 px-3 py-1 rounded-[9px] text-[#BFBFBF]"
                >
                  Cancel
                </button>
                <button className="bg-[#30589F] px-3 py-1 rounded-[9px] text-white">
                  Save
                </button>
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Course Name section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              <div className="flex text-[0.9rem]">
                <div className="w-[20%] max-xl:w-[15%]">Course Name</div>
                {/* Course Level Dropdown */}
                <button
                  type="button"
                  onClick={() => setIsOpenCourseLevel(!isOpenCourseLevel)}
                  className="w-[20%] max-xl:w-[25%] flex items-center px-5 py-1 justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                >
                  {editCourse?.course_level || "Course Level"}
                  <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {isOpenCourseLevel && (
                  <div className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[15%] max-xl:w-[18%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                    <ul>
                      <li
                        onClick={() => handleCourseLevel("Masters")}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        Masters
                      </li>
                      <li
                        onClick={() => handleCourseLevel("MBA")}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        MBA
                      </li>
                      <li
                        onClick={() => handleCourseLevel("Bachelors")}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        Bachelors
                      </li>
                    </ul>
                  </div>
                )}
{editCourse?.course_level!=="MBA"&&<>
                <div className="w-[10%] max-xl:w-[5%] flex items-center justify-center">
                  of
                </div>

                {/* Discipline Dropdown */}
                <button
                  type="button"
                  onClick={() => setIsOpenDiscipline(!isOpenDiscipline)}
                  className="flex w-[20%] max-xl:w-[25%] items-center text-[0.8rem] px-5 py-1 justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                >
                  {editCourse?.discipline || "Discipline"}
                  <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {isOpenDiscipline && (
                  <div className="absolute mt-10 ml-[34.2rem] max-xl:ml-[20.6rem] w-[15%] max-xl:w-[18%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                    <ul className="text-[0.8rem] h-[29vh] overflow-y-auto">
                      <li
                        onClick={() =>
                          handleDiscipline("Agriculture, Forestry & Fishery")
                        }
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        Agriculture, Forestry & Fishery
                      </li>
                      <li
                        onClick={() =>
                          handleDiscipline("Agriculture & Building")
                        }
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        Agriculture & Building
                      </li>
                      <li
                        onClick={() => handleDiscipline("Arts")}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        Arts
                      </li>
                      <li
                        onClick={() =>
                          handleDiscipline(
                            "Commerce, Business & Administration"
                          )
                        }
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                      >
                        Commerce, Business & Administration
                      </li>
                    </ul>
                  </div>
                )}
                </>}
                <div className="w-[10%] max-xl:w-[5%] flex items-center justify-center">
                  in
                </div>

                {/* Area of Study Input */}
                <input
                  className="w-[20%] max-xl:w-[25%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                  placeholder="Enter Area of Study"
                  value={editCourse?.area_of_study || ""}
                  onChange={handleAreaOfStudyChange}
                />
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Country and University Ranking Section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              <div className="flex text-[0.9rem]">
                <div className="w-[20%] max-xl:w-[15%]">Country</div>

                {/* Country Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setIsOpenCountry(!isOpenCountry)} // Toggle dropdown visibility
                  className="w-[30%] flex items-center px-5 py-1 justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                >
                  {editCourse?.country || "Select Country"}
                  <img src={down} alt="down" width={12} className="ml-8" />
                </button>

                {/* Country Dropdown */}
                {isOpenCountry && (
                  <div className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22.2%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                    <ul className="h-[25vh] overflow-y-auto">
                      {[
                        "USA",
                        "Canada",
                        "United Kingdom",
                        "Ireland",
                        "New Zealand",
                        "Australia",
                        "Germany",
                      ].map((country) => (
                        <li
                          key={country}
                          onClick={() => handleCountry(country)}
                          className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* University Ranking */}
                <div className="w-[25%] max-xl:w-[25%] flex items-center justify-center">
                  University Ranking
                </div>
                <select
                  className="w-[25%] bg-[#F9F9F9] border border-[#898C9A] rounded-md p-2 text-[0.8rem]"
                  value={editCourse?.university_name}
                  onChange={handleUniversityNameChange}
                >
                  <option value="">Select University</option>
                  {universities.map((university) => (
                    <option
                      key={university._id}
                      value={university.university_name}
                    >
                      {university.university_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* University Section */}
            {/* <div className="font-urban mr-10 max-xl:mr-0">
                            <div className="flex items-center text-[0.9rem]">
                                <div className="w-[20%] max-xl:w-[15%]">University</div>
                                <input
                                    className="w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                                    placeholder="Enter University Name"
                                    value={editCourse?.university_name || ""}
                                    onChange={handleUniversityNameChange}
                                />

                                <div className="w-[25%] max-xl:w-[25%] flex items-center justify-center">
                                    Upload University Logo
                                </div>
                                <div>
                                    <div className="">
                                        <label
                                            htmlFor="upload-photo"
                                            className="cursor-pointer flex border max-xl:text-[0.8rem] border-[#898C9A] text-[#30589F] px-5 py-2 rounded-md"
                                        >
                                            <img src={add} alt="add" width={17} className="mr-2" />
                                            {editCourse?.university_logo?.name || "Upload Logo"}
                                        </label>
                                        <input
                                            id="upload-photo"
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            className="hidden"
                                            onChange={handleUniversityFileChange}
                                        />
                                    </div>
                                    <div className="text-[0.7rem] flex justify-center text-[#FF161F] mt-2">
                                        *max. 730px width & 240px height
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-[#BFBFBF] border-b-[1px] my-5"></div> */}
            {/* Course Duration and Application Deadline Section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              <div className="flex text-[0.9rem]">
                <div className="w-[20%] max-xl:w-[15%]">Course Duration</div>
                <button
                  type="button"
                  onClick={() => setIsOpenCourseDuration(!isOpenCourseDuration)} // Toggle dropdown visibility
                  className="w-[30%] flex items-center px-5 py-1 justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                >
                  {editCourse?.course_duration || "Select"}
                  <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {isOpenCourseDuration && (
                  <div className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22.2%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                    <ul className="h-[23vh] overflow-y-auto">
                      {[
                        "Less than a year",
                        "1 year",
                        "2 years",
                        "3 years",
                        "4 years",
                        "5 years",
                        "6 years",
                      ].map((duration) => (
                        <li
                          key={duration}
                          onClick={() => handleCourseDuration(duration)}
                          className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                          {duration}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="w-[25%] max-xl:w-[25%] flex items-center justify-center">
                  Application Deadline
                </div>
                <input
                  className="w-[25%] max-xl:w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                  type="date" // Use date input for better user experience
                  value={editCourse?.application_deadline || ""}
                  onChange={handleApplicationDeadlineChange}
                />
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Overview Section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              <div className="flex text-[0.9rem]">
                <div className="w-[20%] max-xl:w-[15%]">Overview</div>
                <textarea
                  className="w-[80%] p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                  placeholder="Overview"
                  rows="5"
                  value={editCourse?.overview || ""}
                  onChange={(e) =>
                    setEditCourse((prevData) => ({
                      ...prevData,
                      overview: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Intakes Section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              {editCourse?.intakes?.map((intake, index) => (
                <div
                  key={index}
                  className="flex text-[0.9rem] mt-4 items-center"
                >
                  <div className="w-[20%] max-xl:w-[15%]">Intakes</div>
                  <select
                    className="w-[20%] mr-5 flex items-center px-5 py-1 text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                    value={intake.month}
                    onChange={(e) =>
                      handleIntakeChange(index, "month", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-[20%] flex items-center px-5 py-1 text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                    value={intake.year}
                    onChange={(e) =>
                      handleIntakeChange(index, "year", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {["2024", "2025", "2026", "2027"].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveIntake(index)}
                    >
                      <img src={trashclose} alt="remove" width={16} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleAddIntake}
              >
                <img src={add} alt="add intake" width={17} className="mr-1" />
                Add Intakes
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Test Requirements section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              {editCourse?.testRequirements?.map((requirement, index) => (
                <div
                  key={index}
                  className="flex text-[0.9rem] mt-4 items-center"
                >
                  <div className="w-[20%] max-xl:w-[15%]">
                    Test Requirements
                  </div>
                  <select
                    className="w-[25%] px-4 py-1 text-[#898C9A] border-[#898C9A] bg-[#F9F9F9] rounded-md"
                    value={requirement.testRequirement}
                    onChange={(e) =>
                      handleTestRequirementChange(
                        index,
                        "testRequirementName",
                        e.target.value
                      )
                    }
                  >
                    <option value="Select" disabled>
                      Select Requirement
                    </option>
                    <option value="Requirement 1">Requirement 1</option>
                    <option value="Requirement 2">Requirement 2</option>
                    <option value="Requirement 3">Requirement 3</option>
                  </select>
                  <div className="w-[25%] flex items-center justify-center">
                    Overall Required Score
                  </div>
                  <input
                    className="w-[25%] bg-[#F9F9F9] border-[#898C9A] rounded-md"
                    placeholder="Enter here"
                    value={requirement.overallScore}
                    onChange={(e) =>
                      handleTestRequirementChange(
                        index,
                        "overallScore",
                        e.target.value
                      )
                    }
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTestRequirement(index)}
                      className="ml-4 text-red-500"
                    >
                      <img src={trashclose} alt="remove" width={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleAddTestRequirement}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Test Requirement
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Eligibility Requirements section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              {editCourse?.eligibilityRequirements?.map((req, index) => (
                <div
                  key={index}
                  className="flex text-[0.9rem] mt-4 items-center"
                >
                  <div className="w-[20%] max-xl:w-[15%]">
                    Eligibility Requirements
                  </div>
                  <select
                    className="w-[30%] px-5 py-1 text-[#898C9A] border-[#898C9A] bg-[#F9F9F9] rounded-md"
                    value={req.requirementType}
                    onChange={(e) =>
                      handleEligibilityInputChange(
                        index,
                        "requirementType",
                        e.target.value
                      )
                    }
                  >
                    <option value="" disabled>
                      Select Requirement
                    </option>
                    <option value="Min GPA">Min GPA</option>
                    <option value="Backlogs Applicable">
                      Backlogs Applicable
                    </option>

                    <option value="Work Experience">Work Experience</option>
                  </select>
                  {/* {req.requirementType === "Min GPA" && (
                    <input
                      className="w-[25%] ml-2 bg-[#F9F9F9] border-[#898C9A] rounded-md"
                      placeholder="Enter GPA Range"
                      value={req.gpaRange}
                      onChange={(e) =>
                        handleEligibilityInputChange(
                          index,
                          "gpaRange",
                          e.target.value
                        )
                      }
                    />
                  )} */}
                  {req.requirementType === "Min GPA" && (
              <div className="flex space-x-2 w-32 ">
                <input
                  type="number" 
                  min="1"
                  max="10"
                  className="w-full ml-2 bg-[#F9F9F9] border-[#898C9A] rounded-md"
                  placeholder="Min GPA"
                  value={req.minGPA || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value === "") {
                      handleEligibilityInputChange(index, "minGPA", "");
                      return;
                    }
                    let numValue = parseFloat(value);
                    if (numValue < 1) numValue = 1;
                    if (numValue > 10) numValue = 10;
                    handleEligibilityInputChange(index, "minGPA", numValue);
                  }}
                  onBlur={(e) => {
                    let numValue = parseFloat(e.target.value);
                    if (isNaN(numValue) || numValue < 1) numValue = 1;
                    if (numValue > 10) numValue = 10;
                    handleEligibilityInputChange(index, "minGPA", numValue);
                  }}
                /></div>)}
                  {req.requirementType === "Backlogs Applicable" && (
                    <input
                      className="w-[25%] ml-2 bg-[#F9F9F9] border-[#898C9A] rounded-md"
                      placeholder="Enter Backlog Range"
                      value={req.backlogRange}
                      onChange={(e) =>
                        handleEligibilityInputChange(
                          index,
                          "backlogRange",
                          e.target.value
                        )
                      }
                    />
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleEligibilityRemoveRequirement(index)}
                      className="ml-4 text-red-500"
                    >
                      <img src={trashclose} alt="remove" width={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleEligibilityAddRequirement}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Eligibility Requirement
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Application Requirements section */}
            <div className="font-urban mr-10 max-xl:mr-0 mt-8">
              {editCourse?.application_requirements?.map((requi, index) => (
                <div
                  key={index}
                  className="flex items-center text-[0.9rem] mt-4"
                >
                  <div className="w-[20%] max-xl:w-[15%]">
                    Application Requirements
                  </div>
                  <input
                    className="w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                    placeholder="Enter requirement"
                    value={requi.requirement}
                    onChange={(e) =>
                      handleApplicationInputChange(
                        index,
                        "requirement",
                        e.target.value
                      )
                    }
                  />
                  <div className="ml-[8%] flex items-center">
                    <input
                      type="checkbox"
                      className="rounded mr-1"
                      checked={requi.isRequired}
                      onChange={(e) =>
                        handleApplicationInputChange(
                          index,
                          "isRequired",
                          e.target.checked
                        )
                      }
                    />
                    <div>Required</div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleApplicationRemoveRequirement(index)}
                    >
                      <img src={trashclose} alt="remove" width={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleApplicationAddRequirement}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Requirement
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Job roles guaranteed section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              {editCourse?.job_roles?.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center text-[0.9rem] mt-4"
                >
                  <div className="w-[20%] max-xl:w-[15%]">
                    Job Roles Guaranteed
                  </div>
                  <input
                    className="w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                    placeholder="Enter job role"
                    value={role.jobrole}
                    onChange={(e) => handleJobRoleChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveJobRole(index)}
                    >
                      <img src={trashclose} alt="remove" width={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleAddJobRole}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Job Role
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* top recruiters section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              {editCourse?.top_recruiters?.map((recruiter, index) => (
                <div
                  key={index}
                  className="flex items-center text-[0.9rem] mt-4"
                >
                  {/* Recruiter Name Input */}
                  <div className="w-[20%] max-xl:w-[15%]">Top Recruiters</div>
                  <input
                    className="w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                    placeholder="Enter Recruiter Name"
                    value={recruiter.recruiters_name}
                    onChange={(e) =>
                      handleTopRecruitersInputChange(
                        index,
                        "recruiters_name",
                        e.target.value
                      )
                    }
                  />
                  {/* Recruiter Logo Input */}
                  <div className="w-[25%] max-xl:w-[25%] flex items-center justify-center">
                    Recruiter Logo
                  </div>
                  <div>
                    <label
                      htmlFor={`recruiter-${index}`}
                      className="cursor-pointer flex border max-xl:text-[0.8rem] border-[#898C9A] text-[#30589F] px-5 py-2 rounded-md"
                    >
                      <img src={add} alt="add" width={17} className="mr-2" />
                      {recruiter.logo ? recruiter.logo.name : "Upload Logo"}
                    </label>
                    <input
                      id={`recruiter-${index}`}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                      onChange={(e) => handleTopRecruitersFileChange(index, e)}
                    />
                  </div>
                  {/* Remove Button */}
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveTopRecruiters(index)}
                    >
                      <img src={trashclose} alt="remove" />
                    </button>
                  )}
                </div>
              ))}
              {/* Add Top Recruiter Button */}
              <button
                type="button"
                className="flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleAddTopRecruiters}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Top Recruiter
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/* Scholarship Applicable section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              {editCourse?.scholarship_applicable?.map((item, index) => (
                <div
                  key={index}
                  className="flex text-[0.9rem] mt-4 items-center"
                >
                  <div className="w-[20%] max-xl:w-[15%]">
                    Scholarship Applicable
                  </div>
                  <select
                    className="w-[30%] px-5 py-2 text-[#898C9A] border-[#898C9A] bg-[#F9F9F9] rounded-md"
                    value={item.scholarship}
                    onChange={(e) =>
                      handleScholarshipChange(index, e.target.value)
                    }
                  >
                    <option value="Select" disabled>
                      Select
                    </option>
                    <option value="Scholarship 1">Scholarship 1</option>
                    <option value="Scholarship 2">Scholarship 2</option>
                    <option value="Scholarship 3">Scholarship 3</option>
                  </select>
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveScholarship(index)}
                    >
                      <img src={trashclose} alt="remove" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="flex items-center font-bold ml-[20%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleAddScholarship}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Scholarship
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
            {/*Tuition fees section */}
            <div className="font-urban mr-10 max-xl:mr-0">
              <div className="flex items-center text-[0.9rem]">
                {/* Tuition Fee */}
                <div className="w-[20%] max-xl:w-[15%]">Tuition Fee</div>
                <input
                  className="w-[25%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                  placeholder="Enter Tuition Fee"
                  value={editCourse?.tution_fee || ""}
                  onChange={(e) => handleTuitionFeeChange(e.target.value)}
                />

                {/* Funding Options */}
                <div className="w-[25%] flex items-center justify-center ml-12">
                  Funding Options
                </div>
                <div className="flex flex-col gap-3">
                  {editCourse?.funding_options?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        className="w-[11rem] px-5 py-2 text-[#898C9A] border-[#898C9A] bg-[#F9F9F9] rounded-md"
                        value={item.fundingOption}
                        onChange={(e) =>
                          handleFundingOptionChange(index, e.target.value)
                        }
                      >
                        <option value="Select" disabled>
                          Select
                        </option>
                        <option value="Funding Option 1">
                          Funding Option 1
                        </option>
                        <option value="Funding Option 2">
                          Funding Option 2
                        </option>
                      </select>
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveFundingOption(index)}
                        >
                          <img src={trashclose} alt="remove" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="flex items-center font-bold ml-[75%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md"
                onClick={handleAddFundingOption}
              >
                <img src={add} alt="add" width={17} className="mr-1" />
                Add Funding Option
              </button>
            </div>
            <div className="border-[#BFBFBF] border-b-[1px] my-5"></div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
