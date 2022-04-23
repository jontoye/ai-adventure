import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Banner.css";

export default function Banner() {
  return (
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
              href='/create-character'
              variant='light'
            >
              Quick Start
            </Button>
            <Button className='banner-button' href='#tutorial' variant='light'>
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
                  alt=''
                />
                <img
                  className='achievement-badge badge-2'
                  src='images/badges/ninja-heroic-stance.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-3'
                  src='images/badges/rank-2.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-4'
                  src='images/badges/rank-3.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-5'
                  src='images/badges/dragon-head.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-6'
                  src='images/badges/sabers-choc.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-7'
                  src='images/badges/drink-me.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-8'
                  src='images/badges/drink-me-2.png'
                  alt=''
                />
                <img
                  className='achievement-badge badge-9'
                  src='images/badges/wheat.png'
                  alt=''
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className='banner-fade'></div>
    </Container>
  );
}
