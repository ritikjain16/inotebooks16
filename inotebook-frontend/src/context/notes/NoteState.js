import NoteContext from "./NoteContext";
import { useState, useEffect } from "react";
const NoteState = (props) => {
  // const host = "http://localhost:5000"
  const host = process.env.REACT_APP_HOST_URL;
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);


  const getnotes = async () => {
    if (localStorage.getItem("auth-token") !== null) {
      props.setProgress(25)
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'token1': localStorage.getItem("auth-token")
        },
      })
      props.setProgress(50)
      const json = await response.json()
      props.setProgress(75)
      setnotes(json)
      props.setProgress(100)
    }
    props.setProgress(100)
  }

  useEffect(() => {
    getnotes()
    // eslint-disable-next-line 
  }, [])


  const addnote = async (title, description, tag) => {
    try {
      props.setProgress(25)
      const response = await fetch(`${host}/api/notes/createnote`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'token1': localStorage.getItem("auth-token")
        },
        body: JSON.stringify({ title, description, tag })
      })
      props.setProgress(50)
      await response.json()
      props.setProgress(75)
      getnotes()
      props.setProgress(100)
      props.showalert("Note added successfully", "success")
      // setnotes(notes.concat(json))
    } catch (err) {
      if (err) {
        props.showalert(err.toString(), "danger")
      }
    }
  }

  const deletenote = async (id) => {
    try {
      props.setProgress(25)
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "POST",
      })
      props.setProgress(50)
      // const newnotes = notes.filter((note) => { return note._id !== id })
      // setnotes(newnotes)
      getnotes()
      props.setProgress(100)
      props.showalert("Note deleted successfully", "success")
    } catch (err) {
      if (err) {
        props.showalert(err.toString(), "danger")
      }
    }
  }
  const editnote = async (id, title, description, tag) => {
    try {
      props.setProgress(25)
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: { 'Content-Type': "application/json", },
        body: JSON.stringify({ title, description, tag })
      })
      props.setProgress(50)
      await response.json()
      props.setProgress(75)
      getnotes()
      props.setProgress(100)
      props.showalert("Note updated successfully", "success")
    } catch (err) {
      if (err) {
        props.showalert(err.toString(), "danger")
      }
    }
  }


  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
