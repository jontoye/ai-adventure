import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import "./css/Contact.css";

export default class Contact extends Component {
  render() {
    return (
        <Container className="section-contact" id="contact">
        <h1 className="contact_title">Contact us</h1>
        <p className="contact_subtitle">Click on a developer to contact them</p>
        <div className="developer-profiles">
            <div>
                <a href="https://www.camiel.co.nz"><img className="dev-img" src="https://media-exp1.licdn.com/dms/image/C5603AQHAvkF7Iop89w/profile-displayphoto-shrink_400_400/0/1612992542159?e=1656547200&v=beta&t=23AsoAjsAd06gLRfIxp5F0X5gPiOQC696kwyaO_4pEg" alt="" /></a>
                <h4>Camiel van Schoonhoven</h4>
            </div>
            <div >
                <a href="https://www.linkedin.com/in/dylan-kotzer-3a5421190/"><img className="dev-img" src="https://media-exp1.licdn.com/dms/image/C5603AQE2SzDdN3dhng/profile-displayphoto-shrink_400_400/0/1564677631151?e=1656547200&v=beta&t=pmgaQ09ZhGuSZCs-0qKoJQjMm60WbZjYgBP9ZoVBNDY" alt="" /></a>
                <h4>Dylan Kotzer</h4>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/joncannata/"><img className="dev-img" src="https://media-exp1.licdn.com/dms/image/C4E03AQF9Hp4mOdNtlQ/profile-displayphoto-shrink_400_400/0/1634430736989?e=1656547200&v=beta&t=MC9KK22qMi_MJUvAgNJ_uupwZstMcTM2EA6VZ_LhCis" alt="" /></a>
                <h4>Jon Cannata</h4>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/jonathan-toye/"><img className="dev-img" src="https://media-exp1.licdn.com/dms/image/C4D03AQGfqeqry4Lhvw/profile-displayphoto-shrink_400_400/0/1644158453371?e=1656547200&v=beta&t=ZdDby5LaWR7dopI7YwWUxVWDLBmsGcMJlx83egP1v5U" alt="" /></a>
                <h4>Jonathan Toye</h4>
            </div>
        </div>
        <br></br>
        <div className="tutorial__content">
            <h2 className="tutorial__heading">Leave us a message!</h2>
            <p>insert form here</p>
        </div>
    </Container>
    )
  }
}
