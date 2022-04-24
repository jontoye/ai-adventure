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
      newAdventure: {},
      characters: [],
      stories: [],
      log: [],
      prompt: "",
      option1: "",
      option2: "",
      option3: "",
    };
  }

  componentDidMount() {
    this.loadCharacterList();
    this.loadStoryList();
    this.populateLog();
    console.log("adventure props test", this.props.log);
  }
  populateLog = () => {
    this.setState({
      log: this.props.log,
    });
  };

  populateOptions = (option) => {
    if (
      option[0] === 1 ||
      option[1] === 1 ||
      option[2] === 1 ||
      option[3] === 1
    ) {
      this.setState({ option1: option });
    } else if (
      option[0] === 2 ||
      option[1] === 2 ||
      option[2] === 2 ||
      option[3] === 2
    ) {
      this.setState({ option2: option });
    } else if (
      option[0] === 3 ||
      option[1] === 3 ||
      option[2] === 3 ||
      option[3] === 3
    ) {
      this.setState({ option3: option });
    }
  };

  optionSelect = (option) => {
    if (option === 1) {
      this.setState({ log: [...this.state.log, this.state.option1] });
    } else if (option === 2) {
      this.setState({ log: [...this.state.log, this.state.option2] });
    } else if (option === 3) {
      this.setState({ log: [...this.state.log, this.state.option3] });
    }
  };

  buttonOneClick = () => {
    this.optionSelect(1);
  };
  buttonTwoClick = () => {
    this.optionSelect(2);
  };
  buttonThreeClick = () => {
    this.optionSelect(3);
  };

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

  loadStoryList = () => {
    // console.log("getting characters...");
    Axios.get("/home")
      .then((response) => {
        // console.log(response.data.characters);
        this.setState({
          stories: response.data.characters,
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

  appendResponse = (response) => {};

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);

    let intro = `${formDataObj.characterStory}`;
    let prompt = `Begin a ${formDataObj.genre} story to ${formDataObj.quest} in a ${formDataObj.setting} setting.`;
    let AIprompt = intro + "\n" + prompt + "\n";
    // let newPrompt = ''
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
        formDataObj.log = [AIprompt, response.data.choices[0].text];
        this.setState({
          newAdventure: formDataObj,
          placeholder: `Adventure successfully created. Enjoy!`,
          response: `${intro}`,
          log: [...this.state.log, intro, prompt],
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
    // const characters = this.state.characters.map((c) => {
    //   return (
    //     <option value={c.backstory}>
    //       {c.name} ({c.class})
    //     </option>
    //   );
    // });

    return (
      <div>
        <Container>
          <div className='game-log'>
            <Log log={this.state.log} />
          </div>
          <Button variant='primary' size='lg' onClick={this.buttonOneClick}>
            Button One - Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Est inventore debitis, repellat quis voluptates accusantium
            molestiae, rem veniam suscipit quia esse, dicta molestias voluptate
            sit! Commodi voluptatibus corporis voluptates optio!
          </Button>
          <br></br>
          <br />
          <Button variant='primary' size='lg' onClick={this.buttonTwoClick}>
            Button Two - Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Est inventore debitis, repellat quis voluptates accusantium
            molestiae, rem veniam suscipit quia esse, dicta molestias voluptate
            sit! Commodi voluptatibus corporis voluptates optio!
          </Button>
          <br></br>
          <br />
          <Button variant='primary' size='lg' onClick={this.buttonThreeClick}>
            Button Three - Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Est inventore debitis, repellat quis voluptates accusantium
            molestiae, rem veniam suscipit quia esse, dicta molestias voluptate
            sit! Commodi voluptatibus corporis voluptates optio!
          </Button>
          <br></br>
          <br />
          {/* <Form onSubmit={this.onFormSubmit}>
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

            <Form.Text>{this.state.placeholder}</Form.Text>
          </Form> */}
          <br />
          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }
}
