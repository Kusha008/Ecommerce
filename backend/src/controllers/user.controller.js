import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

// const registerUser=asyncHandler(async(req,res)=>{
//     res.status(200).json({
//         message:"User registered successfully"
//     })
// })
// const registerUser = asyncHandler(async (req, res) => {
//     //get user details from frontend
//     //validation - not empty
//     //check if user already exists:check username and email
//     //check for images, check for avatar
//     //upload them to cloudinary,avatar
//     //create user object - create entry in db
//     //remove password and refresh token field from response
//     //check for user creation 
//     //return res else return err response

//     const { fullName, email, username, password } = req.body
//     // console.log("Email:",email);

//     // if(fullName==="")
//     // {
//     //     throw new ApiError(400,"Full Name is required")
//     // }
//     //this same code has to be replicated for other field as well and hence we use the below code

//     //validation of user details that they are empty or not
//     if(
//         [fullName,email,username,password].some((field)=>field?.trim()==="")
//     ){
//         throw new ApiError(400,"All field are required")
//     }
//     //checking if user already exists or not
//     const existedUser=await User.findOne({
//         $or:[{username},{email}]
//     })
//     if(existedUser){
//         throw new ApiError(409,"User with email or username already exists")
//     }
//     //check for images, check for avatar
//     console.log(req.files);
//     const coverImageLocalPath = req.files?.avatar[0]?.path;
//     // const coverImageLocalPath = req.files?.coverImage[0]?.path;

//     // let coverImageLocalPath;
//     // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
//     //     coverImageLocalPath=req.files.coverImage[0].path
//     // }



//     //uploading this to cloudinary
//     const coverImage=await uploadOnCloudinary(coverImageLocalPath)

//     //uploading user to the data base
//     const user= await User.create({
//         fullName,
//         coverImage:coverImage?.url || "",
//         email,
//         password,
//         username:username.toLowerCase()
//     })
//     //now checking if user is successfully created in db or not
//     //here we use select to remove the password and refreshToken fields in the output of postman
//     const createdUser=await User.findById(user._id).select(
//         "-password -refreshToken"
//     )
//     if(!createdUser){
//         throw new ApiError(500,"Something went wrong while registering the user");
//     }

//     //returning res using ApiResponse
//     return res.status(201).json(
//         new ApiResponse(200,createdUser,"USER REGISTERED SUCCESSFULLY")
//     )

// })

// export {registerUser}



const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists:check username and email
    //check for images, check for avatar
    //upload them to cloudinary,avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return res else return err response
    const { fullName, email, username, password } = req.body;
    

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    console.log('Uploaded file:', req.file); // Debug statement

    let coverImage = "";
    if (req.file) {
        try {
            coverImage = await uploadOnCloudinary(req.file.path);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw new ApiError(500, "Error uploading image to Cloudinary");
        }
    }

    const user = await User.create({
        fullName,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "USER REGISTERED SUCCESSFULLY")
    );
});

export { registerUser }
