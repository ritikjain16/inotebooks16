import React, { useContext, useState } from 'react'
import Notecontext from "../context/notes/NoteContext";
const NoteItem = (props) => {
    const { note } = props
    const notecontext = useContext(Notecontext);
    const { deletenote, editnote } = notecontext;

    const [noteedit, setnoteedit] = useState({ title: note.title, description: note.description, tag: note.tag })

    const handleclick = (e) => {
        // e.preventDefault()
        editnote(note._id, noteedit.title, noteedit.description, noteedit.tag)
    }

    const onChange = (e) => {
        setnoteedit({ ...noteedit, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="card col-md-3 m-3 notecard shadow">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="far fa-trash-alt mx-2" style={{ cursor: "pointer" }} onClick={() => { deletenote(note._id) }}></i>
                    <i className="far fa-edit mx-2" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#abcd${note._id}`}></i>
                </div>
            </div>

            <div className="modal fade" id={`abcd${note._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{note.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor={`title${note._id}`} className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" id={`title${note._id}`} name="title" value={noteedit.title} onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor={`desc${note._id}`} className="col-form-label">Description:</label>
                                    <input type="text" className="form-control" id={`desc${note._id}`} name="description" value={noteedit.description} onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor={`tag${note._id}`} className="col-form-label">Tag:</label>
                                    <input type="text" className="form-control" id={`tag${note._id}`} name="tag" value={noteedit.tag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick} data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default NoteItem
