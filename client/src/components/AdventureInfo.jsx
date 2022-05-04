import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import "./css/AdventureInfo.css";

export default class AdventureInfo extends Component {
  state = {
    adventure: this.props.adventure,
    character: {},
    redirect: false,
    redirectAdv: false,
    copiedAdventure: {},
    copiedCharacter: {},
    characters: {},
    userCharacters:this.props.userCharacters,
    isCopyingAdventure: false,
    advUser: null,
    users: this.props.userList,
  };

  setUserInfo = (userID) => {
    let user = this.state.users.find((u) => {
      return userID == u._id;
    });
    this.setState({
      advUser: user.username,
    });
  }

  componentDidMount() {
    if (this.state.adventure.user && this.state.users) {
      this.setUserInfo(this.state.adventure.user)
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
        })
      }
      this.setState({
        characters: response.data.characters,
        userCharacters:this.props.userCharacters,
      });
    })
    .catch((err) => {
      console.log("Error fetching characters.");
      console.log(err);
      this.props.setMessage(err.message, "danger");
    });

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

  handleCopyAdventureBtn = (e) => {
    if (this.state.isCopyingAdventure) {
      console.log('Cancelling copy...',this.state.copiedAdventure)
      this.setState({
        copiedAdventure:{},
        isCopyingAdventure: false,
      })
    } else {
      console.log('Initialising copy...',this.state.adventure)
      console.log(this.state.userCharacters)
      let adventure = this.state.adventure
      adventure.user = this.props.user.id
      adventure._id = null
      adventure.character = this.state.userCharacters[0]._id
      adventure.events = [this.state.adventure.events[0]]
      adventure.log = [this.state.adventure.log[0]]

      console.log('Copy ready.',adventure)
      this.setState({
        copiedAdventure:adventure,
        isCopyingAdventure: true,
      })
    }
  }
  
  createAdventure = (e) => {
    let character = this.state.characters.find((v) => {
      return this.state.copiedAdventure.character === v._id;
    });
    this.setState({
      copiedAdventure:{
        ...this.state.copiedAdventure,
        character:character,
      }
    })
    setTimeout(() => {
      console.log('To backend:',this.state.copiedAdventure)
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
          response.data.adventure.events = [this.state.event]; // to be updated
          setTimeout(() => {
            this.props.startStory(
              response.data.adventure,
              this.state.copiedAdventure.character,
            );
            this.setState({
              copiedAdventure: response.data.adventure,
              copiedCharacter: this.state.copiedAdventure.character,
              redirectAdv: true,
            });
          }, 100);
          // this.loadCharacterList();
        }
      })
      .catch((error) => {
        console.log("Error cloning adventure.", error);
        console.log(error);
        this.props.setMessage(error.message, "danger");
      });
    },100)
  }

  deleteAdventure = (e) => {
    this.props.deleteAdventure(this.state.adventure);
  };

  readAdventure = (e) => {
    console.log('opening adventure journal...')
  }

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

  render() {
    let css = `adventure-${this.state.id}`;
    let a_an = "aeiou".includes(this.state.adventure.setting[0].toLowerCase())
      ? "An"
      : "A";
    let quest =
      this.state.adventure.quest.charAt(0).toLowerCase() +
      this.state.adventure.quest.slice(1);

    const characterSelect = this.state.userCharacters.map((c) => {
      return (
        <option value={c._id} className={c.name} key={c._id} index={c._id}>
          {c.name} ({c.class})
        </option>
      );
    });

    return (
      <div>
        <Card className={css} style={{ width: "18rem", margin: "15px" }}>
          <Card.Img variant='top' src={this.state.adventure.image} />
          <Card.Body>
            <Card.Title>{this.state.adventure.name}</Card.Title>
            <Card.Text>
              <p className='overflow-adventure'>
                {a_an} {this.state.adventure.setting}{" "}
                {this.state.adventure.genre} {this.state.adventure.length} to{" "}
                {quest}.
              </p>
              Character: {this.state.character.name} (
              {this.state.character.class})
              <br></br>
              {!this.props.isFiltered ? this.state.advUser ? <p>Created by: {this.state.advUser}</p> : <p>Created by: unknown</p> : null}
              
            </Card.Text>
            <div className='buttons-container'>
              {this.props.isFiltered ? 
              <Button variant='primary' onClick={this.continueAdventure}>
                Continue
              </Button> : this.state.isCopyingAdventure ?
              <Button variant='secondary' onClick={this.handleCopyAdventureBtn}>
                Cancel
              </Button> :
              <Button variant='primary' onClick={this.handleCopyAdventureBtn}>
                Copy
              </Button>}

              {this.props.isFiltered ? 
              <Button variant='danger' onClick={this.deleteAdventure}>
                Delete
              </Button> :
              <Button variant='danger' onClick={this.readAdventure}>
                Read
              </Button>
              }
            </div>
            {this.state.isCopyingAdventure ?
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
            </div> : null }
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
        {this.state.redirectAdv && (
          <Navigate
            to='/adventure'
            replace={true}
            adventure={this.state.copiedAdventure}
            character={this.state.copiedCharacter}
            setMessage={this.props.setMessage}
          />
        )}

      </div>
    );
  }
}
