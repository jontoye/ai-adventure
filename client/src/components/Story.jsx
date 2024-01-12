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
    tokenShow: true,
    tokenCount: null,
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
    Axios.get(`/profile/${this.props.user.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log("tokens", response.data.user.tokens);
      this.setState({
        tokenCount: response.data.user.tokens,
        tokenShow: response.data.user.tokens < 50000,
      });
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
        this.props.addTokens(response.data.usage.total_tokens);
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
          return (
            <div>
              <p>{entry}</p>
            </div>
          );
        })
      : null;

    const tokenShow = this.state.tokenShow;

    if (!tokenShow) {
      return (
        <div className='relative w-full h-full overflow-hidden bg-cover bg-50 bg-no-repeat'>
          <div className='items-center w-100'>
            <img
              src='https://i.imgur.com/zAzseke.jpg'
              className='outImage'
            ></img>
          </div>
          <div className='absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-auto bg-fixed bg-grey'>
            <div className='flex h-full  my-5 flex-col max-w-80 mx-auto text-left outOfTokens'>
              <h2 className='textwhite opacity-100'>
                Thank you for using AI Adventure!
              </h2>
              <p>&nbsp;</p>
              <p className='textwhite opacity-100'>
                {" "}
                {`We hope you enjoyed the app and were able to go on a number of entertaining adventures`}{" "}
                {`We are thrilled that the app has been more popular than expected.`}
              </p>
              <p>&nbsp;</p>
              <p className='textwhite opacity-100'>
                {" "}
                {` Unfortunately, the costs of maintaining AI Adventure are adding up and
              it looks like you've used up all your free tokens.`}{" "}
              </p>
              <p>&nbsp;</p>
              <p className='textwhite opacity-100'>
                {`Don't worry though - you can`}
                <a href='https://dylankotzer.com/' className='text-blue-400'>
                  {" "}
                  contact Dylan Kotzer
                </a>{" "}
                {` to request more tokens or let us know about any features you'd
              like to see, bugs you've encountered, or feedback you have. We're
              always looking for ways to improve Adventure AI and make it even
              better for our users.`}
              </p>
              <p>&nbsp;</p>
              <p className='textwhite opacity-100'>
                {`Thanks again for Adventuring with us, and we appreciate your
              understanding as we work to keep the app sustainable. We hope to
              hear from you soon!`}
              </p>
            </div>
          </div>
        </div>
      );
    }
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
              <div style={{ position: "relative" }}>
                <Button
                  variant='primary'
                  onClick={this.createBardPoem}
                  disabled
                >
                  Immortalize!
                </Button>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Out of Order
                </div>
              </div>
            </OverlayTrigger>
            <br></br>
            <br></br>
            {this.state.poem ? (
              <Card.Text>
                <Card.Img src='/images/class/bard.png' />
                <i>Somewhere a bard begins to sing...</i>
                <br></br>
                <div className='poemWrapper'>{poem}</div>
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
