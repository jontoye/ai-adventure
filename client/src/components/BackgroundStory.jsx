import React, { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
const { Configuration, OpenAIApi } = require("openai");

export default class BackgroundStory extends Component {
  constructor() {
    super();
    this.state = {
      heading: "The Response from the AI will be Shown here",
      response: "Waiting for user entry",
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.backstory_character);

    ////Open Ai Goes here

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion("text-davinci-002", {
        prompt: `Write a detailed, smart, informative and professional back story about ${formDataObj.backstory_character}\n`,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        this.setState({
          heading: `Back story for: ${formDataObj.backstory_character}`,
          response: `${response.data.choices[0].text}`,
        });
      })
      .catch((error) => {
        console.log("error log:", error);
      });

    this.setState({
      heading: `Back story for  : ${formDataObj.backstory_character}`,
      response: `Waiting for AI to think`,
    });
  };
  render() {
    return (
      <div>
        <Container>
          <h1>Create a backstory</h1>
          <h4>
            Generate a backstory for any character, simply enter the a name and
            details and open ai will do the rest.
          </h4>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Who should we create a back story for?</Form.Label>
              <Form.Control
                text='text'
                name='backstory_character'
                placeholder='Character Name + Description'
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
              <Card.Title>
                <h1>{this.state.heading}</h1>
              </Card.Title>
              <hr />
              <Card.Text>{this.state.response}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
