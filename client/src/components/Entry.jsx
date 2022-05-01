import React, { Component } from "react";
import "./css/Entry.css";

export default class Entry extends Component {
  key = `entry ${this.props.colorID}`;

  render() {
    return (
      <div className={this.key}>
        <div className='entryText typewriter'>
          {this.props.text.replace(/(<([^>]+)>)/gi, "")}
        </div>
      </div>
    );
  }
}
