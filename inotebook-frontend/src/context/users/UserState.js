import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import isEmail from 'validator/lib/isEmail';
const UserState = (props) => {
    // const host = "http://localhost:5000"
    const host = process.env.REACT_APP_HOST_URL;
    const [userdet, setuserdet] = useState([])

    const login = async (email, myPlaintextPassword) => {
        try {
            props.setProgress(25)
            const response = await fetch(`${host}/api/v1/login`, {
                method: "POST",
                headers: { 'Content-Type': "application/json", },
                body: JSON.stringify({ email, myPlaintextPassword })
            })
            props.setProgress(50)
            const json = await response.json()
            props.setProgress(75)
            localStorage.setItem("auth-token", json.authtoken)
            props.setProgress(90)
            props.showalert("Login success", "success")
            props.setProgress(100)
            window.location = "/"
        } catch (err) {
            // console.log(err)
            props.setProgress(100)
            props.showalert("Either email address not exist or you have entered wrong credentials", "danger")
        }
    }


    const signup = async (name, email, password, confirmPassword, mobile) => {
        try {
            if (name.length >= 3) {
                if (isEmail(email)) {
                    if (password.length >= 8 && confirmPassword.length >= 8) {
                        if (password === confirmPassword) {
                            if (mobile.length === 10) {
                                props.setProgress(25)
                                const response = await fetch(`${host}/api/v1/signup`, {
                                    method: "POST",
                                    headers: { 'Content-Type': "application/json", },
                                    body: JSON.stringify({ name, email, password, confirmPassword, mobile })
                                })
                                props.setProgress(50)
                                await response.json()
                                props.setProgress(75)
                                props.showalert("Registration success. Please Login", "success")
                                setTimeout(() => {
                                    props.setProgress(100)
                                    window.location = "/login"
                                }, 2000)
                            } else {
                                props.showalert("Mobile Number should be equal to 10 digits", "warning")
                            }
                        } else {
                            props.showalert("Password should be equal to Confirm Password", "warning")
                        }
                    } else {
                        props.showalert("Password should be of 8 characters or more", "warning")
                    }
                } else {
                    props.showalert("Please enter a valid email", "warning")
                }
            } else {
                props.showalert("Name should be of 3 characters or more", "warning")
            }

        } catch (err) {
            props.setProgress(100)
            props.showalert("User already exists", "danger", 5000)
        }
    }


    const forgotpass = async (email, password, confirmPassword) => {
        try {
            if (isEmail(email)) {
                if (password.length >= 8 && confirmPassword.length >= 8) {
                    if (password === confirmPassword) {
                        props.setProgress(25)
                        const response = await fetch(`${host}/api/v1/forgotpassword`, {
                            method: "POST",
                            headers: { 'Content-Type': "application/json", },
                            body: JSON.stringify({ email, password, confirmPassword })
                        })
                        props.setProgress(50)
                        const json = await response.json()
                        props.setProgress(75)
                        console.log(json)
                        if (json.error === "Email Not exist") {
                            props.showalert(`No details found for ${email}`, "danger")
                            props.setProgress(100)
                        } else {
                            props.showalert(`Password Changed successfully for ${email} Please Login`, "success")
                            props.setProgress(100)
                            setTimeout(() => {
                                window.location = "/login"
                            }, 2000)
                        }
                    } else {
                        props.showalert("Password should be equal to Confirm Password", "warning")
                    }
                } else {
                    props.showalert("Password should be of 8 characters or more", "warning")
                }
            } else {
                props.showalert("Please enter a valid email", "warning")
            }

        } catch (err) {
            props.setProgress(100)
            props.showalert("Email not exist", "danger", 5000)
        }
    }


    const getuserdet = async () => {
        try {
            if (localStorage.getItem("auth-token") !== null) {
                props.setProgress(25)
                const response = await fetch(`${host}/api/v1/getuserdetails`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        'token1': localStorage.getItem("auth-token")
                    }
                })
                props.setProgress(50)
                const json = await response.json()
                props.setProgress(75)
                setuserdet(json)
                props.setProgress(100)
            }
        } catch (err) {
            props.setProgress(100)
        }
    }


    useEffect(() => {
        getuserdet()
        // eslint-disable-next-line
    }, [])


    return (
        <UserContext.Provider value={{ login, signup, forgotpass, userdet }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
