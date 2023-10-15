import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {email, password}=reqBody;
        console.log(reqBody);
        //check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status : 400});
        }
        //compare passwords
        const isMatch = await bcryptjs.compare(password , user.password);
        if (!isMatch){
            return NextResponse.json("Invalid password",{ status :501})
        }
        //create token data
        const tokenData={
            id:user._id,
            usename:user.username,
            email:user.email
        };
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})//creates signed token
        
        const response = NextResponse.json({
            message:"Login successfull",
            success:true,
        })
        response.cookies.set("token", token, {httpOnly:true});
        
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}