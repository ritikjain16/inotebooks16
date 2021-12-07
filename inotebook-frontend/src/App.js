import React, { useState } from "react";
import './App.css'
import './loading.css'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import UserState from "./context/users/UserState";
import Alert from "./components/Alert";
import ForgotPassword from "./components/ForgotPassword";
import LoadingBar from 'react-top-loading-bar'
const App = () => {

  const [messdet, setmessdet] = useState(null)

  const [progress, setProgress] = useState(0)

  const showalert = (message, type, time) => {
    if (time === undefined) {
      time = 2000;
    }
    setmessdet({
      message: message,
      color: type
    })
    setTimeout(() => {
      setmessdet(null)
    }, time);
  }

  return (
    <>
      <UserState showalert={showalert} setProgress={setProgress}>
        <NoteState showalert={showalert} setProgress={setProgress}>
          <Router>
            <LoadingBar
              color='#0d6efd'
              progress={progress}
              shadow={true}
              onLoaderFinished={() => setProgress(0)}
            />
            <Navbar />
            <div style={{ height: "60px" }}>
              <Alert alert={messdet} />
            </div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/signup">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/forgotPassword">
                <ForgotPassword showalert={showalert} setProgress={setProgress} />
              </Route>
              <Route>
                <div className="d-flex justify-content-center align-items-center" style={{ width: window.innerWidth, height: window.innerHeight - 150 }}>
                  <h1 style={{ textAlign: "center" }}>404 ERROR. Page Not Found!</h1>
                </div>
              </Route>
            </Switch>
          </Router>
        </NoteState>
      </UserState>
    </>
  );
};

export default App;
