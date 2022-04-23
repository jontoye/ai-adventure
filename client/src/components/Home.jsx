import React, { Component } from 'react'
import Banner from './Banner';
import Tutorial from './Tutorial'
import TechStack from './TechStack'
import './Home.css'

export default class Home extends Component {
	render() {
		return (
			<>
				<Banner createRandomCharacter={this.props.createRandomCharacter}/>
				<Tutorial />
				<TechStack />
			</>
		)
	}
}


