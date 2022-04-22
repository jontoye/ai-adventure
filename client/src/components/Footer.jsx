import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className='main-footer'>
          <h5>AI Adventure</h5>
          <p>Learn More about <a href="https://openai.com/">OpenAI</a></p>
          <p>Contact Us</p>

      </footer>
    )
  }
}
