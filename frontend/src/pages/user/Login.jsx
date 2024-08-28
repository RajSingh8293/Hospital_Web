
/* eslint-disable no-unused-vars */
import Layout from "@/components/comp/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { clearAllUserErrors, loginUser } from "@/redux/slices/userSlice"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, error, message, loading, isAuthenticated } = useSelector((state) => state.auth)

    const [userData, setUserData] = useState({
        email: '',
        password: '',
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


    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(loginUser(userData))

    }

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
        if (error) {
            toast.error(error)
            dispatch(clearAllUserErrors())
        }

        if (isAuthenticated) {
            navigate('/profile')
        }
    }, [dispatch, error, navigate, isAuthenticated, user])

    return (
        <Layout>
            <div className="py-32 flex items-center lg:min-h-screen md:min-h-screen flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="shadow w-full lg:w-[500px] md:w-[500px] sm:w-[500px] shadow-gray-800 rounded-lg p-5">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="py-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Register
                        </h2>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form>
                            <div className="mb-3">
                                <Label>Email</Label>
                                <Input type="email" placeholder="Your Email" name="email" className="outline-none" value={userData.email} onChange={onchangeHandler} />
                            </div>
                            <div className="mb-3">
                                <Label>Password</Label>
                                <Input type="password" placeholder="Your Password" name="password" className="outline-none" value={userData.password} onChange={onchangeHandler} />
                            </div>
                            <div className="mb-3">
                                <Button type="submit" onClick={submitHandler}> Submit</Button>
                            </div>
                            <div className="">
                                <p>Create a new account  <NavLink className="hover:underline hover:text-blue-500" to='/register'>Register</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login


