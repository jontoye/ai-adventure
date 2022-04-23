import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './css/Tutorial.css'

export default class Tutorial extends Component {
    render() {
        return (
            <Container className="section-tutorial" id="tutorial">
                <div className="tutorial__content">
                    <h1 className="tutorial__title">Tutorial</h1>
                    <h2 className="tutorial__heading">What is AI Adventure?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi sint culpa mollitia itaque eos dolore suscipit vero reprehenderit. Non vitae deleniti tempore architecto deserunt quasi ipsam cumque repudiandae quisquam! Quae?</p>
                </div>

                <div className="tutorial__content">
                    <h2 className="tutorial__heading">How do you play?</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloremque hic suscipit? Mollitia tempora commodi odio dignissimos quasi, ducimus aliquam eius est atque reiciendis quae doloribus odit. Eveniet, consectetur velit.</p>
                </div>

                <div className="tutorial__content">
                    <h3 className="tutorial__heading">This is amazing! But how does it work?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cum magnam eum explicabo cupiditate facere expedita. Maxime, recusandae voluptatum? Aperiam vitae cumque unde esse delectus vero architecto, quod a suscipit.</p>
                </div>
            </Container>
        )
  }
}
