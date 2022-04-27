import React, { Component } from 'react';
import Banner from './Banner';
import Tutorial from './Tutorial';
import TechStack from './TechStack';
import './css/Home.css';
import Axios from "axios";
import Contact from './Contact';

export default class Home extends Component {
	state = {
		adventure: {},
		character: {},
	};
	componentDidMount() {
		Axios.get("adventure/index")
		.then((response) => {
		  this.setState({
			adventure: response.data.adventures.reverse()[0],
		  });
		  Axios.get("character/index")
		  .then((response) => {
			let character = response.data.characters.find((v) => {
			  return this.state.adventure.character === v._id;
			});
			this.setState({
			  character: character,
			});
		  })
		  .catch((err) => {
			console.log("Error fetching characters.");
			console.log(err);
		  });
		})
		.catch((err) => {
		  console.log("Error fetching adventures.");
		  console.log(err);
		});
	  }

	render() {
		return (
			<>
				<Banner 
					adventure={this.state.adventure}
					character={this.state.character}
					continueAdventure={this.props.continueAdventure}
					createRandomCharacter={this.props.createRandomCharacter} 
				/>
				<Tutorial />
				<TechStack />
				<Contact />
			</>
		)
	}
}
