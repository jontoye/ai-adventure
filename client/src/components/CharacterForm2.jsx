import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Log from "./Log";

export default class CharacterForm2 extends Component {
  render() {
    if (this.props.currentStep !== 2) {
        return null;
    }
    return (
      <div>
        <h4 className='text-white'>
            Write a short backstory, or let OpenAI do the work for you!
        </h4>
        <p className='text-white'>
            Tip: you can edit the AI-generated story directly in the textbox
            below (not working yet).
        </p>
        <Form.Group className='mb-3' controlId=''>
            <Form.Label className='text-white'>Tone</Form.Label>
            <Form.Select name='tone' onChange={this.props.handleChange}>
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
        </Form.Group>
        <Button
            variant='primary'
            size='lg'
            type='button'
            onClick={this.props.generateBackstory}
        >
            Generate Backstory
        </Button>
        <br></br>
        <br></br>
        <Form.Group className='mb-3' controlId=''>
            <Form.Label className='text-white'>Backstory</Form.Label>
            <Form.Control
            as='textarea'
            name='backstory'
            placeholder={this.props.placeholder.backstory}
            value={
                this.props.generateRandomCharacter
                ? this.props.placeholder.backstory
                : this.props.newCharacter.backstory
            }
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
                </Button> :
                ""
            }

            <br />
            <br></br>
            <br></br>
            <Log log={this.props.log} />
        </Form.Group>          
      </div>
    )
  }
}
