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
  }

  loadCharacterList = () => {
    // console.log("getting characters...");
    Axios.get("character/index")
    .then((response) => {
      // console.log(response.data.characters);
      this.setState({
        characters: response.data.characters.reverse(),
      });
    })
    .catch((err) => {
      console.log("Error fetching characters.");
      console.log(err);
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
      });
  };

  createCharacter = (e) => {
    this.props.dontCreateRandomCharacter()
    this.setState({
      redirect: true,
    });
  };

  render() {
    const characters = this.state.characters.map((c) => {
      return (
        <div className="character-card">
          <Character
            name={c.name}
            backstory={c.backstory}
            class={c.class}
            key={c._id}
            id={c._id}
            ability={c.ability}
            weakness={c.weakness}
            createAdventure={this.props.createAdventure}
            deleteCharacter={this.deleteCharacter}
            setCharacter={this.props.setCharacter}
          />
        </div>
      );
    });
    return (
      <div>
        <h1>Character List</h1>
        <div className='character-list my-5 container'>{characters}</div>
        <Container className="text-center">
          <Button variant='secondary' onClick={this.createCharacter}>Create New Character</Button>
        </Container>
        {this.state.redirect && (
          <Navigate
            to='/create-character'
            replace={true}
          />
        )}
      </div>
    );
  }
}
