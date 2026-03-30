const app = require("./src/app");
const mongoose = require("mongoose")

mongoose.connect("")

app.listen(3000, ()=>{
    console.log("server started successfully.....")
})