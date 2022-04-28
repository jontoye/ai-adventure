import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import CharacterForm1 from "./CharacterForm1";
import CharacterForm2 from "./CharacterForm2";
import Axios from "axios";
import "./css/CreateCharacter.css";
import { Navigate } from "react-router-dom";

import { CHARACTER_DEFAULTS } from "../data/character";
import "./css/CreateCharacter.css";

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
        tone: "dark",
        user: "",
      },
      character: "",
      log: [],
      prompt: "",
      name: "",
      redirect: false,
      placeholder: {
        name: "Gandalf",
        class: "Wizard",
        ability: "Speaking in riddles",
        weakness: "Hobbits",
        tone: "dark",
        // backstory:
        //   'Gandalf was born in the year 2953 of the Third Age. He was originally a Maia of the race of the Valar, and his name was Olorin. He was one of the Maiar who remained in Middle-earth after the Valar departed. He became a friend of the Elves of Middle-earth and often visited them. He was known by various names, including Mithrandir, meaning "Gray Pilgrim", and tharkûn, meaning "staff-man". In the year 2063 of the Third Age, he took the form of an old man and went to live among the Dwarves of the Blue Mountains. He remained with them for many years, and became known as Gandalf the Grey.\nIn the year 2941 of the Third Age, Gandalf returned to Middle-earth. He gathered the Dwarves of the Lonely Mountain and helped them reclaim their homeland from the dragon Smaug. He also played a key role in the War of the Ring, which culminated in the destruction of the One Ring and the defeat of Sauron. After the war, Gandalf was instrumental in the establishment of the Shire as a safe haven for the Hobbits. He also helped to restore the kingdom of Gondor.',
        backstory: 'Please chose a tone and click "Generate Backstory" above.',
      },
    };

    // this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }
  componentDidMount() {
    this.setUser();

    if (this.props.randomCharacter) {
      this.createRandomCharacter();
    }
  }

  setUser() {
    this.setState({
      user: this.props.user._id,
    });
  }
  createRandomCharacter = () => {
    //randomly generate an impressive name!
    let name = "";
    if (Math.floor(Math.random() * 2) < 1) {
      //50% chance female or male (sorry we haven't got to non-binary yet!!)
      if (Math.floor(Math.random() * 2) < 1) {
        //50% chance of a pronoun/title
        name +=
          CHARACTER_DEFAULTS.title_f[
            Math.floor(Math.random() * CHARACTER_DEFAULTS.title_f.length)
          ] + " ";
      }
      name +=
        CHARACTER_DEFAULTS.name_f[
          Math.floor(Math.random() * CHARACTER_DEFAULTS.name_f.length)
        ];
    } else {
      //male names
      if (Math.floor(Math.random() * 2) < 1) {
        //50% chance of a pronoun/title
        name +=
          CHARACTER_DEFAULTS.title_m[
            Math.floor(Math.random() * CHARACTER_DEFAULTS.title_m.length)
          ] + " ";
      }
      name +=
        CHARACTER_DEFAULTS.name_m[
          Math.floor(Math.random() * CHARACTER_DEFAULTS.name_m.length)
        ];
    }
    if (Math.floor(Math.random() * 2) < 1) {
      //50% chance of a decorative post-title
      name +=
        " " +
        CHARACTER_DEFAULTS.decor[
          Math.floor(Math.random() * CHARACTER_DEFAULTS.decor.length)
        ];
    }
    //NOTE: currently ability & weakness COULD be the same thing
    const character = {
      name: name,
      class:
        CHARACTER_DEFAULTS.class[
          Math.floor(Math.random() * CHARACTER_DEFAULTS.class.length)
        ],
      ability:
        CHARACTER_DEFAULTS.trait[
          Math.floor(Math.random() * CHARACTER_DEFAULTS.trait.length)
        ],
      weakness:
        CHARACTER_DEFAULTS.trait[
          Math.floor(Math.random() * CHARACTER_DEFAULTS.trait.length)
        ],
      backstory: "", // default
      tone: "dark", // default
      user: this.state.user,
    };
    this.setState({
      placeholder: character,
      newCharacter: character,
      generateRandomCharacter: this.props.randomCharacter,
    });
  };

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
        console.log("character success", character);
        console.log("Character added successfully.", response);
        // this.loadCharacterList();
      })
      .catch((error) => {
        console.log("character attempt", character);
        console.log("Error adding character.", error);
      });
  };

  appendResponse = (response) => {};

  generateBackstory = (e) => {
    // console.log("CREATING BACKSTORY");
    e.preventDefault();
    // console.log(e.target.parent);
    // const formData = new FormData(e.target.parentNode),
    // formDataObj = Object.fromEntries(formData.entries());
    // console.log(this.state.newCharacter);
    const formDataObj = this.state.newCharacter;
    // console.log(formDataObj)
    let backstoryInfo = {
      backstory: `Generating a ${this.state.newCharacter.tone.toLowerCase()} backstory for ${
        formDataObj.name
      }. Please wait...`,
    };

    this.setState({
      placeholder: backstoryInfo,
      // newCharacter: {backstory: ""},
    });

    let AIprompt = `${formDataObj.name} is a ${
      formDataObj.class
    } who has the power of ${formDataObj.ability.toLowerCase()} and a weakness to ${formDataObj.weakness.toLowerCase()}. Write a detailed and ${formDataObj.tone.toLowerCase()} back story about ${
      formDataObj.name
    } in 100 words.\n`;
    this.setState({ prompt: AIprompt });
    ////Open Ai Goes here

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    openai
      .createCompletion(process.env.REACT_APP_API_ENGINE, {
        prompt: AIprompt,
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        let backstory = response.data.choices[0].text;
        if (backstory[0] === "\n") {
          backstory = backstory.slice(1, backstory.length);
        }
        const character = { ...this.state.newCharacter };
        character.backstory = backstory;
        character.user = this.state.user;
        this.setState({
          heading: `Backstory for: ${formDataObj.name}`,
          placeholder: {
            backstory:
              'Please chose a tone and click "Generate Backstory" above.',
          },
          newCharacter: character,
          log: [...this.state.log, AIprompt, response.data.choices[0].text],
          name: formDataObj.name,
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
    this.addCharacter(this.state.newCharacter);
    this.props.createAdventure(this.state.newCharacter);
    this.setState({
      redirect: true,
    });
  };

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep < 2 ? currentStep + 1 : currentStep;
    this.setState({
      currentStep: currentStep,
      placeholder: {
        backstory: 'Please chose a tone and click "Generate Backstory" above.',
      },
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep > 1 ? currentStep - 1 : currentStep;
    this.setState({
      currentStep: currentStep,
    });
  }

  get previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className='btn btn-secondary'
          type='button'
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <button
          className='btn btn-secondary'
          type='button'
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  get randomButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <button
          className='btn btn-dark'
          type='button'
          onClick={this.createRandomCharacter}
        >
          Randomize Character
        </button>
      );
    }
    return null;
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <Container>
          <h1>Create a Character</h1>

          <Form onSubmit={this.onFormSubmit} className='form-container'>
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
              isBackstory={this.state.newCharacter.backstory.length > 0}
            />
            {this.previousButton}
            {this.nextButton}
            &nbsp; &nbsp;
            {this.randomButton}
          </Form>
        </Container>
        {this.state.redirect && (
          <Navigate
            to='/create-adventure'
            replace={true}
            character={this.state.newCharacter}
          />
        )}
      </>
    );
  }
}
