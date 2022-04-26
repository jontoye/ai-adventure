import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

export default function GSignup(){

  const googleAuth = (res) => {
    axios({
        method: 'post',
        url: "http://localhost:3001/auth/google",
        data: {tokenId: res.tokenId}
    })
    .then(res=>{
        console.log("google login success",res);
    })
    .catch(err=>{
        console.log(err)
    })
   }

  return (
    <div>
        <GoogleLogin
            clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess = {googleAuth}
            onFailure = {'error' + googleAuth}
            cookiePolicy={"single_host_origin"}
          >
            <span>Sign In with Google</span>
          </GoogleLogin>
    </div>
  )
}
