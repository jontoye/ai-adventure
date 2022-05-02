import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import "./css/AdventureInfo.css";

export default class AdventureInfo extends Component {
  state = {
    adventure: this.props.adventure,
    character: {},
    redirect: false,
  };

  componentDidMount() {
    Axios.get("character/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
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
        this.props.setMessage(err.message, "danger");
      });
  }

  continueAdventure = (e) => {
    console.log("continuing adventure...");
    Axios.get("event/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        let events = response.data.events.filter((v) => {
          return this.state.adventure.events.includes(v._id);
        });
        // console.log('successfully found events: ', events)
        this.setState({
          adventure: {
            ...this.state.adventure,
            events: events,
          },
        });
        //async!
        setTimeout(() => {
          this.props.continueAdventure(
            this.state.adventure,
            this.state.character
          );
          this.setState({
            redirect: true,
          });
        }, 100);
      })
      .catch((error) => {
        console.log("Error continuing adventure.", error);
        this.props.setMessage(error.message, "danger");
      });
    // console.log(this.state.character)
  };

  deleteAdventure = (e) => {
    this.props.deleteAdventure(this.state.adventure);
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
          <Card.Img variant='top' src={this.state.adventure.image} />
          <Card.Body>
            <Card.Title>{this.state.adventure.name}</Card.Title>
            <Card.Text>
              <p className='overflow-adventure'>
                {a_an} {this.state.adventure.setting}{" "}
                {this.state.adventure.genre} {this.state.adventure.length} to{" "}
                {quest}.
              </p>
              Character: {this.state.character.name} (
              {this.state.character.class})
            </Card.Text>
            <div className='buttons-container'>
              {this.props.isFiltered ? 
              <Button variant='primary' onClick={this.continueAdventure}>
                Continue
              </Button> :
              <Button variant='primary' onClick={this.continueAdventure}>
                Start
              </Button>}

              {this.props.isFiltered ? 
              <Button variant='danger' onClick={this.deleteAdventure}>
                Delete
              </Button> :
              <Button variant='danger' onClick={this.deleteAdventure}>
                Read
              </Button>
              }
            </div>
          </Card.Body>
        </Card>
        {this.state.redirect && (
          <Navigate
            to='/adventure'
            replace={true}
            adventure={this.state.adventure}
            character={this.state.character}
            setMessage={this.props.setMessage}
          />
        )}
      </div>
    );
  }
}
