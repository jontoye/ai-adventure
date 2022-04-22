import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import Entry from "./Entry";

export default class 
 extends Component {
  render() {
    console.log(this.props.log)
    const entries = this.props.log.map((entry, index) => {
      return (
        <Entry text={entry} key={index} />
      );
    });
    return (
      <>
          <Card>
            <Card.Body>
              <Card.Title>*AI Log*</Card.Title>
              <Card.Subtitle>(for development purposes only)</Card.Subtitle>
              <hr />
              <div>
                {entries}
              </div>
            </Card.Body>
          </Card>
      </>
    )
  }
}
