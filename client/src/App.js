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
import Story from "./components/Story";
import ImageSelect from "./components/ImageSelect";
import Character from "./components/Character";

import "./App.scss";
import { Link } from "react-router-dom";
import Users from "./components/Users";
import { Navigate } from "react-router-dom";
import AdventureInfo from "./components/AdventureInfo";
// import { useNavigate } from "react-router";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.createRandomCharacter = this.createRandomCharacter.bind(this);
    this.dontCreateRandomCharacter = this.dontCreateRandomCharacter.bind(this);
    this.startStory = this.startStory.bind(this);
    this.createAdventure = this.createAdventure.bind(this);
    this.continueAdventure = this.continueAdventure.bind(this);
    this.setCharacter = this.setCharacter.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.createAchievement = this.createAchievement.bind(this);
    this.setAdventure = this.setAdventure.bind(this);
    this.storyBackBtnRedirectFcn = this.storyBackBtnRedirectFcn.bind(this);
  }

  state = {
    isAuth: false,
    logoutRedirect: false,
    user: null,
    infoMessage: null,
    failMessage: null,
    warningMessage: null,
    successMessage: null,
    navExpanded: false,
    randomCharacter: false,
    log: [],
    avatar: "",
    character: {},
    adventure: {},
    achievments: [],
    charCreateA: false,
    users: [],
    storyBackBtnRedirect: "/bug",
  };

  setNavExpanded = (expanded) => {
    this.setState({
      navExpanded: expanded,
    });
  };

  setNavClose = () => {
    this.setState({
      navExpanded: false,
    });
  };

  componentDidMount() {
    this.loadUsers();
    let token = localStorage.getItem("token");
    if (token != null) {
      let user = jwt_decode(token);
      // console.log("BEFORE", user);
      if (user) {
        console.log("user = true");
        console.log(user);
        this.setState({
          isAuth: true,
          user: user,
        });
      } else {
        // console.log("user = false");
        // console.log(user);
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });
      }
    }
  }

  loadUsers = () => {
    Axios.get("users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log('user test', response.data.users)
        let user = response.data.users.filter(
          (user) => this.state.user.id === user._id
        );
        console.log("load user response", user[0].avatar);
        this.setState({
          avatar: user[0].avatar,
          users: response.data.users,
        });
      })
      .catch((err) => {
        console.log("Error fetching users.");
        console.log(err);
      });
  };

  handleGoogleLogin = (response) => {
    Axios({
      method: "post",
      url: "/auth/google",
      data: { tokenId: response.tokenId },
    })
      .then((res) => {
        // console.log("google login success", res);

        if (res.data.token != null) {
          //localStorage refers to localStorage of browser
          localStorage.setItem("token", res.data.token);
          let user = jwt_decode(res.data.token);

          // console.log("GOOGLE USER", user);

          this.setState({
            isAuth: true,
            user: user,
            logoutRedirect: false,
          });
          this.setMessage("User logged in successfully.", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setMessage(error.message, "danger");
        this.setState({
          isAuth: false,
        });
      });
  };

  createRandomCharacter() {
    this.setState({
      randomCharacter: true,
    });
  }

  dontCreateRandomCharacter() {
    this.setState({
      randomCharacter: false,
    });
  }

  startStory(adventure, character) {
    // console.log("start story triggered");
    // console.log(adventure);
    this.setState({
      adventure: adventure,
      character: character,
    });
    // this.props.navigate("/adventure");
  }

  setCharacter(character) {
    this.setState({
      character: character,
    });
  }

  setAdventure(adventure) {
    this.setState({
      adventure: adventure,
    });
  }

  createAdventure(character) {
    // console.log("create adventure triggered");
    // console.log(character)
    this.setState({
      character: character,
    });
  }

  continueAdventure(adventure, character) {
    this.setState({
      adventure: adventure,
      character: character,
    });
  }

  storyBackBtnRedirectFcn(redirectLink) {
    this.setState({
      storyBackBtnRedirect: redirectLink,
    });
  }

  registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((response) => {
        this.setMessage(response.data.message, "success");
      })
      .catch((error) => {
        console.log(error);
        this.setMessage(error.message, "danger");
      });
  };

  loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
      .then((response) => {
        // console.log("response data token", response.data.token);
        // console.log(response.data.message);

        this.setMessage(response.data.message, "warning");

        if (response.data.token != null) {
          //localStorage refers to localStorage of browser
          localStorage.setItem("token", response.data.token);
          let user = jwt_decode(response.data.token);

          // console.log("USER", user);

          this.setState({
            isAuth: true,
            user: user,
            logoutRedirect: false,
          });
          this.setMessage("User logged in successfully.", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setMessage(error.message, "danger");
        this.setState({
          isAuth: false,
        });
      });
  };

  logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    const redirect = () => {
      window.location.href = "/";
    };
    redirect();
    this.setState({
      isAuth: false,
      user: null,
      isGoogleUser: false,
      logoutRedirect: true,
    });
    this.setMessage("User logged out successfully.", "danger");
  };

  setBannerTimeout = (key) => {
    setTimeout(() => {
      this.setState({
        [key]: null,
      });
    }, 10000);
  };

  createAchievement = (achievement) => {
    Axios.post(
      "achievement/add",
      { 1: achievement },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.data.error) {
          console.log("Error adding event.", response.data.error);
          this.props.setMessage(
            response.data.error._message +
              ". Please confirm you have correctly achieved something.\nIf the issue persists please contact the developers and quote: Event/" +
              response.data.error.name,
            "danger"
          );
        } else {
          console.log("Achievement created successfully.", response);
          // this.setState({
          //   event: response.data.event,
          // });
        }
      })
      .catch((error) => {
        console.log("Error creating event.", error);
        this.props.setMessage(error.message, "danger");
      });
  };

  setMessage = (message, type) => {
    this.setState({
      infoMessage: null,
      failMessage: null,
      successMessage: null,
      warningMessage: null,
    });
    this.setState({
      [type.toLowerCase() + "Message"]: message,
    });
    this.setBannerTimeout(`${type.toLowerCase()}Message`);
  };

  render() {
    const infoMessage = this.state.infoMessage ? (
      <Alert variant='info'>{this.state.infoMessage}</Alert>
    ) : null;
    const warningMessage = this.state.warningMessage ? (
      <Alert variant='warning'>{this.state.warningMessage}</Alert>
    ) : null;
    const dangerMessage = this.state.dangerMessage ? (
      <Alert variant='danger'>{this.state.dangerMessage}</Alert>
    ) : null;
    const successMessage = this.state.successMessage ? (
      <Alert variant='success'>{this.state.successMessage}</Alert>
    ) : null;
    const { isAuth } = this.state;
    return (
      <Router>
        <Navbar
          fixed='top'
          variant='dark'
          bg='dark'
          expand='lg'
          onToggle={this.setNavExpanded}
          expanded={this.state.navExpanded}
          className='main-navbar'
        >
          <Container>
            <Link to='/' className='navbar-brand'>
              | AI Adventure |
            </Link>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto' onClick={this.setNavClose}>
                {isAuth ? (
                  <>
                    <Link to='/users' className='nav-link'>
                      Explore
                    </Link>
                    <Link to='/create-character' className='nav-link'>
                      Create Character
                    </Link>
                    <Link to='/create-adventure' className='nav-link'>
                      Create Adventure
                    </Link>
                    <Link to='/characters' className='nav-link'>
                      Characters
                    </Link>
                    <Link to='/adventure-list' className='nav-link'>
                      Adventures
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to='/signup' className='nav-link'>
                      Sign Up
                    </Link>
                    <Link to='/' className='nav-link'>
                      Sign In
                    </Link>
                  </>
                )}
              </Nav>

              <span id='main-greeting' onClick={this.setNavClose}>
                {this.state.user ? (
                  <div className='right-nav'>
                    <Link
                      to={`/profile/${this.state.user.id}`}
                      className='nav-link'
                    >
                      <img className='circle' src={this.state.avatar} alt='' />
                    </Link>
                    <Link
                      to={`/profile/${this.state.user.id}`}
                      className='nav-link'
                    >
                      {"Welcome " + this.state.user.name}
                    </Link>
                    <Link
                      to='/signout'
                      className='nav-link'
                      onClick={this.logoutHandler}
                    >
                      Sign Out
                    </Link>
                  </div>
                ) : null}{" "}
              </span>
            </Navbar.Collapse>
          </Container>
          {/* <Button onClick={() => this.createAchievement(2)}></Button> */}
        </Navbar>

        {dangerMessage}
        {warningMessage}
        {successMessage}
        {infoMessage}

        <Routes>
          <Route
            path='/'
            element={
              isAuth ? (
                <Home
                  createRandomCharacter={this.createRandomCharacter}
                  continueAdventure={this.continueAdventure}
                  user={this.state.user}
                  setMessage={this.setMessage}
                />
              ) : (
                <Signin
                  login={this.loginHandler}
                  googleLogin={this.handleGoogleLogin}
                  setMessage={this.setMessage}
                />
              )
            }
          ></Route>
          <Route
            path={`/image-select`}
            element={
              <ImageSelect
                currentUser={this.state.user}
                setMessage={this.setMessage}
                changeUserImg={this.changeUserImg}
              />
            }
          ></Route>
          <Route
            path={`/adventure-info`}
            element={
              <AdventureInfo
                currentUser={this.state.user}
                changeUserImg={this.changeUserImg}
                createAchievement={this.createAchievement}
              />
            }
          ></Route>
          <Route
            path={`/character`}
            element={
              <Character
                currentUser={this.state.user}
                changeUserImg={this.changeUserImg}
                createAchievement={this.createAchievement}
              />
            }
          ></Route>
          <Route
            path='/create-character'
            exact
            element={
              <CreateCharacter
                randomCharacter={this.state.randomCharacter}
                createAdventure={this.createAdventure}
                user={this.state.user}
                setMessage={this.setMessage}
                createAchievement={this.createAchievement}
              />
            }
          />
          <Route
            path='/create-adventure'
            exact
            element={
              <CreateAdventure
                startStory={this.startStory}
                character={this.state.character}
                achievement={this.state.charCreateA}
                achievementCheck={this.achievementCheck}
                setMessage={this.setMessage}
                user={this.state.user}
                createAchievement={this.createAchievement}
              />
            }
          />
          <Route
            path='/adventure-list'
            exact
            element={
              <Adventures
                continueAdventure={this.continueAdventure}
                setMessage={this.setMessage}
                user={this.state.user}
                isFiltered={true}
                userList={this.state.users}
                startStory={this.startStory}
                createAchievement={this.createAchievement}
                setAdventure={this.setAdventure}
                origin={"/adventure-list"}
                storyBackBtnRedirectFcn={this.storyBackBtnRedirectFcn}
              />
            }
          />
          <Route
            path='/adventure'
            exact
            element={
              <Adventure
                adventure={this.state.adventure}
                character={this.state.character}
                setMessage={this.setMessage}
                createAchievement={this.createAchievement}
              />
            }
          />
          <Route
            path='/characters'
            exact
            element={
              <Characters
                createAdventure={this.createAdventure}
                setCharacter={this.setCharacter}
                dontCreateRandomCharacter={this.dontCreateRandomCharacter}
                filtered={""}
                setMessage={this.setMessage}
                user={this.state.user}
                isFiltered={true}
                startStory={this.startStory}
                userList={this.state.users}
                createAchievement={this.createAchievement}
              />
            }
          />

          <Route
            path='/character-detail'
            exact
            element={
              <CharacterDetail
                character={this.state.character}
                continueAdventure={this.continueAdventure}
                createAdventure={this.createAdventure}
                setMessage={this.setMessage}
                isFiltered={false}
                startStory={this.startStory}
                userList={this.state.users}
                user={this.state.user}
                createAchievement={this.createAchievement}
              />
            }
          />
          <Route
            path='/adventure-story'
            exact
            element={
              <Story
                adventure={this.state.adventure}
                setMessage={this.setMessage}
                origin={this.state.storyBackBtnRedirect}
                storyBackBtnRedirectFcn={this.storyBackBtnRedirectFcn}
                createAchievement={this.createAchievement}
              />
            }
          />
          <Route
            path='/users'
            element={
              <Users
                currentUser={this.state.user}
                continueAdventure={this.continueAdventure}
                createAdventure={this.createAdventure}
                setCharacter={this.setCharacter}
                setMessage={this.setMessage}
                dontCreateRandomCharacter={this.dontCreateRandomCharacter}
                userList={this.state.users}
                startStory={this.startStory}
                createAchievement={this.createAchievement}
                setAdventure={this.setAdventure}
                storyBackBtnRedirectFcn={this.storyBackBtnRedirectFcn}
              />
            }
          />

          <Route
            path='/signup'
            element={
              <Signup
                register={this.registerHandler}
                login={this.loginHandler}
                setMessage={this.setMessage}
              />
            }
          ></Route>
          <Route
            path='/signin'
            element={
              <Signin
                login={this.loginHandler}
                register={this.registerHandler}
                isAuth={this.state.isAuth}
                setMessage={this.setMessage}
              />
            }
          ></Route>
          <Route
            path={`/profile`}
            element={
              <Profile
                currentUser={this.state.user}
                setMessage={this.setMessage}
              />
            }
          >
            <Route
              path=':userId'
              element={
                <Profile
                  currentUser={this.state.user}
                  setMessage={this.setMessage}
                />
              }
            />
          </Route>
        </Routes>

        <Footer />
        {this.state.logoutRedirect && <Navigate to='/' replace={true} />}
      </Router>
    );
  }
}
