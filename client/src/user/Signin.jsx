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

          <section class='w-full py-12 md:py-24 lg:py-32 bg-red-100 dark:bg-red-800'>
            <div class='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
              <div class='space-y-3'>
                <h2 class='text-3xl font-bold tracking-tighter text-red-500 dark:text-red-400'>
                  AI Adventure is currently under maintenance. The API's the
                  site relies on are currently down. We're working on revamping
                  the site to version 2.0. Please check back soon or contact us
                  at <a href='mailto:dkotzer@gmail.com'>dkotzer@gmail.com</a> to
                  become an early tester or for more information.
                </h2>
                <p class='mx-auto max-w-600px text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  We're sorry for the inconvenience. This section is currently
                  under maintenance and will be available soon. We appreciate
                  your patience.
                </p>
              </div>
            </div>
          </section>

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
