import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Axios from "axios";

export default class AdventureInfo extends Component {
  state = {
    adventure: this.props.adventure,
    name: this.props.name,
    character: {},
    log: [this.props.log],
    redirect: false,
  }
  componentDidMount() { 
    Axios.get("character/index")
    .then((response) => {
      // console.log(response.data.characters);
      let character = response.data.characters.find(v=>{
        return this.state.adventure.character === v._id;
      })
      // console.log(character.name)
      this.setState({
        character: character,
      });
    })
    .catch((err) => {
      console.log("Error fetching characters.");
      console.log(err);
    });
   }
  continueAdventure = (e) => {
    // console.log('fancy frontend stuff')
    this.props.continueAdventure(this.state.adventure)
    this.setState({
      redirect: true,
    })
    // console.log(this.state.character)
  }

  deleteAdventure = (e) => {
    // console.log('fancy backend stuff')
    this.props.deleteAdventure(this.state.adventure.name);
  }
  render() {
    let css = `adventure-${this.state.id}`;
    let a_an = 'aeiou'.includes(this.state.adventure.setting[0].toLowerCase()) ? 'An' : 'A';
    let quest = this.state.adventure.quest.charAt(0).toLowerCase() + this.state.adventure.quest.slice(1)
    return (
      <div>
        <Card className={css} style={{ width: "18rem", margin: "15px" }}>
          <Card.Img variant='top' src='images/saad.png' />
          <Card.Body>
            <Card.Title>
              {this.state.adventure.name}
            </Card.Title>
            <Card.Text>
            {a_an} {this.state.adventure.setting} {this.state.adventure.genre} {this.state.adventure.length} to {quest}.<br></br>
              Character: {this.state.character.name} ({this.state.character.class})
            </Card.Text>
            <Button variant='primary' onClick={this.startAdventure}>Continue</Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Button variant='danger' onClick={this.deleteAdventure}>Delete</Button>
          </Card.Body>
        </Card>
        {this.state.redirect && (
          <Navigate
            to='/create-adventure'
            replace={true}
            character={this.state.character}
          />
        )}
      </div>
    );
  }
}
