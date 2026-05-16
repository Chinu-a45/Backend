import mongoose from "mongoose"

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.log("database connection failed due to the following error: ",err)
    })
}

export default connectToDB