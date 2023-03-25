import React, { Component } from "react";
// import { Container, Button } from "react-bootstrap";
import GSignup from "./GSignup";
// import axios from "axios";
import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

export default class Signin extends Component {
  state = {
    redirect: false,
    path: "/",
  };

  // componentDidMount() {

  //     axios.get('/wedidit')
  //     .then(res=>{
  //       console.log(res)
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  //   }

  changeHandler = (e) => {
    let temp = { ...this.state };
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  loginHandler = () => {
    this.props.login(this.state);
    this.setState({
      redirect: true,
      path: "/",
    });
    this.setState({
      redirect: false,
    });
  };

  signupHandler = () => {
    this.setState({
      redirect: true,
      path: "/signup",
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Welcome to AI Adventure</h1>
          {/* <Container id="sign-up-container">
        <h3 className="text-white">Sign in</h3>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="Name" name="username" id='name' onChange={this.changeHandler} required />
          <label className="form__label" >Username</label>
          </div>
          <div className="form__group field">
          <input type="password" className="form__field" placeholder="Name" name="password" id='name' onChange={this.changeHandler} required />
          <label className="form__label" onChange={this.changeHandler}>Password</label>
          </div>
          <br></br>
          <Button id="create-user-button" onClick={this.loginHandler}>Sign In</Button>
          <br></br>
          <p className="text-white">Don't have an account?</p>
          <Button id="" onClick={this.signupHandler}>Sign Up</Button>
        </Container><br></br><br></br>
        <hr className="signin-line"></hr> */}
          <div id='google-signin-wrapper'>
            {/* <span>OR</span> */}
            <GSignup login={this.props.googleLogin}></GSignup>
          </div>
        </div>
        {this.state.redirect && (
          <Navigate to={this.state.path} replace={true} />
        )}
      </div>
    );
  }
}
