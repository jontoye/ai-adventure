import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

export default class CharacterDetail extends Component {
  render() {
    return (
      <div>
        <Card
          className='character-detail-card'
          style={{ width: "50rem", margin: "15px" }}
        >
          <Card.Img variant='top' src='images/saad.png' />
          <Card.Body>
            <Card.Title>
              {this.props.character.name} the {this.props.class}
            </Card.Title>
            <Card.Text>
              {this.props.backstory}
              <br />
              <br />
              Ability: {this.props.ability}
              <br />
              Weakness: {this.props.weakness}
              Favorites: 9001 ♡ Stories: 5
            </Card.Text>
            <Button variant='primary'>Start Adventure</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
