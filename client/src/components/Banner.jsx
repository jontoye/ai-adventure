// import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  useNavigate,
} from "react-router-dom";
import "./css/Banner.css";

export default function Banner(props) {
  let navigate = useNavigate();

  function buttonHandler() {
    props.createRandomCharacter();
    navigate("/create-character");
  }
  return (
    <>
      <Container>
        <Row className='banner'>
          <Col md={12} lg={8} className='banner-left'>
            <Card className='banner__intro-card'>
              <Card.Body>
                <h1 className='greeting-title'>Greetings!</h1>
                <p>
                  {" "}
                  Welcome to AI Adventure, the best randomly-generated AI-driven
                  choose-your-own adventure game. If this is your first time
                  playing we recommend you go through the tutorial.
                </p>
                <p>
                  If you are a returning adventurer you can continue your
                  character's adventure by clicking{" "}
                  <span className='text-info'>continue</span> below.
                </p>
                <p>Good luck on your next adventure!</p>
              </Card.Body>
            </Card>
            <div className='banner__buttons'>
              <Button
                className='banner-button'
                variant='light'
                onClick={() => buttonHandler()}
              >
                Quick Start
              </Button>
              <Button
                className='banner-button'
                href='#tutorial'
                variant='light'
              >
                Tutorial
              </Button>
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
      </Container>
    </>
  );
}
