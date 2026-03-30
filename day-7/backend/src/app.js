const express = require("express")
const noteModel = require("./models/note.model")
const app = express()
const cors = require("cors")
const path = require("path")

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

app.get("/api/notes",async (req, res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message: "got it successfully",
        notes
    })
})

app.post("/api/notes", async (req,res)=>{
    const {title, discription} = req.body;
    const notes = await noteModel.create({
        title, discription
    }) 

    res.status(201).json({
        message: "note created successfully",
        notes
    })
})

app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const updatedData = req.body
    console.log(updatedData)
    await noteModel.findByIdAndUpdate(id, updatedData)

    res.status(201).json({
        message: "ho gaya update",
    })
})

app.delete("/api/notes/:id", async (req,res)=>{
    const deletedItem = await noteModel.findByIdAndDelete(req.params.id)
    res.status(204).json({
        message: "ho gya kam bete , jio khul ke khol ke"
    })
})

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app