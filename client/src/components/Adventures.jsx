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
    Axios.get("adventure/index", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }})
    .then((response) => {
      let adventureFiltered = response.data.adventures.filter(a=>{
        return a.user ? a.user===this.props.user.id : !this.props.isFiltered
      })
      this.setState({
        adventures: adventureFiltered.reverse(),
      });
    })
    .catch((err) => {
      console.log("Error fetching adventures.");
      console.log(err);
      this.props.setMessage(err.message,'danger');
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
      this.props.setMessage(err.message,'danger');
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
            setMessage={this.props.setMessage}
            user={this.props.user}
            isFiltered={this.props.isFiltered}
            startStory={this.props.startStory}
          />         
        </div>
      );
    });
    return (
      <div className='container-fluid my-5'>
        <h1 className="display-4">Adventure List</h1>
        {this.props.isFiltered ? <p className="display-8 text-white" style={{"text-align":"center"}}>Explore the adventures you have begun.</p> : <p className="display-8 text-white" style={{"text-align":"center"}}>Explore adventures around the world.</p>}
        <div className="d-flex align-items-center container-fluid">
        <img 
            className="scroll-btn" 
            src="/images/icons/left-arrow.png" 
            onClick={this.scrollRight} 
            alt="left-arrow" />
          <div className='adventure-list my-3 container-fluid'>{adventures}</div>
          <img 
            className="scroll-btn" 
            src="/images/icons/right-arrow.png" 
            onClick={this.scrollLeft} 
            alt="right-arrow" />
        </div>
          <Container className="text-center">
            <Button variant='secondary' onClick={this.createAdventure}>Create New Adventure</Button>
          </Container>
        {this.state.redirect && (
          <Navigate
            to='/create-adventure'
            replace={true}
            setMessage={this.props.setMessage}
          />
        )}
      </div>
    );
  }
}
