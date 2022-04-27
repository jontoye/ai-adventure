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
      previousLog: [],
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
    console.log('adventure loaded: ',this.props.adventure)
    console.log('character loaded: ',this.props.character)
    this.setState({
      event: this.props.adventure.events.reverse()[0],
      adventure: this.props.adventure,
      character: this.props.character,
      name: this.props.adventure.name,
    });
    //async!
    setTimeout(()=>{
      console.log('event loaded: ',this.state.event)

      this.setState({
        log:this.state.event.displayedLog,
        previousLog: this.state.event.fullLog,
      })
      if (this.state.event.options.length < 1) {
        this.generateOptions();
      } else {
        this.loadOptions();
      }
    },100)

  }


  buttonOneClick = () => {
    this.chooseOption(this.state.option1, 1);
  };
  buttonTwoClick = () => {
    this.chooseOption(this.state.option2, 2);
  };
  buttonThreeClick = () => {
    this.chooseOption(this.state.option3, 3);
  };

  generateOptions = () => {
    console.log('PROMPT');
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let previousLog = this.state.previousLog.join("");
    let prompt = `Give ${this.state.character.name} 3 detailed options for what to do next.`;
    let AIprompt = previousLog + '\n' + prompt;
      
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
        // console.log(choices)
        if (choices.split(" ")[0] === "Option") {
          choices = choices.slice(7, choices.length);
        }
        // console.log(choices)
        let split_choices = choices.split(/\s?\d+\.\s/);
        let rejoined_choices = '1. ' + split_choices[1]+'\n2. ' + split_choices[2]+'\n3. ' +split_choices[3];

        this.setState({
          log: [...this.state.log, rejoined_choices],
          previousLog: [...this.state.log, prompt, rejoined_choices],
          option1: split_choices[1],
          option2: split_choices[2],
          option3: split_choices[3],
          event: {
            ...this.state.event,
            optionPrompt: prompt,
            options: [split_choices[1],split_choices[2],split_choices[3]],
            fullLog: [...this.state.event.fullLog, prompt, rejoined_choices],
            displayedLog: [...this.state.event.displayedLog, rejoined_choices],
          }
        });

        setTimeout(()=>{
          this.saveEvent();
        },100)

      })
      .catch((error) => {
        console.log("error log:", error);
      });
    this.setState({
      placeholder: `Generating Choice. Please wait...`,
      response: "",
    });
  };

  loadOptions = ()=> {
    console.log('loading options...')
    this.setState({
      option1: this.state.event.options[0],
      option2: this.state.event.options[1],
      option3: this.state.event.options[2],
    })
  }

  saveEvent = () => {
    Axios.put("event/update", this.state.event, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log("Event saved successfully.", response);
    })
    .catch((error) => {
      console.log("Error creating event.", error);
    });
  }

  createEvent = (event) => {
    Axios.post("event/add", event, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log("Event created successfully.", response);
      this.setState({
        event: response.data.event,
        adventure: {
          ...this.state.adventure,
          events: [...this.state.adventure.events, response.data.event],
        }
      })
      setTimeout(()=>{
        this.updateAdventureData();
      },100)
    })
    .catch((error) => {
      console.log("Error saving event.", error);
    });
  }

  updateAdventureData = ()=>{
    Axios.put("adventure/update", this.state.adventure, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log("Adventure updated successfully.", response.data);
    })
    .catch((error) => {
      console.log("Error updating adventure.", error);
    });
  }

  chooseOption = (option, x) => {
    console.log('OPTION');
    //UPDATE & SAVE EXISTING EVENT
    this.setState({
      event: {
        ...this.state.event,
        selectedOption: x,
      }
    })
    setTimeout(()=>{
      this.saveEvent();
      //INITIALIZE A NEW EVENT
      setTimeout(()=>{
        console.log('NEW EVENT')
        this.setState({
          event: {},
        })

        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        let previousLog = this.state.previousLog.join("");
        let action = `${this.state.character.name} chooses ${x}. ${option}.`;
        let prompt = `Give a long and detailed account of what happens next.`;
        let AIprompt = previousLog + '\n' + action + prompt;
          
        openai.createCompletion(process.env.REACT_APP_API_ENGINE, {
          prompt: AIprompt,
          temperature: 0.8,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 1,
        })
        .then((response) => {
          let reply = response.data.choices[0].text;
          while (reply[0] === "\n") {
            reply = reply.slice(1, reply.length);
          }
          // console.log(reply)
          //CREATE NEW EVENT
          let event = {
            storyPrompt: prompt,
            story: reply,
            optionPrompt: '',
            options: [],
            selectedOption: null,
            fullLog: [...this.state.log, action, prompt, reply],
            displayedLog: [...this.state.log, action, reply],
          }
          console.log(event)
          this.createEvent(event);
  
          this.setState({
            log: [...this.state.log, action, reply],
            previousLog: [...this.state.log, action, prompt, reply],
          });
          setTimeout(()=>{
            this.generateOptions();
          },100)
        })
        .catch((error) => {
          console.log("error log:", error);
        });
      },100)
    },100)

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
