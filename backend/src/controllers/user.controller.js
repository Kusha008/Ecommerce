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
const generateAccessAndRefreshTokens=async(userId)=>{
    try{
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        //now saving this refresh token into the db
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})//this valdiatebeforesave is used to remove the validations that mongoose does before inserting into db(eg password required while inserting data)
        return {accessToken,refreshToken}

    }catch(error){
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}


const options={
    httpOnly:true,
    secure:true
}
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

const loginUser=asyncHandler(async(req,res)=>{
    //get user details from fronten
    //check if user exists
    //find user in database
    //check password is correct
    //generate access and refresh token and send to user

    const {email,username,password}=req.body;

    if(!email && !username){
        throw new ApiError(400,"Email or username is required")
    }
    if(!password){
        throw new ApiError(400,"Password is required")
    }
    const user=await User.findOne({
        $or:[{email},{username}]
    });
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordMatch=await user.isPasswordCorrect(password);
    if(!isPasswordMatch){
        throw new ApiError(401,"Incorrect password")
    }
    const {accessToken, refreshToken}=await generateAccessAndRefreshTokens(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refresh")

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser=asyncHandler(async(req,res)=>{
    const user=await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken:""
            },
        },
        {new:true}
    )
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    //clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json(new ApiResponse(200, user, "User logged out successfully"));
})

//refresh access token after its expiry
const refreshAccessToken=asyncHandler(async(req,res)=>{
    //get refresh token from user
    //verify refresh token
    //get user id
    //generate new access token
    //send new access token
    //send new refresh token
    const incomingRefreshToken=req.cookies?.refreshToken || req.body.refreshToken;//here req.body because cookies might not be available in all cases eg mobile browsers so we read it from frontend
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unathorized refresh token")
    }
    try {
        const decodedToken=jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user=await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Invalid Refresh Token")
        }
        if(incomingRefreshToken!==user.refreshToken){
            throw new ApiError(401,"Refresh token is invalid or expired")
        }
        const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
    
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken:newRefreshToken
                },
                "Access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401,error.message ||"Inavalid refresh token")
    }
})

const changeCurrentPassword=asyncHandler(async(req,res)=>{
    //get user id from req.user_id
    //check the current passowrd entered by user
    //take the new password
    //update the password in db
    //return res with success message

    const {oldPassword,newPassword}=req.body;
    const user=await User.findById(req.user._id);
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Incorrect password")
    }
    user.password=newPassword;
    await user.save({validateBeforeSave:false});

    return res.status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))
})
export { registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword
 }
