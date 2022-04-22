import React, { Component } from 'react'
import Banner from './Banner';
import Tutorial from './Tutorial'
import './Home.css'

export default class Home extends Component {
	render() {
		return (
			<>
				<Banner />
				<Tutorial />
			</>
		)
	}
}
