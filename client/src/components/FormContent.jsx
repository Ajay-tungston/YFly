import React, { createContext, useEffect, useState } from "react";

export const FormContent = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    
   
   
   
    email: "",
  
    mainCriteria: [],



    user_id: "", 
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    firstLogin: true,
    countries: [],
    degree: "",
    education_details: {
      education_level: "",
      percentage: "",
      board: "",
      scores: "",
    },
    work_experience: {
      has_experience: false,
      months_of_experience: "",
    },
    majors: [],
    proficiency_exam: {
      exam_name: "",
      score: "",
    },
    academic_test: {
      test_name: "",
      verbal_score: "",
      quant_score: "",
    },
    selectedCourses: []
  });

///
useEffect(()=>{
  formData.email=localStorage.getItem("email")||""
},[])

///

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));

  };

  return (
    <FormContent.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContent.Provider>
  );
};
