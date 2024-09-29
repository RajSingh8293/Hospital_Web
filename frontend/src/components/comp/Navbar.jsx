

import { backendApi } from '@/constant/Api';
import { setLoading, setLogout } from '@/redux/slices/userSlice';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    let axiosConfig = {
        withCredentials: true,
    }

    const logoutHandler = async () => {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(
                `${backendApi}/api/v1/user/logout`,
                axiosConfig
            )
            console.log(data)
            if (data.success) {
                dispatch(setLogout())
                toast.success(data.message)
                // setShow(!show)
                navigate('/')
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false))
        }
    };
    return (
        <nav className="bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-white text-lg font-bold">My Website</div>
                <ul className=" hidden md:flex space-x-4">
                    <li>
                        <NavLink to='/' className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/jobs' className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                            Jobs
                        </NavLink>
                    </li>
                    {
                        user ?
                            <>
                                <li>
                                    <NavLink to='/profile' className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <span onClick={logoutHandler} className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                                        Logout
                                    </span>
                                </li>
                            </>
                            :
                            <li>
                                <NavLink to='/login' className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                                    Login
                                </NavLink>
                            </li>
                    }
                </ul>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>
            {
                isOpen && (
                    <ul className="md:hidden bg-gray-700">
                        <li>
                            <NavLink to='/' className="block text-white hover:bg-gray-600 px-4 py-2">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/jobs' className="block text-white hover:bg-gray-600 px-4 py-2">
                                Jobs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/login' className="block text-white hover:bg-gray-600 px-4 py-2">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/register' className="block text-white hover:bg-gray-600 px-4 py-2">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                )
            }
        </nav >
    );
};

export default Navbar;
