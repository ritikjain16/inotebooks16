import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import usercontext from '../context/users/UserContext'
const About = () => {
    const history = useHistory()

    const usercontext1 = useContext(usercontext);
    const { userdet, } = usercontext1;

    useEffect(() => {
        if (localStorage.getItem("auth-token") === null) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container col-md-8" style={{ marginTop: "50px" }}>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item text-black fw-bold col-md-4" style={{ textAlign: "center", fontSize: "30px" }}>Name</li>
                <li className="list-group-item col-md-4 d-flex justify-content-center align-items-center">{userdet.name}</li>

            </ul>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item text-black fw-bold col-md-4" style={{ textAlign: "center", fontSize: "30px" }}>Email</li>
                <li className="list-group-item col-md-4 d-flex justify-content-center align-items-center">{userdet.email}</li>

            </ul>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item text-black fw-bold col-md-4" style={{ textAlign: "center", fontSize: "30px" }}>Mobile</li>
                <li className="list-group-item col-md-4 d-flex justify-content-center align-items-center">{userdet.mobile}</li>
            </ul>

        </div>
    )
}

export default About
