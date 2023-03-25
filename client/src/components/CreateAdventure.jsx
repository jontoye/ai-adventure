import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import "./css/CreateAdventure.css";

const { Configuration, OpenAIApi } = require("openai");

export default class CreateAdventure extends Component {
  constructor() {
    super();
    this.setRedirect = this.setRedirect.bind(this);
    this.state = {
      placeholder: "Click to generate a new adventure!",
      response: "",
      newAdventure: {},
      characters: [],
      character: {},
      log: [],
      name: "",
      prompt: "",
      redirect: false,
      event: null,
    };
    // console.log(this.props)
  }

  async componentDidMount() {
    // this.log("test", this.props.achivement);
    this.setState({ name: this.props.character.name });

    const loadCharacterList = () => {
      // console.log("getting characters...");
      Axios.get("character/index", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          // console.log(response.data.characters);
          let characterFiltered = response.data.characters.filter((c) => {
            return c.user === this.props.user.id && c.user !== "unknown";
          });
          this.setState({
            characters: characterFiltered.reverse(),
          });
        })
        .catch((err) => {
          console.log("Error fetching characters.");
          console.log(err);
          this.props.setMessage(err.message, "danger");
        });
    };
    await loadCharacterList();
    this.achieveHandle(this.props.achievement);
  }

  log(e) {
    console.log("this props achievement", this.props.achievement);
  }

  // loadCharacterList = () => {
  //   // console.log("getting characters...");
  //   Axios.get("character/index", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   })
  //     .then((response) => {
  //       // console.log(response.data.characters);

  //       let characterFiltered = response.data.characters.filter((c) => {
  //         return c.user ? c.user === this.props.user.id : false;
  //       });
  //       this.setState({
  //         characters: characterFiltered.reverse(),
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching characters.");
  //       console.log(err);
  //       this.props.setMessage(err.message, "danger");
  //     });
  // };

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

  addAdventure = async (adventure, character) => {
    // console.log("new adventure:", adventure, character);
    Axios.post("adventure/add", adventure, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          console.log("Error adding adventure.", response.data.error);
          this.props.setMessage(
            response.data.error._message +
              ". Please confirm you have correctly filled out all the fields in the adventure creation form.\nIf the issue persists please contact the developers and quote: Adventure/" +
              response.data.error.name,
            "danger"
          );
        } else {
          // console.log("Adventure created successfully.", response);
          response.data.adventure.events = [this.state.event];
          this.setState({
            newAdventure: response.data.adventure,
            character: character,
          });
          setTimeout(() => {
            this.props.startStory(
              this.state.newAdventure,
              this.state.character
            );
            this.setRedirect();
          }, 250);
          // this.loadCharacterList();
        }
      })
      .catch((error) => {
        console.log("Error creating adventure.", error.message);
        // console.log(error);
        this.props.setMessage(error.message, "danger");
      });
  };

  setRedirect() {
    // console.log("start-story triggered2");
    setTimeout(() => {
      // console.log(this.state.newAdventure);
      this.setState({
        redirect: true,
      });
    }, 200);
  }

  imageSelect() {
    let fixed = this.state.adventure.setting.replace(" ", "");
    let path = `images/setting/${fixed}.png`;
    this.setState({
      image: path,
    });
  }

  achieveHandle(e) {
    // console.log("achieve handle check", e);
    if (e === true) {
      // console.log("achievement detected");
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    // console.log(formDataObj);
    let character = this.state.characters.find((v) => {
      return formDataObj.character === v.name;
    });
    // console.log("character: " + character.name);
    // console.log("story: " + character.backstory);

    let intro = `${character.backstory}`;
    let prompt = `Begin a ${formDataObj.genre} story to ${formDataObj.quest} in a ${formDataObj.setting} setting. Create a detailed, interesting, entertaining, introduction in 150 words about ${character.name} the ${character.class} starting the quest`;
    let AIprompt = intro + "\n\n" + prompt + "\n";
    // console.log("intro", intro);
    // console.log("prompt", prompt);
    // console.log("aiPrompt", AIprompt);
    // console.log("prompt test", AIprompt);
    ////Open Ai Goes here

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion(process.env.REACT_APP_API_ENGINE, {
        prompt: AIprompt,
        temperature: 0.75,
        max_tokens: 1000,
        top_p: 1,
        // stream: true,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        let story = response.data.choices[0].text;
        // console.log("after response intro test", intro);
        if (story[0] === "\n") {
          story = story.slice(1, story.length);
        }
        //the important one
        let logs = [character.backstory, prompt, story];
        // console.log("formDataObj", formDataObj);
        // console.log("logs test", logs);
        formDataObj.log = logs;
        formDataObj.character = character;

        let fixed = formDataObj.setting.replace(" ", "").toLowerCase();
        let path = `images/setting/${fixed}.png`;
        formDataObj.image = path;

        let event = {
          previousLog: [intro],
          storyPrompt: prompt,
          story: story,
          optionPrompt: "",
          options: [],
          optionChosen: null,
          fullLog: logs,
          displayedLog: [character.backstory, story],
        };
        this.props.createAchievement(2);

        this.createEvent(event);
        setTimeout(() => {
          if (this.state.event) {
            formDataObj.events = [this.state.event];
          }
          formDataObj.user = this.props.user.id;

          this.addAdventure(formDataObj, character);
          this.setState({
            placeholder: `Adventure successfully created. Enjoy!`,
            response: `${story}`,
            log: logs,
          });
        }, 100);
      })
      .catch((error) => {
        console.log("error log:", error);
        this.props.setMessage(
          error.message +
            ". If the issue persists, please contact the developers.",
          "danger"
        );
      });
    this.setState({
      placeholder: `Generating Adventure. Please wait...`,
      response: "",
    });
  };

  createEvent = (event) => {
    Axios.post("event/add", event, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          console.log("Error adding event.", response.data.error);
          this.props.setMessage(
            response.data.error._message +
              ". Please confirm you have correctly filled out all the fields in the adventure creation form.\nIf the issue persists please contact the developers and quote: Event/" +
              response.data.error.name,
            "danger"
          );
        } else {
          // console.log("Event created successfully.", response);
          this.setState({
            event: response.data.event,
          });
        }
      })
      .catch((error) => {
        console.log("Error creating event.", error);
        this.props.setMessage(error.message, "danger");
      });
  };

  render() {
    const characters = this.state.characters.map((c) => {
      if (c.name === this.state.name) {
        return (
          <option
            value={c.name}
            defaultValue={c.name}
            className={c.name}
            key={c._id}
            index={c._id}
          >
            {c.name} ({c.class})
          </option>
        );
      } else {
        return (
          <option value={c.name} className={c.name} key={c._id} index={c._id}>
            {c.name} ({c.class})
          </option>
        );
      }
    });
    // console.log(this.props)

    return characters ? (
      <div>
        <Container className='container-fluid my-5'>
          <h1>Begin an Adventure</h1>

          <Form onSubmit={this.onFormSubmit} className='form-container'>
            <h4 className='text-white'>Set up your adventure</h4>
            <div className='mb-3 form__group field'>
              <label className='form__label'>Adventure name</label>
              <input
                type='text'
                name='name'
                className='form__field'
                placeholder='Monty Python and the Holy Grail'
                maxLength='40'
                onChange={this.handleChange}
              ></input>
            </div>
            <div className='mb-3 form__group field'>
              <label className='form__label'>Genre</label>
              <Form.Select
                name='genre'
                onChange={this.handleChange}
                className='form__field'
              >
                <option value='Action'>Action</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Historical Fiction'>Historical Fiction</option>
                <option value='Memoir'>Memoir</option>
                <option value='Mythic'>Mythic</option>
                <option value='Romance'>Romance</option>
                <option value='Science Fiction'>Science Fiction</option>
                <option value='Thriller'>Thriller</option>
              </Form.Select>
            </div>
            <div className='mb-3 form__group field'>
              <label className='form__label'>Setting</label>
              <Form.Select
                name='setting'
                onChange={this.handleChange}
                className='form__field'
              >
                <option value='Alternate Universe'>Alternate Universe</option>
                <option value='Ancient Egypt'>Ancient Egypt</option>
                <option value='Classical Greece'>Classical Greece</option>
                <option value='Dystopian'>Dystopian</option>
                <option value='Futuristic'>Futuristic</option>
                <option value='Medieval'>Medieval</option>
                <option value='Modern'>Modern</option>
                <option value='Roman Empire'>Roman Empire</option>
                <option value='Prehistoric'>Prehistory</option>
                <option value='Steampunk'>Steampunk</option>
              </Form.Select>
            </div>
            <div className='mb-3 form__group field'>
              <label className='form__label'>Length</label>
              <Form.Select
                name='length'
                onChange={this.handleChange}
                className='form__field'
              >
                <option value='short story'>Short Story</option>
                <option value='novelette'>Novelette</option>
                <option value='novella'>Novella</option>
                <option value='novel'>Novel</option>
                <option value='epic'>Epic</option>
              </Form.Select>
            </div>
            <div className='mb-3 form__group field'>
              <label className='form__label'>Character</label>
              <Form.Select
                name='character'
                onChange={this.handleChange}
                className='form__field'
              >
                {characters}
              </Form.Select>
            </div>
            <div className='mb-3 form__group field'>
              <label className='form__label'>What is your quest?</label>
              <input
                type='text'
                name='quest'
                className='form__field'
                placeholder='Find the Holy Grail'
                onChange={this.handleChange}
              ></input>
            </div>

            {this.state.newAdventure.quest && this.state.newAdventure.name ? (
              <>
                <Button variant='primary' size='lg' type='submit'>
                  Start Adventure
                </Button>
                <Form.Text>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.placeholder}
                </Form.Text>
              </>
            ) : (
              <p className='text-white'>
                <small>
                  You must provide an adventure{" "}
                  <span className='text-info'>name</span> and{" "}
                  <span className='text-info'>quest</span> to begin your
                  story...
                </small>
              </p>
            )}
          </Form>
          <br />
          <br></br>
          <br></br>
          {this.state.redirect && (
            <Navigate
              to='/adventure'
              replace={true}
              adventure={this.state.newAdventure}
              character={this.state.character}
              achievementCheck={this.props.achievementCheck}
              setMessage={this.props.setMessage}
            />
          )}
        </Container>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
