const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "Cannot register with same emails"]
    },
    password: String
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel