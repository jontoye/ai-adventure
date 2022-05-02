import React, { Component } from "react";
import "./css/Entry.css";

export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: `entry ${this.props.colorID}`,
    };
  }

  componentDidMount() {
    // console.log("[0]", this.props.text[0]);
    this.handleOptions();
  }

  handleOptions() {
    if (this.props.text[0] === "1") {
      // this.key = `${this.key} hidden-log`;
      this.setState({
        key: `entry ${this.props.colorID} hidden-log`,
      });
      // console.log("this key", this.key);
    } else {
      this.setState({
        key: `entry ${this.props.colorID}`,
      });
    }
  }
  render() {
    return (
      <div className={this.state.key}>
        <div className='entryText typewriter'>
          {this.props.text.replace(/(<([^>]+)>)/gi, "")}
        </div>
      </div>
    );
  }
}
