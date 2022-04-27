import React, { Component } from "react";
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
    },
    name: this.props.name,
    log: [this.props.backstory],
    redirect: false,
    redirected: false,
  };
  startAdventure = (e) => {
    // console.log('fancy frontend stuff')
    this.props.createAdventure(this.state.character);
    this.setState({
      redirect: true,
    });
    // console.log(this.state.character)
  };

  deleteCharacter = (e) => {
    // console.log('fancy backend stuff')
    this.props.deleteCharacter(this.props.name);
  };

  characterDetail = () => {
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
          <Card.Img variant='top' src='images/saad.png' />
          <Card.Body>
            <Card.Title>
              {this.props.name} the {this.props.class}
            </Card.Title>
            <Card.Text>
              <p className='overflow-char'>{this.props.backstory}</p>
              Ability: {this.props.ability}
              <br />
              Weakness: {this.props.weakness}
            </Card.Text>
            <div className='buttons-container'>
              <Button variant='primary' onClick={this.startAdventure}>
                Start Adventure
              </Button>
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
          />
        )}
        {this.state.redirected && (
          <Navigate
            to='/character-detail'
            replace={true}
            character={this.state.character}
            deleteCharacter={this.props.deleteCharacter}
          />
        )}
      </div>
    );
  }
}
