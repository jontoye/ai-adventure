import React, { Component } from 'react'
import Banner from './Banner';
import Tutorial from './Tutorial'
import TechStack from './TechStack'
import './css/Home.css'
import axios from 'axios';

export default class Home extends Component {
	componentDidMount() {
		axios.get('/wedidit')
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
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
