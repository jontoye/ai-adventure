import React, { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Axios from "axios";
import Entry from "./Entry";
import Log from "./Log";

const { Configuration, OpenAIApi } = require("openai");

export default class CreateCharacter extends Component {
  constructor() {
    super();
    this.state = {
      heading: "Backstory",
      placeholder:
        'Gandalf was born in the year 2953 of the Third Age. He was originally a Maia of the race of the Valar, and his name was Olorin. He was one of the Maiar who remained in Middle-earth after the Valar departed. He became a friend of the Elves of Middle-earth and often visited them. He was known by various names, including Mithrandir, meaning "Gray Pilgrim", and tharkûn, meaning "staff-man". In the year 2063 of the Third Age, he took the form of an old man and went to live among the Dwarves of the Blue Mountains. He remained with them for many years, and became known as Gandalf the Grey.\nIn the year 2941 of the Third Age, Gandalf returned to Middle-earth. He gathered the Dwarves of the Lonely Mountain and helped them reclaim their homeland from the dragon Smaug. He also played a key role in the War of the Ring, which culminated in the destruction of the One Ring and the defeat of Sauron. After the war, Gandalf was instrumental in the establishment of the Shire as a safe haven for the Hobbits. He also helped to restore the kingdom of Gondor.',
      newCharacter: {},
      character: "",
      log: [],
      prompt: "",
    };
  }

  //   loadCharacterList = (user) => {
  //     console.log(user);
  //     //check if user has aritcles
  //     if (user.character) {
  //       const characters = user.character.map((character, key) => (
  //         <td key={key}>{character.title}</td>
  //       ));
  //       return characters;
  //     }
  //   };

  handleChange = (event) => {
    const attributeToChange = event.target.name; // this will give the name of the field that is changing
    const newValue = event.target.value; //this will give the value of the field that is changing

    const character = { ...this.state.newCharacter };
    character[attributeToChange] = newValue;
    // console.log("onchange", character);
    this.setState({
      newCharacter: character,
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
    console.log("CREATING BACKSTORY");
    e.preventDefault();

    const formData = new FormData(e.target.parentNode),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    let AIprompt = `${formDataObj.name} is a ${formDataObj.class} who has the power of ${formDataObj.ability} and a weakness to ${formDataObj.weakness}. Write a detailed and ${formDataObj.tone} back story about ${formDataObj.name} in 100 words.\n`;
    this.setState({prompt:AIprompt})
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
          response: `${backstory}`,
          log: [...this.state.log, AIprompt, response.data.choices[0].text],
        });
      })
      .catch((error) => {
        console.log("error log:", error);
      });
    this.setState({
      response: "",
      placeholder: `Generating a ${formDataObj.tone.toLowerCase()} backstory for ${
        formDataObj.name
      }. Please wait...`,
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
    const entries = this.state.log.map((entry, index) => {
      return (
        <Card.Text>
          <Entry text={entry} key={index} />
        </Card.Text>
      );
    });

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
                placeholder='Gandalf'
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
                placeholder='Wizard'
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Special ability</Form.Label>
              <Form.Control
                type='text'
                name='ability'
                placeholder='Speak in riddles'
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Weakness</Form.Label>
              <Form.Control
                type='text'
                name='weakness'
                placeholder='Hobbits'
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
                value={this.state.response}
                name='backstory'
                placeholder={this.state.placeholder}
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
          
          <Log log={this.state.log}/>
        </Container>
      </>
    );
  }
}
