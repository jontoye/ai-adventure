import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Axios from "axios";

export default class AdventureInfo extends Component {
  state = {
    adventure: this.props.adventure,
    name: this.props.name,
    character: {},
    log: [this.props.adventure.log],
    redirect: false,
    image: "images/saad.png",
  };
  componentDidMount() {
    Axios.get("character/index")
      .then((response) => {
        // console.log(response.data.characters);
        let character = response.data.characters.find((v) => {
          return this.state.adventure.character === v._id;
        });
        // console.log(character.name)
        this.setState({
          character: character,
        });
      })
      .catch((err) => {
        console.log("Error fetching characters.");
        console.log(err);
      });
    this.imageSelect();
  }
  continueAdventure = (e) => {
    // console.log('fancy frontend stuff')
    console.log('continuing adventure...')
    Axios.get("event/index")
    .then((response) => {
      let events = response.data.events.filter(v=>{
        return this.state.adventure.events.includes(v._id);
      })
      // console.log('successfully found events: ', events)
      this.setState({
        adventure: {
          ...this.state.adventure,
          events:events,
        },
      });
      //async!
      setTimeout(()=>{
        this.props.continueAdventure(this.state.adventure, this.state.character)
        this.setState({
          redirect: true,
        })
      },100)
    })
    // console.log(this.state.character)
  };

  imageSelect = () => {
    let fixed = this.state.adventure.setting.replace(" ", "");
    let path = `images/setting/${fixed}.png`;
    this.setState({
      image: path,
    });
  };

  deleteAdventure = (e) => {
    this.props.deleteAdventure(this.state.adventure.name);
  };
  render() {
    let css = `adventure-${this.state.id}`;
    let a_an = "aeiou".includes(this.state.adventure.setting[0].toLowerCase())
      ? "An"
      : "A";
    let quest =
      this.state.adventure.quest.charAt(0).toLowerCase() +
      this.state.adventure.quest.slice(1);

    return (
      <div>
        <Card className={css} style={{ width: "18rem", margin: "15px" }}>
          <Card.Img variant='top' src={this.state.image} />
          <Card.Body>
            <Card.Title>{this.state.adventure.name}</Card.Title>
            <Card.Text>
              {a_an} {this.state.adventure.setting} {this.state.adventure.genre}{" "}
              {this.state.adventure.length} to {quest}.<br></br>
              Character: {this.state.character.name} (
              {this.state.character.class})
            </Card.Text>
            <Button variant='primary' onClick={this.continueAdventure}>
              Continue
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Button variant='danger' onClick={this.deleteAdventure}>
              Delete
            </Button>
          </Card.Body>
        </Card>
        {this.state.redirect && (
          <Navigate
            to='/adventure'
            replace={true}
            adventure={this.state.adventure}
            character={this.state.character}
          />
        )}
      </div>
    );
  }
}
