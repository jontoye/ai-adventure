import React, { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Axios from "axios";
import Entry from "./Entry";

const { Configuration, OpenAIApi } = require("openai");

export default class BackgroundStory extends Component {
  constructor() {
    super();
    this.state = {
      heading: "The response from the AI will be shown below.",
      response: "Waiting for user entry.",
      newCharacter: {},
      character: "",
      log: [],
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

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.name);

    ////Open Ai Goes here

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion("text-davinci-002", {
        prompt: `Write a detailed, smart, informative and professional back story about ${formDataObj.name}\n`,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        this.addCharacter(this.state.newCharacter);
        this.setState({
          heading: `Backstory for: ${formDataObj.name}`,
          response: `${response.data.choices[0].text}`,
          log: [...this.state.log, response.data.choices[0].text],
        });
      })
      .catch((error) => {
        console.log("error log:", error);
      });
    this.setState({
      heading: `Backstory for: ${formDataObj.name}`,
      response: `Waiting for AI to think...`,
    });
    //Use a timeout/clock here to randomly change state.response to keep things interesting while the AI thinks?
  };
  render() {
    const entries = this.state.log.map((entry) => {
      return (
        <Card.Text>
          <Entry text={entry} />
        </Card.Text>
      );
    });

    return (
      <div>
        <Container>
          <h1>Create a Character</h1>
          <h4>
            To generate a backstory for any character, simply enter a name and
            description and OpenAI will do the rest.
          </h4>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Who should we create a back story for?</Form.Label>
              <Form.Control
                text='text'
                name='name'
                placeholder='Character Name + Description'
                onChange={this.handleChange}
              ></Form.Control>
              <Form.Text>
                Enter as much information as possible for a more detailed story.
              </Form.Text>
            </Form.Group>
            <Button variant='primary' size='lg' type='submit'>
              Generate Backstory
            </Button>
          </Form>
          <br />

          <Card>
            <Card.Body>
              <Card.Title>{this.state.heading}</Card.Title>
              <hr />
              <Card.Text>{this.state.response}</Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Log</Card.Title>
              <hr />
              {entries}
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
