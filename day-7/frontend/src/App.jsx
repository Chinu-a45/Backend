import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  console.log("Loaded");
  const [notes, setNotes] = useState([]);

  const fetchData = () => {
    axios.get("https://title-dic-generator.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  };

  function formHandler(e){
    e.preventDefault()
    const {title,discription,_id} = e.target
    console.log(_id.value)
    if(_id.value){
      axios.patch(`https://title-dic-generator.onrender.com/api/notes/${_id.value}`, {title: title.value,discription: discription.value})
      .then((data)=>{
        console.log(data)
      })
    }
    else{
      axios.post("https://title-dic-generator.onrender.com/api/notes",{
      "title": title.value,
      "discription": discription.value
    }).then((e)=>{
      console.log(e)
    })
    }

    e.target.title.value = ""
    e.target.discription.value = ""
    e.target._id.value = ""
    
    setTimeout(fetchData,100)
  }

  function deleteNote(e){
    axios.delete(`https://title-dic-generator.onrender.com/api/notes/${e}`)
    .then(e=>{
      console.log(e.data)
    })

    fetchData()
  }

  useEffect(()=>{
    fetchData()
    },[])

  return (
    <>
      <form action="" onSubmit={formHandler}>
        <input placeholder="title" type="text" name="title" id="title" />
        <input placeholder="discription" type="text" name="discription" />
        <input placeholder="id" type="text" name="_id" />
        <button>submit</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.discription}</p>
              <button onClick={()=>{deleteNote(note._id)}}>delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
