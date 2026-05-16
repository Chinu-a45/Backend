const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.err("Something went wrong while connecting to db,",err)
    })
}

module.exports = connectToDB