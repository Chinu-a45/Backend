import express from "express"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"

const authRouter = express.Router()

authRouter.post("/register", async(req,res)=>{
    const { name ,email, password} = req.body

    const userAlreadyExists = await userModel.findOne({email})
    if(userAlreadyExists){
        return res.status(409).json({
            message: "user already registered, please sign in"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = await userModel.create({name, email, password:hashedPassword})

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("token",token)

    res.status(201).json({
        message: 'user registered successfully',
        user
    })
})

authRouter.post("/login", async(req,res)=>{
    const{email, password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message: "User doesn't exist, please signup"
        })
    }

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(401).json({
            message: "password is incorrect"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("token",token)

    res.status(200).json({
        message: "user logged in successfully",
        user,
    })
    
})

export default authRouter