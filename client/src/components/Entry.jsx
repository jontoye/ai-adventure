import React, { Component } from "react";
import "./css/Entry.css";

export default class Entry extends Component {
  key = `entry entry-key${this.props.id}`
  render() 
  {
    return <p className={this.key}>{this.props.text}</p>;
  }
}
