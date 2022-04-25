import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

export default class Character extends Component {
  render() {
    let css = `character-${this.props.id}`;
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
            <Button variant='primary'>Start Adventure</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
