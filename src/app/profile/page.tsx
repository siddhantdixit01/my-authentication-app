"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function ProfilePage(){
    const router=useRouter();
    const [data, setData]= useState("nothing");
    const logout=async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout successfull")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails=async () => {
        const res=await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }

    return(
        <div>
            <h1 className="text-center">Profile Page</h1><br/>
            <p className="lead text-center"><strong>Profile</strong></p>
            <h2>{data==='nothing' ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout}>Logout</button><hr/>
            <button onClick={getUserDetails}>Get User Details</button>
        </div>
    )
}