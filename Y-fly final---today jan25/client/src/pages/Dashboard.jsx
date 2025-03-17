import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AddNewScholarship from '../components/AddNewScholarship'
import EnquiryList from '../components/EnquiryList'
import CourseList from '../components/CourseList'
import AddNewCourse from '../components/AddNewCourse'
import ScholarshipList from '../components/ScholarshipList'

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('enquiries');
  const [addCourse, setAddCourse] = useState('');
  const [addScholarship, setAddScholarship] = useState('');

  useEffect(() => {
    // clear addCourse or addScholarship when changing selectedComponent
    if (selectedComponent !== 'courses') {
      setAddCourse('');
    }
    if (selectedComponent !== 'scholarships') {
      setAddScholarship('');
    }
  }, [selectedComponent]);

  const renderComponent = () => {
    if (addCourse) {
      return <AddNewCourse />;
    }
    if (addScholarship) {
      return <AddNewScholarship />;
    }
    switch (selectedComponent) {
      case 'enquiries':
        return <EnquiryList />;
      case 'courses':
        return <CourseList setAddCourse={setAddCourse} />;
      case 'scholarships':
        return <ScholarshipList setAddScholarship={setAddScholarship} />;
      default:
        return <EnquiryList />; // Default case if none match
    }
  };

  return (
    <div className='w-full flex'>
      <div className='w-[18%] max-xl:w-[22%]'>
        <Sidebar setSelectedComponent={setSelectedComponent} />
      </div>
      <div className='w-[82%]'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;















