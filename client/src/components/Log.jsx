import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Entry from "./Entry";

export default class Log extends Component {


  componentDidMount() { 
    // let element = document.getElementById('adventure-log');
    // console.log(element)
    // element.scrollIntoView({block: "end", inline: "nearest"});
    // element.scroll({ top: element.scrollHeight, behavior: 'smooth' });

    // element.scrollIntoView();
    // element.scrollIntoView(false);
    // element.scrollIntoView({block: "end"});
    // element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
   }  

  scrollToBottom = () => {
    let element = document.getElementById('adventure-log');
    console.log(element)
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
    // scrollIntoView(alignToTop)
  }


    // document.getElementById('adventure-log').scrollTop = document.getElementById('adventure-log').scrollHeight;

  render() {
    // console.log(this.props.log)
    const entries = this.props.log.map((entry, index) => {

      return <Entry text={entry} key={entry[0]+index} id={index}/>;

    });


    return (
      <>
        <Card id="log-card">
          <Card.Body id="log-card-body">
            <Card.Title><span class="adventure-log-text">Adventure Log</span></Card.Title>
            {/* <Card.Subtitle>(for development purposes only)</Card.Subtitle> */}
            <hr />
            <Card.Text id="adventure-log" onChange={this.scrollToBottom}>
              {entries}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
