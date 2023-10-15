"use client"

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router=useRouter();
    const [user, setUser]=React.useState({
        username:"",
        email:"",
        password:"",
    })

    const onSignup=async () => {
        try {
           const response=await axios.post("/api/users/signup",user);
           console.log("Signup success",response.data)
            router.push("/login")

        } catch (error:any) {
            console.log("Signup failed", error.message)
            toast.error(error.message)
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <label htmlFor="username">username</label>
            <input 
                className="p-2 border border-grey-300 rounded-lg mb-4  focus:outline-none focus:border-grey-600"
                type='text' 
                id='username' 
                value={user.username}
                onChange={(e)=>setUser({...user,username:e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-grey-300 rounded-lg mb-4  focus:outline-none focus:border-grey-600"
                type='text' 
                id='email' 
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input 
                className="p-2 border border-grey-300 rounded-lg mb-4  focus:outline-none focus:border-grey-600"
                type='password' 
                id='password' 
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                placeholder="password"
            />
            <button
                className="p-2 border border-grey-300 rounded-lg mb-4  focus:outline-none focus:border-grey-600"
                onClick={onSignup}
            >Signup here</button>
            <Link href="/login">Visit login</Link>
        </div>
    )
}