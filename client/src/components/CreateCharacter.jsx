import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Axios from "axios";
import Log from "./Log";
import {CHARACTER_DEFAULTS} from "../data/character";

const { Configuration, OpenAIApi } = require("openai");

export default class CreateCharacter extends Component {
  constructor() {
    super();
    this.state = {
      heading: "Backstory",
      generateRandomCharacter: false,
      newCharacter: {},
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
  }
  componentDidMount() {
    if (this.props.randomCharacter) {
      //randomly generate an impressive name!
      let name = "";
      if (Math.floor(Math.random() * 2)<1) { //50% chance female or male (sorry we haven't got to non-binary yet!!)
        if (Math.floor(Math.random() * 2)<1) { //50% chance of a pronoun/title
          name+=CHARACTER_DEFAULTS.title_f[Math.floor(Math.random() * CHARACTER_DEFAULTS.title_f.length)]+" ";
        }
        name+=CHARACTER_DEFAULTS.name_f[Math.floor(Math.random() * CHARACTER_DEFAULTS.name_f.length)];
      } else {
        //male names
        if (Math.floor(Math.random() * 2)<1) { //50% chance of a pronoun/title
          name+=CHARACTER_DEFAULTS.title_m[Math.floor(Math.random() * CHARACTER_DEFAULTS.title_m.length)]+" ";
        }
        name+=CHARACTER_DEFAULTS.name_m[Math.floor(Math.random() * CHARACTER_DEFAULTS.name_m.length)];
      }
      if (Math.floor(Math.random() * 2)<1) { //50% chance of a decorative post-title
        name+=" "+CHARACTER_DEFAULTS.decor[Math.floor(Math.random() * CHARACTER_DEFAULTS.decor.length)];
      }
      //NOTE: currently ability & weakness COULD be the same thing
      const character = {
        name: name,
        class: CHARACTER_DEFAULTS.class[Math.floor(Math.random() * CHARACTER_DEFAULTS.class.length)],
        ability: CHARACTER_DEFAULTS.trait[Math.floor(Math.random() * CHARACTER_DEFAULTS.trait.length)],
        weakness: CHARACTER_DEFAULTS.trait[Math.floor(Math.random() * CHARACTER_DEFAULTS.trait.length)],
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

    const formData = new FormData(e.target.parentNode),
      formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);

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
        this.setState({
          heading: `Backstory for: ${formDataObj.name}`,
          placeholder: { backstory: `${backstory}` },
          newCharacter: { backstory: `${backstory}` },
          log: [...this.state.log, AIprompt, response.data.choices[0].text],
        });
      })
      .catch((error) => {
        console.log("error log:", error);
      });
    this.setState({
      placeholder: {
        backstory: `Generating a ${formDataObj.tone.toLowerCase()} backstory for ${
          formDataObj.name
        }. Please wait...`,
      },
    });
    //Use a timeout/clock here to randomly change state.response to keep things interesting while the AI thinks?
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);
    // console.log(this.state.newCharacter);

    this.addCharacter(formDataObj);
  };

  render() {
    // console.log(this.props)
    return (
      <>
        <Container>
          <h1>Create a Character</h1>

          <h4 className='text-white'>Define your character</h4>

          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Character name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder={this.state.placeholder.name}
                value={
                  this.state.generateRandomCharacter
                    ? this.state.placeholder.name
                    : this.state.newCharacter.name
                }
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>
                Class/role/occupation
              </Form.Label>
              <Form.Control
                type='text'
                name='class'
                placeholder={this.state.placeholder.class}
                value={
                  this.state.generateRandomCharacter
                    ? this.state.placeholder.class
                    : this.state.newCharacter.class
                }
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Special ability</Form.Label>
              <Form.Control
                type='text'
                name='ability'
                placeholder={this.state.placeholder.ability}
                value={
                  this.state.generateRandomCharacter
                    ? this.state.placeholder.ability
                    : this.state.newCharacter.ability
                }
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Weakness</Form.Label>
              <Form.Control
                type='text'
                name='weakness'
                placeholder={this.state.placeholder.weakness}
                value={
                  this.state.generateRandomCharacter
                    ? this.state.placeholder.weakness
                    : this.state.newCharacter.weakness
                }
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <h4 className='text-white'>
              Write a short backstory, or let OpenAI do the work for you!
            </h4>
            <p className='text-white'>
              Tip: you can edit the AI-generated story directly in the textbox
              below (not working yet).
            </p>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Tone</Form.Label>
              <Form.Select name='tone' onChange={this.handleChange}>
                <option value='Dark'>Dark</option>
                <option value='Dry'>Dry</option>
                <option value='Grandiose'>Grandiose</option>
                <option value='Happy'>Happy</option>
                <option value='Humorous'>Humorous</option>
                <option value='Lighthearted'>Lighthearted</option>
                <option value='Lofty'>Lofty</option>
                <option value='Realistic'>Realistic</option>
                <option value='Sad'>Sad</option>
                <option value='Sarcastic'>Sarcastic</option>
                <option value='Serious'>Serious</option>
                <option value='Tragic'>Tragic</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant='primary'
              size='lg'
              type='button'
              onClick={this.generateBackstory}
            >
              Generate Backstory
            </Button>
            <br></br>
            <br></br>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Backstory</Form.Label>
              <Form.Control
                as='textarea'
                name='backstory'
                placeholder={this.state.placeholder.backstory}
                value={
                  this.state.generateRandomCharacter
                    ? this.state.placeholder.backstory
                    : this.state.newCharacter.backstory
                }
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Button variant='primary' size='lg' type='submit'>
              Create Character
            </Button>
          </Form>
          <br />
          <br></br>
          <br></br>

          <Log log={this.state.log} />
        </Container>
      </>
    );
  }
}
