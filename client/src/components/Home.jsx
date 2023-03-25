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
		Axios.get("adventure/index", {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then((response1) => {
			let adventureFiltered = response1.data.adventures.filter(a=>{
			  return a.user ? a.user===this.props.user.id : false
			})

		  this.setState({
			adventure: adventureFiltered.reverse()[0],
		  });
		  Axios.get("character/index", {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		  })
		  .then((response2) => {
			let character = this.state.adventure ? 
			response2.data.characters.find((v) => {
			  return this.state.adventure.character === v._id;
			}) : {};
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
					setMessage={this.props.setMessage}
					user={this.props.user}
				/>
				<Tutorial />
				<TechStack />
				<Contact setMessage={this.setMessage}/>
			</>
		)
	}
}
