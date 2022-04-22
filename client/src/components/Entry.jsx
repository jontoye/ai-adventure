import React, { Component } from "react";

export default class Entry extends Component {
  render() {
    return <div className='entry-key'>{this.props.text}</div>;
  }
}
