import React, { Component } from 'react';
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Axios from "axios";

export default class Feedback extends Component {
    state = {
        message: null,
        confirmationMessage: null,
        errorMessage: null,
    };
    
      changeHandler = (e) => {
        let temp = { ...this.state };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
      };
    
      feedbackHandler = () => {
        Axios.post("feedback", this.state)
        .then((response) => {
            console.log(response.data);
            let feedback = response.data.result ? 'Thank you for your message!' : null;
            let error = response.data.error ? response.data.error._message + ". Have you correctly filled out all the fields?" : null;
            this.setState({
                confirmationMessage: feedback,
                errorMessage: error,
            })
        })
        .catch((error) => {
            console.log(error);
        });
      };
    
      render() {
        const confirmationMessage = this.state.confirmationMessage ? (
            <Alert variant="success">{this.state.confirmationMessage}</Alert>
        ) : null;

        const errorMessage = this.state.errorMessage ? (
            <Alert variant="danger">{this.state.errorMessage}</Alert>
        ) : null;
          
        return (
          <div>
            <Container className="text-start" id=''>
                <Form.Group className='mb-3' controlId=''>
                    <Row>
                        <Col className="text-start">
                            <Form.Label className='text-white'>Name</Form.Label>
                            <Form.Control type='text' name='name' required
                            placeholder='Your name'
                            onChange={this.changeHandler}
                            ></Form.Control>
                        </Col>
                        <Col className="text-start">
                            <Form.Label className='text-white text-start'>Email</Form.Label>
                            <Form.Control type='email' name='emailAddress' required
                            placeholder='someone@someplace.com'
                            onChange={this.changeHandler}
                            ></Form.Control>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col className="text-start">
                            <Form.Label className='text-white text-start'>Message</Form.Label>
                            <Form.Control as='textarea' name='message' required
                            rows='8'
                            placeholder='Awesome app!'
                            onChange={this.changeHandler}
                            ></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col xs="3">
                        <Button id='' onClick={this.feedbackHandler}>
                            Send feedback
                        </Button>
                    </Col>
                    <Col>
                        {confirmationMessage}
                        {errorMessage}
                    </Col>
                </Row>
            </Container>
          </div>
        );
      }
}
