const express = require("express")
const noteModel = require("./models/notes.model")

const app = express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("<h1 style = 'background-color:>Hello mittar</h1>")
})

app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message: "data fetched successfullY",
        notes
    })
})

app.post("/notes",async (req,res)=>{
    const {title, description} = req.body
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

module.exports = app