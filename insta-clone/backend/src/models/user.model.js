const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: [true, "user already registered"],
    },
    email: {
        type: String,
        unique: [true, "email already registered"],
    },
    password: String,
    bio: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/chindan/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
    },
    following:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    followers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel