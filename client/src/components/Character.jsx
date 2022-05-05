import React, { Component } from "react";
import Axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "./css/Character.css";

export default class Character extends Component {
  state = {
    character: {
      name: this.props.name,
      class: this.props.class,
      ability: this.props.ability,
      weakness: this.props.weakness,
      backstory: this.props.backstory,
      image: this.props.image,
      user: this.props.user,
    },
    name: this.props.name,
    log: [this.props.backstory],
    redirect: false,
    redirected: false,
    redirectChar: false,
    image: "images/saad.png",
  };

  componentDidMount() {
    // this.setImage();
    // console.log(this.props.userList)
  }

  startAdventure = (e) => {
    e.preventDefault();
    // console.log('fancy frontend stuff')
    this.props.createAdventure(this.state.character);
    this.setState({
      redirect: true,
    });

    // console.log(this.state.character)
  };

  copyCharacter = (e) => {
    console.log("Copying character:",this.state.character)
    let character = this.state.character
    character.user = this.props.currentUser.id
    delete character.id
    delete character._id
    character.name = prompt("Enter a name for your new character.")
    //need to find a smart way to replace the name in the backstory
    character.backstory = this.state.character.backstory.replace(this.state.character.name, character.name)

    Axios.post("character/add", character, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        console.log("Error copying character.", response.data.error);
        this.props.setMessage(
          response.data.error._message +
            ". <descriptive test>.\nIf the issue persists please contact the developers and quote: Character/" +
            response.data.error.name,
          "danger"
        );
      } else {
        console.log("Character copied successfully.", response);
        this.setState({
          redirectChar: true,
        });
      }
    })
    .catch((error) => {
      console.log("Error adding character.", error);
      this.props.setMessage(error.message, "danger");
    });
  }

  deleteCharacter = (e) => {
    // console.log('fancy backend stuff')
    this.props.deleteCharacter(this.props.name);
  };

  characterDetail = (e) => {
    e.preventDefault();
    this.props.setCharacter(this.state.character);
    this.setState({
      redirected: true,
    });
  };

  render() {
    let css = `characters character-${this.props.id}`;
    // console.log(this.state)
    return (
      <div>
        <Card className={css} style={{ width: "18rem", margin: "15px" }}>
          <Card.Img
            onClick={this.characterDetail}
            variant='top'
            src={this.props.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `/images/class/default.png`;
            }}
          />
          <Card.Body>
            <Card.Title onClick={this.characterDetail}>
              {this.props.name} the {this.props.class}
            </Card.Title>
            <Card.Text>
              <p className='overflow-char'>{this.props.backstory}</p>
              Ability: {this.props.ability}
              <br />
              Weakness: {this.props.weakness}
            </Card.Text>
            <div className='buttons-container'>
              {this.props.isFiltered ? 
              <Button variant='primary' onClick={this.startAdventure}>
                Start Adventure
              </Button> :
              <Button variant='primary' onClick={this.copyCharacter}>
                Copy
              </Button>}
              <Button variant='danger' onClick={this.characterDetail}>
                Details
              </Button>
            </div>
          </Card.Body>
        </Card>
        {this.state.redirect && (
          <Navigate
            to='/create-adventure'
            replace={true}
            character={this.state.character}
            setMessage={this.props.setMessage}
          />
        )}
        {this.state.redirected && (
          <Navigate
            to='/character-detail'
            replace={true}
            character={this.state.character}
            deleteCharacter={this.props.deleteCharacter}
            createAdventure={this.props.createAdventure}
            setMessage={this.props.setMessage}
            isFiltered={this.props.isFiltered}
            startStory={this.props.startStory}
            userCharacters={this.state.userCharacters}
            userList={this.props.userList}
            user={this.props.currentUser}
          />
        )}
        {this.state.redirectChar && (
          <Navigate
            to='/characters'
            replace={true}
            deleteCharacter={this.props.deleteCharacter}
            createAdventure={this.props.createAdventure}
            setMessage={this.props.setMessage}
            startStory={this.props.startStory}
            userList={this.props.userList}
            user={this.props.currentUser}
          />
        )}
      </div>
    );
  }
}
