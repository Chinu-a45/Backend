const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const{name, username, email, password, profileImage, followers, following, bio} = req.body

    const userAlreadyExists = await userModel.findOne({
        $or: [{username},
            {email}
        ]
    })
    if(userAlreadyExists){
        return res.status(409).json({
            message: `User already registered with the same ${userAlreadyExists.email==email? "email":"username"}`
        })
    }

    hashedPassword = await bcrypt.hash(password,10)
    const user = await userModel.create({name, username, email, password:hashedPassword, bio, profileImage})

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("token",token)
    res.status(401).json({
        message: "User registered successfully",
        user:{
            email: user.email,
            name: user.name
        }
    })
}

async function loginController(req, res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or: [{email},{username}]
    })
    if(!user){
        return res.status(401).json({
            message: `${email? "email":"username"} doesn't exist, please sign up first`
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
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
        user: {
            name: user.name,
            email: user.email
        }
    })
}

module.exports = {registerController, loginController}