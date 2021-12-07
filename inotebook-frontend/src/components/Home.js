import React, { useContext, useEffect, useState } from "react";
import Notecontext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useHistory } from "react-router-dom";
const Home = () => {
    const history = useHistory()
    const notecontext = useContext(Notecontext);
    const { notes, addnote } = notecontext;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        addnote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token") === null) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container my-4 col-md-6">

                <h1>iNotebook Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>


                    <div className="d-grid gap-2 my-4">
                        <button type="button" className="btn btn-primary button-lg" onClick={handleclick} disabled={note.title.length < 3 && note.description.length < 5 && note.tag.length < 3}>Add Note</button>
                    </div>
                </form>



            </div>
            <div className="container my-3">
                <h2 className="m-4" style={{ textAlign: "center" }}>Your Notes</h2>
                {localStorage.getItem("auth-token") !== null ? (<> <div className="row d-flex justify-content-center">
                    {notes.map((note, index) => {
                        return <NoteItem key={note._id} note={note} />;
                    })}
                </div></>) : (<></>)}
            </div>
        </>
    );
};

export default Home;
