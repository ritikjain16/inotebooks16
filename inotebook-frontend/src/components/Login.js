import React, { useContext, useState } from 'react'
import usercontext from '../context/users/UserContext'
import { Link } from 'react-router-dom';
const Login = () => {
    const usercontext1 = useContext(usercontext);
    const { login } = usercontext1;

    const [cred, setcred] = useState({ email: "", password: "" })

    const handleclick = (e) => {
        e.preventDefault()
        login(cred.email, cred.password)
    }

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-4 col-md-4">
            <form>
                <div className="mb-3">
                    <label htmlFor="lemail" className="form-label">Email ID</label>
                    <input type="email" className="form-control" id="lemail"  name="email" value={cred.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={cred.password} name="password" onChange={onChange} />
                </div>
                <Link to="/forgotPassword" className="text-black">Forgot Password?</Link>
                <div className="d-grid gap-2 my-4">
                    <button type="button" className="btn btn-primary button-lg" onClick={handleclick}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
