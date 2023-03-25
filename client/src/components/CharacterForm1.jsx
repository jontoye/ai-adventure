import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class CharacterForm1 extends Component {
    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <Container>
              <h4 className='text-white form__group field'>Define your character</h4>
              <div className='mb-3 form__group field'>
                <label className=' form__label'>Character name</label>
                <input
                  type='text'
                  name='name'
                  className='form__field'
                  placeholder={this.props.placeholder.name}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.name
                      : this.props.newCharacter.name
                  }
                  onChange={this.props.handleChange}
                ></input>
              </div>
              <div className='mb-3 form__group field'>
                <label className=' form__label'>
                  Class/role/occupation
                </label>
                <input
                  type='text'
                  name='class'
                  className='form__field'
                  placeholder={this.props.placeholder.class}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.class
                      : this.props.newCharacter.class
                  }
                  onChange={this.props.handleChange}
                ></input>
              </div>
              <div className='mb-3 form__group field'>
                <label className=' form__label'>Special ability</label>
                <input
                  type='text'
                  name='ability'
                  className='form__field'
                  placeholder={this.props.placeholder.ability}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.ability
                      : this.props.newCharacter.ability
                  }
                  onChange={this.props.handleChange}
                ></input>
              </div>
              <div className='mb-3 form__group field'>
                <label className=' form__label'>Weakness</label>
                <input
                  type='text'
                  name='weakness'
                  className='form__field'
                  placeholder={this.props.placeholder.weakness}
                  value={
                    this.props.generateRandomCharacter
                      ? this.props.placeholder.weakness
                      : this.props.newCharacter.weakness
                  }
                  onChange={this.props.handleChange}
                ></input>
              </div>                
            </Container>
        );
    }
}

export default CharacterForm1;
