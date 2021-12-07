import React, { useContext, useState } from 'react'
import usercontext from '../context/users/UserContext'
import isEmail from 'validator/lib/isEmail';
const ForgotPassword = (props) => {
    const usercontext1 = useContext(usercontext);
    const { forgotpass } = usercontext1;
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_HOST_URL;

    const [cred, setcred] = useState({ email: "", password: "", confirmPassword: "" })
    const [otp1, setotp] = useState("")
    const [passdis, setpassdis] = useState("none")
    const [verifyotpdis, setverifyotpdis] = useState("none")
    const [originalotp, setoriginalotp] = useState("")
    const [loadingdis, setloadingdis] = useState("none")
    const handleclick = (e) => {
        e.preventDefault()
        forgotpass(cred.email, cred.password, cred.confirmPassword)
    }

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }


    const sendotp = async (email) => {
        if (isEmail(email)) {
            try {
                setloadingdis("flex")
                props.setProgress(25)
                const response = await fetch(`${host}/api/v1/sendemail`, {
                    method: "POST",
                    headers: { 'Content-Type': "application/json", },
                    body: JSON.stringify({ email })
                })
                props.setProgress(50)
                const json = await response.json()
                setoriginalotp(json.otp.toString())
                props.setProgress(75)
                props.setProgress(90)
                props.showalert(`We have Sent an OTP on ${email}. Plaese enter the otp`, "success")
                setTimeout(() => {
                    setloadingdis("none")
                    setverifyotpdis("block")
                }, 2000)
                props.setProgress(100)
            } catch (err) {
                props.setProgress(100)
                props.showalert(`Either ${email} not exist or we are unable to send OTP on ${email}`, "danger")
            }
        } else {
            props.showalert("Please enter a valid email", "warning")
        }
    }

    const verifyOTP = () => {
        if (otp1 === originalotp) {
            setloadingdis("flex")
            props.showalert(`OTP Matched`, "success")
            setTimeout(() => {
                setloadingdis("none")
                setpassdis("block")
            }, 2000)
        } else {
            props.showalert(`OTP not Matched`, "danger")
        }
    }


    return (
        <div className="container my-4 col-md-4">
            <form>
                <div className="mb-3">
                    <label htmlFor="fpassremail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="fpassremail" aria-describedby="emailHelp" name="email" value={cred.email} onChange={onChange} />
                </div>
                <div className="d-grid gap-2 my-4">
                    <button type="button" className="btn btn-primary" onClick={() => {
                        sendotp(cred.email)
                    }}>Send OTP</button>
                </div>
                <div className="mb-3" style={{ display: verifyotpdis }}>
                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                    <input type="text" className="form-control" id="otp" value={otp1} name="otp" onChange={(e) => setotp(e.target.value)} />
                </div>
                <div className="d-grid gap-2 my-4">
                    <button type="button" className="btn btn-primary" style={{ display: verifyotpdis }} onClick={() => {
                        verifyOTP()
                    }}>Verify OTP</button>
                </div>
                <div className="mb-3" style={{ display: passdis }}>
                    <label htmlFor="fpassrpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="fpassrpassword" value={cred.password} name="password" onChange={onChange} />
                </div>
                <div className="mb-3" style={{ display: passdis }}>
                    <label htmlFor="fpassrcpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="fpassrcpassword" value={cred.confirmPassword} name="confirmPassword" onChange={onChange} />
                </div>
                <div className="d-grid gap-2 my-4" >
                    <button type="button" className="btn btn-primary" onClick={handleclick} style={{ display: passdis }}>Change Password</button>
                </div>
            </form>
            {/* <div className="dot-elastic"></div>
            <br/>
            <div className="dot-pulse"></div>
            <br/>
            <div className="dot-flashing"></div>
            <br/>
            <div className="dot-collision"></div>
            <br/>
            <div className="dot-revolution"></div>
            <br/>
            <div className="dot-carousel"></div>
            <br/>
            <div className="dot-typing"></div>
            <br/> */}
            <div className="justify-content-center align-items-center" style={{ display: loadingdis }}>
                <div className="dot-windmill"></div>
            </div>
            {/* <br/>
            <div className="dot-bricks"></div>
            <br/>
            <div className="dot-floating"></div>
            <br/>
            <div className="dot-fire"></div>
            <br/>
            <div className="dot-spin"></div>
            <br/>
            <div className="dot-falling"></div>
            <br/>
            <div className="dot-stretching"></div>
            <br/> */}
        </div>

    )
}

export default ForgotPassword
