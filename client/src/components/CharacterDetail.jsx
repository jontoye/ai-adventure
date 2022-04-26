import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import AdventureInfo from "./AdventureInfo";

export default class CharacterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {},
      adventures: [],
      char_id: null,
      adventureCount: 0,
    };
  }

  componentDidMount() {
    this.setCharacter();
    this.loadAdventureList();
    this.loadName();
  }

  loadName = () => {
    Axios.get("character/index")
      .then((response) => {
        console.log(response.data.characters);
        let id = response.data.characters.filter(
          (character) => character.name === this.state.character.name
        );
        this.setState({ adventures: id });
        console.log("id", id);
      })
      .catch();
  };

  loadAdventureList = () => {
    // console.log("getting adventures...");
    Axios.get("adventure/index")
      .then((response) => {
        console.log(response.data.adventures);
        this.setState({
          adventures: response.data.adventures.reverse(),
        });
      })
      .catch((err) => {
        console.log("Error fetching adventures.");
        console.log(err);
      });
  };

  setCharacter() {
    this.setState({
      character: this.props.character,
    });
  }

  render() {
    const adventures = this.state.adventures.map((a, index) => {
      this.setState({
        adventureCount: this.state.adventures.length,
      });

      return (
        <AdventureInfo
          name={a.name}
          adventure={a}
          key={index}
          id={index}
          continueAdventure={this.props.continueAdventure}
          deleteAdventure={this.deleteAdventure}
        />
      );
    });
    return (
      <div>
        <Card
          className='character-detail-card'
          style={{ width: "50rem", margin: "15px" }}
        >
          <Card.Img variant='top' src='images/saad.png' />
          <Card.Body>
            <Card.Title>
              {this.state.character.name} the {this.state.character.class}
            </Card.Title>
            <Card.Text>
              {this.state.character.backstory}
              <br />
              <br />
              Ability: {this.state.character.ability}
              <br />
              Weakness: {this.state.character.weakness}
              <br />
              Favorites: ♡ 9001
              <br /> Stories: 5
            </Card.Text>
            <Button variant='primary'>Start Adventure</Button>
          </Card.Body>
        </Card>
        <h1>Adventure List {this.state.adventureCount}</h1>
        <div className='adventure-list'>x adventures goes here</div>
      </div>
    );
  }
}
