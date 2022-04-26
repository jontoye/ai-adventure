import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { GoogleLogin } from 'react-google-login';

export default function GSignup({ login }){

    const state = {}

  const googleAuth = (response) => {
    axios({
        method: 'post',
        url: "http://localhost:3001/auth/google",
        data: {tokenId: response.tokenId}
    })
    .then(res=>{
        console.log("google login success",res);

        if (res.data.token != null) {
            //localStorage refers to localStorage of browser
            localStorage.setItem("token", res.data.token);
            let user = jwt_decode(res.data.token);
  
            this.setState({
              isAuth: true,
              user: user,
              message: null,
              failMessage: null,
              successMessage: "User logged in successfully.",
            });
            // login();
        }
    })
    .catch(err=>{
        console.log(err)
    })
   }

  return (
    <div>
        <GoogleLogin
            clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess = {login}
            // onFailure = {'error' + googleAuth}
            cookiePolicy={"single_host_origin"}
          >
            <span>Sign In with Google</span>
          </GoogleLogin>
    </div>
  )
}
