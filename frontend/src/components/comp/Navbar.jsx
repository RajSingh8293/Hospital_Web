// import { Link, NavLink } from "react-router-dom"
// import { Button } from "../ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import { CiMenuFries } from "react-icons/ci";
// import { useState } from "react"
// import { IoCloseOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "@/redux/slices/userSlice";

import { NavLink } from "react-router-dom"


// const Navbar = () => {
//     const dispatch = useDispatch()
//     const { user, isAuthenticated } = useSelector((state) => state.auth)


//     const [showMenu, setShowMenu] = useState(false)


//     const menuLinks = [
//         {
//             name: "Home",
//             link: '/'
//         },
//         {
//             name: "Jobs",
//             link: '/jobs'
//         },
//     ]

//     // let axiosConfig = {
//     //     withCredentials: true,
//     // }

//     const logoutHandler = async () => {
//         dispatch(logoutUser())
//         // try {
//         //     dispatch(setLoading(true))
//         //     const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/user/logout`, axiosConfig)
//         //     console.log(data);
//         //     if (data.success) {
//         //         dispatch(setUser(null))
//         //         navigate('/')
//         //         toast.success(data.message)
//         //     }
//         //     dispatch(setLoading(false))
//         // } catch (error) {
//         //     console.log(error);
//         //     dispatch(setLoading(false))
//         // }

//     }

//     return (
//         <section className="fixed w-full z-20 h-16 flex lg:px-10 px-5 py-2  bg-gray-800">
//             <div className="flex w-full justify-between items-center gap-3 text-white ">
//                 <div>
//                     {isAuthenticated && user?.role === "recruiter" ?
//                         <h1 className="text-3xl font-bold text-orange-500">
//                             <Link to='/myjobs'>LearnCode</Link>
//                         </h1>
//                         :
//                         <h1 className="text-3xl font-bold text-orange-500">
//                             <Link to='/'>LearnCode</Link>
//                         </h1>
//                     }
//                 </div>
//                 <div>
//                     {
//                         isAuthenticated && user?.role === "recruiter" ?
//                             <ul className="flex justify-center items-center gap-4">
//                                 <li>
//                                     <NavLink to='/myjobs'>
//                                         Dasboard
//                                     </NavLink>
//                                 </li>
//                                 {isAuthenticated ?
//                                     <li>
//                                         <Popover>
//                                             <PopoverTrigger>
//                                                 <Avatar className=" bg-orange-500 flex justify-center items-center">

//                                                     {user && user?.profileImage?.url ? < AvatarImage className="w-8 h-8 rounded-full" src={user?.profileImage?.url} />
//                                                         :
//                                                         <AvatarFallback className="bg-blue-600 capitalize font-bold text-xl">{user?.username?.slice(0, 1)}</AvatarFallback>
//                                                     }
//                                                 </Avatar>

//                                             </PopoverTrigger>
//                                             <PopoverContent>
//                                                 <div className="flex justify-around items-center">
//                                                     <NavLink to='/profile' className="hover:underline">View Profile</NavLink>
//                                                     <Button onClick={logoutHandler} variant="destructive">Logout</Button>
//                                                 </div>
//                                             </PopoverContent>
//                                         </Popover>
//                                     </li>
//                                     :
//                                     <li>
//                                         <NavLink to='/login'>
//                                             Login
//                                         </NavLink>
//                                     </li>
//                                 }
//                             </ul>
//                             :
//                             <>
//                                 <ul className="hidden md:flex lg:flex justify-center items-center gap-4">
//                                     {menuLinks?.map((data, index) =>
//                                         <li key={index}>
//                                             <NavLink to={data?.link}>
//                                                 {data?.name}
//                                             </NavLink>
//                                         </li>
//                                     )}
//                                     {isAuthenticated ?
//                                         <li>
//                                             <Popover>
//                                                 <PopoverTrigger>
//                                                     <Avatar className=" bg-orange-500 flex justify-center items-center">

//                                                         {user && user?.profileImage?.url ? < AvatarImage className="w-8 h-8 rounded-full" src={user?.profileImage?.url} />
//                                                             :
//                                                             <AvatarFallback className="bg-blue-600 capitalize font-bold text-xl">{user?.username.slice(0, 1)}</AvatarFallback>
//                                                         }
//                                                     </Avatar>

//                                                 </PopoverTrigger>
//                                                 <PopoverContent>
//                                                     <div className="flex justify-around items-center">
//                                                         <NavLink to='/profile' className="hover:underline">View Profile</NavLink>
//                                                         <Button onClick={logoutHandler} variant="destructive">Logout</Button>
//                                                     </div>
//                                                 </PopoverContent>
//                                             </Popover>
//                                         </li>
//                                         :
// <li>
//     <NavLink to='/login'>
//         Login
//     </NavLink>
// </li>
//                                     }

//                                 </ul>

//                                 {/* menu  */}
//                                 <div className="lg:hidden  md:hidden">
//                                     {showMenu ?
//                                         <button onClick={() => setShowMenu(!showMenu)}>
//                                             <IoCloseOutline className="" fontSize={30} />
//                                         </button>
//                                         :
//                                         <button onClick={() => setShowMenu(!showMenu)}><CiMenuFries className="" fontSize={25} /></button>
//                                     }
//                                 </div>

//                                 {/* toggel menu  */}

//                                 {
//                                     showMenu &&
//                                     <ul className="absolute w-full h-[100vh] bg-gray-800 z-20 top-10 right-0 flex flex-col  justify-center items-center gap-5">
//                                         {menuLinks?.map((data, index) =>
//                                             <li key={index}>
//                                                 <NavLink to={data?.link}>
//                                                     {data?.name}
//                                                 </NavLink>
//                                             </li>
//                                         )}

//                                         {isAuthenticated ?
//                                             <li>
//                                                 <Popover>
//                                                     <PopoverTrigger>
//                                                         <Avatar className=" bg-orange-500 flex justify-center items-center">

//                                                             {user && user?.profileImage?.url ? < AvatarImage className="w-8 h-8 rounded-full" src={user?.profileImage?.url} />
//                                                                 :
//                                                                 <AvatarFallback className="bg-blue-600 capitalize font-bold text-xl">{user?.username?.slice(0, 1)}</AvatarFallback>
//                                                             }
//                                                         </Avatar>

//                                                     </PopoverTrigger>
//                                                     <PopoverContent>
//                                                         <div className="flex justify-around items-center">
//                                                             <NavLink to='/profile' className="hover:underline">View Profile</NavLink>
//                                                             <Button onClick={logoutHandler} variant="destructive">Logout</Button>
//                                                         </div>
//                                                     </PopoverContent>
//                                                 </Popover>
//                                             </li>
//                                             :
//                                             <li>
//                                                 <NavLink to='/login'>
//                                                     Login
//                                                 </NavLink>
//                                             </li>
//                                         }

//                                     </ul>}
//                             </>
//                     }


//                 </div>
//             </div>
//         </section>

//     )
// }

// export default Navbar


const Navbar = () => {
    return (
        <div className="fixed w-full bg-gray-800 h-16 text-white flex justify-between items-center lg:px-10 px-5">
            <div>
                <NavLink to='/'>LearCode</NavLink>
            </div>
            <div>
                <ul className="flex justify-between items-center gap-5">
                    <li>
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/jobs'>
                            Jobs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar