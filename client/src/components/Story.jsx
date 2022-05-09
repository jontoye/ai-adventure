import React, { Component } from 'react'
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Log from "./Log";

export default class Story extends Component {
    state = {
        adventure: this.props.adventure,
    }
    componentDidMount() { 
        console.log(this.props.adventure)
     }

     handleClick = (e) => {
         console.log("filler function")
     }
  render() {
    return (
        <div className='centered'>
            <Card
            className='character-detail-card'
            style={{ width: "50rem", margin: "0 auto" }}
            >
            <Card.Img
                variant='top'
                src={this.state.adventure.image}
                onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/setting/default.png`;
                }}
            />
            <Card.Body>
                <Card.Title>
                {/* {this.state.character.name} the {this.state.character.class} */}
                </Card.Title>
                <div className='game-log mb-3'>
                    <Log
                    log={this.state.adventure.log}
                    adventureName={this.state.adventure.name}
                    />
                </div>
            <Button variant='secondary' onClick={this.handleClick}>
              Go back
            </Button> {" "}
            <Button variant='primary' onClick={this.handleClick}>
              Lets go Bardcore!
            </Button>
            </Card.Body>
            </Card>
            <br></br>
        </div>
    )
  }
}
