import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import Axios from "axios";
import Log from "./Log";
import "./css/Adventure.css";

const { Configuration, OpenAIApi } = require("openai");

export default class Adventure extends Component {
  constructor() {
    super();
    this.state = {
      placeholder: "Click to generate a new adventure!",
      response: "",
      adventure: {},
      character: {},
      stories: [],
      log: [],
      name: "",
      prompt: "",
      option1: "Generating your first choice, hold on one second",
      option2: "Generating your second choice, hold on one second",
      option3: "Generating your third choice, hold on one second",
      event: {},
    };
  }

  componentDidMount() {
    console.log('LOAD')
    console.log(this.props.adventure)
    console.log(this.props.character)
    this.setState({
      adventure: this.props.adventure,
      character: this.props.character,
      log: this.props.adventure.log,
      name: this.props.adventure.name,
    });
    //async!
    setTimeout(()=>{
      this.generatePrompt();
    },100)
  }

  optionSelect = (option) => {
    // if (option === 1) {
    //   this.setState({ log: [...this.state.log, this.state.option1] });
    // } else if (option === 2) {
    //   this.setState({ log: [...this.state.log, this.state.option2] });
    // } else if (option === 3) {
    //   this.setState({ log: [...this.state.log, this.state.option3] });
    // }
  };

  buttonOneClick = () => {
    this.optionSelect(1);
    let x = 1;
    this.chooseOption(this.state.option1, x);
  };
  buttonTwoClick = () => {
    this.optionSelect(2);
    let x = 2;
    this.chooseOption(this.state.option2, x);
  };
  buttonThreeClick = () => {
    this.optionSelect(3);
    let x = 3;
    this.chooseOption(this.state.option3, x);
  };

  generatePrompt = () => {
    console.log('PROMPT');
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let previousLog = this.state.log.join("");
    let prompt = `\nGive ${this.state.character.name} 3 detailed options for what to do next.`;
    let AIprompt = previousLog + prompt;
      
    openai
      .createCompletion(process.env.REACT_APP_API_ENGINE, {
        prompt: AIprompt,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        let choices = response.data.choices[0].text;
        if (choices[0] === "\n") {
          choices = choices.slice(1, choices.length);
        }
        let split_choices = choices.split(/\s?\d+\.\s/);
        this.setState({
          log: [...this.state.log, prompt, '1. ' + split_choices[1]+'\n2. ' + split_choices[2]+'\n3. ' +split_choices[3]],
          option1: split_choices[1],
          option2: split_choices[2],
          option3: split_choices[3],
        });
      })
      .catch((error) => {
        console.log("error log:", error);
      });
    this.setState({
      placeholder: `Generating Choice. Please wait...`,
      response: "",
    });
  };

  chooseOption = (option, x) => {
    console.log('Option');
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let previousLog = this.state.log.join("");
    let prompt = `\n ${this.state.character.name} chooses to ${option}. Give a long and detailed account of what happens next.`;
    let AIprompt = previousLog + prompt;
      
    openai
      .createCompletion(process.env.REACT_APP_API_ENGINE, {
        prompt: AIprompt,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      })
      .then((response) => {
        let reply = response.data.choices[0].text;
        if (reply[0] === "\n") {
          reply = reply.slice(1, reply.length);
        }
        this.setState({
          log: [...this.state.log, prompt, reply],
        });
        setTimeout(()=>{
          this.generatePrompt();
        },100)
      })
      .catch((error) => {
        console.log("error log:", error);
      });
    this.setState({
      placeholder: `Generating Adventure. Please wait...`,
      response: "",
    });
  };

  render() {
    return (
      <div>
        <Container>
          <div className='game-log'>
            <Log log={this.state.log} />
          </div>
          <div className='buttons'>
            <Button variant='primary' size='lg' onClick={this.buttonOneClick}>
              {this.state.option1}
            </Button>
            <br></br>
            <br />
            <Button variant='primary' size='lg' onClick={this.buttonTwoClick}>
              {this.state.option2}
            </Button>
            <br></br>
            <br />
            <Button variant='primary' size='lg' onClick={this.buttonThreeClick}>
              {this.state.option3}
            </Button>
          </div>
          <br></br>
          <br />

          <br />
          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }
}
