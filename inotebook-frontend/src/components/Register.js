import React, { useContext, useState } from 'react'
import usercontext from '../context/users/UserContext'
const Register = () => {
    const usercontext1 = useContext(usercontext);
    const { signup } = usercontext1;

    const [cred, setcred] = useState({ name: "", email: "", password: "", confirmPassword: "", mobile: "" })

    const handleclick = (e) => {
        e.preventDefault()
        signup(cred.name, cred.email, cred.password, cred.confirmPassword, cred.mobile)
    }

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4 col-md-4">
            <form>
                <div className="mb-3">
                    <label htmlFor="rname" className="form-label">Name</label>
                    <input type="text" className="form-control" id="rname" name="name" value={cred.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="remail" className="form-label">Email ID</label>
                    <input type="email" className="form-control" id="remail" aria-describedby="emailHelp" name="email" value={cred.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="rpassword" value={cred.password} name="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rcpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="rcpassword" value={cred.confirmPassword} name="confirmPassword" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rmobile" className="form-label">Mobile</label>
                    <input type="tel" className="form-control" id="rmobile" name="mobile" value={cred.mobile} onChange={onChange} />
                </div>
                <div className="d-grid gap-2 my-4">
                    <button type="button" className="btn btn-primary" onClick={handleclick}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
