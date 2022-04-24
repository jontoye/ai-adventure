import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Axios from "axios";
import Log from "./Log";
import { Navigate } from "react-router-dom";

const { Configuration, OpenAIApi } = require("openai");

export default class CreateAdventure extends Component {
  constructor() {
    super();
    this.startStory = this.startStory.bind(this);
    this.state = {
      placeholder: "Click to generate a new adventure!",
      response: "",
      newAdventure: {},
      characters: [],
      log: [],
      prompt: "",
      redirect: false,
    };
  }

  componentDidMount() {
    this.loadCharacterList();
  }

  loadCharacterList = () => {
    // console.log("getting characters...");
    Axios.get("character/index")
      .then((response) => {
        // console.log(response.data.characters);
        this.setState({
          characters: response.data.characters,
        });
      })
      .catch((err) => {
        console.log("Error fetching characters.");
        console.log(err);
      });
  };

  handleChange = (event) => {
    const attributeToChange = event.target.name; // this will give the name of the field that is changing
    const newValue = event.target.value; //this will give the value of the field that is changing

    const adventure = { ...this.state.newAdventure };
    adventure[attributeToChange] = newValue;
    // console.log("onchange", adventure);
    this.setState({
      newAdventure: adventure,
    });
  };

  addAdventure = (adventure) => {
    Axios.post("adventure/add", adventure, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("Adventure created successfully.", response);
        this.startStory();
        // this.loadCharacterList();
      })
      .catch((error) => {
        console.log("Error creating adventure.", error);
      });
  };

  startStory() {
    console.log("start-story triggered2");
    this.setState({
      redirect: true,
    });
  }
  appendResponse = (response) => {};

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);

    let intro = `${formDataObj.characterStory}`;
    let prompt = `Begin a ${formDataObj.genre} story to ${formDataObj.quest} in a ${formDataObj.setting} setting.`;
    let AIprompt = intro + "\n" + prompt + "\n";
    // console.log("prompt test", AIprompt);
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
        let intro = response.data.choices[0].text;
        if (intro[0] === "\n") {
          intro = intro.slice(1, intro.length);
        }
        let logs = [
          ...this.state.log,
          intro,
          prompt,
          response.data.choices[0].text,
        ];
        console.log("logs test", logs);
        formDataObj.log = [AIprompt, response.data.choices[0].text];
        this.props.startStory(logs);
        this.setState({
          newAdventure: formDataObj,
          placeholder: `Adventure successfully created. Enjoy!`,
          response: `${intro}`,
          log: [
            ...this.state.log,
            intro,
            prompt,
            response.data.choices[0].text,
          ],
        });
        this.addAdventure(formDataObj);
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
    const characters = this.state.characters.map((c) => {
      return (
        <option value={c.backstory}>
          {c.name} ({c.class})
        </option>
      );
    });

    return (
      <div>
        <Container>
          <h1>Begin an Adventure</h1>

          <h4 className='text-white'>Set up your adventure</h4>

          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Adventure name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Monty Python and the Holy Grail'
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Genre</Form.Label>
              <Form.Select name='genre' onChange={this.handleChange}>
                <option value='Action'>Action</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Historical Fiction'>Historical Fiction</option>
                <option value='Memoir'>Memoir</option>
                <option value='Mythic'>Mythic</option>
                <option value='Romance'>Romance</option>
                <option value='Science Fiction'>Science Fiction</option>
                <option value='Thriller'>Thriller</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Setting</Form.Label>
              <Form.Select name='setting' onChange={this.handleChange}>
                <option value='Alternate Universe'>Alternate Universe</option>
                <option value='Ancient Egypt'>Ancient Egypt</option>
                <option value='Classical Greece'>Classical Greece</option>
                <option value='Dystopia'>Dystopia</option>
                <option value='Future'>Future</option>
                <option value='Medieval'>Medieval</option>
                <option value='Modern'>Modern</option>
                <option value='Roman Empire'>Roman Empire</option>
                <option value='Prehistoric'>Prehistory</option>
                <option value='Steampunk'>Steampunk</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Length</Form.Label>
              <Form.Select name='length' onChange={this.handleChange}>
                <option value='very short'>Short Story</option>
                <option value='short'>Novelette</option>
                <option value='moderate'>Novella</option>
                <option value='long'>Novel</option>
                <option value='very long'>Epic</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>Character</Form.Label>
              <Form.Select name='characterStory' onChange={this.handleChange}>
                {characters}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label className='text-white'>
                What is your quest?
              </Form.Label>
              <Form.Control
                type='text'
                name='quest'
                placeholder='Find the Holy Grail'
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>

            <Button variant='primary' size='lg' type='submit'>
              Start Adventure
            </Button>
            <Form.Text>{this.state.placeholder}</Form.Text>
          </Form>
          <br />
          <br></br>
          <br></br>
          {this.state.redirect && (
            <Navigate to='/adventure' replace={true} log={this.state.log} />
          )}
          <Log log={this.state.log} />
        </Container>
      </div>
    );
  }
}


