import React, { Component } from "react";
import Axios from "axios";
import Character from "./Character";
import { Navigate } from "react-router-dom";
// import { Button, Container } from "react-bootstrap";
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log(response.data.characters);
        let characterFiltered = response.data.characters.filter((c) => {
          return c.user ? c.user : !this.props.isFiltered;
        });
        this.setState({
          characters: characterFiltered.reverse(),
        });
      })
      .catch((err) => {
        console.log("Error fetching characters.");
        console.log(err);
        this.props.setMessage(err.message, "danger");
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
        this.props.setMessage(err.message, "danger");
      });
  };

  createCharacter = (e) => {
    this.props.dontCreateRandomCharacter();
    this.setState({
      redirect: true,
    });
  };

  scrollLeft = () => {
    document.querySelector(".character-list").scrollLeft += 500;
  };

  scrollRight = () => {
    document.querySelector(".character-list").scrollLeft -= 500;
  };

  render() {
    const characters = this.state.characters.map((c) => {
      let user = this.props.userList.find((u) => {
        return c.user === u._id;
      });
      let charUser = user ? user.username : "unknown";
      return (
        <div className='character-card' key={c._id}>
          <Character
            name={c.name}
            backstory={c.backstory}
            class={c.class}
            key={c._id}
            id={c._id}
            ability={c.ability}
            weakness={c.weakness}
            image={c.image}
            user={c.user}
            currentUser={this.props.user}
            createAdventure={this.props.createAdventure}
            deleteCharacter={this.deleteCharacter}
            setCharacter={this.props.setCharacter}
            setMessage={this.props.setMessage}
            isFiltered={this.props.isFiltered}
            startStory={this.props.startStory}
            userCharacters={this.state.characters}
            userList={this.props.userList}
            charUser={charUser}
            createAchievement={this.props.createAchievement}
          />
        </div>
      );
    });

    if (characters.length < 1) {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Loading..</h1>
        </div>
      );
    }
    return (
      <div className='container-fluid my-5'>
        <h1 className='display-4'>Character List</h1>
        {/* {this.props.isFiltered ? (
          <p className='display-8 text-white' style={{ textAlign: "center" }}>
            Explore the characters you have created.
          </p>
        ) : (
          <p className='display-8 text-white' style={{ textAlign: "center" }}>
            Explore characters from around the world.
          </p>
        )} */}
        <div className='d-flex align-items-center container-fluid'>
          <img
            className='scroll-btn'
            src='/images/icons/left-arrow.png'
            onClick={this.scrollRight}
            alt='left-arrow'
          />
          <div className='character-list my-2 container-fluid'>
            {characters}
          </div>
          <img
            className='scroll-btn'
            src='/images/icons/right-arrow.png'
            onClick={this.scrollLeft}
            alt='right-arrow'
          />
        </div>
        {/* <Container className='text-center my-4'>
          <Button variant='secondary' onClick={this.createCharacter}>
            Create New Character
          </Button>
        </Container> */}
        {this.state.redirect && (
          <Navigate
            to='/create-character'
            replace={true}
            setMessage={this.props.setMessage}
          />
        )}
      </div>
    );
  }
}
