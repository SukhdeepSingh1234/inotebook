import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{

        const notesInitial=[
                {
                  "_id": "64ad08960243ae1d869dbdf5a",
                  "user": "64aba5c0fd83892703603b38",
                  "title": "My title",
                  "description": "wake up early in the morning it is good",
                  "tag": "personal",
                  "date": "2023-07-11T07:45:26.057Z",
                  "__v": 0
                },
                {
                  "_id": "64ad089602143aed869dbdf5c",
                  "user": "64aba5c0fd83892703603b38",
                  "title": "My title",
                  "description": "wake up early in the morning it is good",
                  "tag": "personal",
                  "date": "2023-07-11T07:45:26.477Z",
                  "__v": 0
                },
                {
                  "_id": "64ad08960243a1ed869dbdf5a",
                  "user": "64aba5c0fd83892703603b38",
                  "title": "My title",
                  "description": "wake up early in the morning it is good",
                  "tag": "personal",
                  "date": "2023-07-11T07:45:26.057Z",
                  "__v": 0
                },
                {
                  "_id": "64ad08960243aed869dbdf5c",
                  "user": "64aba5c0fd83892703603b38",
                  "title": "My title",
                  "description": "wake up early in the morning it is good",
                  "tag": "personal",
                  "date": "2023-07-11T07:45:26.477Z",
                  "__v": 0
                },
                {
                  "_id": "64ad108960243aed869dbdf5a",
                  "user": "64aba5c0fd83892703603b38",
                  "title": "My title",
                  "description": "wake up early in the morning it is good",
                  "tag": "personal",
                  "date": "2023-07-11T07:45:26.057Z",
                  "__v": 0
                },
                {
                  "_id": "64ad018960243aed869dbdf5c",
                  "user": "64aba5c0fd83892703603b38",
                  "title": "My title",
                  "description": "wake up early in the morning it is good",
                  "tag": "personal",
                  "date": "2023-07-11T07:45:26.477Z",
                  "__v": 0
                }]
        
        const [notes,setNotes]=useState(notesInitial)

        // Add a note
        const addNote=(title,description,tag)=>{
           const note={
            "_id": "64ad08960243aed869dbdf5c",
            "user": "64aba5c0fd83892703603b38",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-07-11T07:45:26.477Z",
            "__v": 0
          };
          setNotes(notes.concat(note) )
        }
        // Delete a note
        const deleteNote=(id)=>{
          console.log(id)
          const newNote= notes.filter((note)=>{
            return note._id !==id;
          })
          setNotes(newNote)
        }
        // Edit a note
        const editNote=(id,title,description,tag)=>{
          
        }
        return(
         <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
   )
}

export default NoteState;