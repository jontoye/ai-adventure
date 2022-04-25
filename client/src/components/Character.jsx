import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

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
  }
  startAdventure = (e) => {
    // console.log('fancy frontend stuff')
    this.props.createAdventure(this.state.character)
    this.setState({
      redirect: true,
    })
    // console.log(this.state.character)
  }

  deleteCharacter = (e) => {
    // console.log('fancy backend stuff')
    this.props.deleteCharacter(this.props.name);
  }
  render() {
    let css = `character-${this.props.id}`;
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
              {this.props.backstory}
              <br />
              <br />
              Ability: {this.props.ability}
              <br />
              Weakness: {this.props.weakness}
            </Card.Text>
            <Button variant='primary' onClick={this.startAdventure}>Start Adventure</Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Button variant='danger' onClick={this.deleteCharacter}>Delete</Button>
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
