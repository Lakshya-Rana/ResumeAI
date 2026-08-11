import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyJwt = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","")
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
    if(!user){
        throw new apiError(401,"Unauthorized")
    }
    req.user = user
    next()
})