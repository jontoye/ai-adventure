import React, { Component } from "react";
import Axios from "axios";
import Character from "./Character";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "./css/Characters.css";

export default class Characters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
    };
  }
  componentDidMount() {
    this.loadCharacterList();

    // console.log("filter props test", this.props.filtered);
  }

  loadCharacterList = () => {
    // console.log("getting characters...");
    Axios.get("character/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log(response.data.characters);
        if (this.props.filtered !== true) {
          this.setState({
            characters: response.data.characters.reverse(),
          });
        } else {
          let characters = response.data.characters.filter(
            (character) => character.user === this.props.user._id
          );
          console.log("characters else test", characters);
          this.setState({
            characters: characters.reverse(), //finish
          });
        }
      })
      .catch((err) => {
        console.log("Error fetching characters.");
        console.log(err);
        this.props.setMessage(err.message,'danger');
      });
  };

  deleteCharacter = (name) => {
    Axios.delete(`character/delete?name=${name}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log("Deleted character.")
        this.loadCharacterList();
      })
      .catch((err) => {
        console.log(`Error deleting character: ${name}`);
        console.log(err);
        this.props.setMessage(err.message,'danger');
      });
  };

  createCharacter = (e) => {
    this.props.dontCreateRandomCharacter();
    this.setState({
      redirect: true,
    });
  };

  render() {
    const characters = this.state.characters.map((c) => {
      return (
        <div className='character-card'>
          <Character
            name={c.name}
            backstory={c.backstory}
            class={c.class}
            key={c._id}
            id={c._id}
            ability={c.ability}
            weakness={c.weakness}
            image={c.image}
            createAdventure={this.props.createAdventure}
            deleteCharacter={this.deleteCharacter}
            setCharacter={this.props.setCharacter}
            setMessage={this.props.setMessage}
          />
        </div>
      );
    });
    return (
      <div>
        <h1>Character List</h1>
        <div className='character-list my-5 container'>{characters}</div>
        <Container className='text-center'>
          <Button variant='secondary' onClick={this.createCharacter}>
            Create New Character
          </Button>
        </Container>
        {this.state.redirect && (
          <Navigate to='/create-character' replace={true} setMessage={this.props.setMessage}/>
        )}
      </div>
    );
  }
}
