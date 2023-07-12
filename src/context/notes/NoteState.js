import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState= (props)=>{

        const notesInitial=[
                {
                  "_id": "64ad08960243aed869dbdf5a",
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
                  "_id": "64ad08960243aed869dbdf5a",
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
                  "_id": "64ad08960243aed869dbdf5a",
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
                }]
        
        const [notes,setNotes]=useState(notesInitial)
        return(
         <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
   )
}

export default NoteState;