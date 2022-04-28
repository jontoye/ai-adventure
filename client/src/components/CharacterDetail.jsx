import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import AdventureInfo from "./AdventureInfo";
import "./css/CharacterDetail.css";

export default class CharacterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {},
      myadventures: [],
      adventures: [],
      char_id: null,
      adventureCount: 0,
      id: null,
    };
  }

  componentDidMount() {
    this.loadName();
    this.setCharacter();
  }

  loadName = () => {
    Axios.get("character/index")
      .then((response) => {
        // console.log("response.data.characters", response.data.characters);
        let id = response.data.characters.filter(
          (character) => character.name === this.state.character.name
        );
        let char_id = id[0]._id;
        this.setState({ id: id[0]._id });
        console.log("state adventures", this.state.adventures);
        this.loadAdventureList(char_id);
      })
      .catch();
  };

  loadAdventureList = (char_id) => {
    // console.log("getting adventures...");
    Axios.get("adventure/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        let adventures = response.data.adventures.filter(
          (adventure) => adventure.character === char_id
        );
        console.log("filtered adventures", adventures);
        this.setState({
          myadventures: adventures.reverse(),
          adventureCount: adventures.length,
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

  deleteAdventure = (adventure) => {
    Axios.delete(`adventure/delete?id=${adventure._id}`, {
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
    .then(response => {
      // console.log("Deleted adventure.")
      this.loadAdventureList();
    })
    .catch(err=>{
      console.log(`Error deleting adventure: ${adventure.name}`)
      console.log(err)
    })
  }

  setAdventures() {}

  render() {
    let adventures = this.state.myadventures.map((a) => {
      return (
        <AdventureInfo
          name={a.name}
          adventure={a}
          key={a._id}
          id={a._id}
          continueAdventure={this.props.continueAdventure}
          deleteAdventure={this.deleteAdventure}
        />
      );
    });
    // const
    return (
      <div className='centered'>
        <Card
          className='character-detail-card'
          style={{ width: "50rem", margin: "0 auto" }}
        >
          <Card.Img variant='top' src={this.state.character.image}
            onError={(e) => {
              e.target.onerror = null 
              e.target.src = `/images/class/default.png`}} />
          <Card.Body>
            <Card.Title>
              {this.state.character.name} the {this.state.character.class}
            </Card.Title>
            <Card.Text className='character-backstory'>
              <div className='character-backstory'>
                <p className='overflow'>{this.state.character.backstory}</p>
              </div>
              Ability: {this.state.character.ability}
              <br />
              Weakness: {this.state.character.weakness}
              <br />
              Favorites: ♡ 9001
              <br /> Adventures: {this.state.adventureCount}
            </Card.Text>
            <Button variant='primary'>Start Adventure</Button>
          </Card.Body>
        </Card>
        <br />
        <h1>
          {this.state.character.name} the {this.state.character.class}'s
          Adventures
        </h1>
        <div className='section-explore container my-5'>
          <div className='adventure-list'>{adventures}</div>
        </div>
      </div>
    );
  }
}
