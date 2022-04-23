import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './css/TechStack.css'

export default class TechStack extends Component {
  render() {
    return (
		<Container className="section-tech">
			<h1 className="tech-title">Our Tech Stack</h1>

			<div className="tech-logos">
				<div>
					<a href="https://www.mongodb.com/"><img className="logo-img" src="images/logos/mongodb.png" alt="" /></a>
				</div>
				<div >
					<a href="https://expressjs.com/"><img className="logo-img" src="images/logos/express-js.png" alt="" /></a>
				</div>
				<div>
					<a href="https://reactjs.org/"><img className="logo-img" src="images/logos/react.png" alt="" /></a>
				</div>
				<div>
					<a href="https://nodejs.dev/"><img className="logo-img" src="images/logos/nodejs.png" alt="" /></a>
				</div>
			</div>

			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro consequuntur nam vel suscipit aperiam atque inventore consectetur asperiores dignissimos saepe molestiae eius velit, sed iste nemo cupiditate nostrum enim voluptatum.</p>

			<div>
				And with a little help from
				<div >
					<a href="https://openai.com/"><img className="openai-img" src="images/logos/openai.png" alt="" /></a>
				</div>
			</div>
		</Container>
    )
  }
}
