import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './Banner.css';

export default class Banner extends Component {
  render() {
    return (
        <Container>
            <Row className="banner">
                <Col md={12} lg={8} className="banner-left">
                    <Card className="banner__intro-card">
                        <Card.Body>
                            <h1>Greetings!</h1>
                            <p> Welcome to AI Adventure, the best randomly-generated AI-driven choose-your-own adventure game. If this is your first time playing we recommend you go through the tutorial.</p> 
                            <p>If you are a returning adventurer you can continue your character's adventure by clicking <span className="text-info">continue</span> below.</p>
                            <p>Good luck on your next adventure!</p>
                        </Card.Body>
                    </Card>
                    <div className='banner__buttons'>
                        <Button href="/create-character" variant="light">Quick Start</Button>
                        <Button href="#tutorial" variant="light">Tutorial</Button>
                    </div>
                </Col>
                <Col md={12} lg={4} className="banner-right">
                    <Card className="banner__achievement-card">
                        <Card.Body>
                            <h3>Achievements</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
  }
}
