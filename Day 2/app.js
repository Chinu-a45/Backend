const express = require("express")

const app = express()

app.get("/",(req,res)=>{
    res.send("Jai Shree Ram")
})

app.listen(3000)