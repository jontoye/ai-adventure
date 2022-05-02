import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Feedback from "./Feedback";
import "./css/Contact.css";

export default class Contact extends Component {
  render() {
    return (
      <Container className='section-contact' id='contact'>
        <h1 className='contact_title'>Contact us</h1>
        <p className='contact_subtitle'>Click on a developer to contact them</p>
        <div className='developer-profiles'>
          <div>
            <a href='https://www.camiel.co.nz' target='_blank' rel='noreferrer'>
              <img
                className='dev-img'
                src='images\linkedin\camiel.jpg'
                alt=''
              />
            </a>
            <h4>Camiel van Schoonhoven</h4>
            <p className='fs-6'>Fully Stacked</p>
          </div>
          <div>
            <a
              href='https://www.linkedin.com/in/dylan-kotzer-3a5421190/'
              target='_blank'
              rel='noreferrer'
            >
              <img className='dev-img' src='images\linkedin\dylan.jpg' alt='' />
            </a>
            <h4>Dylan Kotzer</h4>
            <p className='fs-6'>AI Ringleader</p>
          </div>
          <div>
            <a
              href='https://www.linkedin.com/in/joncannata/'
              target='_blank'
              rel='noreferrer'
            >
              <img className='dev-img' src='images\linkedin\jonC.jpg' alt='' />
            </a>
            <h4>Jon Cannata</h4>
            <p className='fs-6'>Authentication Expert</p>
          </div>
          <div>
            <a
              href='https://www.linkedin.com/in/jonathan-toye/'
              target='_blank'
              rel='noreferrer'
            >
              <img className='dev-img' src='images\linkedin\jonT.jpg' alt='' />
            </a>
            <h4>Jonathan Toye</h4>
            <p className='fs-6'>Social Guru</p>
          </div>
        </div>
        <br></br>
        <br />
        <br />
        <div className='feedback_form'>
          <h2 className='feedback_heading py-3'>Leave us a message!</h2>
          <Feedback setMessage={this.props.setMessage} />
        </div>
      </Container>
    );
  }
}
