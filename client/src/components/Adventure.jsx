import React, { Component } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Log from "./Log";
import "./css/Adventure.css";

import { OPTION_DEFAULTS } from "../data/options";
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
      promptText: "",
      option1: "Generating your first choice, hold on one second",
      option2: "Generating your second choice, hold on one second",
      option3: "Generating your third choice, hold on one second",
      event: {},
      disabled: "disabled",
      classText: "",
      currentKey: "",
      handleKeyPress: this.handleKeyPress.bind(this),
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    // document.addEventListener("keydown", this.handleKeyDown);
    let events = this.props.adventure.events;
    let rawImageURL = this.props.adventure.image;
    let hiResImageURL = rawImageURL.replace("setting/", "setting/hi_res/");

    // console.log("LOAD");
    // console.log("adventure loaded: ", this.props.adventure);
    // console.log("character loaded: ", this.props.character);
    this.setState({
      event: events.reverse()[0],
      adventure: this.props.adventure,
      character: this.props.character,
      name: this.props.adventure.name,
      background: "url(" + hiResImageURL + ")",
    });
    //async!
    setTimeout(() => {
      // console.log("event loaded: ", this.state.event);
      // console.log("background: ", this.state.background);

      this.setState({
        log: this.state.event.displayedLog,
        previousLog: this.state.event.fullLog,
        classText:
          this.state.character.class.charAt(0).toUpperCase() +
          this.state.character.class.slice(1),
      });
      if (this.state.event.options.length < 1) {
        // console.log("generate options skipped");
        this.generateOptions();
      } else {
        this.loadOptions();
      }
    }, 100);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      console.log("Enter key pressed");
    }
  }

  handleKeyPress = (event) => {
    console.log("key pressed");
    if (event.key === "1" && this.state.disabled !== "disabled") {
      console.log("1 key pressed");
      this.chooseOption(this.state.option1, 1);
    }
    if (event.key === "2" && this.state.disabled !== "disabled") {
      this.chooseOption(this.state.option2, 2);
    }
    if (event.key === "3" && this.state.disabled !== "disabled") {
      this.chooseOption(this.state.option3, 3);
    }
  };

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
    // console.log("PROMPT");
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let previousLog = this.state.event.fullLog
      ? this.state.event.fullLog.join("")
      : this.state.previousLog.join("");
    let prompt = `Give ${this.state.character.name} 3 new, relevant, detailed, options for what to do next in the choose your own adventure game, keeping in mind context from above to make sure it is relevant. Avoid giving the same option multiple times. \n`;
    let AIprompt_holder = previousLog + "\n" + prompt;
    let AIprompt = AIprompt_holder.split(" ")
      .reverse()
      .slice(0, 1100)
      .reverse()
      .join(" ");
    // console.log("prompty 2", AIprompt);
    openai
      .createCompletion(process.env.REACT_APP_API_ENGINE, {
        prompt: AIprompt,
        temperature: 0.8,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 1.5,
        presence_penalty: 0.0,
      })
      .then((response) => {
        // console.log("choices test", response);
        let choices = response.data.choices[0].text;
        if (choices[0] === "\n") {
          choices = choices.slice(1, choices.length);
          if (choices[0] === "\n") {
            choices = choices.slice(1, choices.length);
          }
        }
        // console.log(choices);
        if (
          choices.split(" ")[0] === "Option"
          // choices.split(" ")[0] === ":"
        ) {
          // console.log("Option x: format detected", choices);
          choices = choices.slice(7, choices.length);
        } else if (
          // choices.split(" ")[0] === "Option" ||
          choices.split(" ")[0] === ":"
        ) {
          console.log("empty: format detected, do something");
        }

        // console.log(choices)
        let splitLines = choices.split("\n").filter((str) => {
          return str !== "";
        });
        // console.log(splitLines);

        //add handling of : and Option 2: Option 3: if slice test[0] = ""
        let imavar = splitLines.map((str) => {
          let strIndex = str.search(/[a-z]/i);
          // console.log("slice test", str.slice(strIndex, str.length));
          return str.slice(strIndex, str.length);
        });
        //console.log(imavar);
        setTimeout(() => {
          // console.log(imavar)

          // let split_choices = choices.split(/\s?\d+\.\s?/);
          let split_choices = imavar;
          //console.log("prompt test", imavar);

          //check the option exists
          split_choices[0] = split_choices[0]
            ? split_choices[0]
            : OPTION_DEFAULTS[
                Math.floor(Math.random() * OPTION_DEFAULTS.length)
              ];
          split_choices[1] = split_choices[1]
            ? split_choices[1]
            : OPTION_DEFAULTS[
                Math.floor(Math.random() * OPTION_DEFAULTS.length)
              ];
          split_choices[2] = split_choices[2]
            ? split_choices[2]
            : OPTION_DEFAULTS[
                Math.floor(Math.random() * OPTION_DEFAULTS.length)
              ];

          //reduce the option down to one sentence
          // split_choices[0] = split_choices[0].split(".").reverse()[0]
          // split_choices[1] = split_choices[1].split(".").reverse()[0]
          // split_choices[2] = split_choices[2].split(".").reverse()[0]

          // //check the option is longer than 4 characters
          // split_choices[0] = split_choices[0].length < 5 ? split_choices[0] : OPTION_DEFAULTS[Math.floor(Math.random()*OPTION_DEFAULTS.length)];
          // split_choices[1] = split_choices[1].length < 5 ? split_choices[1] : OPTION_DEFAULTS[Math.floor(Math.random()*OPTION_DEFAULTS.length)];
          // split_choices[2] = split_choices[2].length < 5 ? split_choices[2] : OPTION_DEFAULTS[Math.floor(Math.random()*OPTION_DEFAULTS.length)];

          // let rejoined_choices =
          //   "1. " +
          //   split_choices[0] +
          //   "\n2. " +
          //   split_choices[1] +
          //   "\n3. " +
          //   split_choices[2];

          this.setState({
            log: [...this.state.log],

            previousLog: [...this.state.log, prompt],

            // log: [...this.state.log, rejoined_choices],
            // previousLog: [...this.state.log, prompt, rejoined_choices],

            option1: split_choices[0],
            option2: split_choices[1],
            option3: split_choices[2],
            event: {
              ...this.state.event,
              optionPrompt: prompt,
              options: [split_choices[0], split_choices[1], split_choices[2]],
              fullLog: [...this.state.event.fullLog, prompt],
              // fullLog: [...this.state.event.fullLog, prompt, rejoined_choices],

              displayedLog: [...this.state.event.displayedLog],
            },
            disabled: "",
          });

          setTimeout(() => {
            // window.scrollTo(0, document.body.scrollHeight);
            this.saveEvent();
          }, 100);
        }, 1000);
      })
      .catch((error) => {
        console.log("error log:", error);
        this.props.setMessage(error.message, "danger");
      });
    this.setState({
      placeholder: `Generating Choice. Please wait...`,
      response: "",
    });
  };

  loadOptions = () => {
    // console.log("loading options...");
    this.setState({
      option1: this.state.event.options[0],
      option2: this.state.event.options[1],
      option3: this.state.event.options[2],
      disabled: "",
    });
  };

  saveEvent = () => {
    Axios.put("event/update", this.state.event, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log("Event saved successfully.", response);
      })
      .catch((error) => {
        console.log("Error creating event.", error);
        this.props.setMessage(
          error.message +
            ". If the issue persists, please contact the developers.",
          "danger"
        );
      });
  };

  createEvent = (event) => {
    Axios.post("event/add", event, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log("Event created successfully.", response);
        this.setState({
          event: response.data.event,
          adventure: {
            ...this.state.adventure,
            events: [...this.state.adventure.events, response.data.event],
          },
        });
        setTimeout(() => {
          this.updateAdventureData();
        }, 100);
      })
      .catch((error) => {
        console.log("Error saving event.", error);
        this.props.setMessage(error.message, "danger");
      });
  };

  updateAdventureData = () => {
    Axios.put("adventure/update", this.state.adventure, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.adventure.events.length > 4) {
          this.props.createAchievement(3);
        }
        // console.log("Adventure updated successfully.", response);
      })
      .catch((error) => {
        console.log("Error updating adventure.", error);
        this.props.setMessage(
          error.message +
            ". If the issue persists, please contact the developers.",
          "danger"
        );
      });
  };

  chooseOption = (option, x) => {
    // console.log("OPTION");
    //UPDATE & SAVE EXISTING EVENT
    this.setState({
      option1: "Generating Choice. Please wait...",
      option2: "Generating Choice. Please wait...",
      option3: "Generating Choice. Please wait...",
      disabled: "disabled",
      event: {
        ...this.state.event,
        optionChosen: x,
      },
    });
    setTimeout(() => {
      this.saveEvent();
      //INITIALIZE A NEW EVENT
      setTimeout(() => {
        // console.log("NEW EVENT");
        this.setState({
          event: {},
        });

        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        let previousLog = this.state.previousLog.join("");
        let action = `${this.state.character.name} the ${this.state.character.class} chooses ${x}. ${option}.`;
        let prompt = `Progress the the story forward a short period of time. Give a clever, entertaining, interesting, detailed account of what happens next in an open ended way.`;
        let AIprompt_holder =
          previousLog + "\n" + action + "\n" + prompt + "\n";
        let AIprompt = AIprompt_holder.split(" ")
          .reverse()
          .slice(0, 1200)
          .reverse()
          .join(" ");
        // console.log("prompty test", AIprompt);
        openai
          .createCompletion(process.env.REACT_APP_API_ENGINE, {
            prompt: AIprompt,
            temperature: 0.8,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.0,
          })
          .then((response) => {
            // console.log("choose option test", response);
            let reply = response.data.choices[0].text;
            while (reply[0] === "\n") {
              reply = reply.slice(1, reply.length);
            }
            // console.log(reply)
            //CREATE NEW EVENT

            let event = {
              storyPrompt: prompt,
              story: reply,
              optionPrompt: "",
              options: [],
              optionChosen: null,
              fullLog: [...this.state.log, action, prompt, reply],
              displayedLog: [...this.state.log, action, reply],
            };
            // console.log(event);
            this.createEvent(event);

            this.setState({
              log: [...this.state.log, action, reply],
              previousLog: [...this.state.log, action, prompt, reply],
            });
            setTimeout(() => {
              window.scrollTo(250, document.body.scrollHeight);
              this.generateOptions();
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
      }, 100);
    }, 1000);

    this.setState({
      placeholder: `Generating Adventure. Please wait...`,
      response: "",
    });
  };

  render() {
    return (
      <div
        className='background-holder'
        style={{ backgroundImage: this.state.background }}
      >
        <Container className='adventure-screen'>
          <div className='game-log mb-3'>
            <Log
              log={this.state.log}
              adventureName={this.state.adventure.name}
            />
          </div>
          <Row className='adventure-container'>
            <Col xs='9'>
              <div className='buttons'>
                <Button
                  variant='dark'
                  size='lg'
                  disabled={this.state.disabled}
                  onClick={this.buttonOneClick}
                  onKeyPress={this.handleKeyPress}
                >
                  {this.state.option1.replace(/(<([^>]+)>)/gi, "")}
                </Button>
                <br></br>
                <br />
                <Button
                  variant='dark'
                  size='lg'
                  disabled={this.state.disabled}
                  onClick={this.buttonTwoClick}
                  onKeyPress={this.handleKeyPress}
                >
                  {this.state.option2.replace(/(<([^>]+)>)/gi, "")}
                </Button>
                <br></br>
                <br />
                <Button
                  variant='dark'
                  size='lg'
                  disabled={this.state.disabled}
                  onClick={this.buttonThreeClick}
                  onKeyPress={this.handleKeyPress}
                >
                  {this.state.option3.replace(/(<([^>]+)>)/gi, "")}
                </Button>
              </div>
            </Col>
            <Col>
              <Card id='character-card'>
                <Card.Img
                  id='character-image'
                  variant='top'
                  src={this.state.character.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/images/class/default.png`;
                  }}
                />
                <Card.ImgOverlay id='character-overlay'>
                  <Card.Title>
                    <b>{this.state.character.name}</b>
                  </Card.Title>
                  <Card.Subtitle>
                    <b>{this.state.classText}</b>
                    {this.state.currentKey}
                  </Card.Subtitle>
                  <br></br>
                  <Card.Text>
                    Strength: {this.state.character.ability}
                  </Card.Text>
                  <Card.Text>
                    Weakness: {this.state.character.weakness}
                  </Card.Text>
                  <br></br>
                  <Card.Text>
                    {/* {this.state.character.backstory} */}
                  </Card.Text>
                </Card.ImgOverlay>
                <Card.Body>
                  <Card.Title className='text-center'>
                    {this.state.character.name} the {this.state.classText}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* <Container className='adventure-screen-fade'></Container> */}
      </div>
    );
  }
}
