const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

//register api
authRouter.post("/register", async (req,res)=>{
    const{name,email,password} = req.body

    const userAlreadyExists = await userModel.findOne({email})
    if(userAlreadyExists){
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name,email,password: hash
    })

    const token = jwt.sign( 
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("token",token)
    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })

})

//login api
authRouter.post("/login", async(req, res)=>{
    const{ email, password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message: "user doesn't exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    if(user.password != hash){
        return res.status(401).json({
            message: "email or password is incorrect"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.status(201).json({
        message: "user logged in successfully",
        user,
        token
    })

})

//dummy get for cookie seeing
authRouter.get("/protected",(req,res)=>{
    const cookie = req.cookies
    res.json({
        cookie
    })
})

module.exports = authRouter