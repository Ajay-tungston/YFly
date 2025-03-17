import React,{useState,useEffect,useRef} from 'react'
import { useNavigate} from 'react-router-dom'
import profile from '../assets/images/profile.svg'
import down from '../assets/images/down.svg'
import add from '../assets/images/darkadd.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trashclose from '../assets/images/trashclose.svg'
import axios from 'axios'


const AddNewScholarship = ({ setAddingNewScholarship }) => {
    const [addScholarship, setAddScholarship] = useState({
        scholarship_name: "",
        types_of_scholarship: "",
        country: "",
        student_citizenship: "",
        course_level: "",
        area_of_study: "",
        scholarship_amount: "",
        scholarship_deadline: "",
        overview: "",
        eligibility_criteria: "",
        application_process: "",
        scholarship_applicability: "",
        brochure: "",
        testRequirements: [{ testRequirement: "Select", overallScore: "" }],
        specialRestrictions: [{ specialRestriction: "Select" }]
    });
    const handleCancel = () => {
        setAddingNewScholarship(false);
      };
      const navigate=useNavigate()
      const handleSave = () => {
             
        navigate('/dashboard'); // Change the route based on your app's routing
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Update the addScholarship state with the latest testRequirements and specialRestrictions
        const updatedScholarship = {
            ...addScholarship,
            testRequirements: testRequirements,
            specialRestrictions: specialRestrictions,
        };
    
        const formData = new FormData();
    
        for (const key in updatedScholarship) {
            if (key === 'testRequirements' || key === 'specialRestrictions') {
                formData.append(key, JSON.stringify(updatedScholarship[key])); // Serialize arrays
            } else {
                formData.append(key, updatedScholarship[key]);
            }
        }
        // Debugging: Log FormData entries
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(pair[0], ':', pair[1]);
        }
        
        console.log('Test Requirements State:', testRequirements);
        console.log('Special Restrictions State:', specialRestrictions);

        formData.append('brochure', brochure);
        formData.append('testRequirements', JSON.stringify(testRequirements));
        formData.append('specialRestrictions', JSON.stringify(specialRestrictions));

        try {
            const response = await axios.post('http://localhost:5000/scholarships/create', formData);
            toast.success('Scholarship added successfully', {
                position: 'top-center',
                autoClose: 4000,
                style: { backgroundColor: '#30589F', color: 'white' },
             
             
            });
           
     
          
            console.log(response.data);
        
            // Reset state to clear all fields
            setAddScholarship({
                scholarship_name: "",
                types_of_scholarship: "",
                country: "",
                student_citizenship: "",
                course_level: "",
                area_of_study: "",
                scholarship_amount: "",
                scholarship_deadline: "",
                overview: "",
                eligibility_criteria: "",
                application_process: "",
                scholarship_applicability: "",
                brochure: "",
            });
        
            // Reset individual dropdown states
            setScholarship("Select");
            setCountry("Country");
            setCitizenship("Select");
            setCourseLevel("Select");
            setAreaOfStudy("Select");
            setScholarshipAmount("Amount");
            setScholarshipApplicability("Select");
        
            // Reset arrays
            setTestRequirements([{ testRequirement: "Select", overallScore: "" }]);
            setSpecialRestrictions([{ specialRestriction: "Select", isOpen: false }]);
            setBrochure(null);
        } catch (error) {
            console.error(error);
            toast.error('Failed to add scholarship', {
                position: 'top-center',
                autoClose: 2000,
                style: { backgroundColor: '#D22B2B', color: 'white' },
            });
        }
        
        
    };
    
     
    const dropdownRef1=useRef(null) 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
                setIsOpen1(false);
                setIsOpen2(false);
                setIsOpen3(false)
                setIsOpen4(false)
                setIsOpen5(false)
                setIsOpen8(false)
                setIsOpen6(false)
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleScholarshipName = (e) => {
        const { value } = e.target;
        setAddScholarship((prevState) => ({
            ...prevState,
            scholarship_name: value,
        }));
    };
    //Type of Scholarship
    const [isOpen1, setIsOpen1] = useState(false);
    const [scholarship, setScholarship] = useState('Select');
    const handleScholarshipType = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            types_of_scholarship: option,
        }));
        setScholarship(option);
        setIsOpen1(false);
    };
    //Country
    const [isOpen2, setIsOpen2] = useState(false);
    const [country, setCountry] = useState('Country');
    const handleCountry = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            country: option,
        }));
        setCountry(option);
        setIsOpen2(false);
    };

    //Course Level
    const [isOpen3, setIsOpen3] = useState(false);
    const [courseLevel, setCourseLevel] = useState('Select');
    const handleCourseLevel = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            course_level: option,
        }));
        setCourseLevel(option);
        setIsOpen3(false);
    };
     //Area of Study
     const [isOpen4, setIsOpen4] = useState(false);
     const [areaOfStudy, setAreaOfStudy] = useState('Select');
     const handleAreaOfStudy = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            area_of_study: option,
        }));
        setAreaOfStudy(option);
        setIsOpen4(false);
    };
     //Scholarship Amount
     const [isOpen5, setIsOpen5] = useState(false);
     const [scholarshipAmount, setScholarshipAmount] = useState('Amount');
     const handleScholarshipTypeAmount = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            scholarship_amount: option,
        }));
        setScholarshipAmount(option);
        setIsOpen5(false);
    };
    //scholarship deadline
    const handleScholarshipDeadline = (e) => {
        const { value } = e.target;
        setAddScholarship((prevState) => ({
            ...prevState,
            scholarship_deadline: value,
        }));
    }
    //overview 
    const handleOverviewChange = (e) => {
        const { value } = e.target;
        setAddScholarship((prevState) => ({
            ...prevState,
            overview: value,
        }));
    };
    //eligiilty criteria
    const handleEligibilityCriteria = (e) => {
        const { value } = e.target;
        setAddScholarship((prevState) => ({
            ...prevState,
            eligibility_criteria: value,
        }));
    };
    //application process
    const handleApplicationProcess = (e) => {
        const { value } = e.target;
        setAddScholarship((prevState) => ({
            ...prevState,
            application_process: value,
        }));
    };
    //Test Requirements
        const [testRequirements, setTestRequirements] = useState([{ testRequirement: 'Select', overallScore: '' }]);
        const handleInputChange = (index, field, value) => {
        const updatedRequirements = [...testRequirements];
        updatedRequirements[index][field] = value;
        setTestRequirements(updatedRequirements);
        };
        const handleAddRequirement = () => {setTestRequirements([...testRequirements, { testRequirement: 'Select', overallScore: '' }]);};
        const handleRemoveRequirement = (index) => {
        const updatedRequirements = testRequirements.filter((_, i) => i !== index);
        setTestRequirements(updatedRequirements);
        };
     //Student Citizenship
     const [isOpen6, setIsOpen6] = useState(false);
     const [citizenship, setCitizenship] = useState('Select');
     const handleCitizenship = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            student_citizenship: option,
        }));
        setCitizenship(option);
        setIsOpen6(false);
    };
     
     //Special Restrictions
     const [specialRestrictions, setSpecialRestrictions] = useState([
        { specialRestriction: 'Select', isOpen: false }
      ]);
    
      const handleSpecialRestrictionInputChange = (index, value) => {
        const updatedRestrictions = [...specialRestrictions];
        updatedRestrictions[index].specialRestriction = value;
        updatedRestrictions[index].isOpen = false; // Close dropdown on selection
        setSpecialRestrictions(updatedRestrictions);
      };
    
      const toggleDropdown = (index) => {
        const updatedRestrictions = specialRestrictions.map((restriction, i) => ({
          ...restriction,
          isOpen: i === index ? !restriction.isOpen : false // Only open the clicked dropdown
        }));
        setSpecialRestrictions(updatedRestrictions);
      };
    
      const handleAddSpecialRestriction = () => {
        setSpecialRestrictions([...specialRestrictions, { specialRestriction: 'Select', isOpen: false }]);
      };
    
      const handleRemoveSpecialRestriction = (index) => {
        const updatedRestrictions = specialRestrictions.filter((_, i) => i !== index);
        setSpecialRestrictions(updatedRestrictions);
      };
     //Scholarship Applicability
     const [isOpen8, setIsOpen8] = useState(false);
     const [scholarshipApplicability, setScholarshipApplicability] = useState('Select');
     const handleScholarshipTypeApplicability = (option) => {
        setAddScholarship((prevState) => ({
            ...prevState,
            scholarship_applicability: option,
        }));
        setScholarshipApplicability(option);
        setIsOpen8(false);
    };
    //scholarship brochure
    const [brochure, setBrochure] = useState(null);
    const handleBrochureChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
            setBrochure(file);
            setAddScholarship((prevState) => ({
                ...prevState,
                university_logo: file,
            }));
        } else {
            toast.error('File size exceeds 5MB limit', {
                position: 'top-center',
                autoClose: 2000,
                style: { backgroundColor: '#D22B2B', color: 'white' },
            });
        }
    };
    
  return (
    <form className='px-10 py-10' onSubmit={handleSubmit} >
    <ToastContainer/>
        <div className='flex justify-between'>
            <input placeholder='Search' className='bg-[#F2F4F7] py-3 w-[30%] pl-5 border-none placeholder:font-urban text-[1rem] rounded-[4px] outline-none' />
            <div className='flex items-center'>
                <div className='font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]'>Hi, User</div>
                <img src={profile} alt='profile' width={35} />
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* Add new scholarship section */}
        <div className='flex justify-between items-center font-urban'>
            <div>
                <div className='text-[#0E1B2C] font-bold'>Add new scholarship</div>
                <div className='text-[#898C9A] text-[0.8rem]'>Upload scholarship details here.</div>
            </div>
            <div className='flex text-[0.8rem] font-bold'>
                <button type="button" onClick={handleCancel} className='border-[#BFBFBF] border-[1px] mr-3 px-3 py-1 rounded-[9px] text-[#BFBFBF]'>Cancel</button>
                <button className='bg-[#30589F] px-3 py-1 rounded-[9px] text-white'  onClick={handleSave}>Save</button>
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/*Scholarship section */}
        <div className='font-urban mr-10 max-xl:mr-0 '>
            <div className='flex items-center text-[0.9rem]'>

                <div className='w-[20%] max-xl:w-[15%]'>Scholarship Name</div>
                <input className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] 
                rounded-md placeholder:text-[0.9rem]' 
                placeholder='Enter here'
                onChange={handleScholarshipName}
                value={addScholarship.scholarship_name}
                id='scholarshipname'
                type='text'
                name='scholarship_name'
                 />
                <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>Type of Scholarship</div>
                    {/* Button */}
                <button  
                type='button'
                onClick={() => setIsOpen1(!isOpen1)} 
                className="w-[25%] max-xl:w-[30%] flex items-center px-5 
                py-[10px] justify-between text-[#898C9A] border-[#898C9A]
                 border text-gray-800 bg-[#F9F9F9] rounded-md">
                    {scholarship}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {/* Dropdown */}
                {isOpen1 && (
                    <div ref={dropdownRef1}className="absolute mt-[7.3rem] ml-[51rem] max-xl:ml-[32rem] w-[18.5%] max-xl:w-[21%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                        <ul className="">
                            <li onClick={() => handleScholarshipType('Merit Based')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white "> Merit Based</li>
                            <li onClick={() => handleScholarshipType('Need Based')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"> Need Based</li>
                        </ul>
                    </div>
                )}   
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* Country section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
            <div className='flex text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Country</div>
                {/* Button */}
                <button onClick={() => setIsOpen2(!isOpen2)} 
                type='button'
                className="w-[30%] flex items-center px-5 py-[10px] justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md">
                    {country}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {/* Dropdown */}
                {isOpen2 && (
                    <div ref={dropdownRef1} className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                        <ul className="h-[25vh] overflow-y-auto">
                            <li onClick={() => handleCountry('USA')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">USA</li>
                            <li onClick={() => handleCountry('Canada')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">Canada</li>
                            <li onClick={() => handleCountry('United Kingdom')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">United Kingdom</li>
                            <li onClick={() => handleCountry('Ireland')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">Ireland</li>
                            <li onClick={() => handleCountry('New Zealand')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">New Zealand</li>
                            <li onClick={() => handleCountry('Australia')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">Australia</li>
                            <li onClick={() => handleCountry('Germany')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">Germany</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* Student Citizenship  section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
            <div className='flex text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Student Citizenship</div>
                {/* Button */}
                <button
                type='button'
                    onClick={() => setIsOpen6(!isOpen6)} // Toggle dropdown visibility
                    className="w-[30%] flex items-center px-5 py-[10px] justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md">
                    {citizenship}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {/* Dropdown */}
                {isOpen6&& (
                    <div ref={dropdownRef1} className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                        <ul className="h-[23vh] overflow-y-auto text-[0.8rem]">
                            <li
                                onClick={() => handleCitizenship('India')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white "
                            >
                                India
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bangladesh')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bangladesh
                            </li>
                            <li
                                onClick={() => handleCitizenship('Ghana')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Ghana
                            </li>
                            <li
                                onClick={() => handleCitizenship('China')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                China
                            </li>
                            <li
                                onClick={() => handleCitizenship('Afghanistan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Afghanistan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Argentina')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Argentina
                            </li>
                            <li
                                onClick={() => handleCitizenship('Benin')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Benin
                            </li>
                            <li
                                onClick={() => handleCitizenship('Burkina Faso')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Burkina Faso
                            </li>
                            <li
                                onClick={() => handleCitizenship('Malaysia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Malaysia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Colombia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Colombia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Comoros')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Comoros
                            </li>
                            <li
                                onClick={() => handleCitizenship('Croatia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Croatia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Djibouti')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Djibouti
                            </li>
                            <li
                                onClick={() => handleCitizenship('Ecuador')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Ecuador
                            </li>
                            <li
                                onClick={() => handleCitizenship('Egypt')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Egypt
                            </li>
                            <li
                                onClick={() => handleCitizenship('Equatorial Guinea')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Equatorial Guinea
                            </li>
                            <li
                                onClick={() => handleCitizenship('Eritrea')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Eritrea 
                            </li>
                            <li
                                onClick={() => handleCitizenship('Ethiopia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Ethiopia
                            </li>
                            <li
                                onClick={() => handleCitizenship('France')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                France
                            </li>
                            <li
                                onClick={() => handleCitizenship('Finland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Finland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Gambia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Gambia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Guinea')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Guinea
                            </li>
                            <li
                                onClick={() => handleCitizenship('Guinea-Bissau')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Guinea-Bissau
                            </li>
                            <li
                                onClick={() => handleCitizenship('Iceland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Iceland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Indonesia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Indonesia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Ivory Coast')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Ivory Coast
                            </li>
                            <li
                                onClick={() => handleCitizenship('Jordan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Jordan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Kenya')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Kenya
                            </li>
                            <li
                                onClick={() => handleCitizenship('Denmark')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Denmark
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mongolia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mongolia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Nigeria')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Nigeria
                            </li>
                            <li
                                onClick={() => handleCitizenship('Senegal')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Senegal
                            </li>
                            <li
                                onClick={() => handleCitizenship('Sierra Leone')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Sierra Leone
                            </li>
                            <li
                                onClick={() => handleCitizenship('Italy')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Italy
                            </li>
                            <li
                                onClick={() => handleCitizenship('Sri Lanka')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Sri Lanka
                            </li>
                            <li
                                onClick={() => handleCitizenship('Togo')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Togo
                            </li>
                            <li
                                onClick={() => handleCitizenship('Uganda')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Uganda
                            </li>
                            <li
                                onClick={() => handleCitizenship('Japan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Japan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Belgium')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Belgium
                            </li>
                            <li
                                onClick={() => handleCitizenship('Armenia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Armenia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Fiji')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Fiji
                            </li>
                            <li
                                onClick={() => handleCitizenship('Estonia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Estonia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Ukraine')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Ukraine
                            </li>
                            <li
                                onClick={() => handleCitizenship('Hungary')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Hungary
                            </li>
                            <li
                                onClick={() => handleCitizenship('Austria')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Austria
                            </li>
                            <li
                                onClick={() => handleCitizenship('Philippines')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Philippines
                            </li>
                            <li
                                onClick={() => handleCitizenship('Australia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Australia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cyprus')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cyprus    
                            </li>
                            <li
                                onClick={() => handleCitizenship('Nepal')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Nepal
                            </li>
                            <li
                                onClick={() => handleCitizenship('Georgia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Georgia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Singapore')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Singapore
                            </li>
                            <li
                                onClick={() => handleCitizenship('Albania')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Albania
                            </li>
                            <li
                                onClick={() => handleCitizenship('Algeria')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Algeria
                            </li>
                            <li
                                onClick={() => handleCitizenship('Angola')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Angola
                            </li>
                            <li
                                onClick={() => handleCitizenship('New Zealand')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                New Zealand
                            </li>
                            <li
                                onClick={() => handleCitizenship('Azerbaijan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Azerbaijan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bahamas')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bahamas
                            </li>
                            <li
                                onClick={() => handleCitizenship('Belarus')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Belarus
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bhutan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bhutan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bolivia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bolivia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bosnia and Herzegovina')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bosnia and Herzegovina
                            </li>
                            <li
                                onClick={() => handleCitizenship('Botswana')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Botswana
                            </li>
                            <li
                                onClick={() => handleCitizenship('Brazil')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Brazil
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bulgaria')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bulgaria
                            </li>
                            <li
                                onClick={() => handleCitizenship('Germany')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Germany
                                
                            </li>
                            <li
                                onClick={() => handleCitizenship('Burundi')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Burundi
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cambodia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cambodia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Central African Republic')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Central African Republic
                            </li>
                            <li
                                onClick={() => handleCitizenship('Chad')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Chad
                            </li>
                            <li
                                onClick={() => handleCitizenship('Chile')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Chile
                            </li>
                            <li
                                onClick={() => handleCitizenship('Costa Rica')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Costa Rica
                            </li>
                            <li
                                onClick={() => handleCitizenship('Czech Republic')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Czech Republic
                            </li>
                            <li
                                onClick={() => handleCitizenship('Democratic Republic of the Congo')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Democratic Republic of the Congo
                            </li>
                            <li
                                onClick={() => handleCitizenship('Sweden')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Sweden
                            </li>
                            <li
                                onClick={() => handleCitizenship('Dominica')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Dominica
                            </li>
                            <li
                                onClick={() => handleCitizenship('Dominican Republic')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Dominican Republic
                            </li>
                            <li
                                onClick={() => handleCitizenship('El Salvador')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                El Salvador
                            </li>
                            <li
                                onClick={() => handleCitizenship('Gabon')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Gabon
                            </li>
                            <li
                                onClick={() => handleCitizenship('Switzerland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Switzerland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Guatemala')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Guatemala
                            </li>
                            <li
                                onClick={() => handleCitizenship('Haiti')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Haiti
                            </li>
                            <li
                                onClick={() => handleCitizenship('Honduras')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Honduras
                            </li>
                            <li
                                onClick={() => handleCitizenship('Iran')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Iran
                            </li>
                            <li
                                onClick={() => handleCitizenship('Iraq')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Iraq
                                
                            </li>
                            <li
                                onClick={() => handleCitizenship('Netherlands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Netherlands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Isle of Man')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Isle of Man
                            </li>
                            <li
                                onClick={() => handleCitizenship('Israel')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Israel
                            </li>
                            <li
                                onClick={() => handleCitizenship('Kazakhstan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Kazakhstan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Kiribati')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Kiribati
                            </li>
                            <li
                                onClick={() => handleCitizenship('Kiribati')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Kiribati
                            </li>
                            <li
                                onClick={() => handleCitizenship('Kyrgyzstan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Kyrgyzstan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Latvia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Latvia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Lebanon')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Lebanon
                            </li>
                            <li
                                onClick={() => handleCitizenship('Lesotho')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Lesotho
                            </li>
                            <li
                                onClick={() => handleCitizenship('Liberia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Liberia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Spain')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Spain
                            </li>
                            <li
                                onClick={() => handleCitizenship('Madagascar')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Madagascar
                            </li>
                            <li
                                onClick={() => handleCitizenship('Malawi')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Malawi
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mali')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mali
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mauritania')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mauritania
                            </li>
                            <li
                                onClick={() => handleCitizenship('Micronesia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Micronesia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Moldova')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Moldova
                            </li>
                            <li
                                onClick={() => handleCitizenship('Morocco')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Morocco
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mozambique')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mozambique
                            </li>
                            <li
                                onClick={() => handleCitizenship('Myanmar')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Myanmar
                            </li>
                            <li
                                onClick={() => handleCitizenship('Pakistan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Pakistan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Papua New Guinea')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Papua New Guinea
                            </li>
                            <li
                                onClick={() => handleCitizenship('Romania')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Romania
                            </li>
                            <li
                                onClick={() => handleCitizenship('Rwanda')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Rwanda
                            </li>
                            <li
                                onClick={() => handleCitizenship('Ireland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Ireland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Sao Tome and Principe')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Sao Tome and Principe
                            </li>
                            
                            <li
                                onClick={() => handleCitizenship('Solomon Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Solomon Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Somalia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Somalia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Sudan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Sudan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Tajikistan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Tajikistan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Tanzania')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Tanzania
                            </li>
                            <li
                                onClick={() => handleCitizenship('Tuvalu')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Tuvalu
                            </li>
                            <li
                                onClick={() => handleCitizenship('Uruguay')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Uruguay
                            </li>
                            <li
                                onClick={() => handleCitizenship('Uzbekistan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Uzbekistan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Vanuatu')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Vanuatu
                            </li>
                            <li
                                onClick={() => handleCitizenship('Vietnam')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Vietnam
                            </li>
                            <li
                                onClick={() => handleCitizenship('Yemen')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Yemen
                            </li>
                            <li
                                onClick={() => handleCitizenship('Zambia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Zambia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Zimbabwe')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Zimbabwe
                            </li>
                            <li
                                onClick={() => handleCitizenship('Norway')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Norway
                            </li>
                            <li
                                onClick={() => handleCitizenship('Greece')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Greece
                            </li>
                            <li
                                onClick={() => handleCitizenship('Luxembourg')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Luxembourg
                            </li>
                            <li
                                onClick={() => handleCitizenship('South Africa')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                South Africa
                            </li>
                            <li
                                onClick={() => handleCitizenship('Lithuania')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Lithuania
                            </li>
                            <li
                                onClick={() => handleCitizenship('Hong Kong')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Hong Kong
                            </li>
                            <li
                                onClick={() => handleCitizenship('Turkey')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Turkey
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bahrain')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bahrain
                            </li>
                            <li
                                onClick={() => handleCitizenship('Guyana')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Guyana
                            </li>
                            <li
                                onClick={() => handleCitizenship('Antigua and Barbuda')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Antigua and Barbuda
                            </li>
                            <li
                                onClick={() => handleCitizenship('Belize')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Belize
                            </li>
                            <li
                                onClick={() => handleCitizenship('Brunei')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Brunei
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cameroon')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cameroon
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cape Verde')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cape Verde
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cook Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cook Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cuba')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cuba
                            </li>
                            <li
                                onClick={() => handleCitizenship('East Timor')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                East Timor
                            </li>
                            <li
                                onClick={() => handleCitizenship('Falkland Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Falkland Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Faroe Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Faroe Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('French Polynesia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                French Polynesia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Gibraltar')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Gibraltar
                            </li>
                            <li
                                onClick={() => handleCitizenship('Grenada')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Grenada
                            </li>
                            <li
                                onClick={() => handleCitizenship('Guam')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Guam
                            </li>
                            <li
                                onClick={() => handleCitizenship('Guernsey')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Guernsey
                            </li>
                            <li
                                onClick={() => handleCitizenship('Jamaica')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Jamaica
                            </li>
                            <li
                                onClick={() => handleCitizenship('Jersey')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Jersey
                            </li>
                            <li
                                onClick={() => handleCitizenship('Kuwait')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Kuwait
                            </li>
                            <li
                                onClick={() => handleCitizenship('Laos')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Laos
                            </li>
                            <li
                                onClick={() => handleCitizenship('Libya')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Libya
                            </li>
                            <li
                                onClick={() => handleCitizenship('Liechtenstein')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Liechtenstein
                            </li>
                            <li
                                onClick={() => handleCitizenship('Macao')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Macao
                            </li>
                            <li
                                onClick={() => handleCitizenship('Macedonia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Macedonia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Maldives')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Maldives
                            </li>
                            <li
                                onClick={() => handleCitizenship('Marshall Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Marshall Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Russia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Russia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Montenegro')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Montenegro
                            </li>
                            <li
                                onClick={() => handleCitizenship('Namibia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Namibia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Nauru')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Nauru
                            </li>
                            <li
                                onClick={() => handleCitizenship('UAE')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                UAE
                            </li>
                            <li
                                onClick={() => handleCitizenship('Nicaragua')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Nicaragua
                            </li>
                            <li
                                onClick={() => handleCitizenship('Niger')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Niger
                            </li>
                            <li
                                onClick={() => handleCitizenship('Niue')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Niue
                            </li>
                            <li
                                onClick={() => handleCitizenship('Oman')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Oman
                            </li>
                            <li
                                onClick={() => handleCitizenship('Palau')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Palau
                            </li>
                            <li
                                onClick={() => handleCitizenship('Palestine')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Palestine
                            </li>
                            <li
                                onClick={() => handleCitizenship('Panama')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Panama
                            </li>
                            <li
                                onClick={() => handleCitizenship('Paraguay')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Paraguay
                            </li>
                            <li
                                onClick={() => handleCitizenship('Peru')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Peru
                            </li>
                            <li
                                onClick={() => handleCitizenship('Qatar')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Qatar
                            </li>
                            <li
                                onClick={() => handleCitizenship('Samoa')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Samoa
                            </li>
                            <li
                                onClick={() => handleCitizenship('San Marino')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                San Marino
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saudi Arabia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saudi Arabia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Serbia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Serbia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Seychelles')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Seychelles
                            </li>
                            <li
                                onClick={() => handleCitizenship('Slovakia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Slovakia
                            </li>
                            <li
                                onClick={() => handleCitizenship('South Sudan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                South Sudan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Suriname')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Suriname
                            </li>
                            <li
                                onClick={() => handleCitizenship('Syria')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Syria
                            </li>
                            <li
                                onClick={() => handleCitizenship('Tokelau')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Tokelau
                            </li>
                            <li
                                onClick={() => handleCitizenship('Tonga')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Tonga
                            </li>
                            <li
                                onClick={() => handleCitizenship('Tunisia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Tunisia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Turkmenistan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Turkmenistan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Venezuela')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Venezuela
                            </li>
                            <li
                                onClick={() => handleCitizenship('Poland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Poland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Portugal')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Portugal
                            </li>
                            <li
                                onClick={() => handleCitizenship('Thailand')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Thailand
                            </li>
                            <li
                                onClick={() => handleCitizenship('UK')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                UK
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mauritius')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mauritius
                            </li>
                            <li
                                onClick={() => handleCitizenship('Slovenia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Slovenia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Monaco')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Monaco
                            </li>
                            <li
                                onClick={() => handleCitizenship('Malta')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Malta
                            </li>
                            <li
                                onClick={() => handleCitizenship('Barbados')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Barbados
                            </li>
                            <li
                                onClick={() => handleCitizenship('Andorra')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Andorra
                            </li>
                            <li
                                onClick={() => handleCitizenship('Antarctica')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Antarctica
                            </li>
                            <li
                                onClick={() => handleCitizenship('British Indian Ocean Territory')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                British Indian Ocean Territory
                            </li>
                            <li
                                onClick={() => handleCitizenship('British Virgin Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                British Virgin Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Christmas Island')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Christmas Island
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cocos Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cocos Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Curacao')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Curacao
                            </li>
                            <li
                                onClick={() => handleCitizenship('Greenland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Greenland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mayotte')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mayotte
                            </li>
                            <li
                                onClick={() => handleCitizenship('Mexico')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mexico
                            </li>
                            <li
                                onClick={() => handleCitizenship('Netherlands Antilles')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Netherlands Antilles
                            </li>
                            <li
                                onClick={() => handleCitizenship('New Caledonia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                New Caledonia
                            </li>
                            <li
                                onClick={() => handleCitizenship('North Korea')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                North Korea
                            </li>
                            <li
                                onClick={() => handleCitizenship('Northern Mariana Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Northern Mariana Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Pitcairn')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Pitcairn
                            </li>
                            <li
                                onClick={() => handleCitizenship('Puerto Rico')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Puerto Rico
                            </li>
                            <li
                                onClick={() => handleCitizenship('Republic of the Congo')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Republic of the Congo
                            </li>
                            <li
                                onClick={() => handleCitizenship('Reunion')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Reunion
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Helena')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Helena
                            </li>
                            <li
                                onClick={() => handleCitizenship('Svalbard and Jan Mayen')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Svalbard and Jan Mayen
                            </li>
                            <li
                                onClick={() => handleCitizenship('Swaziland')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Swaziland
                            </li>
                            <li
                                onClick={() => handleCitizenship('Taiwan')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Taiwan
                            </li>
                            <li
                                onClick={() => handleCitizenship('Trinidad and Tobago')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Trinidad and Tobago
                            </li>
                            <li
                                onClick={() => handleCitizenship('Vatican')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Vatican
                            </li>
                            <li
                                onClick={() => handleCitizenship('Wallis and Futuna')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Wallis and Futuna
                            </li>
                            <li
                                onClick={() => handleCitizenship('Western Sahara')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Western Sahara
                            </li>
                            <li
                                onClick={() => handleCitizenship('South Korea')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                South Korea
                            </li>
                            <li
                                onClick={() => handleCitizenship('American Samoa')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                American Samoa
                            </li>
                            <li
                                onClick={() => handleCitizenship('Anguilla')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Anguilla
                            </li>
                            <li
                                onClick={() => handleCitizenship('Aruba')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Aruba
                            </li>
                            <li
                                onClick={() => handleCitizenship('Bermuda')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Bermuda
                            </li>
                            <li
                                onClick={() => handleCitizenship('Cayman Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Cayman Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('Montserrat')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Montserrat
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Barthelemy')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Barthelemy
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Kitts and Nevis')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Kitts and Nevis
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Lucia')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Lucia
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Martin')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Martin
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Pierre and Miquelon')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Pierre and Miquelon
                            </li>
                            <li
                                onClick={() => handleCitizenship('Saint Vincent and the Grenadines')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Saint Vincent and the Grenadines
                            </li>
                            <li
                                onClick={() => handleCitizenship('Sint Maarten')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Sint Maarten
                            </li>
                            <li
                                onClick={() => handleCitizenship('Turks and Caicos Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Turks and Caicos Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('U.S. Virgin Islands')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                U.S. Virgin Islands
                            </li>
                            <li
                                onClick={() => handleCitizenship('USA')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                USA
                            </li>
                            <li
                                onClick={() => handleCitizenship('Canada')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Canada
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/*Course level section */}
        <div className='font-urban mr-10 max-xl:mr-0 '>
            <div className='flex items-center text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Course Level</div>
                {/* Button */}
                <button
                type='button'
                onClick={() => setIsOpen3(!isOpen3)}
                 className="w-[30%] flex items-center px-5 py-[10px] justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md">
                    {courseLevel}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {/* Dropdown */}
                {isOpen3 && (
                    <div ref={dropdownRef1} className="absolute mt-[9.5rem] ml-[13.5rem] max-xl:ml-[7rem] w-[22%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                        <ul className="">
                            <li onClick={() => handleCourseLevel('Masters')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white ">Masters </li>
                            <li onClick={() => handleCourseLevel('MBA')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"> MBA </li>
                            <li onClick={() => handleCourseLevel('Bachelors')} className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">Bachelors </li>
                        </ul>
                    </div>
                )}
                <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>Area of Study</div>
                    {/* Button */}
                <button
                    type='button'
                    onClick={() => setIsOpen4(!isOpen4)} // Toggle dropdown visibility
                    className="w-[25%] max-xl:w-[30%] flex items-center px-5 py-[10px] justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md" >
                    {areaOfStudy}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {/* Dropdown */}
                {isOpen4 && (
                    <div ref={dropdownRef1} className="absolute mt-[16.9rem] max-xl:mt-[18.5rem]  ml-[51rem] max-xl:ml-[32rem] w-[18.5%] max-xl:w-[21%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                        <ul className="text-[0.8rem] h-[29vh]  overflow-y-auto">
                            <li
                                onClick={() => handleAreaOfStudy('Agriculture, Forestry & Fishery')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white "
                            >
                                Agriculture, Forestry & Fishery
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Agriculture & Building')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Agriculture & Building
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Arts')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Arts
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Commerce, Business & Administration')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Commerce, Business & Administration
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Computer Science & Information Technology')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Computer Science & Information Technology
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Education')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Education
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Environmental Science / Protection')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Environmental Science / Protection
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Engineering & Engineering Trades')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Engineering & Engineering Trades
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Health')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Health
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Humanities')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Humanities
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Journalism & Information')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Journalism & Information
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Life Sciences')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Life Sciences
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Law')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Law
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Manufacturing & Processing')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Manufacturing & Processing
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Mathematics & Statistics')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Mathematics & Statistics
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Personal Services')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Personal Services
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Physical Sciences, Sciences')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Physical Sciences, Sciences
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Security Services')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Security Services
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Social & Behavioural science')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Social & Behavioural science
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Social Services')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Social Services
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Transport Services')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Transport Services
                            </li>
                            <li
                                onClick={() => handleAreaOfStudy('Veterinary')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                            >
                                Veterinary
                            </li>
                            
                        </ul>
                    </div>
                )}   
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>   
         {/* Scholarship Amount section */}
         <div className='font-urban mr-10 max-xl:mr-0'>
                <div className='flex text-[0.9rem]'>
                    <div className='w-[20%] max-xl:w-[15%]'>Scholarship Amount</div>
                    {/* Button */}
                    <button
                        type='button'
                        onClick={() => setIsOpen5(!isOpen5)} // Toggle dropdown visibility
                        className="w-[30%] flex items-center px-5 py-1 justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md">
                        {scholarshipAmount}
                        <img src={down} alt="down" width={12} className="ml-8" />
                    </button>
                    {/* Dropdown */}
                    {isOpen5 && (
                        <div ref={dropdownRef1} className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22.2%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                            <ul className="">
                                <li
                                    onClick={() => handleScholarshipTypeAmount('Amount1')}
                                    className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white ">
                                    Amount1
                                </li>
                                <li
                                    onClick={() => handleScholarshipTypeAmount('Amount2')}
                                    className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">
                                    Amount2
                                </li>
                                <li
                                    onClick={() => handleScholarshipTypeAmount('Amount3')}
                                    className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white">
                                    Amount3
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>Scholarship Deadline</div>
                    <input
                        className="w-[25%] max-xl:w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                        placeholder="Select"
                        type="date"
                        onChange={handleScholarshipDeadline}
                    />
                </div>
                <input className='w-[30%] ml-[20%] max-xl:ml-[15%] mt-3 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
                    placeholder='Enter here'/>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* overview section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
            <div className='flex text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Overview</div>
                <textarea
                        className="w-[80%] p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                        placeholder="Overview"
                        rows="5"
                        name="overview"
                        value={addScholarship.overview}
                        onChange={handleOverviewChange}
                    ></textarea>
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
          {/* Eligibility Criteria section */}
          <div className='font-urban mr-10 max-xl:mr-0'>
            <div className='flex text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Eligibility Criteria</div>
                <textarea
                        className="w-[80%] p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                        placeholder="Eligibility Criteria"
                        rows="5"
                        value={addScholarship.eligibility_criteria}
                        onChange={handleEligibilityCriteria}
                        name="eligibility_criteria"
                    ></textarea>
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
         {/* Application Process section */}
         <div className='font-urban mr-10 max-xl:mr-0'>
            <div className='flex text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Application Process</div>
                <textarea
                        className="w-[80%] p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]"
                        placeholder="Application Process"
                        rows="5"
                        onChange={handleApplicationProcess}
                        value={addScholarship.application_process}
                    ></textarea>
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* Test Requirement section */}
         <div className='font-urban mr-10 max-xl:mr-0'>
            {testRequirements.map((requirement, index) => (
                <div key={index} className='flex text-[0.9rem] mt-4 items-center'>
                {/* Test Requirement Dropdown */}
                <div className='w-[20%] max-xl:w-[15%]'>Test Requirements</div>
                <select
                    className="w-[25%] flex items-center px-4 py-1 text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                    value={requirement.testRequirement}
                    onChange={(e) => handleInputChange(index, 'testRequirement', e.target.value)}
                >
                    <option value='Select' disabled>
                    Select Requirement
                    </option>
                    <option className='text-black'  value='test requirement 1'>test requirement 1</option>
                    <option className='text-black'  value='test requirement 2'>test requirement 2</option>
                    <option className='text-black' value='test requirement 3'>test requirement 3</option>
                </select>

                {/* Overall Score Input */}
                <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>Overall Required Score</div>
                <input
                    className='w-[25%] max-xl:w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.8rem]'
                    placeholder='Enter here'
                    value={requirement.overallScore}
                    onChange={(e) => handleInputChange(index, 'overallScore', e.target.value)}
                />

                {/* Remove Button */}
                {index > 0 && (
                    <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveRequirement(index)}
                    >
                    <img src={trashclose} alt='closebtn' width={16}/>
                    </button>
                )}
                </div>
            ))}
            {/* Add Test Requirement Button */}
            <button type='button'
                className='flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md'
                onClick={handleAddRequirement}
            >
            <img src={add} alt='add' width={17} className='mr-1' />
            Add test requirements
            </button>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* Special Restrictions section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
            {specialRestrictions.map((restriction, index) => (
                <div key={index} className='flex text-[0.9rem] mt-4 items-center'>
                {/* Special Restrictions Dropdown */}
                <div className='w-[20%] max-xl:w-[15%]'>Special Restrictions</div>
                <button
                    type='button'
                    onClick={() => toggleDropdown(index)}
                    className="w-[30%] flex items-center px-5 py-[10px] justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md"
                >
                    {restriction.specialRestriction}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>

                {/* Dropdown */}
                {restriction.isOpen && (
                    <div ref={dropdownRef1} className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                    <ul className="text-[0.8rem] h-[23vh] overflow-y-auto">
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'No Special Restriction applicable')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white "
                        >
                        No Special Restriction applicable
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Only for Women')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Only for Women
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Special Restriction/s applicable in this case, details for the same elaborated in Scholarship eligibility')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Special Restriction/s applicable in this case, details for the same elaborated in Scholarship eligibility
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Special Restrictions 3')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Special Restrictions 3
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Must be nominated by an Institute faculty ')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Must be nominated by an Institute faculty
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'For candidates with disabilities only')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        For candidates with disabilities only
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Must return to home country after course completion')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Must return to home country after course completion
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Funding only for immediate family members of current students ')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Funding only for immediate family members of current students
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Intend/plan to return to home country after course completion')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Intend/plan to return to home country after course completion
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Only for candidates with a child')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Only for candidates with a child
                        </li>
                        <li
                        onClick={() => handleSpecialRestrictionInputChange(index, 'Limitation on total family income')}
                        className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"
                        >
                        Limitation on total family income
                        </li>
                    </ul>
                    </div>
                )}

                {/* Remove Button */}
                {index > 0 && (
                    <button type='button'
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveSpecialRestriction(index)}
                    >
                    <img src={trashclose} alt='rtrt' width={15}/>
                    </button>
                )}
                </div>
            ))}

            {/* Add Special Restriction Button */}
            <button type='button'
                className='flex items-center font-bold ml-[20%] max-xl:ml-[15%] mt-3 text-[0.9rem] border border-[#898C9A] text-[#30589F] py-2 px-5 rounded-md'
                onClick={handleAddSpecialRestriction}
            >
                <img src={add} alt='add' width={17} className='mr-1' />
                Add Special Restriction
            </button>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
         {/*Scholarship Applicability section */}
         <div className='font-urban mr-10 max-xl:mr-0'>
            <div className='flex text-[0.9rem]'>
                <div className='w-[20%] max-xl:w-[15%]'>Scholarship Applicability</div>
                {/* Button */}
                <button
                    type='button'
                    onClick={() => setIsOpen8(!isOpen8)} // Toggle dropdown visibility
                    className="w-[30%] flex items-center px-5 py-[10px] justify-between text-[#898C9A] border-[#898C9A] border text-gray-800 bg-[#F9F9F9] rounded-md">
                    {scholarshipApplicability}
                    <img src={down} alt="down" width={12} className="ml-8" />
                </button>
                {/* Dropdown */}
                {isOpen8&& (
                    <div ref={dropdownRef1} className="absolute mt-10 ml-[13.5rem] max-xl:ml-[7rem] w-[22%] bg-[#F9F9F9] border border-[#898C9A] rounded-md shadow-lg z-10">
                        <ul className="">
                            <li onClick={() => handleScholarshipTypeApplicability('Non-college specific scholarships')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white ">Non-college specific scholarships</li>
                            <li onClick={() => handleScholarshipTypeApplicability('College specific scholarships')}
                                className="px-4 py-2 cursor-pointer hover:bg-[#7f848dda] hover:text-white"> College specific scholarships</li>
                        </ul>
                    </div> 
                )}
            </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        {/* university section */}
        <div className='font-urban mr-10 max-xl:mr-0 '>
                <div className='flex items-center text-[0.9rem]'>
                    <div className='w-[20%] max-xl:w-[20%] '>Upload University Logo</div>
                    <div className='flex'>
                        <div className=''>
                            <label htmlFor="upload-brochure"
                                className="cursor-pointer flex border max-xl:text-[0.8rem] font-bold border-[#898C9A] text-[#30589F] px-5 py-2 rounded-md">
                                <img src={add} alt='add' width={17} className='mr-2' />
                                {brochure ? brochure.name : 'Upload brochure ( PDF)'}
                            </label>
                            <input
                                id="upload-brochure"
                                type="file"
                                // accept=".jpg,.jpeg,.png"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleBrochureChange}
                            />
                        </div>
                        <div className='text-[0.7rem] flex justify-center text-[#FF161F] mt-2 ml-6 '>*max. 5MB file size</div>
                    </div>
                </div>
            </div>
            <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    </form>
  )
}

export default AddNewScholarship