const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register", async (req,res)=>{
    const{name,email,password} = req.body

    const userAlreadyExists = await userModel.findOne({email})
    if(userAlreadyExists){
        return res.status(400).json({
            message: "user already exists"
        })
    }

    const user = await userModel.create({name,email,password})

    const token = jwt.sign(
        {
            id: user._id,
            email
        },
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered succcessfully",
        user,
        token
    })
})

module.exports = authRouter