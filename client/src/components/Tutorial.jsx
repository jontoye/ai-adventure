import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./css/Tutorial.css";

export default class Tutorial extends Component {
  render() {
    return (
      <Container className='section-tutorial' id='tutorial'>
        <div className='tutorial__content'>
          <h1 className='tutorial__title'>Tutorial</h1>
          <h2 className='tutorial__heading'>What is AI Adventure?</h2>
          <p>
            AI Adventure is a choose your own adventure social hub where you can
            create and share your characters and adventures.
            <br /> AI Adventure is powered by GPT3, allowing you to effortlessly
            create any type of adventure you can put in to words. <br />
            Nearly all of the art on the site was made using the Disco Diffusion AI.
          </p>
        </div>

        <div className='tutorial__content'>
          <h2 className='tutorial__heading'>How do you play?</h2>
          <p>
            To play you can press on the Quick Start button on the home page or
            the Create Character button in the nav. <br /> You can randomize
            your character until you are satisfied or create one from scratch on
            your own.
            <br /> After creating a character you can choose the setting/theme
            of the story, decide your quest, and set out on a GPT3 powered AI
            Adventure.
          </p>
        </div>

        <div className='tutorial__content'>
          <h3 className='tutorial__heading'>
            This is amazing! But how does it work?
          </h3>
          <p>
            GPT-3 stands for Generative Pre-trained Transformer 3, and it is the
            third version of the language model that Open AI released in May
            2020. It is generative, as GPT-3 can generate long sentences of the
            unique text as the output. <br /> It is essentially magic which we use to empower you to create your own magical adventures.
          </p>
        </div>
      </Container>
    );
  }
}
