import React, { Component } from "react";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { Alert } from "react-bootstrap";
import Home from "./components/Home";

export default class App extends Component {
  state = {
    isAuth: false,
    user: null,
    message: null,
    failMessage: null,
    successMessage: null,
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token != null) {
      let user = jwt_decode(token);
      if (user) {
        this.setState({
          isAuth: true,
          user: user,
        });
      } else {
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });
      }
    }
  }

  registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((response) => {
        console.log(response.data.message);
        this.setState({
          message: response.data.message,
          failMessage: null,
          successMessage: null,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
      .then((response) => {
        // console.log("response data token", response.data.token);
        console.log(response.data.message);

        this.setState({
          message: response.data.message,
        })

        if (response.data.token != null) {
          //localStorage refers to localStorage of browser
          localStorage.setItem("token", response.data.token);
          let user = jwt_decode(response.data.token);

          this.setState({
            isAuth: true,
            user: user,
            message: null,
            failMessage: null,
            successMessage: "User logged in successfully.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
        });
      });
  };

  logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      user: null,
      message: null,
      failMessage: "User logged out successfully.",
      successMessage:null,
    });
  };

  render() {
    const message = this.state.message ? (<Alert variant="info">{this.state.message}</Alert>) : null
    const failMessage = this.state.failMessage ? (<Alert variant="danger">{this.state.failMessage}</Alert>) : null
    const successMessage = this.state.successMessage ? (<Alert variant="success">{this.state.successMessage}</Alert>) : null
    const { isAuth } = this.state;
    return (
      <div>
        {message}
        {failMessage}
        {successMessage}
        <Router>
          <nav>
            {isAuth ? (
              <div>
                {this.state.user
                  ? "Welcome " + this.state.user.user.name
                  : null}
                  &nbsp;
                <Link to='/'>Home</Link> &nbsp;
                <Link to='/signout' onClick={this.logoutHandler}>
                  Sign Out
                </Link>
                &nbsp;
              </div>
            ) : (
              <div>
                <Link to='/signup'>Sign Up</Link> &nbsp;
                <Link to='/signin'>Sign In</Link> &nbsp;
              </div>
            )}
            <div></div>
          </nav>

          <div>
            <Routes>
              <Route
                path='/'
                element={
                  isAuth ? <Home /> : <Signin login={this.loginHandler} />
                }
              ></Route>
              <Route
                path='/signup'
                element={<Signup register={this.registerHandler} />}
              ></Route>
              <Route
                path='/signin'
                element={<Signin login={this.loginHandler} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </div>

      // <AuthorList></AuthorList>
    );
  }
}