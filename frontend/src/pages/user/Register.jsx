import Layout from "@/components/comp/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { setLoading, setUser } from "@/redux/slices/userSlice"
import { backendApi } from "@/constant/Api"

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, user, error } = useSelector((state) => state.auth)

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
        role: '',
    })

    const onchangeHandler = (e) => {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    let axiosConfig = {
        withCredentials: true,
    }

    // const submitHandler = async (e) => {
    //     e.preventDefault()
    //     // dispatch(registerUser(userData))
    //     try {
    //         const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_UR}/user/register`, userData);
    //         if (data.success) {
    //             toast.success(data.message)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error?.response?.data?.message)

    //     }
    // }
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(userData);
        try {
            dispatch(setLoading(true))
            const { data } = await axios.post(
                `${backendApi}/api/v1/user/register`,
                userData,
                axiosConfig,
            )
            console.log(data)
            if (data.success) {
                dispatch(setUser(data.user))
                navigate('/')
                toast.success(data.message)
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
        }
    }


    useEffect(() => {
        if (error) {
            toast.error(error)
        }
        // if (isAuthenticated) {
        //     navigate('/profile')
        // }
    }, [dispatch, navigate, isAuthenticated, error, user])

    return (
        <Layout>

            <div className="flex items-center lg:min-h-screen md:min-h-screen flex-1 flex-col justify-center px-6 py-24 lg:px-8">
                <div className="shadow shadow-gray-800 rounded-lg w-full lg:w-[500px] md:w-[500px] sm:w-[500px] p-5">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className=" py-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Register
                        </h2>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form>
                            <div className="mb-3">
                                <Label>Username</Label>
                                <Input type="text" placeholder="Your Username" name="username" className="outline-none" value={userData.username} onChange={onchangeHandler} />
                            </div>

                            <div className="mb-3">
                                <Label>Email</Label>
                                <Input type="email" placeholder="Your Email" name="email" className="outline-none" value={userData.email} onChange={onchangeHandler} />
                            </div>
                            <div className="mb-3">
                                <Label>Password</Label>
                                <Input type="password" placeholder="Your Password" name="password" className="outline-none" value={userData.password} onChange={onchangeHandler} />
                            </div>
                            <div className="mb-3">
                                <Label>Please choose your role</Label>

                                <select
                                    className='w-[100%] border py-2 px-2 text-sm text-gray-500 rounded-md'
                                    name='role'
                                    value={userData?.role}
                                    onChange={onchangeHandler}
                                >
                                    <option value="">Select Role</option>
                                    <option value="applicant"> I’m a applicant, looking for work</option>
                                    <option value="recruiter"> I’m a recruiter, hiring for a project</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <Label>Location</Label>
                                <Input type="text" placeholder="Your location" name="location" className="outline-none" value={userData.location} onChange={onchangeHandler} />
                            </div>
                            <div className="mb-3">
                                <Button type="submit" onClick={submitHandler}>Submit</Button>
                            </div>
                            <div className="">
                                <p>I already have an account  <NavLink className="hover:underline hover:text-blue-500" to='/login'>Login</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register



