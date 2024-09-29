/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { backendApi } from "@/constant/Api"
import { setLoading, setUser } from "@/redux/slices/userSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const UpdateProfile = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: user?.username,
        email: user?.email,
        location: user?.location,
    })


    const onchangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    let axiosConfig = {
        withCredentials: true,
    }

    const updateHandler = async (e) => {
        e.preventDefault()
        console.log(userData);
        try {
            dispatch(setLoading(true))
            const { data } = await axios.put(
                `${backendApi}/api/v1/user/update/me`,
                userData,
                axiosConfig,
            )
            console.log(data);
            if (data.success) {
                dispatch(setUser(data?.user))
                navigate('/profile')
                toast.success(data?.message)
            }
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false))
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            onChange={onchangeHandler}
                            defaultValue={userData?.username}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            onChange={onchangeHandler}
                            defaultValue={userData?.email}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="location"
                            name="location"
                            onChange={onchangeHandler}
                            defaultValue={userData?.location}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={updateHandler}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile