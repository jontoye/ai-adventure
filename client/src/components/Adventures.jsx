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

  scrollLeft = () => {
    document.querySelector('.adventure-list').scrollLeft += 500
  }

  scrollRight = () => {
    document.querySelector('.adventure-list').scrollLeft -= 500
  }

  render() {
    const adventures = this.state.adventures.map((a) => {
      return (
        <div className="adventure-card">
          <AdventureInfo
            adventure={a}
            key={a._id}
            id={a._id}
            continueAdventure={this.props.continueAdventure}
            deleteAdventure={this.deleteAdventure}
          />         
        </div>
      );
    });
    return (
      <div>
        <h1 className="display-4">Adventure List</h1>
        <div className="d-flex align-items-center container-xl">
        <img 
            className="scroll-btn" 
            src="/images/icons/left-arrow.png" 
            onClick={this.scrollRight} 
            alt="left-arrow" />
          <div className='adventure-list my-3 container'>{adventures}</div>
          <img 
            className="scroll-btn" 
            src="/images/icons/right-arrow.png" 
            onClick={this.scrollLeft} 
            alt="right-arrow" />
        </div>
          <Container className="text-center my-4">
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
