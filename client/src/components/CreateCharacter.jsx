import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import CharacterForm1 from "./CharacterForm1";
import CharacterForm2 from "./CharacterForm2";
import Axios from "axios";
import {
  TITLE,
  NAME,
  DECOR,
  CLASS,
  ABILITY,
  WEAKNESS,
} from "../data/character";

const { Configuration, OpenAIApi } = require("openai");

export default class CreateCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      heading: "Backstory",
      generateRandomCharacter: false,
      newCharacter: {
        name: "",
        class: "",
        ability: "",
        weakness: "",
        backstory: "",
        tone: "dark"
      },
      character: "",
      log: [],
      prompt: "",
      placeholder: {
        name: "Gandalf",
        class: "Wizard",
        ability: "Speaking in riddles",
        weakness: "Hobbits",
        backstory:
          'Gandalf was born in the year 2953 of the Third Age. He was originally a Maia of the race of the Valar, and his name was Olorin. He was one of the Maiar who remained in Middle-earth after the Valar departed. He became a friend of the Elves of Middle-earth and often visited them. He was known by various names, including Mithrandir, meaning "Gray Pilgrim", and tharkûn, meaning "staff-man". In the year 2063 of the Third Age, he took the form of an old man and went to live among the Dwarves of the Blue Mountains. He remained with them for many years, and became known as Gandalf the Grey.\nIn the year 2941 of the Third Age, Gandalf returned to Middle-earth. He gathered the Dwarves of the Lonely Mountain and helped them reclaim their homeland from the dragon Smaug. He also played a key role in the War of the Ring, which culminated in the destruction of the One Ring and the defeat of Sauron. After the war, Gandalf was instrumental in the establishment of the Shire as a safe haven for the Hobbits. He also helped to restore the kingdom of Gondor.',
      },
    };

    // this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }
  componentDidMount() {
    if (this.props.randomCharacter) {
      const character = {
        name:
          TITLE[Math.floor(Math.random() * TITLE.length)] +
          NAME[Math.floor(Math.random() * NAME.length)] +
          DECOR[Math.floor(Math.random() * DECOR.length)],
        class: CLASS[Math.floor(Math.random() * CLASS.length)],
        ability: ABILITY[Math.floor(Math.random() * ABILITY.length)],
        weakness: WEAKNESS[Math.floor(Math.random() * WEAKNESS.length)],
        backstory: 'Please chose a tone and click "Generate Backstory" above.',
      };
      this.setState({
        placeholder: character,
        newCharacter: character,
        generateRandomCharacter: this.props.randomCharacter,
      });
    }
  }
  handleChange = (event) => {
    

    const attributeToChange = event.target.name; // this will give the name of the field that is changing
    const newValue = event.target.value; //this will give the value of the field that is changing

    const character = { ...this.state.newCharacter };
    character[attributeToChange] = newValue;
    // console.log("onchange", character);
    this.setState({
      newCharacter: character,
      generateRandomCharacter: false,
    });
  };

  addCharacter = (character) => {
    Axios.post("character/add", character, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("Character added successfully.", response);
        // this.loadCharacterList();
      })
      .catch((error) => {
        console.log("Error adding character.", error);
      });
  };

  appendResponse = (response) => {};

  generateBackstory = (e) => {
    // console.log("CREATING BACKSTORY");
    e.preventDefault();

    console.log(this.state)

    // const formData = new FormData(e.target.parentNode),
    //   formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);
    const formDataObj = this.state.newCharacter;

    this.setState({
      placeholder: {
        backstory: `Generating a ${this.state.newCharacter.tone.toLowerCase()} backstory for ${
          formDataObj.name
        }. Please wait...`,
      },
    });

    let AIprompt = `${formDataObj.name} is a ${formDataObj.class} who has the power of ${formDataObj.ability} and a weakness to ${formDataObj.weakness}. Write a detailed and ${formDataObj.tone} back story about ${formDataObj.name} in 100 words.\n`;
    this.setState({ prompt: AIprompt });
    ////Open Ai Goes here

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion("text-davinci-002", {
        prompt: AIprompt,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        let backstory = response.data.choices[0].text;
        if (backstory[0] === "\n") {
          backstory = backstory.slice(1, backstory.length);
        }
        const character = {...this.state.newCharacter}
        character.backstory = backstory;
        this.setState({
          heading: `Backstory for: ${formDataObj.name}`,
          placeholder: { backstory: `${backstory}` },
          newCharacter: character,
          log: [...this.state.log, AIprompt, response.data.choices[0].text],
        });
      })
      .catch((error) => {
        console.log("error log:", error);
      });

    //Use a timeout/clock here to randomly change state.response to keep things interesting while the AI thinks?
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData(e.target),
    //   formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);
    // console.log(this.state.newCharacter);

    // this.addCharacter(formDataObj);
    console.log('Adding character...', this.state.newCharacter);
    this.addCharacter(this.state.newCharacter)
  };

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep < 2 ? currentStep + 1 : currentStep;
    this.setState({
      currentStep: currentStep
    })
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep > 1 ? currentStep - 1 : currentStep;
    this.setState({
      currentStep: currentStep
    })
  }

  get previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      )
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if(currentStep < 2) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      )
    }
    return null;
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <Container>
          <h1>Create a Character</h1>

          <Form onSubmit={this.onFormSubmit}>
            <CharacterForm1 
              currentStep={this.state.currentStep} 
              placeholder={this.state.placeholder}
              generateRandomCharacter={this.state.generateRandomCharacter}
              newCharacter={this.state.newCharacter}
              handleChange={this.handleChange}
            />

            <CharacterForm2
              currentStep={this.state.currentStep}
              placeholder={this.state.placeholder}
              generateRandomCharacter={this.state.generateRandomCharacter}
              newCharacter={this.state.newCharacter}
              handleChange={this.handleChange}
              log={this.state.log}
              generateBackstory={this.generateBackstory}
            />

            {this.previousButton}
            {this.nextButton}

          </Form>
        </Container>
      </>
    );
  }
}
