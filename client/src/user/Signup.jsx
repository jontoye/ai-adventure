import React, { Component } from "react";

// import { Container, Button, Row, Col } from "react-bootstrap";
import GSignup from "./GSignup";
// import axios from "axios";
import "./Signup.scss";
import { Navigate } from "react-router-dom";

export default class Signup extends Component {
  state = {
    redirect: false,
    path: "/",
  };

  changeHandler = (e) => {
    let temp = { ...this.state };
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  loginHandler = () => {
    this.setState({
      redirect: true,
      path: "/signin",
    });
  };

  registerHandler = () => {
    console.log("register state test", this.state);
    this.props.register(this.state);
    this.props.login(this.state);
    this.setState({
      redirect: true,
      // path: "/",
      path: "/image-select",
    });
  };

  render() {
    // console.log(this.state);

    return (
      <div>
        <div>
          <h1>Welcome to AI Adventure</h1>
          {/* <Container id='sign-up-container'>
            <h3 className='text-white'>Sign up</h3>
            <div className='form__group field'>
              <input
                type='input'
                className='form__field'
                placeholder='Name'
                name='username'
                id='name'
                onChange={this.changeHandler}
                required
              />
              <label className='form__label'>Username</label>
            </div>
            <div className='form__group field'>
              <input
                type='input'
                className='form__field'
                placeholder='Name'
                name='emailAddress'
                id='name'
                onChange={this.changeHandler}
                required
              />
              <label className='form__label' onChange={this.changeHandler}>
                Email Address
              </label>
            </div>
            <div className='form__group field'>
              <input
                type='password'
                className='form__field'
                placeholder='Name'
                name='password'
                id='name'
                onChange={this.changeHandler}
                required
              />
              <label className='form__label' onChange={this.changeHandler}>
                Password
              </label>
            </div>
            <br></br>
            <Row>
              <Col>
                <Button id='create-user-button' onClick={this.registerHandler}>
                  Sign up
                </Button>
              </Col>
            </Row>
          </Container>
          <br></br>
          <br></br>
          <hr className='signin-line'></hr> */}
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
