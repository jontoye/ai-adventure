import React, { Component } from "react";
import "./css/Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className='main-footer'>
        <h5>AI Adventure</h5>
        <div>
          Learn more about <a href='https://openai.com/'>OpenAI</a>
        </div>
        <a href='/#contact'>Contact Us</a>
      </footer>
    );
  }
}
