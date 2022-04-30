import React, { Component } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
// import Log from "./Log";

export default class CharacterForm2 extends Component {
  render() {
    if (this.props.currentStep !== 2) {
        return null;
    }
    return (
      <Container>
        <h4 className='text-white'>
            Write a short backstory for <span className="text-info">{this.props.newCharacter.name}</span>, or let OpenAI do the work for you!
        </h4>
        <p className='text-white'>
            <small>Tip: you can edit the AI-generated story directly in the textbox
            below.</small>
        </p>
        <br></br>
        <Container className="align-items-center">
            <Row>
                <Col xs={1}>
                    <Form.Label className='text-white  pull-left'>Tone:</Form.Label>
                </Col>
                &nbsp; &nbsp;
                <Col xs={6}>
                    <Form.Select as={Col} className='mb-3 pull-left' name='tone' onChange={this.props.handleChange}>
                    <option value='Dark'>Dark</option>
                    <option value='Dry'>Dry</option>
                    <option value='Grandiose'>Grandiose</option>
                    <option value='Happy'>Happy</option>
                    <option value='Humorous'>Humorous</option>
                    <option value='Lighthearted'>Lighthearted</option>
                    <option value='Lofty'>Lofty</option>
                    <option value='Realistic'>Realistic</option>
                    <option value='Sad'>Sad</option>
                    <option value='Sarcastic'>Sarcastic</option>
                    <option value='Serious'>Serious</option>
                    <option value='Tragic'>Tragic</option>
                    </Form.Select>
                </Col>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Col xs={4}>
                    <Button as={Col} 
                        className='pull-right'
                        variant='primary'
                        size='lg'
                        type='button'
                        onClick={this.props.generateBackstory}
                    >
                        Generate Backstory
                    </Button>
                </Col>
            </Row>
        </Container>
        <br></br>
        <Form.Group className='mb-3'>
            <Form.Label className='text-white'>Backstory</Form.Label>
            <Form.Control
            as='textarea'
            rows='8'
            name='backstory'
            placeholder={this.props.placeholder.backstory}
            value={this.props.newCharacter.backstory}
            onChange={this.props.handleChange}
            ></Form.Control>
            <br></br>

            {this.props.isBackstory ? 
                <Button 
                variant='primary' 
                size='lg' 
                type='submit'
                >
                Create Character
                </Button> 
                : <p className="text-white"><small>You must create a backstory to continue...</small></p>}

            <br />
            {/* <br></br> */}
            {/* <br></br> */}
            {/* <Log log={this.props.log} /> */}
        </Form.Group>          
      </Container>
    )
  }
}
