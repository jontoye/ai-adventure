import React, { Component } from "react";
import { Button, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Log from "./Log";
import Axios from "axios";
const { Configuration, OpenAIApi } = require("openai");

export default class Story extends Component {
  state = {
    adventure: this.props.adventure,
    log: "Log failed to load...",
    loadLog: false,
    redirect: false,
    redirectLink: this.props.origin,
    poem: null,
  };
  componentDidMount() {
    // console.log(this.props.adventure)
    let event_ID = this.state.adventure.events.reverse()[0];
    Axios.get("event/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        let events = response.data.events.filter((v) => {
          return this.state.adventure.events.includes(v._id);
        });
        // console.log('successfully found events: ', events)
        this.setState({
          adventure: {
            ...this.state.adventure,
            events: events,
          },
        });
        //async!
        setTimeout(() => {
          let event = this.state.adventure.events.find((v) => {
            return v._id === event_ID;
          });
          // console.log(event);
          this.setState({
            log: event.displayedLog,
            loadLog: true,
          });
        }, 100);
      })
      .catch((error) => {
        console.log("Error fetching event.", error);
        this.props.setMessage(error.message, "danger");
      });
  }

  createBardPoem = (e) => {
    //  console.log("filler function")
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let previousLog = this.state.log.join("");
    let prompt = `Write an epic bard poem about the adventure.`;
    let AIprompt_holder = previousLog + "\n" + prompt + "\n";
    let AIprompt = AIprompt_holder.split(" ")
      .reverse()
      .slice(0, 1200)
      .reverse()
      .join(" ");
    //   console.log("prompty test", AIprompt);
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
        //   console.log("choose option test", response);
        let reply = response.data.choices[0].text;
        while (reply[0] === "\n") {
          reply = reply.slice(1, reply.length).split("\n");
        }
        this.props.createAchievement(10);
        // console.log(reply)
        //CREATE NEW EVENT

        //   let event = {
        //     storyPrompt: prompt,
        //     story: reply,
        //     optionPrompt: "",
        //     options: [],
        //     optionChosen: null,
        //     fullLog: [...this.state.log, prompt, reply],
        //     displayedLog: [...this.state.log, reply],
        //   };
        //   // console.log(event);
        //   this.createEvent(event);

        this.setState({
          // log: [...this.state.log, action, reply],
          // previousLog: [...this.state.log, action, prompt, reply],
          poem: reply,
        });
        setTimeout(() => {
          window.scrollTo(250, document.body.scrollHeight);
          // this.generateOptions();
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
  };

  goBackBtn = (e) => {
    this.setState({
      redirect: true,
    });
  };

  renderTooltip_poem = (info) => (
    <Tooltip id='button-tooltip' {...info}>
      Generate an epic bard poem about this adventure!
    </Tooltip>
  );

  render() {
    const poem = this.state.poem
      ? this.state.poem.map((entry, index) => {
          return <p>{entry}</p>;
        })
      : null;
    return (
      <div className='centered'>
        <Card
          className='character-detail-card'
          style={{ width: "50rem", margin: "0 auto" }}
        >
          <Card.Img
            variant='top'
            src={this.state.adventure.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `/images/setting/default.png`;
            }}
          />
          <Card.Body>
            <Card.Title>
              {/* {this.state.character.name} the {this.state.character.class} */}
            </Card.Title>
            <div className='game-log mb-3'>
              {this.state.loadLog ? (
                <Log
                  log={this.state.log}
                  adventureName={this.state.adventure.name}
                />
              ) : null}
            </div>
            {/* <Button variant='secondary' onClick={this.goBackBtn}>
              Go back
            </Button>{" "} */}
            <OverlayTrigger
              placement='right'
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip_poem}
            >
              <Button variant='primary' onClick={this.createBardPoem}>
                Immortalize!
              </Button>
            </OverlayTrigger>
            <br></br>
            <br></br>
            {this.state.poem ? (
              <Card.Text>
                <i>Somewhere a bard begins to sing...</i>
                {poem}
              </Card.Text>
            ) : null}
          </Card.Body>
        </Card>
        <br></br>
        {this.state.redirect && (
          <Navigate to={this.state.redirectLink} replace={true} />
        )}
      </div>
    );
  }
}
