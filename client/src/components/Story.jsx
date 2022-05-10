import React, { Component } from 'react'
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Log from "./Log";
import Axios from "axios";

export default class Story extends Component {
    state = {
        adventure: this.props.adventure,
        log: "Log failed to load...",
        loadLog:false,
        redirect:false,
        redirectLink: this.props.origin,
    }
    componentDidMount() { 
        console.log(this.props.adventure)
        let event_ID = this.state.adventure.events.reverse()[0];
        Axios.get("event/index", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            let events = response.data.events.filter((v) => {
                return this.state.adventure.events.includes(v._id);
            });
            // console.log('successfully found events: ', events)
            this.setState({
                adventure: {
                    ...this.state.adventure,
                    events: events,
                },
            });
            //async!
            setTimeout(() => {
                let event = this.state.adventure.events.find((v) => {
                    return v._id === event_ID;
                });
                console.log(event)
                this.setState({
                    log: event.displayedLog,
                    loadLog: true,
                })
            }, 100);
        })
        .catch((error) => {
            console.log("Error fetching event.", error);
            this.props.setMessage(error.message, "danger");
        });
     }

     handleClick = (e) => {
         console.log("filler function")
     }

     goBackBtn = (e) => {
         this.setState({
             redirect: true,
         })
     }

  render() {
    return (
        <div className='centered'>
            <Card
            className='character-detail-card'
            style={{ width: "50rem", margin: "0 auto" }}
            >
            <Card.Img
                variant='top'
                src={this.state.adventure.image}
                onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/setting/default.png`;
                }}
            />
            <Card.Body>
                <Card.Title>
                {/* {this.state.character.name} the {this.state.character.class} */}
                </Card.Title>
                <div className='game-log mb-3'>
                    {this.state.loadLog ? <Log
                    log={this.state.log}
                    adventureName={this.state.adventure.name}
                    /> : null }
                </div>
            <Button variant='secondary' onClick={this.goBackBtn}>
              Go back
            </Button> {" "}
            <Button variant='primary' onClick={this.handleClick}>
              Lets go Bardcore!
            </Button>
            </Card.Body>
            </Card>
            <br></br>
            {this.state.redirect && (
                <Navigate
                to={this.state.redirectLink}
                replace={true}
                />
            )}
        </div>
    )
  }
}
