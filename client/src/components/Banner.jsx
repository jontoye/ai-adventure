// import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./css/Banner.css";
import Axios from "axios";

export default function Banner(props) {
  let navigate = useNavigate();

  function buttonHandler() {
    props.createRandomCharacter();
    navigate("/create-character");
  }

  function continueAdventure() {
    console.log('continue adventure...')
    Axios.get("event/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      let events = response.data.events.filter(v=>{
        return props.adventure.events.includes(v._id);
      })
      props.adventure.events = events;
      setTimeout(()=>{
        props.continueAdventure(props.adventure, props.character)
        navigate("/adventure");
      },100)
    })
  }

  const renderTooltip_qs = (info) => (
    <Tooltip id="button-tooltip" {...info}>
      Generate a character with random attributes!
    </Tooltip>
  );

  const renderTooltip_tut = (info) => (
    <Tooltip id="button-tooltip" {...info}>
      Learn how to play the game!
    </Tooltip>
  );

  const renderTooltip_cont = (info) => {
    return <Tooltip id="button-tooltip" {...info}>
      {props.character.name} and the quest to {props.adventure.quest.toLowerCase()}!
    </Tooltip>
  };

  return (
    <>
      <div className="container-xl">
        <Row className='banner'>
          <Col md={12} lg={8} className='banner-left'>
            <Card className='banner__intro-card'>
              <Card.Body>
                <h1 className='greeting-title'>Greetings!</h1>
                <p>
                  {" "}
                  Welcome to AI Adventure, the best randomly-generated AI-driven
                  choose-your-own adventure game on the internet. If this is your first time
                  playing we recommend you go through the <span className='text-info'>tutorial</span>.
                </p>
                {props.adventure ? <p>
                  If you are in a hurry to get adventuring, you can immediately begin a new one by clicking <span className='text-info'>quick start</span> below. Otherwise, you can pick up where your last adventure left off by selecting <span className='text-info'>continue</span>.
                </p> : <p>
                  If you are in a hurry to get adventuring, you can immediately begin a new one by clicking <span className='text-info'>quick start</span> below. Once you start an adventure you will be able to continue it from the menu below.
                </p>}
                <p>Good luck on your next adventure!</p>
              </Card.Body>
            </Card>
            <div className='banner__buttons'>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip_tut}
                >
                    <Button
                        className='banner-button'
                        href='#tutorial'
                        variant='light'
                    >
                        Tutorial
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip_qs}
                >
                    <Button
                        className='banner-button'
                        variant='light'
                        onClick={() => buttonHandler()}
                    >
                        Quick Start
                    </Button>
                </OverlayTrigger>
                {props.adventure ?
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip_cont}
                    character={props.character}
                    adventure={props.adventure}
                >
                    <Button
                        className='banner-button'
                        variant='light'
                        onClick={() => continueAdventure()}
                    >
                        Continue Adventure
                    </Button>
                </OverlayTrigger>
                : null}
            </div>
          </Col>
          <Col md={12} lg={4} className='banner-right'>
            <Card className='banner__achievement-card'>
              <Card.Body>
                <h3>Achievements</h3>
                <div className='achievement-list'>
                  <img
                    className='achievement-badge badge-1'
                    src='images/badges/rank-1.png'
                    alt='Achievement 1'
                    title='Achievement 1'
                  />
                  <img
                    className='achievement-badge badge-2'
                    src='images/badges/ninja-heroic-stance.png'
                    alt='Achievement 2'
                    title='Achievement 2'
                  />
                  <img
                    className='achievement-badge badge-3'
                    src='images/badges/rank-2.png'
                    alt='Achievement 3'
                    title='Achievement 3'
                  />
                  <img
                    className='achievement-badge badge-4'
                    src='images/badges/rank-3.png'
                    alt='Achievement 4'
                    title='Achievement 4'
                  />
                  <img
                    className='achievement-badge badge-5'
                    src='images/badges/dragon-head.png'
                    alt='Achievement 5'
                    title='Achievement 5'
                  />
                  <img
                    className='achievement-badge badge-6'
                    src='images/badges/sabers-choc.png'
                    alt='Achievement 6'
                    title='Achievement 6'
                  />
                  <img
                    className='achievement-badge badge-7'
                    src='images/badges/drink-me.png'
                    alt='Achievement 7'
                    title='Achievement 7'
                  />
                  <img
                    className='achievement-badge badge-8'
                    src='images/badges/drink-me-2.png'
                    alt='Achievement 8'
                    title='Achievement 8'
                  />
                  <img
                    className='achievement-badge badge-9'
                    src='images/badges/wheat.png'
                    alt='Achievement 9'
                    title='Achievement 9'
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className='banner-fade'></div>
      </div>
    </>
  );
}
