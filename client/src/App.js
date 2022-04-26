import React, { Component } from "react";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { Alert, Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CreateCharacter from "./components/CreateCharacter";
import CreateAdventure from "./components/CreateAdventure";
import Characters from "./components/Characters";
import Adventures from "./components/Adventures";
import Adventure from "./components/Adventure";
import Profile from "./components/Profile";
import CharacterDetail from "./components/CharacterDetail";
import "./App.scss";
import { Link } from "react-router-dom";
import Users from "./components/Users";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.createRandomCharacter = this.createRandomCharacter.bind(this);
    this.startStory = this.startStory.bind(this);
    this.createAdventure = this.createAdventure.bind(this);
    this.continueAdventure = this.continueAdventure.bind(this);
    this.setCharacter = this.setCharacter.bind(this);
  }

  state = {
    isAuth: false,
    logoutRedirect: false,
    user: null,
    message: null,
    failMessage: null,
    successMessage: null,
    randomCharacter: false,
    log: [],
    character: {},
    adventure: {},
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

  handleGoogleLogin = (response) => {
    Axios({
      method: "post",
      url: "http://localhost:3001/auth/google",
      data: { tokenId: response.tokenId },
    })
      .then((res) => {
        console.log("google login success", res);

        if (res.data.token != null) {
          //localStorage refers to localStorage of browser
          localStorage.setItem("token", res.data.token);
          let user = jwt_decode(res.data.token);

          console.log("GOOGLE USER", user);

          this.setState({
            isAuth: true,
            user: user,
            message: null,
            failMessage: null,
            successMessage: "User logged in successfully.",
            logoutRedirect: "false",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createRandomCharacter() {
    this.setState({
      randomCharacter: true,
    });
  }

  startStory(logs) {
    // console.log("start story triggered");
    // console.log("navigate test", this.props.navigate);
    this.setState({
      log: logs,
    });
    // this.props.navigate("/adventure");
  }

  setCharacter(character) {
    this.setState({
      character: character,
    });
  }

  createAdventure(character) {
    // console.log("create adventure triggered");
    // console.log(character)
    // console.log("navigate test", this.props.navigate);
    this.setState({
      character: character,
    });
    // this.props.navigate("/adventure");
  }

  continueAdventure(adventure) {
    this.setState({
      adventure: adventure,
    });
  }

  registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((response) => {
        console.log(response.data.message);
        this.setState({
          message: response.data.message,
          failMessage: null,
          successMessage: null,
        });
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
        });

        if (response.data.token != null) {
          //localStorage refers to localStorage of browser
          localStorage.setItem("token", response.data.token);
          let user = jwt_decode(response.data.token);

          console.log("USER", user);

          this.setState({
            isAuth: true,
            user: user,
            message: null,
            failMessage: null,
            successMessage: "User logged in successfully.",
            logoutRedirect: false,
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
    const redirect = () =>{
        window.location.href = '/'
    }
    redirect()
    this.setState({
      isAuth: false,
      user: null,
      isGoogleUser: false,
      message: null,
      failMessage: "User logged out successfully.",
      successMessage: null,
      logoutRedirect: true,
    });
    
  };

  render() {

    

    const message = this.state.message ? (
      <Alert variant="info">{this.state.message}</Alert>
    ) : null;
    const failMessage = this.state.failMessage ? (
      <Alert variant="danger">{this.state.failMessage}</Alert>
    ) : null;
    const successMessage = this.state.successMessage ? (
      <Alert variant="success">{this.state.successMessage}</Alert>
    ) : null;
    const { isAuth } = this.state;
    return (
      <Router>
        <Navbar fixed="top" variant="dark" bg="dark" expand="lg">
          <Container>
            <Link to="/" className="navbar-brand">
              | AI Adventure |
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isAuth ? (
                  <>
                    <Link to="/users" className="nav-link">
                      Explore
                    </Link>
                    <Link to="/create-character" className="nav-link">
                      Create Character
                    </Link>
                    <Link to="/create-adventure" className="nav-link">
                      Create Adventure
                    </Link>
                    <Link to="/characters" className="nav-link">
                      Characters
                    </Link>
                    <Link to="/adventure-list" className="nav-link">
                      Adventures
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="nav-link">
                      Sign Up
                    </Link>
                    <Link to="/signin" className="nav-link">
                      Sign In
                    </Link>
                  </>
                )}
              </Nav>

              <span id="main-greeting">
                {this.state.user ? (
                  <div className="right-nav">
                    <Link
                      to={`/profile/${this.state.user.id}`}
                      className="nav-link"
                    >
                      {"Welcome " + this.state.user.name}
                    </Link>
                    <Link
                      to="/signout"
                      className="nav-link"
                      onClick={this.logoutHandler}
                    >
                      Sign Out
                    </Link>
                  </div>
                ) : null}{" "}
              </span>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {message}
        {failMessage}
        {successMessage}

        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Home
                  createRandomCharacter={this.createRandomCharacter}
                  user={this.state.user}
                />
              ) : (
                <Signin
                  login={this.loginHandler}
                  googleLogin={this.handleGoogleLogin}
                />
              )
            }
          ></Route>
          <Route
            path="/create-character"
            exact
            element={
              <CreateCharacter
                randomCharacter={this.state.randomCharacter}
                createAdventure={this.createAdventure}
              />
            }
          />
          <Route
            path="/create-adventure"
            exact
            element={
              <CreateAdventure
                startStory={this.startStory}
                character={this.state.character}
              />
            }
          />
          <Route
            path="/adventure-list"
            exact
            element={<Adventures continueAdventure={this.continueAdventure} />}
          />
          <Route
            path="/adventure"
            exact
            element={
              <Adventure
                log={this.state.log}
                adventure={this.state.adventure}
              />
            }
          />
          <Route
            path="/characters"
            exact
            element={
              <Characters
                log={this.state.log}
                createAdventure={this.createAdventure}
                setCharacter={this.setCharacter}
              />
            }
          />
          <Route
            path="/character-detail"
            exact
            element={
              <CharacterDetail
                log={this.state.log}
                character={this.state.character}
              />
            }
          />
          <Route
            path="/users"
            element={<Users currentUser={this.state.user} />}
          />

          <Route
            path="/signup"
            element={
              <Signup
                register={this.registerHandler}
                login={this.loginHandler}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <Signin login={this.loginHandler} isAuth={this.state.isAuth} />
            }
          ></Route>
          <Route
            path="/profile"
            element={<Profile currentUser={this.state.user} />}
          >
            <Route path=":userId" element={<Profile />} />
          </Route>
        </Routes>

        <Footer />
        {/* {this.state.logoutRedirect && <Navigate to="/" replace={true} />} */}
      </Router>
    );
  }
}
