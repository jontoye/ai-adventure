import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Entry from "./Entry";

export default class Log extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  scrollToBottom() {
    let element = document.getElementById("adventure-log");
    element.scrollIntoView({ block: "end", inline: "nearest" });
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  }

  render() {
    // console.log(this.props.log)
    const entries = this.props.log.map((entry, index) => {
      let colorID = "color_" + String(((index - 1) % 3) + 1);
      if (index < 1) {
        colorID = "color_start";
      }

      return <Entry text={entry} key={entry[0] + index} colorID={colorID} />;
    });

    const logTitle = () => {
      return this.props.adventureName ? (
        <span className='adventure-log-text'>
          Adventure Log | {this.props.adventureName}
        </span>
      ) : (
        <span className='adventure-log-text'>Adventure Log</span>
      );
    };

    return (
      <>
        <Card id='log-card'>
          <Card.Body id='log-card-body'>
            <Card.Title variant='dark'>{logTitle()}</Card.Title>
            {/* <Card.Subtitle>(for development purposes only)</Card.Subtitle> */}
            <br />
            <div id='adventure-log'>{entries}</div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
//comment
