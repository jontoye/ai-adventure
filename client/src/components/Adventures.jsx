import React, { Component } from "react";
import Axios from "axios";
import AdventureInfo from "./AdventureInfo";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "./css/Adventures.css";

export default class Adventures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventures: [],
      redirect: false,
    };
  }
  componentDidMount() {
    this.loadAdventureList();
  }

  loadAdventureList = () => {
    // console.log("getting adventures...");
    Axios.get("adventure/index")
    .then((response) => {
      // console.log(response.data.adventures);
      this.setState({
        adventures: response.data.adventures.reverse(),
      });
    })
    .catch((err) => {
      console.log("Error fetching adventures.");
      console.log(err);
    });
  };

  deleteAdventure = (adventure) => {
    Axios.delete(`adventure/delete?id=${adventure._id}`, {
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
    .then(response => {
      // console.log("Deleted adventure.")
      this.loadAdventureList();
    })
    .catch(err=>{
      console.log(`Error deleting adventure: ${adventure.name}`)
      console.log(err)
    })
  }

  createAdventure = (e) => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    const adventures = this.state.adventures.map((a, index) => {
      return (
        <div className="adventure-card">
          <AdventureInfo
            adventure={a}
            key={index}
            id={index}
            continueAdventure={this.props.continueAdventure}
            deleteAdventure={this.deleteAdventure}
          />         
        </div>
      );
    });
    return (
      <div>
        <h1>Adventure List</h1>
        <div className='adventure-list my-5 container'>{adventures}</div>
        <Container className="text-center">
          <Button variant='secondary' onClick={this.createAdventure}>Create New Adventure</Button>
        </Container>
        {this.state.redirect && (
          <Navigate
            to='/create-adventure'
            replace={true}
          />
        )}
      </div>
    );
  }
}
