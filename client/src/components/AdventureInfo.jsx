import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import "./css/AdventureInfo.css";

export default class AdventureInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventure: this.props.adventure,
      character: {},
      redirect: false,
      redirected: false,
      redirectAdv: false,
      copiedAdventure: {},
      copiedCharacter: {},
      characters: {},
      userCharacters: this.props.userCharacters,
      isCopyingAdventure: false,
      advUser: this.props.advUser,
      users: this.props.userList,
      isFiltered: this.props.isFiltered,
      event: {},
    };
  }
  // state = {
  //   adventure: this.props.adventure,
  //   character: {},
  //   redirect: false,
  //   redirectAdv: false,
  //   copiedAdventure: {},
  //   copiedCharacter: {},
  //   characters: {},
  //   userCharacters: this.props.userCharacters,
  //   isCopyingAdventure: false,
  //   advUser: this.props.advUser,
  //   users: this.props.userList,
  //   isFiltered: this.props.isFiltered,
  //   event: {},
  // };

  setUserInfo = (userID) => {
    // setTimeout(()=>{
    //   // console.log(user)
    //   if (user) {
    //     this.setState({
    //       advUser: user.username,
    //     });
    //   }
    // },200)
  };

  componentDidMount() {
    // console.log(this.props.origin);
    // this.props.storyBackBtnRedirectFcn(this.props.origin);
    // console.log("props test", this.props);
    // console.log("user id test", this.props.user);

    if (this.props.advUser !== "unknown") {
      this.setState({
        isFiltered:
          this.props.advUserID === this.props.user.id
            ? true
            : this.props.isFiltered,
      });
    }

    Axios.get("character/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log(response.data.characters);
        let character = response.data.characters.find((v) => {
          return this.state.adventure.character === v._id;
        });
        if (character) {
          this.setState({
            character: character,
            characters: response.data.characters,
            userCharacters: this.props.userCharacters,
          });
        }
        // this.setState({});
      })
      .catch((err) => {
        console.log("Error fetching characters.");
        console.log(err.message);
        this.props.setMessage(
          err.message,
          "no characters found, please make one"
        );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    let user = this.props.userList.find((u) => {
      return this.state.adventure.user === u._id;
    });
    setTimeout(() => {
      this.setState({
        advUser: user ? user.username : "unknown",
      });
    }, 100);
  }

  continueAdventure = (e) => {
    console.log("continuing adventure...");
    Axios.get("event/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        let events = response.data.events.filter((v) => {
          return this.state.adventure.events.includes(v._id);
        });
        // console.log('successfully found events: ', events)
        this.setState({
          adventure: {
            ...this.state.adventure,
            events: events,
          },
        });
        //async!
        setTimeout(() => {
          this.props.continueAdventure(
            this.state.adventure,
            this.state.character
          );
          this.setState({
            redirect: true,
          });
        }, 100);
      })
      .catch((error) => {
        console.log("Error continuing adventure.", error);
        this.props.setMessage(error.message, "danger");
      });
    // console.log(this.state.character)
  };

  handleAchievement = () => {
    this.props.createAchievement(6);
  };

  handleCopyAdventureBtn = (e) => {
    if (this.state.isCopyingAdventure) {
      console.log("Cancelling copy...", this.state.copiedAdventure);
      this.setState({
        copiedAdventure: {},
        isCopyingAdventure: false,
      });
    } else {
      console.log("Initialising copy...", this.state.adventure);
      // console.log(this.state.userCharacters)
      let adventure = this.state.adventure;
      adventure.user = this.props.user.id;
      delete adventure.id;
      delete adventure._id;
      adventure.character = this.state.userCharacters[0]._id;
      adventure.log = [this.state.adventure.log[0]];
      adventure.events = [this.state.adventure.events[0]];

      console.log("Copy ready.", adventure);
      this.setState({
        copiedAdventure: adventure,
        isCopyingAdventure: true,
      });
      //update adventure list here
      this.handleAchievement();
      this.props.loadAdventureList();
    }
  };

  createAdventure = (e) => {
    //get new character
    let character = this.state.characters.find((v) => {
      return this.state.copiedAdventure.character === v._id;
    });
    //generate new starting event
    Axios.get("event/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log(response.data.characters);
        let event = response.data.events.find((e) => {
          return this.state.copiedAdventure.events[0].id === e.id;
        });
        event.fullLog[0] = character.backstory;
        event.displayedLog[0] = character.backstory;
        event.previousLog = [character.backstory];
        delete event.id;
        delete event._id;

        this.createEvent(event);

        setTimeout(() => {
          this.setState({
            copiedAdventure: {
              ...this.state.copiedAdventure,
              character: character,
              events: [this.state.event],
            },
          });
          setTimeout(() => {
            //create new adventure with new character and event
            console.log("To backend:", this.state.copiedAdventure);
            Axios.post("adventure/add", this.state.copiedAdventure, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((response) => {
                if (response.data.error) {
                  console.log("Error cloning adventure.", response.data.error);
                  this.props.setMessage(
                    response.data.error._message +
                      ". <error instructions>.\nIf the issue persists please contact the developers and quote: Adventure/" +
                      response.data.error.name,
                    "danger"
                  );
                } else {
                  console.log("Adventure cloned successfully.", response);
                  response.data.adventure.events = [this.state.event];
                  setTimeout(() => {
                    this.props.startStory(
                      response.data.adventure,
                      this.state.copiedAdventure.character
                    );
                    this.setState({
                      adventure: response.data.adventure,
                      character: this.state.copiedAdventure.character,
                    });
                    //redirect to new adventure... broken?????
                    setTimeout(() => {
                      this.setState({
                        redirect: true,
                      });
                    }, 200);
                  }, 100);
                }
              })
              .catch((error) => {
                console.log("Error cloning adventure.", error);
                console.log(error);
                this.props.setMessage(error.message, "danger");
              });
          }, 100);
        }, 100);
      })
      .catch((err) => {
        console.log("Error cloning events.");
        console.log(err);
        this.props.setMessage(err.message, "danger");
      });
  };

  createEvent = (event) => {
    Axios.post("event/add", event, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          console.log("Error adding event.", response.data.error);
          this.props.setMessage(
            response.data.error._message +
              ". Please confirm you have correctly filled out all the fields in the adventure creation form.\nIf the issue persists please contact the developers and quote: Event/" +
              response.data.error.name,
            "danger"
          );
        } else {
          // console.log("Event created successfully.", response);
          this.setState({
            event: response.data.event,
          });
        }
      })
      .catch((error) => {
        console.log("Error creating event.", error);
        this.props.setMessage(error.message, "danger");
      });
  };

  deleteAdventure = (e) => {
    this.props.deleteAdventure(this.state.adventure);
  };

  readAdventure = (e) => {
    // console.log("opening adventure journal...");
    e.preventDefault();
    this.props.setAdventure(this.state.adventure);
    this.setState({
      redirected: true,
    });
  };

  handleChange = (event) => {
    const attributeToChange = event.target.name; // this will give the name of the field that is changing
    const newValue = event.target.value; //this will give the value of the field that is changing

    const adventure = { ...this.state.copiedAdventure };
    adventure[attributeToChange] = newValue;
    // console.log("onchange", adventure);
    this.setState({
      copiedAdventure: adventure,
    });
  };

  showStory = (e) => {
    // console.log('yeet')
    e.preventDefault();
    this.props.setAdventure(this.state.adventure);
    this.setState({
      redirected: true,
    });
  };

  render() {
    let css = `adventure-${this.state.adventure.id}`;
    let a_an = "aeiou".includes(this.state.adventure.setting[0].toLowerCase())
      ? "An"
      : "A";
    let quest =
      this.state.adventure.quest.charAt(0).toLowerCase() +
      this.state.adventure.quest.slice(1);

    let characterSelect;
    if (this.state.userCharacters) {
      characterSelect = this.state.userCharacters.map((c) => {
        return (
          <option value={c._id} className={c.name} key={c._id} index={c._id}>
            {c.name} ({c.class})
          </option>
        );
      });
    } else {
      characterSelect = ["wat"];
    }

    return this.state.character.name && this.state.advUser ? (
      <div>
        <Card className={css} style={{ width: "18rem", margin: "15px" }}>
          <Card.Img
            variant='top'
            src={this.state.adventure.image}
            // onClick={this.showStory}
          />
          <Card.Body>
            <Card.Title>{this.state.adventure.name}</Card.Title>
            <Card.Text>
              <span className='overflow-adventure'>
                {a_an} {this.state.adventure.setting}{" "}
                {this.state.adventure.genre} {this.state.adventure.length} to{" "}
                {quest}.
              </span>
              <br />
              Character: {this.state.character.name} (
              {this.state.character.class})<br></br>
              {!this.props.isFiltered ? (
                <span>
                  Created by:{" "}
                  {this.props.adventure.user ? (
                    <a href={`/profile/${this.props.adventure.user}`}>
                      <span className='by'>{this.state.advUser}</span>
                    </a>
                  ) : (
                    this.state.advUser
                  )}
                </span>
              ) : null}
            </Card.Text>
            <div className='buttons-container'>
              {
                this.state.isFiltered ? (
                  <Button
                    className='continue'
                    variant='primary'
                    onClick={this.continueAdventure}
                  >
                    Continue
                  </Button>
                ) : this.state.isCopyingAdventure ? (
                  <Button
                    variant='secondary'
                    onClick={this.handleCopyAdventureBtn}
                  >
                    Cancel
                  </Button>
                ) : null
                // <Button variant='primary' onClick={this.handleCopyAdventureBtn}>
                //   Copy
                // </Button>
              }

              {this.state.isFiltered ? (
                <div className='read-delete'>
                  <Button variant='secondary' onClick={this.readAdventure}>
                    Read
                  </Button>
                  <Button variant='danger' onClick={this.deleteAdventure}>
                    Delete
                  </Button>
                </div>
              ) : (
                <Button variant='secondary' onClick={this.readAdventure}>
                  Read
                </Button>
              )}
            </div>
            {this.state.isCopyingAdventure ? (
              <div className='mb-3 form__group field'>
                <label className='form__label'>Choose Character</label>
                <br></br>
                <Form.Select
                  name='character'
                  onChange={this.handleChange}
                  className=''
                >
                  {characterSelect}
                </Form.Select>
                <br></br>
                <Button variant='primary' onClick={this.createAdventure}>
                  Confirm Copy
                </Button>
              </div>
            ) : null}
          </Card.Body>
        </Card>
        {this.state.redirect && (
          <Navigate
            to='/adventure'
            replace={true}
            adventure={this.state.adventure}
            character={this.state.character}
            setMessage={this.props.setMessage}
          />
        )}
        {this.state.redirected && (
          <Navigate
            to='/adventure-story'
            replace={true}
            adventure={this.state.adventure}
            setMessage={this.props.setMessage}
            origin={this.props.origin}
          />
        )}
      </div>
    ) : (
      <div className='heightHolder'></div>
    );
  }
}
