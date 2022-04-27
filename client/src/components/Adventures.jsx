import React, { Component } from "react";
import Axios from "axios";
import AdventureInfo from "./AdventureInfo";
import "./css/Adventures.css";

export default class Adventures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adventures: [],
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

  deleteAdventure = (name) => {
    Axios.delete(`adventure/delete?name=${name}`, {
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
    .then(response => {
      // console.log("Deleted adventure.")
      this.loadAdventureList();
    })
    .catch(err=>{
      console.log(`Error deleting adventure: ${name}`)
      console.log(err)
    })
  }

  render() {
    const adventures = this.state.adventures.map((a, index) => {
      return (
        <AdventureInfo
          adventure={a}
          key={index}
          id={index}
          continueAdventure={this.props.continueAdventure}
          deleteAdventure={this.deleteAdventure}
        />
      );
    });
    return (
      <div>
        <h1>Adventure List</h1>
        <div className='adventure-list my-5 container'>{adventures}</div>
      </div>
    );
  }
}
