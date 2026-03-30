const express = require("express")
const app = express()

app.use(express.json())

const notes = []

app.get("/notes",(req, res)=>{
    res.status(200).json({
        message: "Got the message",
        data: notes
    })
    
})

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(200).json({
        message: "Successfully sent note"
    })
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("delete ho gaya")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].title = req.body.title
    res.send("Ho gaya modified")
})

module.exports = app