import React, { Component } from "react";
import Axios from "axios";
import Character from "./Character";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "./css/Characters.css";

export default class Characters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
    };
  }
  componentDidMount() {
    this.loadCharacterList();
  }

  loadCharacterList = () => {
    // console.log("getting characters...");
    Axios.get("character/index", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
    }
    })
      .then((response) => {
        // console.log(response.data.characters);
        let characterFiltered = response.data.characters.filter(c=>{
          return c.user ? c.user === this.props.user.id : false
        })
        this.setState({
          characters: characterFiltered.reverse(),
        });
      })
      .catch((err) => {
        console.log("Error fetching characters.");
        console.log(err);
        this.props.setMessage(err.message,'danger');
      });
  };

  deleteCharacter = (name) => {
    Axios.delete(`character/delete?name=${name}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log("Deleted character.")
        this.loadCharacterList();
      })
      .catch((err) => {
        console.log(`Error deleting character: ${name}`);
        console.log(err);
        this.props.setMessage(err.message,'danger');
      });
  };

  createCharacter = (e) => {
    this.props.dontCreateRandomCharacter();
    this.setState({
      redirect: true,
    });
  };

  scrollLeft = () => {
    document.querySelector('.character-list').scrollLeft += 500
  }

  scrollRight = () => {
    document.querySelector('.character-list').scrollLeft -= 500
  }

  render() {
    const characters = this.state.characters.map((c) => {
      return (
        <div className='character-card'>
          <Character
            name={c.name}
            backstory={c.backstory}
            class={c.class}
            key={c._id}
            id={c._id}
            ability={c.ability}
            weakness={c.weakness}
            image={c.image}
            createAdventure={this.props.createAdventure}
            deleteCharacter={this.deleteCharacter}
            setCharacter={this.props.setCharacter}
            setMessage={this.props.setMessage}
          />
        </div>
      );
    });
    return (
      <div className='container-fluid my-5'>

        <h1 className="display-4">Character List</h1>
        <div className="d-flex align-items-center container-fluid">
        <img 
            className="scroll-btn" 
            src="/images/icons/left-arrow.png" 
            onClick={this.scrollRight} 
            alt="left-arrow" />
          <div className='character-list my-2 container-fluid'>{characters}</div>
          <img 
            className="scroll-btn" 
            src="/images/icons/right-arrow.png" 
            onClick={this.scrollLeft} 
            alt="right-arrow" />
        </div>
        <Container className="text-center my-4">
          <Button variant='secondary' onClick={this.createCharacter}>Create New Character</Button>

        </Container>
        {this.state.redirect && (
          <Navigate to='/create-character' replace={true} setMessage={this.props.setMessage}/>
        )}
      </div>
    );
  }
}
