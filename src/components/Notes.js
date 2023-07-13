import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
function Notes() {
    const context=useContext(noteContext) 
    const {notes,addNote }=context;
     return (
      <>
      <AddNote/>
      <div > 
        <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          return <Noteitem note={note} />
        })}
       </div>
      </div>
      </>
  )
}

export default Notes
