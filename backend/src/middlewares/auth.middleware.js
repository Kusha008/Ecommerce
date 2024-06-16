//verifies if user is authenticated or not

import { Seller } from "../models/seller.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
        
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=user;
    
        next()
    } catch (error) {
        throw new ApiError(401,error.message)
        
    }
})
export const verifyJWTforSeller = asyncHandler(async (req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
        
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const seller=await Seller.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!seller){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=seller;
    
        next()
    } catch (error) {
        throw new ApiError(401,"Invalid Access Token")
    }
})


export const verifySeller=asyncHandler(async(req,res,next)=>{

    if(!req.user.sellerVerified) throw new ApiError(400,"Seller is not verified")
    
    next();
})
