import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class CharacterForm1 extends Component {
    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <div>
              <h4 className='text-white'>Define your character</h4>
              <Form.Group className='mb-3' controlId=''>
                <Form.Label className='text-white'>Character name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder={this.props.placeholder.name}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.name
                      : this.props.newCharacter.name
                  }
                  onChange={this.props.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId=''>
                <Form.Label className='text-white'>
                  Class/role/occupation
                </Form.Label>
                <Form.Control
                  type='text'
                  name='class'
                  placeholder={this.props.placeholder.class}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.class
                      : this.props.newCharacter.class
                  }
                  onChange={this.props.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId=''>
                <Form.Label className='text-white'>Special ability</Form.Label>
                <Form.Control
                  type='text'
                  name='ability'
                  placeholder={this.props.placeholder.ability}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.ability
                      : this.props.newCharacter.ability
                  }
                  onChange={this.props.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3' controlId=''>
                <Form.Label className='text-white'>Weakness</Form.Label>
                <Form.Control
                  type='text'
                  name='weakness'
                  placeholder={this.props.placeholder.weakness}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.weakness
                      : this.props.newCharacter.weakness
                  }
                  onChange={this.props.handleChange}
                ></Form.Control>
              </Form.Group>                
            </div>
        );
    }
}

export default CharacterForm1;
