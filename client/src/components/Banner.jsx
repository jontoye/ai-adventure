// import React, { Component } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Banner.css";
import Axios from "axios";
import { useEffect, useState } from "react";

export default function Banner(props) {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [achievement, setAchievement] = useState({
    title: "",
    img: "",
    description: "",
  });

  const [badges, setBadges] = useState({
    badge1: "achievement-badge unachieved",
    badge2: "achievement-badge unachieved",
    badge3: "achievement-badge unachieved",
    badge4: "achievement-badge unachieved",
    badge5: "achievement-badge unachieved",
    badge6: "achievement-badge unachieved",
    badge7: "achievement-badge unachieved",
    badge8: "achievement-badge unachieved",
    badge9: "achievement-badge unachieved",
    badge10: "achievement-badge unachieved",
  });

  useEffect(() => {
    const loadAchievements = () => {
      Axios.get("users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          // console.log("response test", response);
          let user = response.data.users.filter(
            (user) => props.user.id === user._id
          );
          let tempBadges = badges;
          for (let i = 1; i < 12; i++) {
            if (user[0] && user[0].achievements.includes(i.toString())) {
              // console.log("achievement detected:", i);
              let badgeID = `badge${i}`;

              tempBadges = {
                ...tempBadges,
                [badgeID]: "achievement-badge",
              };
              // console.log(tempBadges);
            }
          }
          setBadges({
            ...tempBadges,
          });
        })
        .catch((err) => {
          console.log("Error fetching users.");
          console.log(err);
        });
    };
    // achievementColors();
    loadAchievements();
  }, []);

  const handleClose = () => setShow(false);

  const achievement1 = () => {
    setAchievement({
      title: "Create a Character",
      img: "images/badges/1.png",
      description: "Created your first Character! Good luck on your adventure",
    });
    setShow(true);
  };
  const achievement2 = () => {
    setAchievement({
      title: "Start an Adventure",
      img: "images/badges/2.png",
      description:
        "The first step is always the hardest, but you've taken it. You've began an amazing adventure!",
    });
    setShow(true);
  };
  const achievement3 = () => {
    setAchievement({
      title: "I would code 5 miles",
      img: "images/badges/3.png",
      description: "Played through 5 events",
    });
    setShow(true);
  };
  const achievement4 = () => {
    setAchievement({
      title: "Pro Adventurer",
      img: "images/badges/4.png",
      description:
        "You have played for over 5 hours. Remember to take a break!",
    });
    setShow(true);
  };
  const achievement5 = () => {
    setAchievement({
      title: "10 Minutes in Heaven",
      img: "images/badges/5.png",
      description: "Play your first 10 minutes of AI Dungeon",
    });
    setShow(true);
  };
  const achievement6 = () => {
    setAchievement({
      title: "Copycat",
      img: "images/badges/6.png",
      description: "Copy somone elses noble quest",
    });
    setShow(true);
  };
  const achievement7 = () => {
    setAchievement({
      title: "Doppleganger",
      img: "images/badges/7.png",
      description: "Clone somone else character",
    });
    setShow(true);
  };
  const achievement8 = () => {
    setAchievement({
      title: "Play as Saad",
      img: "images/badges/8.png",
      description: "Play as our brave leader throughout your mission",
    });
    setShow(true);
  };
  const achievement9 = () => {
    setAchievement({
      title: "Play as Marty",
      img: "images/badges/9.png",
      description:
        "Play as the Marty, the brash warrior ready to conquer any quest",
    });
    setShow(true);
  };
  const achievement10 = () => {
    setAchievement({
      title: "Immortal",
      img: "images/badges/10.png",
      description: "Immortalize an adventure with an Epic Poem",
    });
    setShow(true);
  };

  function buttonHandler() {
    props.createRandomCharacter();
    navigate("/create-character");
  }

  function continueAdventure() {
    console.log("continue adventure...");
    Axios.get("event/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        let events = response.data.events.filter((v) => {
          return props.adventure.events.includes(v._id);
        });
        props.adventure.events = events;
        setTimeout(() => {
          props.continueAdventure(props.adventure, props.character);
          navigate("/adventure");
        }, 100);
      })
      .catch((error) => {
        console.log("Error continuing adventure.", error);
        this.props.setMessage(error.message, "danger");
      });
  }

  const renderTooltip_qs = (info) => (
    <Tooltip id='button-tooltip' {...info}>
      Generate a character with random attributes!
    </Tooltip>
  );

  const renderTooltip_tut = (info) => (
    <Tooltip id='button-tooltip' {...info}>
      Learn how to play the game!
    </Tooltip>
  );

  const renderTooltip_cont = (info) => {
    return (
      <Tooltip id='button-tooltip' {...info}>
        {props.character.name} and the quest to{" "}
        {props.adventure.quest.toLowerCase()}!
      </Tooltip>
    );
  };

  return (
    <>
      <div className='fluid-xl'>
        <Row className='banner'>
          <Col md={12} lg={8} className='banner-left'>
            <Card className='banner__intro-card'>
              <Card.Body>
                <h1 className='greeting-title'>Greetings!</h1>
                <p>
                  {" "}
                  Welcome to AI Adventure, the best randomly-generated AI-driven
                  choose-your-own adventure game on the internet. If this is
                  your first time playing we recommend you go through the{" "}
                  <span className='text-info'>tutorial</span>.
                </p>
                {props.adventure ? (
                  <p>
                    If you are in a hurry to get adventuring, you can
                    immediately begin a new one by clicking{" "}
                    <span className='text-info'>quick start</span> below.
                    Otherwise, you can pick up where your last adventure left
                    off by selecting <span className='text-info'>continue</span>
                    .
                  </p>
                ) : (
                  <p>
                    If you are in a hurry to get adventuring, you can
                    immediately begin a new one by clicking{" "}
                    <span className='text-info'>quick start</span> below. Once
                    you start an adventure you will be able to continue it from
                    the menu below.
                  </p>
                )}
                <p>Good luck on your next adventure!</p>
              </Card.Body>
            </Card>
            <div className='banner__buttons'>
              <OverlayTrigger
                placement='right'
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
                placement='right'
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
              {props.adventure ? (
                <OverlayTrigger
                  placement='right'
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
              ) : null}
            </div>
          </Col>
          <Col md={12} lg={4} className='banner-right'>
            <Card className='banner__achievement-card'>
              <Card.Body>
                <h3>Achievements</h3>
                <div className='achievement-list'>
                  <button id='achievement-button' onClick={achievement1}>
                    <img
                      className={badges.badge1}
                      src='images/badges/1.png'
                      alt='Achievement 1'
                      title='Create a Character'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement2}>
                    <img
                      className={badges.badge2}
                      src='images/badges/2.png'
                      alt='Achievement 2'
                      title='Start an Adventure'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement3}>
                    <img
                      className={badges.badge3}
                      src='images/badges/3.png'
                      alt='Achievement 3'
                      title='I would code 5 miles'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement4}>
                    <img
                      className={badges.badge4}
                      src='images/badges/4.png'
                      alt='Achievement 4'
                      title='Pro Adventurer'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement5}>
                    <img
                      className={badges.badge5}
                      src='images/badges/5.png'
                      alt='Achievement 5'
                      title='10 Minutes in Heaven'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement6}>
                    <img
                      className={badges.badge6}
                      src='images/badges/6.png'
                      alt='Achievement 6'
                      title='Copycat'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement7}>
                    <img
                      className={badges.badge7}
                      src='images/badges/7.png'
                      alt='Achievement 7'
                      title='Doppleganger'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement8}>
                    <img
                      className={badges.badge8}
                      src='images/badges/8.png'
                      alt='Achievement 8'
                      title='Saad'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement9}>
                    <img
                      className={badges.badge9}
                      src='images/badges/9.png'
                      alt='Achievement 9'
                      title='Martin'
                    />
                  </button>
                  <button id='achievement-button' onClick={achievement10}>
                    <img
                      className={badges.badge10}
                      src='images/badges/10.png'
                      alt='Achievement 10'
                      title='Immortal'
                    />
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose} id='achievement-modal'>
          <Modal.Header closeButton>
            <Modal.Title>{achievement.title}</Modal.Title>
          </Modal.Header>
          <img
            width='300px'
            id='achievement-image'
            src={achievement.img}
            alt='achievement-img'
          />
          <Modal.Body>{achievement.description}</Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className='banner-fade'></div>
      </div>
    </>
  );
}
