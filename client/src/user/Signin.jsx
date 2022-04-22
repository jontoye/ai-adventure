import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default class Signin extends Component {
  state = {};

  changeHandler = (e) => {
    let temp = { ...this.state };
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  };

  loginHandler = () => {
    this.props.login(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div >

        <div>
        <h1>Welcome to Adventure</h1>
        <Container id="sign-up-container">
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
        </Container>
        </div>
      </div>
    );
  }
}
