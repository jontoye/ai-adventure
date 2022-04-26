import React, { Component } from 'react'
import Banner from './Banner';
import Tutorial from './Tutorial'
import TechStack from './TechStack'
import './css/Home.css'

export default class Home extends Component {

	

	componentDidMount() {

	}
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
