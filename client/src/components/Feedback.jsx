import React, { Component } from 'react'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'

export default class Feedback extends Component {
    state = {
        redirect: false,
      };
    
      changeHandler = (e) => {
        let temp = { ...this.state };
        temp[e.target.name] = e.target.value;
        this.setState(temp);
      };
    
      feedbackHandler = () => {
          console.log('feedback')
      };
    
      render() {
        // console.log(this.state);
          
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
                <Button id='' onClick={this.feedbackHandler}>
                    Send feedback
                </Button>
            </Container>
          </div>
        );
      }
}
