// import axios from "axios";
import React from "react";
// import { useState } from "react";
// import jwt_decode from "jwt-decode";
import { GoogleLogin } from "react-google-login";
// import { useNavigate } from "react-router";

export default function GSignup({ login }) {
  // const [state, setState] = useState({
  //   isAuth: false,
  //   user: null,
  //   message: null,
  //   failMessage: null,
  //   successMessage: "",
  // });
  // const navigate = useNavigate();

  // const googleAuth = (response) => {
  //   axios({
  //       method: 'post',
  //       url: "http://localhost:3001/auth/google",
  //       data: {tokenId: response.tokenId}
  //   })
  //   .then(res=>{
  //       console.log("google login success",res.data.user);

  //       if (res.data.token != null) {
  //           //localStorage refers to localStorage of browser
  //           localStorage.setItem("token", res.data.token);
  //           let user = jwt_decode(res.data.token);

  //           setState({
  //             isAuth: true,
  //             user: user,
  //             message: null,
  //             failMessage: null,
  //             successMessage: "User logged in successfully.",
  //           });
  //         }
  //         navigate("/")
  //   })
  //   .catch(err=>{
  //       console.log(err)
  //   })
  //  }

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <button
            id='google-button'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              id='google-logo-img'
              src='images/logos/Google__G__Logo.svg.webp'
              alt="google logo"
            ></img>
            <span> Sign in</span>
          </button>
        )}
        onSuccess={login}
        onFailure={"error" + login}
        cookiePolicy={"single_host_origin"}
        scope={"profile"}
      ></GoogleLogin>
    </div>
  );
}
