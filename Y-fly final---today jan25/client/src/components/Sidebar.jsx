import React from 'react'
import yfly from '../assets/images/yflywhite.svg'
import logoutimg from '../assets/images/logout.svg'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = ({ setSelectedComponent }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        // Show toast notification
        toast.success('Logout successful!', {
            position: 'top-center',
            autoClose: 1000,
            style: { backgroundColor: '#30589F', color: 'white' },
        });

        // Wait for 2 seconds before logging out and redirecting
        setTimeout(() => {
            localStorage.removeItem('token');
            dispatch(logout()); // Dispatch the logout action
            navigate('/admin-login'); // Redirect to the login page
        }, 2000);
    };
    return (
        <div className=' grid content-between h-full bg-[#30589F]'>
            {/* <ToastContainer/> */}
            <div>
                <div className='flex justify-center py-20'>
                    <img src={yfly} width={120} alt='logo' />
                </div>
                <div className='mx-2 font-urban'>
                    <button
                        onClick={() => setSelectedComponent('enquiries')}
                        className='py-3  w-[100%] pl-10 text-white text-left hover:bg-white rounded-[15px] hover:text-[#30589F]'>
                        Enquiries
                    </button>
                    <button onClick={() => setSelectedComponent('courses')} className='py-3 w-[100%] pl-10 text-white text-left hover:bg-white rounded-[15px] hover:text-[#30589F]'>Courses</button>
                    <button onClick={() => setSelectedComponent('scholarships')} className='py-3 w-[100%] pl-10 text-white text-left hover:bg-white rounded-[15px] hover:text-[#30589F]'>Scholarships</button>
                    <button onClick={() => setSelectedComponent('university')} className='py-3 w-[100%] pl-10 text-white text-left hover:bg-white rounded-[15px] hover:text-[#30589F]'>Universities</button>
                    <button className='py-3 w-[100%] pl-10 text-white text-left hover:bg-white rounded-[15px] hover:text-[#30589F]'>Services</button>
                </div>
            </div>
            <div>
                <hr className='mx-3 text-white' />
                <button onClick={handleLogout}
                    className='flex justify-center items-center text-white font-urban py-3 w-full rounded-[15px] hover:text-[#ffffff]'>                     
                    <img src={logoutimg} alt='logout' width={16} className='mr-2' />
                    Logout
                </button>
            </div>


        </div>
    )
}

export default Sidebar