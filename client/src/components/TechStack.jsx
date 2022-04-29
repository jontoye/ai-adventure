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
					<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img className="logo-img" src="images/logos/mongodb.png" alt="mongodb" /></a>
				</div>
				<div >
					<a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img className="logo-img" src="images/logos/express-js.png" alt="express" /></a>
				</div>
				<div>
					<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img className="logo-img" src="images/logos/react.png" alt="react" /></a>
				</div>
				<div>
					<a href="https://nodejs.dev/" target="_blank" rel="noreferrer"><img className="logo-img" src="images/logos/nodejs.png" alt="node" /></a>
				</div>
			</div>

			<p>This is a MERN-stack app, designed and built from scratch by a team of four software developers over two weeks.</p>

			<div>
				And with a little help from
				<div >
					<a href="https://github.com/alembics/disco-diffusion" target="_blank" rel="noreferrer">Disco Diffusion</a> & <a href="https://openai.com/" target="_blank" rel="noreferrer"><img className="openai-img" src="images/logos/openai.png" alt="" /></a>
				</div>
			</div>
		</Container>
    )
  }
}
