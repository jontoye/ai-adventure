import React, { Component } from "react";

export default class Entry extends Component {
  render() {
    return <p className='entry-key'>{this.props.text}</p>;
  }
}
