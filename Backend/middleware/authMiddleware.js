import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect=async(req,res,next)=>{
    const authHeader=req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:'Not authorized,no token'})
    }
    try{
        const token=authHeader.split(" ")[1]

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=await User.findById(decoded.id).select("-password")


        if(!req.user){
           return res.status(401).json({message:'user not found'})
        }
        if(req.user.blocked){
            return res.status(403).json({message:'user blocked'})

        }
        next()
    }
    catch(error){
        res.status(401).json({message:'invalid token or expired'})

    }
}

export const adminOnly=(req,res,next)=>{
    if(req.user?.role!=="admin"){
        return res.status(403).json({message:'admin access only'})
    }
    next()
}