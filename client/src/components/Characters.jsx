import React, { Component } from "react";
import Axios from "axios";
import Character from "./Character";
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

  render() {
    const characters = this.state.characters.map((c, index) => {
      return (
        <Character
          name={c.name}
          backstory={c.backstory}
          class={c.class}
          key={index}
          id={index}
          ability={c.ability}
          weakness={c.weakness}
          createAdventure={this.props.createAdventure}
        />
      );
    });
    return (
      <div>
        <h1>Character List</h1>
        <div className='character-list'>{characters}</div>
      </div>
    );
  }
}
