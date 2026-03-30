const express = require("express")
const app = express()

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("Note created")
})

app.get("/notes",(req,res)=>{
    console.log(notes)
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[ req.params.index ]
})

module.exports = app